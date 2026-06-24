/*
 * Consent Mode v2 banner. Shows only until the visitor chooses.
 * Accept -> analytics_storage='granted'; decline keeps GA cookieless/denied.
 */
(function () {
  var KEY = 'mg-consent';
  var el = document.querySelector('[data-cookie-consent]');
  if (!el) return;

  var choice = null;
  try {
    choice = localStorage.getItem(KEY);
  } catch (e) {
    /* localStorage unavailable — show banner every time */
  }
  if (choice === 'granted' || choice === 'denied') return;

  el.hidden = false;

  function decide(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* not critical */
    }
    if (value === 'granted' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    el.hidden = true;
  }

  var accept = el.querySelector('[data-consent-accept]');
  var decline = el.querySelector('[data-consent-decline]');
  if (accept) accept.addEventListener('click', function () { decide('granted'); });
  if (decline) decline.addEventListener('click', function () { decide('denied'); });
})();
