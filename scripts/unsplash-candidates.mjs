// Фото-кандидаты из Unsplash (разрешено владельцем). Ключ — ТОЛЬКО из .env
// (gitignored), в репозиторий не попадает. Использование:
//   node scripts/unsplash-candidates.mjs "khachapuri" [count]
//
// Unsplash License: бесплатно, в т.ч. коммерчески; по API Guidelines нужна
// атрибуция фотографу + Unsplash (кладём в coverCredit «Photo: Имя / Unsplash»)
// и trigger download endpoint при использовании (см. scripts/build-unsplash.mjs).
// Печатает реальные результаты API — id, автор, размеры, raw-url, download_location.

import { readFileSync } from 'node:fs';

function accessKey() {
  if (process.env.UNSPLASH_ACCESS_KEY) return process.env.UNSPLASH_ACCESS_KEY;
  try {
    const m = readFileSync('.env', 'utf8').match(/UNSPLASH_ACCESS_KEY\s*=\s*(\S+)/);
    if (m) return m[1].trim();
  } catch {
    /* нет .env */
  }
  return null;
}

const KEY = accessKey();
if (!KEY) {
  console.error('Нет UNSPLASH_ACCESS_KEY (положи в .env). Прерываю.');
  process.exit(1);
}
const [, , query, countArg] = process.argv;
if (!query) {
  console.error('Usage: node scripts/unsplash-candidates.mjs "query" [count]');
  process.exit(1);
}
const per = Math.min(Number(countArg) || 8, 30);
const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${per}&orientation=landscape&content_filter=high`;
const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' } });
if (!res.ok) {
  console.error(`HTTP ${res.status} ${res.statusText}`);
  process.exit(1);
}
const data = await res.json();
console.log(`\n=== Unsplash "${query}" — ${data.total} всего, показываю ${data.results.length} ===\n`);
for (const r of data.results) {
  console.log(
    `${r.width}x${r.height}  id:${r.id}  ${(r.alt_description || r.description || '').slice(0, 56)}\n` +
      `   author: ${r.user.name} (@${r.user.username})\n` +
      `   raw:    ${r.urls.raw}\n` +
      `   dl:     ${r.links.download_location}\n`,
  );
}
console.log('Атрибуция в coverCredit: «Photo: <Имя> / Unsplash». Перед публикацией — trigger download (build-unsplash.mjs).\n');
