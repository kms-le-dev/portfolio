// scripts/convert-images.js
// Usage: node scripts/convert-images.js
// This script scans src/assets for png/jpg/jpeg files and generates resized WebP and PNG
// variants plus a manifest JSON at src/assets/optimized/manifest.json

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

const srcDir = path.join(__dirname, '..', 'src', 'assets');
const outDir = path.join(srcDir, 'optimized');
const sizes = [320, 640, 1024, 1600];

async function ensureOut() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
}

function basenameNoExt(file) {
  return path.basename(file, path.extname(file));
}

async function processFile(file) {
  const base = basenameNoExt(file);
  const input = path.join(srcDir, file);

  const entry = {
    webp: [],
    png: [],
    default: null
  };

  for (const w of sizes) {
    const webpName = `${base}-${w}.webp`;
    const pngName = `${base}-${w}.png`;

    const webpPath = path.join(outDir, webpName);
    const pngPath = path.join(outDir, pngName);

    await sharp(input).resize({ width: w }).webp({ quality: 80 }).toFile(webpPath);
    await sharp(input).resize({ width: w }).png({ quality: 80, compressionLevel: 8 }).toFile(pngPath);

    entry.webp.push({ file: webpName, width: w });
    entry.png.push({ file: pngName, width: w });
  }

  // also create an original-size webp fallback
  const originalWebp = `${base}-orig.webp`;
  await sharp(input).webp({ quality: 80 }).toFile(path.join(outDir, originalWebp));
  entry.webp.push({ file: originalWebp, width: Math.max(...sizes) });

  // choose default fallback (png at 640 if exists)
  entry.default = entry.png.find(it => it.width === 640)?.file || entry.png[entry.png.length - 1].file;

  return { base, entry };
}

async function main(){
  await ensureOut();

  const files = glob.sync('*.{png,jpg,jpeg}', { cwd: srcDir, nocase: true });

  const manifest = {};

  for (const f of files) {
    console.log('Processing', f);
    const { base, entry } = await processFile(f);
    manifest[base] = entry;
  }

  const manifestPath = path.join(outDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Wrote manifest to', manifestPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});