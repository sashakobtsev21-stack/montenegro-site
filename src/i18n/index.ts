/**
 * Точка входа i18n (SPEC §12). Язык определяется путём (`/uk/...` → uk,
 * иначе ru), без автодетекта и редиректов по гео/Accept-Language.
 */
import { ru } from './ru';
import { uk } from './uk';
import { en } from './en';
import {
  LANGS,
  DEFAULT_LANG,
  ATTRACTION_TYPE_SLUGS,
  REGION_SLUGS,
  RAZVL_TYPE_SLUGS,
  SERVICE_RUBRIC_SLUGS,
  CUISINE_KEY_SLUGS,
  EDA_CITY_KEYS,
  type Lang,
  type SectionKey,
  type UIDictionary,
  type HubSectionKey,
  type HubSectionContent,
  type AttractionTypeSlug,
  type RegionSlug,
  type RazvlTypeSlug,
  type ServiceRubricSlug,
  type CuisineKeySlug,
  type EdaCityKey,
} from './types';

export {
  DEFAULT_LANG,
  ATTRACTION_TYPE_SLUGS,
  REGION_SLUGS,
  RAZVL_TYPE_SLUGS,
  SERVICE_RUBRIC_SLUGS,
  CUISINE_KEY_SLUGS,
  EDA_CITY_KEYS,
  type Lang,
  type SectionKey,
  type UIDictionary,
  type HubSectionKey,
  type HubSectionContent,
  type AttractionTypeSlug,
  type RegionSlug,
  type RazvlTypeSlug,
  type ServiceRubricSlug,
  type CuisineKeySlug,
  type EdaCityKey,
};

/**
 * Per-city страницы «Где поесть» (§8.6): ключ → URL-слаг страницы (`/eda/{slug}/`)
 * + слаг города для ссылки на путеводитель `/goroda/{citySlug}/`. Локализованный
 * контент — в словарях (`eda.cityPages.items[key]`). Порядок = порядок ссылок
 * на хабе /eda/ и в getStaticPaths шаблона CityFoodPage.
 */
export const EDA_CITY_PAGES = [
  { key: 'tbilisi', slug: 'gde-poest-tbilisi', citySlug: 'tbilisi' },
  { key: 'batumi', slug: 'gde-poest-batumi', citySlug: 'batumi' },
  { key: 'kutaisi', slug: 'gde-poest-kutaisi', citySlug: 'kutaisi' },
] as const satisfies ReadonlyArray<{ key: EdaCityKey; slug: string; citySlug: string }>;

const dictionaries: Record<Lang, UIDictionary> = { ru, uk, en };

/** Словарь UI-строк для языка. */
export function t(lang: Lang): UIDictionary {
  return dictionaries[lang];
}

/**
 * Сопоставление контентных хабов с партнёрами Trip.com (§16, §8.3).
 * Ключи совпадают с ключами в partners.json — менять только синхронно с §16.
 * Используется в HubPage для условного рендера AffiliateBox.
 */
export const HUB_AFFILIATE_PARTNER: Partial<Record<HubSectionKey, string>> = {
  'arenda-avto': 'trip-carhire',
  transport: 'aviasales',
  goroda: 'trip-hotels',
  razvlecheniya: 'trip-tours',
};

/** Список разделов IA в порядке навигации (§7), кроме `home` и `o-sajte`. */
export const SECTION_KEYS: SectionKey[] = [
  'dostoprimechatelnosti',
  'goroda',
  'eda',
  'razvlecheniya',
  'marshruty',
  'planirovanie',
  'transport',
  'arenda-avto',
  'strahovka',
  'novosti',
  'relokatsiya',
];

/** 5 главных плиток входа на главной (§8.4): + «Развлечения» (решение владельца 2026-06-16). */
export const PRIMARY_TILE_KEYS = ['dostoprimechatelnosti', 'goroda', 'eda', 'razvlecheniya', 'marshruty'] as const;

/** Все разделы для футера и блока «Все разделы» на главной (§8.4): хабы + «О проекте» + «Обратная связь». */
export const ALL_SECTION_KEYS: SectionKey[] = [...SECTION_KEYS, 'o-sajte', 'kontakty'];

/**
 * Простая подстановка плейсхолдеров вида `{name}` в строку словаря.
 * Используется для дат («Проверено · {date}») и имён языка.
 */
export function format(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}

/**
 * Префикс пути для языка: ru — корень, uk — `/uk`.
 * Финальный слэш добавляется на уровне URL (trailingSlash: 'always').
 */
export function langPrefix(lang: Lang): string {
  return lang === DEFAULT_LANG ? '' : `/${lang}`;
}

/**
 * Зеркальный путь текущей страницы на другом языке (§12): снимает любой
 * языковой префикс с пути и ставит префикс целевого языка. Используется для
 * взаимных hreflang (BaseLayout) и переключателя языка (LangSwitcher).
 */
export function mirrorPath(currentPath: string, targetLang: Lang): string {
  let base = currentPath;
  for (const l of LANGS) {
    if (l === DEFAULT_LANG) continue;
    const pre = `/${l}`;
    if (currentPath === `${pre}/`) {
      base = '/';
      break;
    }
    if (currentPath.startsWith(`${pre}/`)) {
      base = currentPath.slice(pre.length);
      break;
    }
  }
  return targetLang === DEFAULT_LANG
    ? base
    : base === '/'
      ? `/${targetLang}/`
      : `/${targetLang}${base}`;
}

/**
 * URL раздела для языка. `home` → корень версии.
 * Всегда с завершающим слэшем (§7).
 */
export function sectionHref(lang: Lang, section: SectionKey): string {
  const prefix = langPrefix(lang);
  if (section === 'home') return `${prefix}/`;
  return `${prefix}/${section}/`;
}

/**
 * URL статьи: `/{category}/{slug}/` (ru) или `/{lang}/{category}/{slug}/` (uk).
 * Всегда с завершающим слэшем (§7). Используется в карточках, хабах,
 * перелинковке и getStaticPaths шаблона статьи.
 */
export function articleHref(lang: Lang, category: string, slug: string): string {
  return `${langPrefix(lang)}/${category}/${slug}/`;
}

/**
 * Слаги месяцев в порядке года — совпадают с enum MONTHS в content.config.ts
 * (поле `bestSeason` маршрутов, §11). Индекс в массиве = номер месяца (0–11),
 * по нему берётся локализованное название из словаря (`route.months`).
 */
export const MONTH_SLUGS = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentyabr',
  'oktyabr',
  'noyabr',
  'dekabr',
] as const;

/** Локализованное название месяца по его слугу (§11 bestSeason → §12 словарь). */
export function monthName(lang: Lang, slug: string): string {
  const idx = MONTH_SLUGS.indexOf(slug as (typeof MONTH_SLUGS)[number]);
  const names = t(lang).route.months;
  return idx >= 0 ? names[idx] : slug;
}

/**
 * Локализованный лейбл типа достопримечательности по слугу (§8.3 →
 * `attractionType` в content.config.ts → словарь). Неизвестный слуг
 * возвращается как есть (страховка, обычно не наступает — enum в схеме).
 */
export function attractionTypeLabel(lang: Lang, slug: string): string {
  const labels = t(lang).attractionTypes;
  return (labels as Record<string, string>)[slug] ?? slug;
}

/** Локализованный лейбл региона (мхаре) по слугу (§7 → `region` → словарь). */
export function regionLabel(lang: Lang, slug: string): string {
  const labels = t(lang).regions;
  return (labels as Record<string, string>)[slug] ?? slug;
}

/** Локализованный лейбл подкатегории «Развлечений» по слугу (§7 → `razvlType`). */
export function razvlTypeLabel(lang: Lang, slug: string): string {
  const labels = t(lang).razvlTypes;
  return (labels as Record<string, string>)[slug] ?? slug;
}

/** Локализованный лейбл рубрики услуги по слугу (§7 → `services.rubric`). */
export function serviceRubricLabel(lang: Lang, slug: string): string {
  const labels = t(lang).serviceRubrics;
  return (labels as Record<string, string>)[slug] ?? slug;
}

/** BCP-47 локаль для Intl по языку версии (§12). */
const LOCALE: Record<Lang, string> = { ru: 'ru-RU', uk: 'uk-UA', en: 'en-US' };

/**
 * Видимая дата для бейджей «Проверено · {дата}» (§9). Дата приходит из
 * frontmatter (Date), форматируется по локали версии. UTC-таймзона, чтобы
 * день не «съезжал» между сборками в разных окружениях.
 */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
