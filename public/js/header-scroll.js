/*
 * Уплотнение шапки при скролле — нативный vanilla ES-модуль (§15).
 * Внешний файл из public/js → 'self' (script-src 'self', §18), без inline.
 * Меняется ТОЛЬКО data-атрибут (CSS добавляет тень) — layout не двигается → 0 CLS.
 *
 * Дёшево: rAF-троттлинг скролла, состояние пишем лишь при смене (без дёрганья).
 * Работает независимо от гейта движения: тень при скролле — функциональный сигнал
 * границы, а не decorative-анимация; при reduced-motion переход тени глушится в CSS.
 */
const header = document.querySelector('[data-header]');

if (header) {
  const THRESHOLD = 8; // px прокрутки до уплотнения
  let scrolled = false;
  let ticking = false;

  const apply = () => {
    const next = window.scrollY > THRESHOLD;
    if (next !== scrolled) {
      scrolled = next;
      if (next) header.setAttribute('data-scrolled', '');
      else header.removeAttribute('data-scrolled');
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  };

  apply(); // корректное состояние при загрузке не с самого верха
  window.addEventListener('scroll', onScroll, { passive: true });
}
