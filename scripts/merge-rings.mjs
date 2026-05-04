/**
 * Merges scraped rings into src/data/products.ts
 * Run AFTER scrape-rings.mjs:  node scripts/merge-rings.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PRODUCTS_FILE = join(process.cwd(), "src/data/products.ts");
const RINGS_FILE = join(process.cwd(), "scripts/output/rings.json");

const newProducts = JSON.parse(readFileSync(RINGS_FILE, "utf8"));

if (!newProducts.length) {
  console.log("No new products to merge.");
  process.exit(0);
}

// Read current products.ts and find the closing ];
const current = readFileSync(PRODUCTS_FILE, "utf8");
const insertPoint = current.lastIndexOf("];");

if (insertPoint === -1) {
  console.error("Could not find ]; in products.ts");
  process.exit(1);
}

// Build the new entries as JSON (no trailing comma issues — insert before closing bracket)
const newEntries = newProducts
  .map((p) => "  " + JSON.stringify(p, null, 2).split("\n").join("\n  "))
  .join(",\n");

const updated =
  current.slice(0, insertPoint) +
  ",\n" +
  newEntries +
  "\n" +
  current.slice(insertPoint);

writeFileSync(PRODUCTS_FILE, updated);
console.log(`✅ Merged ${newProducts.length} ring products into src/data/products.ts`);
