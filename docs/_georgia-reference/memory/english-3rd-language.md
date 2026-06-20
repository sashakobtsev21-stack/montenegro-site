---
name: english-3rd-language
description: "Архитектура английского (en) как 3-го языка — инфра, фолбэк ссылок, агент, что осталось"
metadata: 
  node_type: memory
  type: project
  originSessionId: c1767466-1e01-4dc8-bae3-15a379017b8f
---

English (en) — **ЯЗЫК ПО УМОЛЧАНИЮ** (корень `/`); ru → `/ru/`, uk → `/uk/`. Полный корпус переведён на en. Коммиты (2026-06-16): инфра `690d064`, перевод корпуса (102 материала) `e835f06`, en-дефолт `e6a868e`.

**Как устроено:**
- `LANGS=['ru','uk','en']` в `src/i18n/types.ts` И `src/content.config.ts` (ДВЕ копии — менять обе). en опционален: поверх ru/uk, не ломая их.
- `src/i18n/en.ts` — UI-словарь (структурный клон ru.ts: те же ключи, английские значения). `index.ts`: `dictionaries={ru,uk,en}`, `LOCALE`+en, хелпер `mirrorPath(path, lang)` — зеркальный путь страницы на др. язык (для hreflang и переключателя).
- Роутинг: `src/pages/en/**` зеркалит `/uk/` (URL `/en/...`). Контентные роуты ([category]/[slug], marshruty/[slug]) фильтруют `lang==='en'` и в getStaticPaths считают `availableLangs` (какие языки есть у этого slug).
- `BaseLayout` проп `availableLangs` (дефолт все-3): hreflang эмитится только по доступным языкам (en — лишь где перевод есть). Контентные шаблоны (ArticlePage/RoutePage) передают вычисленный список; статические хабы — дефолт все-3 (они всегда есть на 3 языках). `Header`/`Footer` → `LangSwitcher` (3-язычный) тоже получают availableLangs (иначе футер-переключатель давал битую en-ссылку — ловил на этом).
- **ФОЛБЭК ССЫЛОК (ключевое для фазовости):** пока en-перевода цели нет → ссылка ведёт на ru (всегда существует) → ноль битых ссылок. Шаблонные кросс-ссылки (CityFoodPage/EdaDirectory) делают это сами: `articleHref(exists ? lang : DEFAULT_LANG, …)` через проверку коллекции. Body-ссылки в en-статьях агент пишет СРАЗУ ru-путями (без `/en`). Навигация и hreflang при этом language-aware (на /en). Когда корпус переведут целиком — отдельным проходом поднять body-ссылки на /en (или сделать build-резолвер).
- `check-parity`: ru+uk обязательны, en опционален (если есть — сверяется slug/числа). sitemap `locales`+en. 2-язычные тернары локали/сортировки (NewsPage/RatesBar/EdaDirectory `CITY_ORDER`) получили en-ветки.

**Агент:** `.claude/agents/en-translator.md` (тип `en-translator` доступен в НОВЫХ сессиях; в той, где создавал, запускал как general-purpose с инлайн-правилами). Раскатка как с фото [[photo-agent-fanout]]: батчи + мой QA.

**Дефолт-свитч на en (`e6a868e`):** `DEFAULT_LANG='en'` (types.ts). Роутинг: `src/pages/*` = en (корень), `src/pages/ru/*` = ru (rename из `pages/en` + флип lang-токенов), `pages/uk/*` = uk. Путь БЕЗ префикса = en; ru/uk — с префиксом. ru-контент: body-ссылки получили `/ru/`-префикс (sed `](/`→`](/ru/`), чтобы ru-страницы линковали ru, а не en-корень. `_redirects`: `/en/* → /:splat 301` (прежние /en/-URL переехали на корень). sitemap `defaultLocale='en'`, x-default→en. Хардкод «ru=дефолт» убран в Breadcrumbs/HomePage (→ DEFAULT_LANG/articleHref). При следующем локаль-свитче помнить: флип root-файлов + rename dir + content sweep противоположного языка + sitemap + _redirects.

**Осталось:** корпус переведён ✅, en-дефолт ✅. Следить за индексацией после locale-свопа (GSC: прежние ru-URL на корне теперь отдают en — Google пере-сопоставит через hreflang; ru на /ru/). ka (грузинский) 4-м языком — **НЕ делаем** (решение владельца 2026-06-16; en остаётся последним языком). Правила: [[update-docs-after-each-change]], [[article-content-standards]].
