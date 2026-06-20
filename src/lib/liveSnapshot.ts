/**
 * Снапшот «живых» данных для главной (§8.4, Фаза 6): погода (Тбилиси/Кутаиси/
 * Батуми), температура моря в Батуми и курсы лари (USD/EUR/RUB/UAH).
 *
 * Это BUILD-TIME слой гибрида: при сборке тянем данные и зашиваем в HTML
 * (мгновенно видно, 0 CLS, работает без JS). Клиент потом обновляет свежими
 * значениями (/js/live-data.js). Любой сбой источника → null → в UI «—», сборка
 * не падает (try/catch + таймаут). Кэш на уровне модуля: один fetch на сборку,
 * даже если компонент рендерится на нескольких страницах (ru/uk).
 *
 * Источники (без ключей, CORS ok): open-meteo (погода/море), nbg.gov.ge (курс).
 * Цифры не выдумываем (CLAUDE правило 4): нет данных — поле пустое.
 */

export interface LiveSnapshot {
  air: { tbilisi: number | null; kutaisi: number | null; batumi: number | null };
  sea: number | null;
  /** Курс: лари за `quantity` единиц валюты (USD/EUR — за 1, RUB — за 100, UAH — за 10). */
  fx: { usd: number | null; eur: number | null; rub: number | null; uah: number | null };
}

const AIR_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=41.6938,42.2679,41.6168&longitude=44.8015,42.6946,41.6367&current=temperature_2m';
const SEA_URL =
  'https://marine-api.open-meteo.com/v1/marine?latitude=41.645&longitude=41.63&current=sea_surface_temperature';
const FX_URL = 'https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/';

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

  const fxArr =
    Array.isArray(fx) && (fx[0] as { currencies?: unknown[] })?.currencies
      ? ((fx[0] as { currencies: { code: string; rate: number }[] }).currencies ?? [])
      : [];
  const per = (code: string): number | null => {
    const c = fxArr.find((x) => x.code === code);
    return c && typeof c.rate === 'number' ? c.rate : null;
  };

  return {
    air: { tbilisi: temp(airArr[0]), kutaisi: temp(airArr[1]), batumi: temp(airArr[2]) },
    sea: typeof seaVal === 'number' ? seaVal : null,
    fx: { usd: per('USD'), eur: per('EUR'), rub: per('RUB'), uah: per('UAH') },
  };
}
