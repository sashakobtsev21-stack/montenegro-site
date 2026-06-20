/**
 * Снапшот «живых» данных для шапки (§8.4, Фаза 6): погода (Подгорица/Будва/
 * Котор), температура моря у Будвы и курс евро к доллару/фунту/рублю/гривне.
 *
 * Это BUILD-TIME слой гибрида: при сборке тянем данные и зашиваем в HTML
 * (мгновенно видно, 0 CLS, работает без JS). Клиент потом обновляет свежими
 * значениями (/js/live-data.js). Любой сбой источника → null → в UI «—», сборка
 * не падает (try/catch + таймаут). Кэш на уровне модуля: один fetch на сборку,
 * даже если компонент рендерится на нескольких страницах (en/ru/uk).
 *
 * Источники (без ключей, CORS ok): open-meteo (погода/море), open.er-api.com
 * (курс евро, ECB-данные). Черногория использует евро (€), поэтому показываем
 * сколько евро стоит 1 $ / 1 £ / 100 ₽ / 10 ₴ — ориентир для приезжающих.
 * Цифры не выдумываем (CLAUDE правило 4): нет данных — поле пустое.
 */

export interface LiveSnapshot {
  air: { podgorica: number | null; budva: number | null; kotor: number | null };
  sea: number | null;
  /** Курс: сколько ЕВРО за единицу валюты (USD/GBP — за 1, RUB — за 100, UAH — за 10). */
  fx: { usd: number | null; gbp: number | null; rub: number | null; uah: number | null };
}

// Погода: Подгорица (42.4304,19.2594), Будва (42.2911,18.8401), Котор (42.4247,18.7712).
const AIR_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=42.4304,42.2911,42.4247&longitude=19.2594,18.8401,18.7712&current=temperature_2m';
// Море: Адриатика у Будвы.
const SEA_URL =
  'https://marine-api.open-meteo.com/v1/marine?latitude=42.28&longitude=18.83&current=sea_surface_temperature';
// Курс: евро-база (ECB-данные), без ключа.
const FX_URL = 'https://open.er-api.com/v6/latest/EUR';

async function jget(url: string, ms = 6000): Promise<unknown> {
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), ms);
    const res = await fetch(url, { signal: ctl.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const temp = (loc: unknown): number | null => {
  const c = (loc as { current?: { temperature_2m?: unknown } } | null)?.current?.temperature_2m;
  return typeof c === 'number' ? c : null;
};

let cached: Promise<LiveSnapshot> | null = null;

export function getLiveSnapshot(): Promise<LiveSnapshot> {
  if (!cached) cached = build();
  return cached;
}

async function build(): Promise<LiveSnapshot> {
  const [air, sea, fx] = await Promise.all([jget(AIR_URL), jget(SEA_URL), jget(FX_URL)]);

  const airArr = Array.isArray(air) ? air : [];
  const seaVal = (sea as { current?: { sea_surface_temperature?: unknown } } | null)?.current
    ?.sea_surface_temperature;

  // open.er-api.com: { rates: { USD, GBP, RUB, UAH, ... } } — единиц валюты за 1 €.
  // Нам нужно обратное: сколько € за единицу валюты (за 100 ₽ / 10 ₴ — кратно).
  const rates =
    (fx as { rates?: Record<string, number> } | null)?.rates &&
    typeof (fx as { rates?: Record<string, number> }).rates === 'object'
      ? (fx as { rates: Record<string, number> }).rates
      : {};
  const eurPer = (code: string, qty = 1): number | null => {
    const r = rates[code];
    return typeof r === 'number' && r > 0 ? qty / r : null;
  };

  return {
    air: { podgorica: temp(airArr[0]), budva: temp(airArr[1]), kotor: temp(airArr[2]) },
    sea: typeof seaVal === 'number' ? seaVal : null,
    fx: { usd: eurPer('USD'), gbp: eurPer('GBP'), rub: eurPer('RUB', 100), uah: eurPer('UAH', 10) },
  };
}
