/**
 * live-data.js — клиентский слой блока «Сейчас в Грузии» (§8.4, Фаза 6).
 *
 * Дотягивает свежие погоду/море/курс поверх build-time снапшота. Принципы:
 *  - один fetch на загрузку (НЕ polling, §15/правило 8 — без фоновых таймеров);
 *  - кэш в localStorage на 30 мин → повторный заход не дёргает сеть;
 *  - любой сбой источника → значение не трогаем, остаётся снапшот из HTML;
 *  - источники те же, что в build (src/lib/liveSnapshot.ts) — держать синхронно.
 */
(() => {
  'use strict';
  const root = document.querySelector('[data-live]');
  if (!root) return;

  const AIR_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=41.6938,42.2679,41.6168&longitude=44.8015,42.6946,41.6367&current=temperature_2m';
  const SEA_URL =
    'https://marine-api.open-meteo.com/v1/marine?latitude=41.645&longitude=41.63&current=sea_surface_temperature';
  const FX_URL = 'https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/';
  const CACHE_KEY = 'gg-live-v1';
  const TTL = 30 * 60 * 1000; // 30 минут

  const set = (key, val) => {
    if (val == null) return; // нет свежего значения → оставляем снапшот
    const el = root.querySelector('[data-live="' + key + '"]');
    if (el) el.textContent = val;
  };
  const fmtT = (n) => (typeof n === 'number' ? Math.round(n) + '°' : null);
  const fmtFx = (n) => (typeof n === 'number' ? n.toFixed(2) + ' ₾' : null);

  function render(d) {
    if (!d) return;
    set('air-tbilisi', fmtT(d.air && d.air.tbilisi));
    set('air-kutaisi', fmtT(d.air && d.air.kutaisi));
    set('air-batumi', fmtT(d.air && d.air.batumi));
    set('sea-batumi', fmtT(d.sea));
    set('fx-usd', fmtFx(d.fx && d.fx.usd));
    set('fx-eur', fmtFx(d.fx && d.fx.eur));
    set('fx-rub', fmtFx(d.fx && d.fx.rub));
    set('fx-uah', fmtFx(d.fx && d.fx.uah));
    const u = root.querySelector('[data-live="updated"]');
    if (u) {
      try {
        u.textContent = new Intl.DateTimeFormat(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date());
      } catch {
        /* оставляем build-time отметку */
      }
    }
  }

  async function jget(url) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 6000);
      const res = await fetch(url, { signal: ctl.signal });
      clearTimeout(timer);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  // Свежий кэш → рисуем из него и не трогаем сеть.
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const c = JSON.parse(raw);
      if (c && c.t && Date.now() - c.t < TTL && c.d) {
        render(c.d);
        return;
      }
    }
  } catch {
    /* localStorage недоступен — просто идём в сеть */
  }

  const runFetch = async () => {
    const [air, sea, fx] = await Promise.all([jget(AIR_URL), jget(SEA_URL), jget(FX_URL)]);
    const temp = (x) =>
      x && x.current && typeof x.current.temperature_2m === 'number'
        ? x.current.temperature_2m
        : null;
    const airArr = Array.isArray(air) ? air : [];
    const fxArr =
      Array.isArray(fx) && fx[0] && fx[0].currencies ? fx[0].currencies : [];
    const per = (code) => {
      const c = fxArr.find((x) => x.code === code);
      return c && typeof c.rate === 'number' ? c.rate : null;
    };
    const d = {
      air: { tbilisi: temp(airArr[0]), kutaisi: temp(airArr[1]), batumi: temp(airArr[2]) },
      sea:
        sea && sea.current && typeof sea.current.sea_surface_temperature === 'number'
          ? sea.current.sea_surface_temperature
          : null,
      fx: { usd: per('USD'), eur: per('EUR'), rub: per('RUB'), uah: per('UAH') },
    };
    render(d);
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d }));
    } catch {
      /* квота/приватный режим — не критично */
    }
  };
  // Сеть — вне критического пути: дёргаем 3 источника в idle, чтобы не конкурировать
  // с отрисовкой/LCP (аудит P2-2). Снапшот из HTML виден сразу; это лишь догрузка.
  if ('requestIdleCallback' in window) requestIdleCallback(() => runFetch(), { timeout: 3000 });
  else setTimeout(runFetch, 1200);
})();
