/*
 * Фильтры директории «Где поесть» (§8.6) — нативный vanilla ES-модуль (§15).
 * Внешний файл из public/js → отдаётся со 'self' (script-src 'self', §18), без inline.
 *
 * Редизайн: фасеты — чипы-кнопки (button[aria-pressed]). Внутри фасета выбор
 * множественный (ИЛИ), между фасетами — И. Фильтрация по УЖЕ отрендеренным
 * карточкам через data-атрибуты (без бэкенда/перезагрузки). Деградация без JS:
 * скрипт не запускается → все карточки видимы, кнопки статичны.
 *
 * Без layout shift: прячем карточки через [hidden] (display:none).
 */
const root = document.querySelector('[data-eda]');

if (root) {
  const chips = [...root.querySelectorAll('[data-eda-chip]')];
  const clearBtn = root.querySelector('[data-eda-clear]');
  const cards = [...root.querySelectorAll('[data-eda-card]')];
  const groups = [...root.querySelectorAll('[data-eda-group]')];
  const countEl = root.querySelector('[data-eda-count]');
  const emptyEl = root.querySelector('[data-eda-empty]');

  // Шаблон строки-счётчика: «Показано мест: {count}».
  const countTpl = countEl ? countEl.getAttribute('data-count-template') || '{count}' : '';

  const apply = () => {
    // Активные значения по фасетам: facet → Set выбранных значений.
    const active = {};
    for (const chip of chips) {
      if (chip.getAttribute('aria-pressed') === 'true') {
        const f = chip.getAttribute('data-facet');
        const v = chip.getAttribute('data-value');
        (active[f] = active[f] || new Set()).add(v);
      }
    }

    let visible = 0;
    for (const card of cards) {
      let match = true;
      for (const f in active) {
        // ИЛИ внутри фасета: карточка проходит, если её значение в наборе.
        if (!active[f].has(card.getAttribute('data-' + f) || '')) {
          match = false;
          break;
        }
      }
      card.hidden = !match;
      if (match) visible += 1;
    }

    // Прячем заголовок города, если в нём не осталось видимых карточек.
    for (const g of groups) {
      g.hidden = ![...g.querySelectorAll('[data-eda-card]')].some((c) => !c.hidden);
    }

    if (countEl) countEl.textContent = countTpl.replace('{count}', String(visible));
    if (emptyEl) emptyEl.hidden = visible !== 0;
    if (clearBtn) clearBtn.hidden = Object.keys(active).length === 0;
  };

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      apply();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      for (const chip of chips) chip.setAttribute('aria-pressed', 'false');
      apply();
    });
  }

  // Первичный прогон — счётчик/состояние под фактическое число карточек.
  apply();
}
