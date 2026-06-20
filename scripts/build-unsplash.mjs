// Сборка обложек из Unsplash: trigger download (ОБЯЗАТЕЛЬНО по API Guidelines) →
// скачать → sharp → webp ≤200КБ. Ключ только из .env (gitignored).
// manifest: [{ id, raw, dl, out, cover?, width? }]
//   id  — фото Unsplash (для лога)
//   raw — urls.raw (добавим параметры размера/качества)
//   dl  — links.download_location (триггерим обязательно)
//   out — public/images/<slug>.webp ; cover:true → 16:9
// Использование: node scripts/build-unsplash.mjs <manifest.json>

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import sharp from 'sharp';

function accessKey() {
  if (process.env.UNSPLASH_ACCESS_KEY) return process.env.UNSPLASH_ACCESS_KEY;
  const m = readFileSync('.env', 'utf8').match(/UNSPLASH_ACCESS_KEY\s*=\s*(\S+)/);
  return m ? m[1].trim() : null;
}
const KEY = accessKey();
if (!KEY) { console.error('Нет UNSPLASH_ACCESS_KEY в .env'); process.exit(1); }
const UA = 'GeorgiaGuidebook/1.0';
const MAX = 200 * 1024;
const manifest = JSON.parse(await readFile(process.argv[2], 'utf8'));

async function encodeCover(input) {
  for (const [w, h] of [[1280, 718], [1120, 630], [1000, 562]]) {
    for (const q of [74, 68, 62, 56, 50]) {
      const out = await sharp(input, { failOn: 'none' }).rotate()
        .resize(w, h, { fit: 'cover', position: 'attention' }).webp({ quality: q }).toBuffer();
      if (out.length <= MAX) return { out, w, q };
      if (w === 1000 && q === 50) return { out, w, q };
    }
  }
}

for (const it of manifest) {
  // 1) trigger download (Unsplash API Guidelines) — обязательно при использовании
  try {
    await fetch(it.dl, { headers: { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' } });
  } catch (e) { console.log('  ! trigger download не удался:', e.message); }
  // 2) скачать кадр (ограничим ширину/качество на стороне Unsplash CDN)
  const u = it.raw + (it.raw.includes('?') ? '&' : '?') + 'w=1600&q=80&fm=jpg&fit=max';
  const r = await fetch(u, { headers: { 'User-Agent': UA } });
  if (!r.ok) { console.log('✗ HTTP', r.status, it.out); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  const { out, w, q } = await encodeCover(buf);
  await mkdir(dirname(it.out), { recursive: true });
  await writeFile(it.out, out);
  console.log(`OK  ${it.out}  ${(out.length / 1024) | 0}KB  q${q} w${w}  (unsplash:${it.id})`);
}
console.log('\nГотово. Атрибуция в coverCredit: «Photo: <Имя> / Unsplash».');
