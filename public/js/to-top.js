/*
 * Плавающая кнопка «наверх» (аудит 2026-06-20) — внешний vanilla-модуль со 'self'
 * (script-src 'self', §18), без inline. Шапка не sticky (решение владельца), поэтому
 * на длинных страницах даём быстрый возврат к навигации/языку/поиску.
 * Кнопка стартует hidden; показываем после порога прокрутки. Уважает reduced-motion.
 */
const btn = document.querySelector('[data-to-top]');
if (btn) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const THRESHOLD = 700;

  const sync = () => {
    btn.hidden = window.scrollY < THRESHOLD;
  };
  sync();
  window.addEventListener('scroll', sync, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // Возвращаем фокус в начало контента — для клавиатуры/скринридера.
    const main = document.getElementById('main');
    if (main) main.focus({ preventScroll: true });
  });
}
