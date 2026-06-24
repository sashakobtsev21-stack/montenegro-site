/*
 * Google Analytics 4 (gtag.js) — ЕДИНСТВЕННАЯ аналитика сайта (CLAUDE правило 8, SPEC §17).
 * Consent Mode v2: по умолчанию analytics_storage='denied', баннер поднимает
 * consent до 'granted'. До согласия GA работает без analytics cookies.
 * Внешний self-скрипт (script-src 'self', §18): без inline → не нужен sha256-хеш в CSP.
 * Инициализирует dataLayer и догружает библиотеку gtag с www.googletagmanager.com
 * (домен добавлен в script-src/connect-src). Эндпоинты сбора google-analytics.com —
 * в connect-src/img-src (public/_headers).
 *
 * Данные шлются ТОЛЬКО с прод-домена (guard по hostname): localhost (dev), preview-
 * деплои (*.workers.dev) и любые посторонние хосты статистику НЕ засоряют. Граница
 * по `.` в регэкспе исключает ложные совпадения вида evilmontenegroguidebook.com.
 */
const ID = 'G-MMFK991W8V';

if (/(^|\.)montenegroguidebook\.com$/.test(location.hostname)) {
  window.dataLayer = window.dataLayer || [];
  // Канонический gtag-шим использует arguments (стандарт Google; prefer-rest-params off).
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  try {
    if (localStorage.getItem('mg-consent') === 'granted') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  } catch (e) {
    /* localStorage недоступен — остаёмся на denied */
  }
  window.gtag('js', new Date());
  window.gtag('config', ID);

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
}
