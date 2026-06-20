/*
 * Lazy-инициализатор карт (MapEmbed §8.2/§9 + CatalogMap §9) — нативный vanilla
 * ES-модуль (§15). Внешний файл из public/js → отдаётся со 'self'
 * (script-src 'self', §18), без inline, без CDN.
 *
 * Контракт перфа (§15): Leaflet (≈147 КБ JS + CSS) НЕ входит в начальный бандл
 * страницы. Этот модуль крошечный; он лишь догружает Leaflet ТОЛЬКО когда нужно:
 *  - контейнер [data-map] приблизился к вьюпорту (IntersectionObserver), ИЛИ
 *  - пользователь нажал «Показать карту» (data-map-show).
 * Leaflet self-host в /vendor/leaflet/ (тот же origin → проходит script-src
 * 'self'). Тайлы OSM — *.tile.openstreetmap.org (разрешены в _headers CSP).
 *
 * Два режима (различает поле data.mode из JSON-острова):
 *  - route/place (по умолчанию): точки из `stops[]` — маршрут (линия + fitBounds)
 *    или одна точка места (setView). Линия рисуется при stops.length > 1.
 *  - catalog: метки достопримечательностей из `markers[]` (имя + coord + url).
 *    Без линии; fitBounds по всем; у каждой метки popup со ссылкой на страницу
 *    места и клик по метке тоже ведёт на страницу. 0/1 метка деградируют (setView).
 *
 * Деградация: без JS / без IntersectionObserver и без клика карта не грузится —
 * остаётся лёгкий плейсхолдер с зарезервированной высотой (ноль CLS). При ошибке
 * сети показываем сообщение об ошибке (data-map-error), не ломая страницу.
 */

const LEAFLET_JS = '/vendor/leaflet/leaflet.js';
const LEAFLET_CSS = '/vendor/leaflet/leaflet.css';
const MARKER_ICON = '/vendor/leaflet/images/marker-icon.png';
const MARKER_ICON_2X = '/vendor/leaflet/images/marker-icon-2x.png';
const MARKER_SHADOW = '/vendor/leaflet/images/marker-shadow.png';

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Один общий промис загрузки Leaflet на страницу — грузим библиотеку максимум раз.
let leafletPromise = null;

/** Подключить CSS Leaflet один раз (идемпотентно). */
function ensureLeafletCss() {
  if (document.querySelector('link[data-leaflet-css]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = LEAFLET_CSS;
  link.setAttribute('data-leaflet-css', '');
  document.head.appendChild(link);
}

/** Догрузить Leaflet (CSS + UMD-скрипт) по требованию. Возвращает window.L. */
function loadLeaflet() {
  if (leafletPromise) return leafletPromise;
  ensureLeafletCss();
  leafletPromise = new Promise((resolve, reject) => {
    if (window.L) {
      resolve(window.L);
      return;
    }
    const script = document.createElement('script');
    script.src = LEAFLET_JS;
    script.async = true;
    script.onload = () => {
      if (window.L) resolve(window.L);
      else reject(new Error('Leaflet loaded but window.L is undefined'));
    };
    script.onerror = () => reject(new Error('Failed to load Leaflet'));
    document.head.appendChild(script);
  });
  return leafletPromise;
}

/** Прочитать остановки из JSON-острова рядом с контейнером. */
function readMapData(frame) {
  const dataId = frame.getAttribute('data-map-data');
  if (!dataId) return null;
  const el = document.getElementById(dataId);
  if (!el) return null;
  try {
    return JSON.parse(el.textContent || '{}');
  } catch {
    return null;
  }
}

/**
 * Экранировать текст перед вставкой в HTML popup (имена мест приходят из
 * frontmatter, но popup собираем строкой — страхуемся от инъекции).
 */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Инициализировать карту в контейнере: тайлы OSM + маркеры (маршрут/место/каталог). */
async function initMap(frame) {
  if (frame.dataset.mapReady === '1') return;
  frame.dataset.mapReady = '1';

  const data = readMapData(frame);
  if (!data) {
    delete frame.dataset.mapReady;
    return;
  }

  const isCatalog = data.mode === 'catalog';
  // Унифицируем точки: каталог использует markers[], маршрут/место — stops[].
  const points = isCatalog ? data.markers : data.stops;
  if (!Array.isArray(points) || points.length === 0) {
    delete frame.dataset.mapReady;
    return;
  }

  let L;
  try {
    L = await loadLeaflet();
  } catch {
    showError(frame);
    delete frame.dataset.mapReady; // позволить повтор по клику
    return;
  }

  // Self-host иконки маркера (CSP img-src 'self'); по умолчанию Leaflet ищет
  // их относительно CSS — задаём пути явно, чтобы не зависеть от структуры.
  const icon = L.icon({
    iconUrl: MARKER_ICON,
    iconRetinaUrl: MARKER_ICON_2X,
    shadowUrl: MARKER_SHADOW,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const map = L.map(frame, {
    scrollWheelZoom: false, // не перехватывать скролл страницы
    zoomAnimation: !reduceMotion,
    fadeAnimation: !reduceMotion,
    markerZoomAnimation: !reduceMotion,
  });

  L.tileLayer(TILE_URL, {
    maxZoom: 18,
    attribution: data.attribution || '© OpenStreetMap',
  }).addTo(map);

  const latLngs = [];
  for (const p of points) {
    if (!Array.isArray(p.coord) || p.coord.length !== 2) continue;
    const latLng = [p.coord[0], p.coord[1]];
    latLngs.push(latLng);
    const marker = L.marker(latLng, { icon }).addTo(map);

    if (isCatalog && p.url) {
      // Каталог: метка ведёт на страницу места. Доступный вариант —
      // popup со ссылкой (фокусируемая, читается скринридером) + клик по
      // самой метке как быстрый переход.
      const name = p.name ? escapeHtml(p.name) : escapeHtml(p.url);
      marker.bindPopup(`<a class="catalog-pin-link" href="${escapeHtml(p.url)}">${name}</a>`);
      marker.on('click', () => {
        window.location.href = p.url;
      });
    } else if (p.name) {
      marker.bindPopup(escapeHtml(p.name));
    }
  }

  // Линия маршрута: реальная дорожная геометрия (data.geometry, запечена на сборке),
  // иначе фолбэк на прямые между остановками. Только route/place (не каталог).
  const routeLine =
    !isCatalog && Array.isArray(data.geometry) && data.geometry.length > 1 ? data.geometry : null;
  if (!isCatalog && (routeLine || latLngs.length > 1)) {
    const wine =
      getComputedStyle(document.documentElement).getPropertyValue('--color-wine').trim() ||
      '#6b1f2e';
    L.polyline(routeLine || latLngs, { color: wine, weight: 4, opacity: 0.8 }).addTo(map);
  }

  if (routeLine) {
    // Реальный маршрут: кадрируем по самой линии (охватывает дорогу, а не только точки).
    map.fitBounds(routeLine, { padding: [32, 32] });
  } else if (latLngs.length === 1) {
    // Одна метка/точка: setView. Страница места — крупный зум (видно улицу/здание),
    // каталог с единственным местом — чуть меньше, чтобы был контекст вокруг.
    map.setView(latLngs[0], isCatalog ? 12 : 16);
  } else if (latLngs.length > 1) {
    map.fitBounds(latLngs, { padding: [32, 32] });
  }

  frame.classList.add('is-loaded');
  // Размер контейнера зарезервирован в CSS; пересчёт тайлов после показа.
  setTimeout(() => map.invalidateSize(), 0);
}

function showError(frame) {
  const err = frame.querySelector('[data-map-error]');
  if (err) err.hidden = false;
}

/** Подключить контейнер: кнопка (клик) + IntersectionObserver (вьюпорт). */
function wireFrame(frame) {
  const btn = frame.querySelector('[data-map-show]');
  if (btn) {
    btn.addEventListener('click', () => initMap(frame), { once: false });
  }

  if (!('IntersectionObserver' in window)) {
    // Без observer'а карта остаётся за кнопкой — лёгкий путь, без авто-загрузки.
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          obs.unobserve(entry.target);
          initMap(frame);
        }
      }
    },
    // Начинаем грузить чуть раньше появления, чтобы карта была готова к скроллу.
    { rootMargin: '200px 0px', threshold: 0.01 },
  );
  io.observe(frame);
}

const frames = document.querySelectorAll('[data-map]');
frames.forEach(wireFrame);
