/*
 * Ротация hero-фона главной — внешний модуль (CSP script-src 'self', §18).
 * Инлайн-JS на сайте запрещён, поэтому логика тут, а данные приходят из
 * <script type="application/json" id="hero-variants"> (data-блок, не исполняется
 * → CSP-безопасен, как JSON-LD).
 *
 * Кадр выбирается по текущему 3-часовому окну времени (floor(now/periodMs) % N):
 * меняется каждые 3 часа, без бэкенда. Скрипт подключён сразу за <img id="heroBg">
 * (классический, не defer) → src ставится рано (LCP §15). Кредит #heroCredit ниже
 * по DOM → обновляем на DOMContentLoaded.
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

  const i = Math.floor(Date.now() / (cfg.periodMs || 10800000)) % list.length;
  const v = list[i];

  if (avifSource && v.avifSrcset) avifSource.srcset = v.avifSrcset;
  img.srcset = v.webpSrcset;
  img.src = v.src;
  if (v.focus) img.style.objectPosition = v.focus;

  const setCredit = () => {
    const c = document.getElementById('heroCredit');
    if (c) {
      c.href = v.href;
      c.textContent = (cfg.prefix || 'Photo') + ': ' + v.credit;
    }
  };
  if (document.readyState !== 'loading') setCredit();
  else document.addEventListener('DOMContentLoaded', setCredit);
})();
