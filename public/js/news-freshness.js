// Свежесть новостей на клиенте (SSG, §8.4/§8). Прячет записи старше окна
// (data-news-window — дни) относительно РЕАЛЬНОГО «сейчас»; прячет пустые группы
// по месяцам; если в ленте ничего не осталось — показывает data-news-empty
// (раздел /novosti/) либо скрывает весь блок data-news-section (главная).
//
// Зачем: серверный фильтр по дате СБОРКИ даёт корректный список на момент деплоя,
// а этот скрипт держит свежесть МЕЖДУ сборками. Полное авто-удаление старого —
// при ежедневной пересборке (Cloudflare Deploy Hook, подключается позже).
//
// Внешний модуль со 'self' (CSP §18 — без inline). No-op на страницах без новостей.
const DAY = 86400000;
const now = Date.now();

for (const feed of document.querySelectorAll('[data-news-feed]')) {
  const win = parseInt(feed.getAttribute('data-news-window') || '0', 10);
  if (!win) continue;
  let visible = 0;
  for (const item of feed.querySelectorAll('[data-news-item]')) {
    const published = item.getAttribute('data-published');
    const t = published ? Date.parse(published) : NaN;
    if (!Number.isNaN(t) && Math.floor((now - t) / DAY) > win) {
      item.hidden = true;
    } else {
      visible++;
    }
  }
  // Свернуть пустые помесячные группы (раздел новостей).
  for (const group of feed.querySelectorAll('[data-news-group]')) {
    if (!group.querySelector('[data-news-item]:not([hidden])')) group.hidden = true;
  }
  if (visible === 0) {
    const section = feed.closest('[data-news-section]');
    const empty = feed.querySelector('[data-news-empty]') || (section && section.querySelector('[data-news-empty]'));
    if (empty) empty.hidden = false;
    else if (section) section.hidden = true;
  }
}
