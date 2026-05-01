import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const INPUT_DIR = new URL("../public/images/products", import.meta.url).pathname;
const QUALITY = 75;
const MAX_WIDTH = 800;

const files = await readdir(INPUT_DIR);
const jpgs = files.filter((f) => /\.(jpg|jpeg)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

console.log(`Compressing ${jpgs.length} images...\n`);

for (const file of jpgs) {
  const filePath = join(INPUT_DIR, file);
  const { size: before } = await stat(filePath);
  totalBefore += before;

  const buffer = await sharp(filePath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
    .toBuffer();

  totalAfter += buffer.length;

  if (buffer.length < before) {
    await sharp(buffer).toFile(filePath);
    count++;
  }
}

const saved = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
console.log(`Done!`);
console.log(`  Compressed: ${count}/${jpgs.length} images`);
console.log(`  Before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
console.log(`  After:  ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
console.log(`  Saved:  ${saved}%`);
