/**
 * Scraper for aaronandson.com — Shop All Rings
 * Run: node scripts/scrape-rings.mjs
 *
 * Output:
 *   scripts/output/rings.json          — raw scraped data
 *   scripts/output/rings-products.js   — ready to paste into src/data/products.ts
 *   public/images/products/            — downloaded images
 */

import puppeteer from "puppeteer";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import https from "https";
import http from "http";

const BASE = "https://www.aaronandson.com";
const START_URL = `${BASE}/rings/Shop-All-Rings.lp`;
const OUTPUT_DIR = join(import.meta.dirname, "output");
const IMAGES_DIR = join(process.cwd(), "public/images/products");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true });

// ─── helpers ──────────────────────────────────────────────────────────────────

function downloadImage(url, filepath) {
  return new Promise((resolve) => {
    if (existsSync(filepath)) { resolve(true); return; }
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, filepath).then(resolve);
      }
      if (res.statusCode !== 200) { resolve(false); return; }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => { writeFileSync(filepath, Buffer.concat(chunks)); resolve(true); });
      res.on("error", () => resolve(false));
    });
    req.on("error", () => resolve(false));
    req.setTimeout(15000, () => { req.destroy(); resolve(false); });
  });
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parsePrice(str) {
  if (!str) return null;
  const m = str.match(/[\d,]+\.?\d*/);
  return m ? parseFloat(m[0].replace(/,/g, "")) : null;
}

function parseCarat(str) {
  if (!str) return null;
  const m = str.match(/(\d+\.?\d*)/);
  return m ? parseFloat(m[1]) : null;
}

// ─── collect all product links from listing page ──────────────────────────────

async function collectLinks(page) {
  console.log("Loading listing page...");
  await page.goto(START_URL, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise(r => setTimeout(r, 4000));

  // scroll to trigger lazy loading
  await page.evaluate(async () => {
    for (let i = 0; i < 30; i++) {
      window.scrollBy(0, 600);
      await new Promise(r => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 3000));

  // keep clicking "load more" / next page if available
  let attempts = 0;
  while (attempts < 20) {
    const clicked = await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button, a")]
        .find(el => /load more|show more|next|view more/i.test(el.textContent || ""));
      if (btn && btn.offsetParent !== null) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    await new Promise(r => setTimeout(r, 3000));
    await page.evaluate(async () => {
      for (let i = 0; i < 10; i++) { window.scrollBy(0, 600); await new Promise(r => setTimeout(r, 150)); }
    });
    attempts++;
  }

  const links = await page.evaluate((base) => {
    const seen = new Set();
    const results = [];
    document.querySelectorAll("a[href]").forEach(a => {
      const href = a.getAttribute("href") || "";
      const full = href.startsWith("http") ? href : base + href;
      // product pages typically have /rings/ and no .lp suffix or are individual items
      if (
        full.includes("aaronandson.com") &&
        (full.includes("/rings/") || full.includes("/ring/")) &&
        !full.includes("Shop-All") &&
        !full.includes("?") &&
        !seen.has(full)
      ) {
        // must have an image child (likely a product card)
        if (a.querySelector("img")) {
          seen.add(full);
          results.push(full);
        }
      }
    });
    return results;
  }, BASE);

  console.log(`Found ${links.length} product links`);
  return links;
}

// ─── scrape individual product page ───────────────────────────────────────────

async function scrapeProduct(page, url) {
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    const data = await page.evaluate(() => {
      const text = (sel) => document.querySelector(sel)?.textContent?.trim() || "";
      const attr = (sel, a) => document.querySelector(sel)?.getAttribute(a) || "";

      // name
      const name = text("h1") || text(".product-title") || text(".product-name") || "";

      // price
      const priceEl = document.querySelector(
        ".price, .product-price, [class*='price'], .amount, .sale-price"
      );
      const price = priceEl?.textContent?.trim() || "";

      // description
      const descEl = document.querySelector(
        ".product-description, .description, [class*='description'], .product-details p, .detail p, article p"
      );
      const description = descEl?.textContent?.trim() || "";

      // style number
      const styleEl = document.querySelector(
        "[class*='style'], [class*='sku'], [class*='item-number'], .item-no, .product-id"
      );
      let styleNumber = styleEl?.textContent?.trim() || "";
      // also try to find "Style #" in the page text
      const bodyText = document.body.innerText;
      const styleMatch = bodyText.match(/style[#\s:]+([A-Z0-9\-]+)/i);
      if (!styleNumber && styleMatch) styleNumber = styleMatch[1];
      const skuMatch = bodyText.match(/(?:sku|item)[#\s:]+([A-Z0-9\-]+)/i);
      if (!styleNumber && skuMatch) styleNumber = skuMatch[1];

      // images — find all product images
      const imgs = [...document.querySelectorAll("img")];
      const productImgs = imgs
        .map(img => img.src || img.dataset.src || "")
        .filter(src =>
          src &&
          !src.includes("logo") &&
          !src.includes("banner") &&
          !src.includes("icon") &&
          !src.includes("1x1") &&
          (src.includes("product") || src.includes("ring") || src.includes("item") || src.includes("design") || src.match(/\.(jpg|jpeg|png|webp)/i))
        );

      // white/yellow gold images — look for colour switcher thumbnails
      const thumbs = [...document.querySelectorAll("img[src*='white'], img[src*='yellow'], img[alt*='white'], img[alt*='yellow'], img[src*='-W'], img[src*='-Y']")]
        .map(img => ({ src: img.src, alt: img.alt }));

      // sub-category / shape / setting from page content
      const breadcrumb = [...document.querySelectorAll(".breadcrumb a, nav[aria-label='breadcrumb'] a, .breadcrumbs a")]
        .map(a => a.textContent?.trim())
        .filter(Boolean);

      // carat info
      const caratMatch = bodyText.match(/(\d+\.?\d*)\s*(?:to|-)\s*(\d+\.?\d*)\s*(?:ct|carat)/i);
      const caratSingle = bodyText.match(/(\d+\.?\d*)\s*(?:ct|carat)/i);

      return {
        name,
        price,
        description,
        styleNumber,
        productImgs: productImgs.slice(0, 10),
        thumbs,
        breadcrumb,
        caratMin: caratMatch ? caratMatch[1] : (caratSingle ? caratSingle[1] : ""),
        caratMax: caratMatch ? caratMatch[2] : "",
        pageUrl: window.location.href,
      };
    });

    data.url = url;
    return data;
  } catch (e) {
    console.log(`  Error on ${url}: ${e.message}`);
    return null;
  }
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Aaron & Son — Rings Scraper ===\n");

  // Load existing style numbers to skip duplicates
  let existingStyles = new Set();
  try {
    const existing = readFileSync(join(process.cwd(), "src/data/products.ts"), "utf8");
    const matches = existing.matchAll(/"styleNumber":\s*"([^"]+)"/g);
    for (const m of matches) existingStyles.add(m[1]);
    console.log(`Skipping ${existingStyles.size} already-known style numbers\n`);
  } catch {}

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  // Step 1: collect all product URLs
  const links = await collectLinks(page);

  // Step 2: scrape each product page
  const raw = [];
  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    process.stdout.write(`[${i + 1}/${links.length}] ${url.split("/").pop()} ... `);
    const data = await scrapeProduct(page, url);
    if (data) {
      raw.push(data);
      console.log(`✓ ${data.name.substring(0, 50)}`);
    } else {
      console.log("skip");
    }
    await new Promise(r => setTimeout(r, 500));
  }

  await browser.close();

  // Step 3: save raw data
  writeFileSync(join(OUTPUT_DIR, "rings.json"), JSON.stringify(raw, null, 2));
  console.log(`\nRaw data saved: ${raw.length} products`);

  // Step 4: download images and build Product objects
  const products = [];
  let idCounter = existingStyles.size + 1;

  for (const item of raw) {
    if (!item.name) continue;

    // detect style number from URL or page
    const urlSlug = item.url.split("/").pop()?.split("?")[0] || "";
    let styleNumber = item.styleNumber || urlSlug || `RING-${idCounter}`;
    styleNumber = styleNumber.replace(/^style[#:\s]+/i, "").trim();

    // skip if already in products.ts
    if (existingStyles.has(styleNumber)) {
      console.log(`  Skip (exists): ${styleNumber}`);
      continue;
    }

    // determine white/yellow image URLs
    let imgWhite = "";
    let imgYellow = "";

    // prefer thumb images that mention white/yellow
    for (const t of item.thumbs) {
      const lower = (t.src + t.alt).toLowerCase();
      if (!imgWhite && lower.includes("white")) imgWhite = t.src;
      if (!imgYellow && lower.includes("yellow")) imgYellow = t.src;
    }

    // fallback: first two product images
    if (!imgWhite && item.productImgs[0]) imgWhite = item.productImgs[0];
    if (!imgYellow && item.productImgs[1]) imgYellow = item.productImgs[1] || item.productImgs[0];

    // Download images
    const safeStyle = styleNumber.replace(/[^a-zA-Z0-9\-]/g, "");
    let localWhite = "";
    let localYellow = "";

    if (imgWhite) {
      const ext = (imgWhite.split(".").pop()?.split("?")[0] || "jpg").substring(0, 4);
      const fname = `${safeStyle}-white.${ext}`;
      const fpath = join(IMAGES_DIR, fname);
      const ok = await downloadImage(imgWhite, fpath);
      if (ok) localWhite = `/images/products/${fname}`;
    }

    if (imgYellow && imgYellow !== imgWhite) {
      const ext = (imgYellow.split(".").pop()?.split("?")[0] || "jpg").substring(0, 4);
      const fname = `${safeStyle}-yellow.${ext}`;
      const fpath = join(IMAGES_DIR, fname);
      const ok = await downloadImage(imgYellow, fpath);
      if (ok) localYellow = `/images/products/${fname}`;
    }

    // fallback yellow = white
    if (!localYellow) localYellow = localWhite;

    if (!localWhite) {
      console.log(`  No image for ${styleNumber}, skipping`);
      continue;
    }

    // derive sub-category from breadcrumb or URL
    const bc = item.breadcrumb.join(" ").toLowerCase();
    const urlLower = item.url.toLowerCase();
    let subCategory = "rings";
    if (bc.includes("engagement") || urlLower.includes("engagement")) subCategory = "diamond-engagement-rings";
    else if (bc.includes("wedding") || bc.includes("anniversary") || urlLower.includes("wedding")) subCategory = "diamond-wedding-rings";
    else if (bc.includes("solitaire") || urlLower.includes("solitaire")) subCategory = "diamond-solitaire-rings";
    else if (bc.includes("eternity") || urlLower.includes("eternity")) subCategory = "diamond-eternity-rings";
    else if (bc.includes("fashion") || urlLower.includes("fashion")) subCategory = "fashion-rings";

    // shape from name or description
    const text = (item.name + " " + item.description).toLowerCase();
    let shape = "Round";
    if (text.includes("emerald")) shape = "Emerald";
    else if (text.includes("princess")) shape = "Princess";
    else if (text.includes("oval")) shape = "Oval";
    else if (text.includes("cushion")) shape = "Cushion";
    else if (text.includes("pear")) shape = "Pear";
    else if (text.includes("marquise")) shape = "Marquise";
    else if (text.includes("radiant")) shape = "Radiant";
    else if (text.includes("asscher")) shape = "Asscher";
    else if (text.includes("heart")) shape = "Heart";

    // setting
    let setting = "Prong";
    if (text.includes("bezel")) setting = "Bezel";
    else if (text.includes("channel")) setting = "Channel";
    else if (text.includes("pavé") || text.includes("pave")) setting = "Pave";
    else if (text.includes("tension")) setting = "Tension";
    else if (text.includes("bar")) setting = "Bar";

    const product = {
      id: `AAS-${String(idCounter).padStart(3, "0")}`,
      slug: slugify(item.name),
      name: item.name,
      productName: item.name,
      description: item.description || item.name,
      styleNumber,
      price: parsePrice(item.price),
      category: "rings",
      subCategory,
      shape,
      setting,
      caratMin: parseCarat(item.caratMin),
      caratMax: parseCarat(item.caratMax) || parseCarat(item.caratMin),
      imageWhite: localWhite,
      imageYellow: localYellow,
      isNew: false,
      isBestSeller: false,
      rating: 5,
      discount: "",
    };

    products.push(product);
    console.log(`  ✓ [${product.id}] ${product.name.substring(0, 50)}`);
    idCounter++;
  }

  // Step 5: save products JSON
  writeFileSync(join(OUTPUT_DIR, "rings.json"), JSON.stringify(products, null, 2));
  console.log(`\n✅ ${products.length} new ring products saved to scripts/output/rings.json`);
  console.log(`\nNext step: run  node scripts/merge-rings.mjs  to add them to src/data/products.ts`);
}

main().catch(console.error);
