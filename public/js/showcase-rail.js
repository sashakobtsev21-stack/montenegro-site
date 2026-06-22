/*
 * showcase-rail.js — витрина: движение задаётся CSS-анимацией (.showcase__track,
 * @keyframes showcase-marquee). Здесь только: (1) выставить длительность ∝ ширине
 * набора, чтобы скорость была одинаковой при любом числе карточек; (2) тач-тап по
 * карточке-заведению раскрывает описание. Лайтбокс/галерея — отдельные скрипты.
 */
(() => {
  const rail = document.querySelector('[data-showcase]');
  if (!rail) return;
  const track = rail.querySelector('[data-showcase-track]');
  if (track) {
    const setWidth = track.scrollWidth / 2; // дорожка = 2 копии
    if (setWidth > 0) {
      const dur = Math.max(20, Math.round(setWidth / 40)); // ~40 px/с
      track.style.setProperty('--showcase-dur', dur + 's');
    }
  }
  // Тач: тап по карточке-заведению раскрывает поповер (нет :hover на тач).
  rail.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'touch') return;
    const card = e.target.closest('[data-scard-place]');
    if (!card) return;
    if (e.target.closest('[data-gallery-item],[data-rcard-prev],[data-rcard-next],a')) return;
    const open = card.classList.contains('is-open');
    rail.querySelectorAll('[data-scard-place]').forEach((c) => c.classList.remove('is-open'));
    if (!open) card.classList.add('is-open');
  });
})();
