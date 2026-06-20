/*
 * Фильтры каталога достопримечательностей (§8.3) — нативный vanilla ES-модуль
 * (§15). Внешний файл из public/js → отдаётся со 'self' (script-src 'self',
 * §18), без inline.
 *
 * Фильтрация идёт по УЖЕ отрендеренным карточкам через data-атрибуты
 * (data-type, data-region) — без бэкенда и перезагрузки. Деградация без JS:
 * скрипт не запускается → все карточки видимы, счётчик/пустое состояние статичны.
 *
 * Без layout shift: прячем карточки через [hidden] (display:none); видимая
 * область над сеткой не дёргается. Структурно идентично eda-filter.js, но со
 * своим корнем [data-catalog] и ключами фильтров type/region.
 */
const root = document.querySelector('[data-catalog]');

if (root) {
  const selects = [...root.querySelectorAll('[data-catalog-filter]')];
  const resetBtn = root.querySelector('[data-catalog-reset]');
  const cards = [...root.querySelectorAll('[data-catalog-card]')];
  const countEl = root.querySelector('[data-catalog-count]');
  const emptyEl = root.querySelector('[data-catalog-empty]');

  const countTpl = countEl ? countEl.getAttribute('data-count-template') || '{count}' : '';

  const apply = () => {
    const active = {};
    for (const sel of selects) {
      const key = sel.getAttribute('data-catalog-filter');
      if (key && sel.value) active[key] = sel.value;
    }

    let visible = 0;
    for (const card of cards) {
      let match = true;
      for (const key in active) {
        if (card.getAttribute('data-' + key) !== active[key]) {
          match = false;
          break;
        }
      }
      card.hidden = !match;
      if (match) visible += 1;
    }

    if (countEl) countEl.textContent = countTpl.replace('{count}', String(visible));
    if (emptyEl) emptyEl.hidden = visible !== 0;
  };

  for (const sel of selects) sel.addEventListener('change', apply);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      for (const sel of selects) sel.value = '';
      apply();
    });
  }

  apply();
}
