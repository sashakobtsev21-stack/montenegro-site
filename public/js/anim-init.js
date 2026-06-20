/*
 * Гейт движения — крошечный СИНХРОННЫЙ внешний модуль (script-src 'self', §18).
 * Грузится в <head> без defer/async: исполняется до рендера <body>, поэтому
 * класс ставится ДО первой отрисовки — без FOUC и без обратного мерцания.
 *
 * FOUC-safe инвариант (ui-ux-pro-max §7): «скрытое» начальное состояние reveal/hero
 * (см. global.css, селекторы под .js-anim) включается ТОЛЬКО когда есть JS И движение
 * разрешено. Поэтому класс ставим лишь при отсутствии prefers-reduced-motion.
 * Без JS, при reduced-motion или до этой строки — контент видим и статичен.
 */
try {
  if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-anim');
  }
} catch {
  /* любой сбой → класс не ставится → контент остаётся видимым (деградация в статику) */
}
