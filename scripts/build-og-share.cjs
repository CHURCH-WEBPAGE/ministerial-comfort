/**
 * Builds public/assets/og-share.jpg (1200×630) for WhatsApp / Open Graph:
 * large logo on a white panel (readable at small crop sizes) + white title/tagline on brand blue.
 * Run: npm run build:og-share
 */
const path = require('path');
const Jimp = require('jimp');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'assets', 'og-share.jpg');
const LOGO = path.join(ROOT, 'public', 'assets', 'logo-whitebg.png');

const W = 1200;
const H = 630;
const BRAND = '#2867AE';

const TITLE = 'Ministerial Comfort and Renewal (MCR)';
const TAG =
  'Restoring hope and renewal for ministers through support, counseling, and resources (Foursquare Gospel Church Nigeria).';

async function main() {
  const canvas = new Jimp(W, H, BRAND);

  const panelW = 1060;
  const panelH = 360;
  const panelX = Math.round((W - panelW) / 2);
  const panelY = 28;
  const panel = new Jimp(panelW, panelH, 0xffffffff);
  canvas.composite(panel, panelX, panelY);

  const logo = await Jimp.read(LOGO);
  logo.scaleToFit(Math.round(panelW * 0.92), Math.round(panelH * 0.78));
  const lx = panelX + Math.round((panelW - logo.bitmap.width) / 2);
  const ly = panelY + Math.round((panelH - logo.bitmap.height) / 2);
  canvas.composite(logo, lx, ly);

  const fontTitle = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const fontTag = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);

  const textPad = 48;
  const textW = W - textPad * 2;
  const textTop = panelY + panelH + 12;

  canvas.print(
    fontTitle,
    textPad,
    textTop,
    {
      text: TITLE,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_TOP,
    },
    textW,
    96
  );

  const titleBlockH = Jimp.measureTextHeight(fontTitle, TITLE, textW);
  canvas.print(
    fontTag,
    textPad,
    textTop + titleBlockH + 6,
    {
      text: TAG,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_TOP,
    },
    textW,
    110
  );

  await canvas.quality(90).writeAsync(OUT);
  console.log('Wrote', OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
