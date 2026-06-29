/*
 * PhotoGallery лайтбокс (§8.1) — нативный vanilla ES-модуль (§15). Внешний файл
 * из public/js → отдаётся со 'self' (script-src 'self', §18), без inline.
 *
 * Прогрессивное улучшение: без JS фото видны в сетке, клик по кнопке ничего не
 * делает. С JS — клик по .gallery__item открывает оверлей (role=dialog,
 * aria-modal) с полным фото, подписью (alt) и кредитом, плюс кнопки
 * close/prev/next. Управление: Esc — закрыть, ←/→ — навигация, клик по фону —
 * закрыть. Фокус уводится в оверлей и возвращается на триггер при закрытии
 * (ловушка фокуса по Tab). prefers-reduced-motion — без анимаций.
 *
 * i18n (§12): подписи кнопок close/prev/next берём из data-атрибутов секции
 * [data-gallery] — компонент прокидывает их из словаря. Стили — инлайновые
 * свойства элементов (style-src 'unsafe-inline' разрешён в _headers §18) +
 * токены из :root через var() (без хардкода hex).
 */

const reduceMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Прочитать i18n-подписи из секции галереи. */
function readLabels(section) {
  return {
    // Имя диалога = НАЗНАЧЕНИЕ оверлея (WCAG 4.1.2), отдельно от действия «Закрыть».
    dialogName: section.getAttribute('data-dialog-name') || 'Photo viewer',
    close: section.getAttribute('data-close') || 'Close',
    prev: section.getAttribute('data-prev') || 'Prev',
    next: section.getAttribute('data-next') || 'Next',
  };
}

/** Собрать список фото секции (src/alt/credit) из её кнопок-триггеров. */
function readItems(section) {
  const buttons = Array.from(section.querySelectorAll('[data-gallery-item]'));
  return {
    buttons,
    items: buttons.map((b) => ({
      src: b.getAttribute('data-full') || '',
      alt: b.getAttribute('data-alt') || '',
      credit: b.getAttribute('data-credit') || '',
    })),
  };
}

function setupSection(section) {
  if (section.dataset.lightboxWired === '1') return;
  section.dataset.lightboxWired = '1';

  const labels = readLabels(section);
  const { buttons, items } = readItems(section);
  if (items.length === 0) return;

  let current = 0;
  let lastTrigger = null;

  // --- Построение оверлея (один на секцию, создаётся лениво при первом открытии) ---
  let overlay = null;
  let imgEl = null;
  let capEl = null;
  let creditEl = null;
  let closeBtn = null;
  let prevBtn = null;
  let nextBtn = null;

  function makeBtn(label) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', label);
    btn.style.cssText =
      'display:inline-flex;align-items:center;justify-content:center;' +
      'width:44px;height:44px;font:inherit;font-size:1.5rem;line-height:1;' +
      'color:var(--color-white);background:color-mix(in srgb, var(--color-slate) 70%, transparent);' +
      'border:1px solid color-mix(in srgb, var(--color-white) 40%, transparent);' +
      'border-radius:var(--radius-pill);cursor:pointer;';
    return btn;
  }

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    // Имя диалога — назначение («Просмотр фотографии»), НЕ действие «Закрыть» (WCAG 4.1.2).
    overlay.setAttribute('aria-label', labels.dialogName);
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:1000;display:flex;flex-direction:column;' +
      'align-items:center;justify-content:center;gap:var(--space-3);padding:var(--space-4);' +
      'background:color-mix(in srgb, var(--color-slate) 88%, transparent);';
    if (!reduceMotion) overlay.style.transition = 'opacity var(--dur) var(--ease-standard)';

    // Кнопка закрытия (верхний правый угол).
    closeBtn = makeBtn(labels.close);
    closeBtn.textContent = '×'; // ×
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = 'var(--space-4)';
    closeBtn.style.right = 'var(--space-4)';
    closeBtn.addEventListener('click', close);

    // Фигура с фото + подпись.
    const figure = document.createElement('figure');
    figure.style.cssText =
      'margin:0;display:flex;flex-direction:column;align-items:center;gap:var(--space-2);max-width:100%;max-height:100%;';

    imgEl = document.createElement('img');
    imgEl.setAttribute('decoding', 'async');
    imgEl.style.cssText =
      'display:block;max-width:90vw;max-height:78vh;object-fit:contain;border-radius:var(--radius-card);';

    const figcap = document.createElement('figcaption');
    figcap.style.cssText =
      'text-align:center;color:var(--color-white);font-size:var(--text-sm);max-width:90vw;';
    capEl = document.createElement('span');
    capEl.style.display = 'block';
    creditEl = document.createElement('span');
    creditEl.style.cssText =
      'display:block;color:color-mix(in srgb, var(--color-white) 75%, transparent);';
    figcap.appendChild(capEl);
    figcap.appendChild(creditEl);

    figure.appendChild(imgEl);
    figure.appendChild(figcap);

    // Навигация prev/next (по бокам). Скрываем, если фото одно.
    const nav = document.createElement('div');
    nav.style.cssText = 'display:flex;gap:var(--space-4);';
    prevBtn = makeBtn(labels.prev);
    prevBtn.textContent = '‹'; // ‹
    prevBtn.addEventListener('click', () => show(current - 1));
    nextBtn = makeBtn(labels.next);
    nextBtn.textContent = '›'; // ›
    nextBtn.addEventListener('click', () => show(current + 1));
    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    if (items.length < 2) nav.style.display = 'none';

    overlay.appendChild(closeBtn);
    overlay.appendChild(figure);
    overlay.appendChild(nav);

    // Клик по фону (вне фигуры/навигации/кнопок) — закрыть.
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    document.body.appendChild(overlay);

    // Свайп влево/вправо — листание фото (тач).
    let sx = 0;
    overlay.addEventListener(
      'touchstart',
      (e) => {
        sx = e.changedTouches[0].clientX;
      },
      { passive: true },
    );
    overlay.addEventListener(
      'touchend',
      (e) => {
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      },
      { passive: true },
    );
  }

  function show(index) {
    const n = items.length;
    current = ((index % n) + n) % n; // зацикливаем
    const item = items[current];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    capEl.textContent = item.alt;
    creditEl.textContent = item.credit;
    creditEl.style.display = item.credit ? 'block' : 'none';
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      show(current + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      show(current - 1);
    } else if (e.key === 'Tab') {
      // Ловушка фокуса: цикл по интерактивным элементам оверлея.
      const focusables = overlay.querySelectorAll('button');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function open(index, trigger) {
    lastTrigger = trigger || null;
    if (!overlay) buildOverlay();
    show(index);
    overlay.style.display = 'flex';
    document.addEventListener('keydown', onKeydown);
    document.documentElement.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    if (!overlay) return;
    overlay.style.display = 'none';
    document.removeEventListener('keydown', onKeydown);
    document.documentElement.style.overflow = '';
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => open(i, btn));
  });
}

document.querySelectorAll('[data-gallery]').forEach(setupSection);
