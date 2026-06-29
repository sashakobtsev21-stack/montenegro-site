/*
 * showcase-rail.js — витрина на главной (§8.4/§16).
 * Прогрессивное улучшение поверх отрендеренной ленты (CSP script-src 'self').
 *  - авто-прокрутка справа-налево (rAF, мягкая, ~линейная);
 *  - перетаскивание мышью/пальцем (drag) и нативная горизонтальная прокрутка;
 *  - после отпускания прокрутка ПРОДОЛЖАЕТ крутиться;
 *  - пауза, пока курсор/фокус на любой карточке (спотлайт: соседние затемняются
 *    через CSS :has, лента стоит — чтобы прочитать описание/нажать «На карте»);
 *  - КЛИК по фото (без перетаскивания) долетает до кнопки лайтбокса: захват
 *    указателя ставим ТОЛЬКО после реального движения, иначе клик «съедается»;
 *  - prefers-reduced-motion: без авто-движения (только ручная прокрутка).
 */
(() => {
  const rail = document.querySelector('[data-showcase]');
  if (!rail) return;
  const vp = rail.querySelector('[data-showcase-viewport]');
  const track = rail.querySelector('[data-showcase-track]');
  if (!vp || !track) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SPEED = 0.4; // px/кадр — медленно

  let dragging = false;
  let captured = false;
  let hovering = false; // курсор над карточкой → пауза + спотлайт
  let focusWithin = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;
  let activePointer = null;

  const half = () => track.scrollWidth / 2;

  // scrollLeft квантуется к целым → дробный SPEED теряется (лента «стоит»). Копим
  // позицию во float-аккумуляторе и каждый кадр пишем её в scrollLeft.
  let pos = 0;

  const tick = () => {
    if (!reduce && !dragging && !hovering && !focusWithin) {
      pos += SPEED;
      const h = half();
      if (h > 0 && pos >= h) pos -= h; // бесшовная петля (лента продублирована)
      vp.scrollLeft = pos;
    }
    requestAnimationFrame(tick);
  };

  // Ручная прокрутка / drag / колесо меняют scrollLeft мимо аккумулятора — ресинк.
  vp.addEventListener('scroll', () => {
    if (Math.abs(vp.scrollLeft - pos) > 2) {
      pos = vp.scrollLeft;
      const h = half();
      if (h > 0) {
        if (pos >= h) pos -= h;
        else if (pos < 0) pos += h;
      }
    }
  });

  // --- Перетаскивание ---
  // Захват указателя НЕ делаем на pointerdown: иначе клик по фото не дойдёт до
  // кнопки лайтбокса (виден курсор-лупа, но ничего не открывается). Захватываем
  // только когда палец реально сдвинулся (drag), тогда же глушим будущий клик.
  vp.addEventListener('pointerdown', (e) => {
    if (e.button && e.button !== 0) return;
    dragging = true;
    captured = false;
    moved = false;
    activePointer = e.pointerId;
    startX = e.clientX;
    startScroll = vp.scrollLeft;
  });
  vp.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 4) {
      moved = true;
      vp.classList.add('is-grabbing');
      try {
        vp.setPointerCapture(e.pointerId);
        captured = true;
      } catch {
        /* no-op */
      }
    }
    if (moved) vp.scrollLeft = startScroll - dx;
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    vp.classList.remove('is-grabbing');
    if (captured) {
      try {
        vp.releasePointerCapture(e.pointerId ?? activePointer);
      } catch {
        /* no-op */
      }
      captured = false;
    }
    activePointer = null;
  };
  vp.addEventListener('pointerup', endDrag);
  vp.addEventListener('pointercancel', endDrag);
  // Главный фикс «не крутится, когда держишь за карточку»: нажатие на фото/ссылку
  // запускало нативный drag-and-drop картинки/ссылки → pointercancel → прокрутка
  // обрывалась. Глушим нативный drag внутри ленты целиком.
  vp.addEventListener('dragstart', (e) => e.preventDefault());
  // Клик после реального перетаскивания не должен «проваливаться» в ссылку/лайтбокс.
  vp.addEventListener(
    'click',
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    },
    true,
  );

  // Пауза при фокусе с клавиатуры (a11y).
  rail.addEventListener('focusin', () => {
    focusWithin = true;
  });
  rail.addEventListener('focusout', () => {
    focusWithin = false;
  });

  // --- Пауза авто-прокрутки + спотлайт, пока курсор над любой карточкой. ---
  const cells = Array.from(rail.querySelectorAll('.showcase__cell'));
  cells.forEach((cell) => {
    cell.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return; // на тач паузим только тапом ниже
      hovering = true;
    });
    cell.addEventListener('pointerleave', () => {
      hovering = false;
    });
  });

  // На тач-устройствах тап по карточке заведения раскрывает описание (нет :hover).
  const places = Array.from(rail.querySelectorAll('[data-scard-place]'));
  let lastOpener = null; // элемент, c которого открыли поповер → вернуть фокус по Esc
  const closeAllPops = () => places.forEach((c) => c.classList.remove('is-open'));
  places.forEach((card) => {
    card.addEventListener('pointerup', (e) => {
      if (e.pointerType !== 'touch' || moved) return;
      const target = e.target;
      // тап по фото/стрелкам/ссылке отрабатывают свои обработчики
      if (target.closest('[data-gallery-item],[data-rcard-prev],[data-rcard-next],a'))
        return;
      const open = card.classList.contains('is-open');
      closeAllPops();
      if (!open) {
        card.classList.add('is-open');
        lastOpener = card;
      }
    });
  });

  // Esc закрывает раскрытый поповер с клавиатуры (как в menu.js) + возврат фокуса.
  // Покрывает оба состояния: тач-`is-open` и `:focus-within` (фокус на карточке).
  rail.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    const openCard = rail.querySelector('[data-scard-place].is-open');
    const focusedCard =
      document.activeElement && document.activeElement.closest
        ? document.activeElement.closest('[data-scard-place]')
        : null;
    const card = openCard || focusedCard;
    if (!card) return;
    e.preventDefault();
    closeAllPops();
    // Вернуть фокус на безопасный элемент карточки (ссылку-заголовок), чтобы
    // :focus-within сняло поповер и фокус не «упал» в body.
    const focusTarget =
      lastOpener === card && document.activeElement
        ? document.activeElement
        : card.querySelector('.scard__titlelink, a, button');
    if (focusTarget && typeof focusTarget.focus === 'function') focusTarget.focus();
    lastOpener = null;
  });

  pos = 1;
  vp.scrollLeft = 1; // небольшой стартовый сдвиг — чтобы можно было листать и влево
  requestAnimationFrame(tick);
})();
