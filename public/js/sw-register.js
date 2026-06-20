/* Регистрация service worker (PWA, оффлайн) — внешний модуль со 'self' (CSP §18). */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* регистрация не критична — игнорируем сбой */
    });
  });
}
