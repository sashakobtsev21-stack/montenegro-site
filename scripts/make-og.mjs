/**
 * make-og.mjs — генерирует дефолтную OG-картинку public/og-default.jpg
 * (1200×630, формат для соцсетей) из hero-изображения с бренд-текстом. Запуск:
 *   node scripts/make-og.mjs
 * Перезапускать при смене hero. Per-page OG берёт обложку статьи (BaseLayout).
 */
import sharp from 'sharp';

const SRC = 'src/assets/hero/kotor-bay.jpg';
const OUT = 'public/og-default.jpg';
const TITLE = 'Montenegro Guidebook';
const SUBTITLE = 'A vetted travel guide to Montenegro';

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const overlay = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#08131f" stop-opacity="0.08"/>
      <stop offset="48%" stop-color="#08131f" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#08131f" stop-opacity="0.82"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <text x="66" y="505" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800">${escapeXml(TITLE)}</text>
  <text x="70" y="558" fill="#e8eef4" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="500">${escapeXml(SUBTITLE)}</text>
</svg>`);

await sharp(SRC)
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .modulate({ brightness: 0.9, saturation: 1.08 })
  .composite([{ input: overlay, left: 0, top: 0 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

console.log(`og: ${OUT} written from ${SRC}`);
