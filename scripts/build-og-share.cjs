/**
 * Builds public/assets/og-share.jpg (1200×630) with the MCR logo centered on brand blue.
 * Run: node scripts/build-og-share.cjs
 * Requires: jimp (devDependency)
 */
const path = require('path');
const Jimp = require('jimp');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'assets', 'og-share.jpg');
const LOGO = path.join(ROOT, 'public', 'assets', 'logo-whitebg.png');

const W = 1200;
const H = 630;
const BRAND = '#2867AE';

async function main() {
  const logo = await Jimp.read(LOGO);
  logo.scaleToFit(480, 160);

  const canvas = new Jimp(W, H, BRAND);
  const x = Math.round((W - logo.bitmap.width) / 2);
  const y = Math.round((H - logo.bitmap.height) / 2);
  canvas.composite(logo, x, y);

  await canvas.quality(88).writeAsync(OUT);
  console.log('Wrote', OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
