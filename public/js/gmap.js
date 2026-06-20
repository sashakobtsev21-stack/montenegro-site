/*
 * GoogleMap (§8.1) — подгрузка Google-карты по клику. Нативный vanilla
 * ES-модуль (§15). Внешний файл из public/js → отдаётся со 'self'
 * (script-src 'self', §18), без inline.
 *
 * Приватность (§18): пока пользователь не нажал заглушку, НИЧЕГО от Google не
 * грузится — ни iframe, ни cookie. По клику создаём классический встраиваемый
 * iframe (output=embed, без API-ключа) и подставляем его вместо заглушки.
 * frame-src google.com/maps.google.com разрешён в _headers (§18).
 *
 * Делегирование от document по [data-gmap-show] — один обработчик на все карты
 * страницы. Идемпотентно: повторный клик после загрузки ничего не дублирует
 * (флаг data-gmap-ready на контейнере).
 */

function buildSrc(frame) {
  const lat = frame.getAttribute('data-lat');
  const lng = frame.getAttribute('data-lng');
  const zoom = frame.getAttribute('data-zoom') || '14';
  const hl = frame.getAttribute('data-hl') || 'ru';
  // Классический embed без API-ключа: q=lat,lng&z=zoom&hl=lang&output=embed.
  return (
    'https://www.google.com/maps?q=' +
    encodeURIComponent(lat + ',' + lng) +
    '&z=' +
    encodeURIComponent(zoom) +
    '&hl=' +
    encodeURIComponent(hl) +
    '&output=embed'
  );
}

function loadMap(frame) {
  if (frame.dataset.gmapReady === '1') return;
  frame.dataset.gmapReady = '1';

  const title = frame.getAttribute('data-title') || '';
  const iframe = document.createElement('iframe');
  iframe.setAttribute('title', title);
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  iframe.setAttribute('allowfullscreen', '');
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = '0';
  iframe.src = buildSrc(frame);

  frame.appendChild(iframe);
  frame.classList.add('is-loaded');
}

document.addEventListener('click', (e) => {
  const btn = e.target && e.target.closest ? e.target.closest('[data-gmap-show]') : null;
  if (!btn) return;
  const frame = btn.closest('[data-gmap]');
  if (!frame) return;
  loadMap(frame);
});
