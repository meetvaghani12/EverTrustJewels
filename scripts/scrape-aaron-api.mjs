/**
 * Intercept Aaron & Son API calls to find product data
 * Run: node scripts/scrape-aaron-api.mjs
 */

import puppeteer from "puppeteer";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import https from "https";
import http from "http";

const OUTPUT_DIR = join(import.meta.dirname, "output");
const IMAGES_DIR = join(OUTPUT_DIR, "images");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true });

function downloadImage(url, filename) {
  return new Promise((resolve) => {
    const filepath = join(IMAGES_DIR, filename);
    if (existsSync(filepath)) { resolve(filepath); return; }
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, filename).then(resolve);
      }
      if (res.statusCode !== 200) { resolve(null); return; }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => { writeFileSync(filepath, Buffer.concat(chunks)); resolve(filepath); });
      res.on("error", () => resolve(null));
    }).on("error", () => resolve(null));
  });
}

async function main() {
  console.log("=== Aaron & Son API Interceptor ===\n");

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const apiCalls = [];
  const productData = [];

  // Intercept all network requests
  await page.setRequestInterception(true);
  page.on("request", (req) => req.continue());

  page.on("response", async (res) => {
    const url = res.url();
    const contentType = res.headers()["content-type"] || "";

    // Capture JSON API responses
    if (contentType.includes("json") || url.includes("api") || url.includes(".json")) {
      try {
        const text = await res.text();
        if (text.length > 50) {
          apiCalls.push({ url, status: res.status(), size: text.length });
          console.log(`  API: ${url.substring(0, 120)} (${text.length} bytes)`);

          // Try parsing
          try {
            const data = JSON.parse(text);
            // Check if it looks like product data
            if (Array.isArray(data) && data.length > 0) {
              console.log(`    -> Array with ${data.length} items`);
              productData.push({ source: url, data });
            } else if (data.products || data.items || data.results || data.designs) {
              const key = Object.keys(data).find(k => Array.isArray(data[k]));
              if (key) {
                console.log(`    -> ${key}: ${data[key].length} items`);
                productData.push({ source: url, data: data[key] });
              }
            }
          } catch (e) { /* not JSON */ }
        }
      } catch (e) { /* skip */ }
    }
  });

  // Visit key pages
  const pages = [
    "https://www.aaronandson.com/rings/diamond-engagement-rings",
    "https://www.aaronandson.com/earrings/stud-diamond-earrings",
    "https://www.aaronandson.com/bracelets/tennis-bracelets",
    "https://www.aaronandson.com/pendant/diamond-pendant",
  ];

  for (const url of pages) {
    console.log(`\nVisiting: ${url}`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise(r => setTimeout(r, 5000));

    // Scroll the page
    await page.evaluate(async () => {
      for (let i = 0; i < 15; i++) {
        window.scrollBy(0, 400);
        await new Promise(r => setTimeout(r, 200));
      }
    });
    await new Promise(r => setTimeout(r, 3000));

    // Try clicking "load more" or pagination if exists
    try {
      const loadMore = await page.$("button[class*='load'], a[class*='load'], .load-more, .show-more");
      if (loadMore) {
        await loadMore.click();
        await new Promise(r => setTimeout(r, 3000));
      }
    } catch (e) { /* skip */ }
  }

  await browser.close();

  console.log(`\n\n=== Summary ===`);
  console.log(`API calls intercepted: ${apiCalls.length}`);
  console.log(`Product data sources: ${productData.length}`);

  // Save all intercepted API calls for analysis
  writeFileSync(join(OUTPUT_DIR, "api-calls.json"), JSON.stringify(apiCalls, null, 2));

  // Flatten all product data
  const allProducts = [];
  for (const { source, data } of productData) {
    for (const item of data) {
      allProducts.push({ ...item, _source: source });
    }
  }

  if (allProducts.length > 0) {
    console.log(`\nTotal products from API: ${allProducts.length}`);

    // Download images
    let imgCount = 0;
    for (const p of allProducts) {
      const imgUrl = p.image || p.imageUrl || p.img || p.thumbnail || p.photo || p.primaryImage;
      if (imgUrl) {
        const fullUrl = imgUrl.startsWith("http") ? imgUrl : `https://www.aaronandson.com${imgUrl}`;
        const ext = (fullUrl.split(".").pop()?.split("?")[0] || "jpg").substring(0, 4);
        const filename = `product-${imgCount}.${ext}`;
        const result = await downloadImage(fullUrl, filename);
        if (result) {
          p._localImage = `images/${filename}`;
          imgCount++;
        }
      }
    }

    writeFileSync(join(OUTPUT_DIR, "products.json"), JSON.stringify(allProducts, null, 2));
    console.log(`Saved ${allProducts.length} products, ${imgCount} images`);
  } else {
    console.log("\nNo product API data found. Check api-calls.json for clues.");
  }

  console.log("\nDone!");
}

main().catch(console.error);
