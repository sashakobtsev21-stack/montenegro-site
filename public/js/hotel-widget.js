/*
 * HotelWidget (§8.1, монетизация §16) — подгрузка партнёрского виджета поиска
 * отелей Trip.com по клику. Нативный vanilla ES-модуль (§15), внешний файл из
 * public/js → отдаётся со 'self' (script-src 'self', §18), без inline.
 *
 * Приватность и перф (§15, §18): пока пользователь не нажал заглушку, НИЧЕГО от
 * Trip.com не грузится — ни iframe, ни cookie, ни сторонние запросы; нулевой
 * удар по LCP. По клику создаём iframe виджета (320×320) и подставляем его
 * вместо заглушки. frame-src www.trip.com разрешён в _headers (§18).
 *
 * Делегирование от document по [data-hw-show] — один обработчик на все виджеты
 * страницы. Идемпотентно: повторный клик после загрузки ничего не дублирует
 * (флаг data-hw-ready на контейнере).
 */

function loadWidget(frame) {
  if (frame.dataset.hwReady === '1') return;
  frame.dataset.hwReady = '1';

  const src = frame.getAttribute('data-src');
  if (!src) return;

  const title = frame.getAttribute('data-title') || '';
  const iframe = document.createElement('iframe');
  iframe.setAttribute('title', title);
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  iframe.setAttribute('scrolling', 'no');
  iframe.width = '320';
  iframe.height = '320';
  iframe.style.border = '0';
  iframe.src = src;

  frame.appendChild(iframe);
  frame.classList.add('is-loaded');
}

document.addEventListener('click', (e) => {
  const btn = e.target && e.target.closest ? e.target.closest('[data-hw-show]') : null;
  if (!btn) return;
  const frame = btn.closest('[data-hw]');
  if (!frame) return;
  loadWidget(frame);
});
