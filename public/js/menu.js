/*
 * Мобильное меню шапки — нативный vanilla ES-модуль (§15).
 * Лежит в public/js → отдаётся как внешний файл со 'self' (script-src 'self', §18),
 * без inline, который заблокировал бы строгий CSP без 'unsafe-inline'.
 * Подписи i18n приходят из data-атрибутов кнопки (§12).
 */
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

if (toggle && nav) {
  const openLabel = toggle.getAttribute('data-open-label') || '';
  const closeLabel = toggle.getAttribute('data-close-label') || '';
  const label = toggle.querySelector('.menu-toggle__label');

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (label) label.textContent = open ? closeLabel : openLabel;
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Закрытие по клику вне меню (стандартный disclosure-паттерн ARIA APG).
  document.addEventListener('pointerdown', (e) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });

  // Закрытие при уходе фокуса за пределы меню (клавиатура: Tab за последний пункт)
  // — иначе остаётся stale-open disclosure (ARIA APG). relatedTarget=null (уход в
  // адресную строку/клик) НЕ закрываем, только реальный переход фокуса в DOM.
  nav.addEventListener('focusout', (e) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    const next = e.relatedTarget;
    if (next && !nav.contains(next) && !toggle.contains(next)) setOpen(false);
  });
}
