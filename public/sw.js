/*
 * Service worker — оффлайн + ускорение (PWA, Фаза 7).
 * Стратегии (без устаревания контента):
 *  - HTML-навигации: network-first → свежее онлайн, offline.html при отсутствии сети;
 *  - /_astro/ и /fonts/ (хешированные, иммутабельные): cache-first;
 *  - прочее same-origin GET (картинки и т.п.): network-first с кэш-фолбэком офлайн.
 * CSP (§18): SW и manifest отдаются со 'self' (default-src 'self'). Кэш версионируется
 * (CACHE = gg-vN): при активации новой версии старые кэши удаляются.
 */
const VERSION = 'v1';
const CACHE = 'gg-' + VERSION;
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll([OFFLINE_URL, '/favicon.svg']))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML-навигации: свежее из сети, офлайн — заглушка.
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)));
    return;
  }

  // Иммутабельные хеш-ассеты: из кэша, иначе сеть (и кладём в кэш).
  if (url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/fonts/')) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          }),
      ),
    );
    return;
  }

  // Прочее (картинки и т.п.): сеть, при сбое — кэш.
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req)),
  );
});
