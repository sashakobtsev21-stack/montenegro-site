/*
 * check-enums.mjs — синхронность дублированных списков значений (SPEC §11/§12).
 *
 * Зачем: набор слагов задаётся ДВАЖДЫ — enum в `src/content.config.ts` (валидация
 * frontmatter) и слаги в `src/i18n/types.ts` (лейблы/фильтры). Если они разойдутся,
 * TypeScript этого не поймает (разные модули), а фильтр/лейблы молча сломаются.
 * Этот тест сверяет пары один-в-один (состав И порядок — порядок = порядок опций
 * фильтра). Без зависимостей, как остальные scripts/*.
 *
 * Запуск: node scripts/check-enums.mjs  (exit 1 при расхождении).
 */
import { readFileSync } from 'node:fs';

const cfg = readFileSync('src/content.config.ts', 'utf8');
const types = readFileSync('src/i18n/types.ts', 'utf8');

/** Извлекает список слагов из `const NAME = [ '...', '...' ] (as const)`. */
function extract(src, name) {
  const m = src.match(new RegExp(`const ${name}\\s*=\\s*\\[([\\s\\S]*?)\\]`));
  if (!m) return null;
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

/** Пары: enum в content.config.ts ↔ слаги в i18n/types.ts. */
const PAIRS = [
  ['RAZVL_TYPES', 'RAZVL_TYPE_SLUGS'],
  ['SERVICE_RUBRICS', 'SERVICE_RUBRIC_SLUGS'],
  ['ATTRACTION_TYPES', 'ATTRACTION_TYPE_SLUGS'],
  ['REGIONS', 'REGION_SLUGS'],
  ['CUISINE_KEYS', 'CUISINE_KEY_SLUGS'],
];

const errors = [];
for (const [cfgName, i18nName] of PAIRS) {
  const a = extract(cfg, cfgName);
  const b = extract(types, i18nName);
  if (!a) {
    errors.push(`content.config.ts: не найден массив ${cfgName}`);
    continue;
  }
  if (!b) {
    errors.push(`i18n/types.ts: не найден массив ${i18nName}`);
    continue;
  }
  if (a.join('|') !== b.join('|')) {
    errors.push(
      `${cfgName} ≠ ${i18nName} (состав/порядок):\n      config: [${a.join(', ')}]\n      i18n:   [${b.join(', ')}]`,
    );
  }
}

if (errors.length) {
  console.error(`[check-enums] НАРУШЕНИЯ (${errors.length}):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`[check-enums] OK — ${PAIRS.length} пар enum↔слаги синхронны (content.config ↔ i18n).`);
