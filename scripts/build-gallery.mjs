// Dev-хелпер раскатки: качает изображения с Wikimedia и кладёт webp ≤200 КБ.
// Использование: node scripts/build-gallery.mjs <manifest.json>
// manifest: [{ url, out, width?, cover?, w?, h? }]
//   url    — прямой URL картинки (thumb 1280 с Commons подходит)
//   out    — путь назначения, напр. public/images/narikala/g1.webp
//   width  — целевая ширина для галереи (по умолч. 1280; панорамы 1600)
//   cover  — true → кроп обложки fit:cover в w×h (по умолч. 1280×718)
// Каждый webp ужимается циклом качества до ≤200 КБ (CLAUDE §15).
// На сайт не попадает — только инструмент конвейера (PROGRESS §11).

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import sharp from 'sharp';

const UA = 'GeorgiaGuidebook/1.0 (sashakobtsev21@gmail.com)';
const MAX_BYTES = 200 * 1024;
const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error('Usage: node scripts/build-gallery.mjs <manifest.json>');
  process.exit(1);
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchBuffer(url) {
  // Вежливо к Wikimedia: ретрай с backoff на 429/5xx.
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    if (res.status === 429 || res.status >= 500) {
      await sleep(1500 * (attempt + 1));
      continue;
    }
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  throw new Error(`HTTP 429 (giving up after retries) for ${url}`);
}

async function encodeWebp(input, item) {
  if (item.cover) {
    // Обложка: кроп 16:9; сначала качество вниз, затем размер вниз (сохраняя 16:9).
    const cw = item.w ?? 1280;
    const ch = item.h ?? 718;
    for (const [w, h] of [[cw, ch], [1120, 630], [1000, 562]]) {
      for (const q of [74, 68, 62, 56, 50, 46]) {
        const out = await sharp(input, { failOn: 'none' })
          .rotate()
          .resize(w, h, { fit: 'cover', position: 'attention' })
          .webp({ quality: q })
          .toBuffer();
        if (out.length <= MAX_BYTES) return { out, q, w };
        if (w === 1000 && q === 46) return { out, q, w };
      }
    }
  }
  // Галерея: сначала ширина 1280 на падающем качестве, затем уже ширина вниз.
  const baseW = item.width ?? 1280;
  for (const w of [baseW, 1120, 1000, 880]) {
    for (const q of [74, 68, 62, 56, 50]) {
      const out = await sharp(input, { failOn: 'none' })
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: q })
        .toBuffer();
      if (out.length <= MAX_BYTES) return { out, q, w };
      if (w === 880 && q === 50) return { out, q, w };
    }
  }
}

let ok = 0;
for (const item of manifest) {
  try {
    await sleep(350); // межзапросная пауза — не упираться в rate-limit Wikimedia
    const buf = await fetchBuffer(item.url);
    const { out, q, w } = await encodeWebp(buf, item);
    const h = (await sharp(out).metadata()).height;
    await mkdir(dirname(item.out), { recursive: true });
    await writeFile(item.out, out);
    const kb = (out.length / 1024).toFixed(0);
    const warn = out.length > MAX_BYTES ? '  !! >200KB' : '';
    console.log(`OK  ${item.out}  ${w}x${h}  ${kb}KB  q${q}${item.cover ? '  [cover]' : ''}${warn}`);
    ok++;
  } catch (e) {
    console.log(`ERR ${item.out}  ${e.message}`);
  }
}
console.log(`\n${ok}/${manifest.length} done`);
