// Фото-кандидаты из Openverse (агрегатор CC/PD: Flickr CC, Wikimedia и др.).
// Расширяет конвейер за пределы Wikimedia Commons — для жанровых иллюстраций
// (блюда/кухня), которых на Commons мало, а на Flickr CC много.
// Использование: node scripts/openverse-candidates.mjs "khachapuri" [limit]
//
// Фильтр лицензий: только КОММЕРЧЕСКИ разрешённые (cc0, by, by-sa, pdm) — сайт
// коммерческий (партнёрки), by-nc/nd нельзя. Атрибуция (автор+лицензия+источник)
// ОБЯЗАТЕЛЬНА в coverCredit (§18). Печатает реальные результаты API — без галлюцинаций.

const UA = 'GeorgiaGuidebook/1.0 (sashakobtsev21@gmail.com)';
const [, , query, limitArg] = process.argv;
if (!query) {
  console.error('Usage: node scripts/openverse-candidates.mjs "query" [limit]');
  process.exit(1);
}
const limit = Number(limitArg) || 20;
const url =
  'https://api.openverse.org/v1/images/?q=' +
  encodeURIComponent(query) +
  '&license=cc0,by,by-sa,pdm&page_size=' +
  Math.min(limit, 40) +
  '&mature=false';

const res = await fetch(url, { headers: { 'User-Agent': UA } });
if (!res.ok) {
  console.error(`HTTP ${res.status} for Openverse`);
  process.exit(1);
}
const data = await res.json();
const rows = data.results || [];
console.log(`\n=== Openverse "${query}" — ${data.result_count} всего, показываю ${rows.length} ===\n`);
for (const r of rows) {
  const lic = `${(r.license || '').toUpperCase()} ${r.license_version || ''}`.trim();
  console.log(
    `[${lic}] ${r.width || '?'}x${r.height || '?'}  ${(r.title || '').slice(0, 56)}\n` +
      `   author: ${r.creator || '—'}  | source: ${r.source}\n` +
      `   full:  ${r.url}\n` +
      `   page:  ${r.foreign_landing_url}\n`,
  );
}
console.log(`Лицензии — только cc0/by/by-sa/pdm (коммерч. ок). Атрибуция обязательна в coverCredit.\n`);
