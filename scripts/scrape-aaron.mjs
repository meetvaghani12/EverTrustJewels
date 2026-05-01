/**
 * Scraper for aaronandson.com (headless browser)
 * Run: node scripts/scrape-aaron.mjs
 *
 * Output:
 *   - scripts/output/products.json
 *   - scripts/output/images/
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

const BASE = "https://www.aaronandson.com";

const CATEGORIES = [
  { name: "engagement-rings", url: "/rings/diamond-engagement-rings" },
  { name: "wedding-rings", url: "/rings/diamond-anniversary-wedding-rings" },
  { name: "solitaire-rings", url: "/rings/diamond-solitaire-engagement-rings" },
  { name: "eternity-rings", url: "/rings/diamond-eternity-rings" },
  { name: "fashion-rings", url: "/rings/fashion-rings" },
  { name: "stud-earrings", url: "/earrings/stud-diamond-earrings" },
  { name: "drop-earrings", url: "/earrings/diamond-drop-earrings" },
  { name: "hoop-earrings", url: "/earrings/diamond-hoop-earrings" },
  { name: "tennis-bracelets", url: "/bracelets/tennis-bracelets" },
  { name: "diamond-bracelets", url: "/bracelets/diamond-bracelets" },
  { name: "diamond-pendants", url: "/pendant/diamond-pendant" },
  { name: "tennis-pendant", url: "/pendant/diamond-tennis-pendant" },
  { name: "fancy-pendant", url: "/pendant/fancy-pendant" },
];

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = join(IMAGES_DIR, filename);
    if (existsSync(filepath)) { resolve(filepath); return; }
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, filename).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { resolve(null); return; }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        writeFileSync(filepath, Buffer.concat(chunks));
        resolve(filepath);
      });
      res.on("error", reject);
    }).on("error", (e) => { resolve(null); });
  });
}

async function scrapeCategory(page, cat) {
  console.log(`\nScraping: ${cat.name}`);
  await page.goto(`${BASE}${cat.url}`, { waitUntil: "networkidle2", timeout: 30000 });

  // Wait for products to load
  await new Promise(r => setTimeout(r, 5000));

  // Scroll to trigger lazy-loading
  await page.evaluate(async () => {
    for (let i = 0; i < 10; i++) {
      window.scrollBy(0, 500);
      await new Promise((r) => setTimeout(r, 300));
    }
    window.scrollTo(0, 0);
  });

  await new Promise(r => setTimeout(r, 2000));

  // Extract products from the rendered DOM
  const products = await page.evaluate((categoryName) => {
    const items = [];

    // Try various selectors common in e-commerce
    const selectors = [
      ".product-item", ".product-card", ".product",
      "[data-product]", ".item", ".grid-item",
      ".product-tile", ".product-listing",
      "a[href*='/product']", "a[href*='/item']",
      ".design-item", ".design-card",
    ];

    // Also try to get ALL links with images that look like products
    const allLinks = document.querySelectorAll("a");
    for (const link of allLinks) {
      const img = link.querySelector("img");
      if (!img) continue;

      const href = link.getAttribute("href") || "";
      const imgSrc = img.getAttribute("src") || img.getAttribute("data-src") || "";
      const name = link.textContent?.trim() || img.getAttribute("alt") || "";

      // Skip navigation/category links
      if (!imgSrc || imgSrc.includes("category") || imgSrc.includes("banner")) continue;
      if (href === "/" || href === "#") continue;

      // Look for price nearby
      const priceEl = link.querySelector("[class*='price'], .price, span[class*='amount']");
      const price = priceEl?.textContent?.trim() || "";

      if (name && imgSrc) {
        items.push({
          name: name.substring(0, 200),
          price,
          image: imgSrc,
          url: href,
          category: categoryName,
        });
      }
    }

    // Also try getting product info from any visible text + image combos
    const allImages = document.querySelectorAll("img");
    for (const img of allImages) {
      const src = img.getAttribute("src") || img.getAttribute("data-src") || "";
      const alt = img.getAttribute("alt") || "";
      if (src && alt && (src.includes("product") || src.includes("design") || src.includes("item"))) {
        // Check if this image is already captured
        if (!items.some((p) => p.image === src)) {
          items.push({
            name: alt,
            price: "",
            image: src,
            url: "",
            category: categoryName,
          });
        }
      }
    }

    return items;
  }, cat.name);

  console.log(`  Found ${products.length} products`);
  return products;
}

async function main() {
  console.log("=== Aaron & Son Scraper (Puppeteer) ===\n");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

  const allProducts = [];

  for (const cat of CATEGORIES) {
    try {
      const products = await scrapeCategory(page, cat);
      allProducts.push(...products);
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
  }

  await browser.close();

  // Deduplicate by image URL
  const seen = new Set();
  const unique = allProducts.filter((p) => {
    if (seen.has(p.image)) return false;
    seen.add(p.image);
    return true;
  });

  console.log(`\nTotal unique products: ${unique.length}`);

  // Download images
  let imgCount = 0;
  for (const product of unique) {
    if (product.image) {
      const imageUrl = product.image.startsWith("http") ? product.image : `${BASE}${product.image}`;
      const ext = (imageUrl.split(".").pop()?.split("?")[0] || "jpg").substring(0, 4);
      const safeName = product.category.replace(/[^a-z0-9-]/g, "") || "misc";
      const filename = `${safeName}-${imgCount}.${ext}`;
      try {
        const result = await downloadImage(imageUrl, filename);
        if (result) {
          product.localImage = `images/${filename}`;
          imgCount++;
          if (imgCount % 10 === 0) console.log(`  Downloaded ${imgCount} images...`);
        }
      } catch (e) { /* skip */ }
    }
  }

  // Save JSON
  writeFileSync(join(OUTPUT_DIR, "products.json"), JSON.stringify(unique, null, 2));
  console.log(`\nSaved ${unique.length} products to scripts/output/products.json`);
  console.log(`Downloaded ${imgCount} images to scripts/output/images/`);
  console.log("\nDone!");
}

main().catch(console.error);
