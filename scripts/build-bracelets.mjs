/**
 * Converts raw bracelet API data → Product objects, downloads images, merges into products.ts
 * Run: node scripts/build-bracelets.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import https from "https";
import http from "http";

const RAW_FILE    = join(process.cwd(), "scripts/output/api-bracelets-raw.json");
const PRODUCTS_TS = join(process.cwd(), "src/data/products.ts");
const IMAGES_DIR  = join(process.cwd(), "public/images/products");

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
      res.on("data", c => chunks.push(c));
      res.on("end", () => { writeFileSync(filepath, Buffer.concat(chunks)); resolve(true); });
      res.on("error", () => resolve(false));
    });
    req.on("error", () => resolve(false));
    req.setTimeout(20000, () => { req.destroy(); resolve(false); });
  });
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const raw = JSON.parse(readFileSync(RAW_FILE, "utf8"));

// Deduplicate by StyleNumber
const seen = new Map();
for (const p of raw) {
  const style = (p.StyleNumber || "").trim();
  if (style && !seen.has(style)) seen.set(style, p);
}
const unique = [...seen.values()];
console.log(`Unique bracelet products from API: ${unique.length}`);

// Load existing style numbers
const currentTS = readFileSync(PRODUCTS_TS, "utf8");
const existing = new Set([...currentTS.matchAll(/"styleNumber":\s*"([^"]+)"/g)].map(m => m[1]));
console.log(`Already in products.ts: ${existing.size} — skipping these\n`);

// Find highest existing ID
const idMatches = [...currentTS.matchAll(/"id":\s*"AAS-(\d+)"/g)];
let idCounter = idMatches.length ? Math.max(...idMatches.map(m => parseInt(m[1]))) + 1 : 1;

const newProducts = [];

for (const p of unique) {
  const style = (p.StyleNumber || "").trim();
  if (existing.has(style)) continue;

  const imgWhiteUrl = (p.MWImage || p.HDImageName || "").trim();
  const imgYellowUrl = (p.MYImage || "").trim();

  if (!imgWhiteUrl) { console.log(`  Skip (no image): ${style}`); continue; }

  const safe = style.replace(/[^a-zA-Z0-9\-]/g, "") || `bracelet-${idCounter}`;

  const whiteExt = (imgWhiteUrl.split(".").pop()?.split("?")[0] || "jpg").substring(0, 4);
  const whiteFile = `${safe}-white.${whiteExt}`;
  const whiteOk = await downloadImage(imgWhiteUrl, join(IMAGES_DIR, whiteFile));

  let yellowFile = whiteFile;
  if (imgYellowUrl && imgYellowUrl !== imgWhiteUrl) {
    const yellowExt = (imgYellowUrl.split(".").pop()?.split("?")[0] || "jpg").substring(0, 4);
    yellowFile = `${safe}-yellow.${yellowExt}`;
    await downloadImage(imgYellowUrl, join(IMAGES_DIR, yellowFile));
  }

  if (!whiteOk) { console.log(`  Skip (download failed): ${style}`); continue; }

  const subCat = (p.SubCatName || "bracelets").trim();

  const product = {
    id: `AAS-${String(idCounter).padStart(3, "0")}`,
    slug: slugify(p.AffTitle || p.ProductName || style),
    name: (p.AffTitle || p.ProductName || "").trim(),
    productName: (p.ProductName || p.AffTitle || "").trim(),
    description: (p.Description || "").trim(),
    styleNumber: style,
    price: typeof p.RetailPrice === "number" ? p.RetailPrice : (parseFloat(p.startingprice) || null),
    category: "bracelets",
    subCategory: subCat,
    shape: (p.Shape || "Round").trim(),
    setting: (p.StoneSettingName || "Prong").trim(),
    caratMin: typeof p.CaratMinW === "number" ? p.CaratMinW : null,
    caratMax: typeof p.Maximum === "number" ? p.Maximum : null,
    imageWhite: `/images/products/${whiteFile}`,
    imageYellow: `/images/products/${yellowFile}`,
    isNew: p.NewArival === true || p.NewArival_Status === true,
    isBestSeller: p.BestSellingProduct === true,
    rating: typeof p.ProductsRating === "number" ? p.ProductsRating : 5,
    discount: p.Discount_Percent ? String(p.Discount_Percent) : "",
  };

  newProducts.push(product);
  process.stdout.write(`  ✓ [${product.id}] ${product.name.substring(0, 55)}\n`);
  idCounter++;
}

writeFileSync(join(process.cwd(), "scripts/output/bracelets-final.json"), JSON.stringify(newProducts, null, 2));
console.log(`\n✅ ${newProducts.length} new bracelet products ready`);

if (newProducts.length === 0) { console.log("Nothing new to merge."); process.exit(0); }

const insertPoint = currentTS.lastIndexOf("];");
if (insertPoint === -1) { console.error("Could not find ]; in products.ts"); process.exit(1); }

const newEntries = newProducts
  .map(p => "  " + JSON.stringify(p, null, 2).split("\n").join("\n  "))
  .join(",\n");

const updated = currentTS.slice(0, insertPoint) + ",\n" + newEntries + "\n" + currentTS.slice(insertPoint);
writeFileSync(PRODUCTS_TS, updated);
console.log(`✅ Merged ${newProducts.length} bracelets into src/data/products.ts`);
