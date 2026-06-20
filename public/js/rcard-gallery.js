/*
 * RestaurantCard gallery (§8.6) — переключение фото в карточке директории «Где
 * поесть». Нативный vanilla ES-модуль из public/js (script-src 'self', §18),
 * без inline и без зависимостей.
 *
 * Делегирование от document: один обработчик на все карточки страницы.
 * Активный слайд — без атрибута [hidden]; точка-индикатор — класс is-active.
 * Поддержка: стрелки, точки, свайп на тач-экранах. Ноль CLS (контейнер с
 * зарезервированным аспектом 16:9 в CSS).
 */

function slidesOf(gallery) {
  return gallery.querySelectorAll('[data-rcard-slide]');
}

function show(gallery, idx) {
  const slides = slidesOf(gallery);
  const dots = gallery.querySelectorAll('[data-rcard-dot]');
  const n = slides.length;
  if (!n) return;
  const i = ((idx % n) + n) % n; // циклично
  slides.forEach((s, k) => {
    if (k === i) s.removeAttribute('hidden');
    else s.setAttribute('hidden', '');
  });
  dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
  gallery.dataset.rcardIndex = String(i);
}

function current(gallery) {
  return Number(gallery.dataset.rcardIndex || '0');
}

document.addEventListener('click', (e) => {
  const t = e.target && e.target.closest ? e.target.closest('[data-rcard-prev],[data-rcard-next],[data-rcard-dot]') : null;
  if (!t) return;
  const gallery = t.closest('[data-rcard-gallery]');
  if (!gallery) return;
  e.preventDefault();
  if (t.hasAttribute('data-rcard-prev')) {
    show(gallery, current(gallery) - 1);
  } else if (t.hasAttribute('data-rcard-next')) {
    show(gallery, current(gallery) + 1);
  } else {
    const dots = Array.prototype.slice.call(gallery.querySelectorAll('[data-rcard-dot]'));
    const idx = dots.indexOf(t);
    if (idx >= 0) show(gallery, idx);
  }
});

// Свайп на тач-экранах.
let startX = 0;
let startGallery = null;
document.addEventListener(
  'touchstart',
  (e) => {
    const g = e.target && e.target.closest ? e.target.closest('[data-rcard-gallery]') : null;
    startGallery = g;
    if (g) startX = e.changedTouches[0].clientX;
  },
  { passive: true },
);
document.addEventListener(
  'touchend',
  (e) => {
    if (!startGallery) return;
    const g = e.target && e.target.closest ? e.target.closest('[data-rcard-gallery]') : null;
    if (!g || g !== startGallery) {
      startGallery = null;
      return;
    }
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(g, current(g) + (dx < 0 ? 1 : -1));
    startGallery = null;
  },
  { passive: true },
);
