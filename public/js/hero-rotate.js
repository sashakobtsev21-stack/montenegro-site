/*
 * Ротация hero-фона главной — внешний модуль (CSP script-src 'self', §18).
 * Инлайн-JS на сайте запрещён, поэтому логика тут, а данные приходят из
 * <script type="application/json" id="hero-variants"> (data-блок, не исполняется
 * → CSP-безопасен, как JSON-LD).
 *
 * Первый кадр выбирается по текущему временному окну, затем открытая вкладка
 * переключает hero по таймеру. Скрипт подключён сразу за <img id="heroBg">
 * (классический, не defer) → src ставится рано (LCP §15).
 */
(function () {
  const el = document.getElementById('hero-variants');
  const img = document.getElementById('heroBg');
  const avifSource = document.getElementById('heroAvif');
  if (!el || !img) return;

  let cfg;
  try {
    cfg = JSON.parse(el.textContent || '{}');
  } catch {
    return;
  }
  const list = cfg.variants || [];
  if (!list.length) return;

  let i = Math.floor(Date.now() / (cfg.periodMs || 10800000)) % list.length;

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    img.style.transition = 'opacity 700ms ease';
  }

  const setCredit = (v) => {
    const c = document.getElementById('heroCredit');
    if (c) {
      c.href = v.href;
      c.textContent = (cfg.prefix || 'Photo') + ': ' + v.credit;
    }
  };

  const show = (n) => {
    const v = list[n];
    if (!v) return;
    if (avifSource && v.avifSrcset) avifSource.srcset = v.avifSrcset;
    img.srcset = v.webpSrcset;
    img.src = v.src;
    if (v.focus) img.style.objectPosition = v.focus;
    setCredit(v);
  };

  show(i);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setCredit(list[i]));
  }

  if (list.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const intervalMs = cfg.rotateMs || 12000;
    let timer = null;
    const tick = () => {
      i = (i + 1) % list.length;
      img.style.opacity = '0';
      window.setTimeout(() => {
        show(i);
        window.setTimeout(() => (img.style.opacity = '1'), 450);
      }, 250);
    };
    const start = () => {
      if (!timer) timer = window.setInterval(tick, intervalMs);
    };
    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    start();
  }
})();
