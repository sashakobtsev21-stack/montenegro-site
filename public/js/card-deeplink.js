/*
 * card-deeplink.js — глубокая ссылка на конкретное заведение (§8.6).
 * Переход из витрины на главной ведёт на /eda/{город}/#r-{slug}. Здесь мы:
 *  - центрируем нужную карточку посреди экрана (плавный скролл),
 *  - подсвечиваем её золотым свечением (.is-spotlight),
 *  - кратко затемняем остальные карточки (body.is-dimmed),
 * чтобы было сразу видно, ради какого места пришёл пользователь.
 * Прогрессивное улучшение, CSP script-src 'self'.
 */
(() => {
  const PREFIX = '#r-';

  function spotlight(hash) {
    if (!hash || hash.indexOf(PREFIX) !== 0) return;
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      id = hash.slice(1);
    }
    const el = document.getElementById(id);
    if (!el) return;

    const center = () => {
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch {
        el.scrollIntoView();
      }
    };
    // Скроллим сразу и ещё раз после полной загрузки (ленивые фото могли сдвинуть layout).
    requestAnimationFrame(center);
    window.addEventListener('load', () => setTimeout(center, 60), { once: true });

    document.body.classList.add('is-dimmed');
    el.classList.add('is-spotlight');
    setTimeout(() => document.body.classList.remove('is-dimmed'), 2600);
    setTimeout(() => el.classList.remove('is-spotlight'), 5200);
  }

  spotlight(location.hash);
  // Клик по той же ссылке/смена якоря на уже открытой странице.
  window.addEventListener('hashchange', () => spotlight(location.hash));
})();
