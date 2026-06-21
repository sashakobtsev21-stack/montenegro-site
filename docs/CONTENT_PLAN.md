# CONTENT_PLAN.md — контент-план и трекер (Montenegro Guidebook)

Рабочий план и трекер: какие кластеры/темы ведём, что опубликовано, что в очереди.
Источник правил написания — `CONTENT_GUIDE.md` (как добавлять статью) и `SPEC.md` → `CLAUDE.md` → `docs/STRATEGY.md` (продукт/ниша/стратегия). Детальный кластерный план с целевыми EN-запросами и денежными связками — `docs/MONTENEGRO-ANALYSIS-2026-06-20.md` §5. Этот файл — **что писать и в каком порядке**.

- **Статусы:** ✅ готово (опубликовано, гейты зелёные) · 🟡 в работе · ⬜ план (ещё нет).
- **Языки (EN-first):** каждая тема = **en (ведущий)** + ru + uk, одинаковый slug. URL: en на корне `/<category>/<slug>/`, ru → `/ru/…`, uk → `/uk/…`. EN пишется первым и задаёт целевой запрос.
- **Опубликован первый кластер (5 статей, 2026-06-21):** `montenegro-travel-guide`, `best-time-to-visit-montenegro`, `renting-a-car-in-montenegro`, `cost-of-living-in-montenegro`, `durmitor-national-park` — все en/ru/uk, обложка+3 figure, кластер-перелинковка, гейты зелёные (`qa` = GO). Остальное ниже — ⬜.

---

## 0. Стратегическое направление (из `docs/STRATEGY.md`)

- **EN-first / Tier-1 первично** (западные туристы и номады; дорогой RPM), CIS (ru/uk) — крепкий вторичный. Приоритет и подбор тем — от **EN-интента**.
- **«Value-Адриатика»** (дешевле Португалии/Хорватии; Албанию как «дороже» не подавать).
- **Приоритет кластеров:** Планирование → MONEY (аренда/страховка/eSIM) → Релокация/Номады (EN-first) → Достопримечательности/Города/Маршруты → Еда → Развлечения.
- **Анти-AIO:** усилие — в транзакционное / сравнения / visit-данные / опыт; тонкие справочные пачками не плодить.
- **YMYL (релокация/визы/налоги/страховка):** только офиц. источники (gov.me/MUP/PwC) + видимая дата + дисклеймер; не печатать меняющиеся правила как факт.
- **Моат [ОТКРЫТО]:** источник живого опыта (сезонная база/стрингер) — решение владельца (`STRATEGY` §5); влияет на глубину/доверие.
- **По данным:** домен ещё не куплен → нет GSC. После запуска — пересортировать очередь по реальному спросу (интерим — keyword-инструменты).

> Очередь ниже — гипотезы спроса; целевые EN-запросы пересортировать по GSC после запуска. Денежные связки — `SPEC.md` §16 (сегментация /go/ по языку: EN → SafetyWing/DiscoverCars/GetYourGuide/Booking; CIS → EKTA/Localrent/Aviasales).

---

## 1. ⭐ Планирование поездки — TRAFFIC (верх воронки, приоритет №1)

Топ воронки: ищут ПЕРЕД поездкой; ведут трафик вниз (маршруты/города/аренда/страховка). Правило: **каждая статья ссылается вниз** — минимум на `/routes/`, `/cities/`, `/car-rental/`, `/insurance/` (где уместно). Категория `planning`.

| Тема | Целевой EN-запрос | Тип | Ссылается вниз на | Статус |
|---|---|---|---|---|
| Pillar: гид по Черногории | montenegro travel guide / is montenegro worth visiting | TRAFFIC | всё MONEY-ядро | ✅ `montenegro-travel-guide` |
| Когда ехать (сезоны) | best time to visit montenegro | TRAFFIC | города, развлечения (пляжи/горы), маршруты | ✅ `best-time-to-visit-montenegro` |
| Как добраться / аэропорты | how to get to montenegro / dubrovnik to montenegro | TRAFFIC | трансфер, транспорт, аренда | ⬜ |
| Передвижение по стране | getting around montenegro | TRAFFIC→MONEY | аренда авто, маршруты | ⬜ |
| Бюджет поездки | montenegro trip cost / budget | TRAFFIC | аренда, страховка, eSIM, еда | ⬜ |

## 2. 🔥 Аренда авто — MONEY (приоритет; Черногория — авто-страна)

Опорная + аэропорт-спицы + тематические. Монетизация: **DiscoverCars** (EN, 70%/365дн) + **Localrent** (СНГ) через `/go/`.

| Тема | Целевой EN-запрос | Slug (`/car-rental/…`) | Статус |
|---|---|---|---|
| Pillar: аренда авто | car rental in montenegro / renting a car montenegro | `renting-a-car-in-montenegro` | ✅ |
| Аэропорт Тиват | tivat airport car rental | `tivat-airport` *(предв.)* | ⬜ |
| Аэропорт Подгорица | podgorica airport car rental | `podgorica-airport` *(предв.)* | ⬜ |
| Вождение в Черногории | driving in montenegro / serpentine roads | `driving-in-montenegro` *(предв.)* | ⬜ |

## 3. 🔥 Страховка — MONEY (рекуррентная, круглогодичная)

Монетизация: **SafetyWing** (EN, 10% рекуррентно) / **EKTA** (СНГ/UA, ~20%). YMYL — Черногория НЕ требует страховку для въезда (не выдумывать «обязательность»); рекомендательно + евро/Шенген + офиц. источник.

| Тема | Целевой EN-запрос | Slug (`/insurance/…`) | Статус |
|---|---|---|---|
| Pillar: travel-страховка | montenegro travel insurance | `montenegro-travel-insurance` *(предв.)* | ⬜ |
| Страховка номада/долгого пребывания | digital nomad insurance montenegro | `nomad-insurance` *(предв.)* | ⬜ |
| Для СНГ/UA (ru/uk) | страховка в черногорию | (тот же slug, EKTA) | ⬜ |

## 4. 🔥 eSIM / связь — MONEY (круглогодичная)

Монетизация: **Airalo** (10%) / **Saily** (15%, дешевле для EN).

| Тема | Целевой EN-запрос | Slug | Статус |
|---|---|---|---|
| Pillar: eSIM/SIM | best esim for montenegro / sim card montenegro | `esim-montenegro` *(предв., категория transport или planning)* | ⬜ |

## 5. ⭐ Релокация / Номады — MONEY (EN-first, поднят в приоритет)

Менее сезонно, дороже RPM, рекуррент. Категория `relocation` (+ хаб RelocationHub). **YMYL:** только офиц. источники (gov.me/MUP/PwC) + дата + дисклеймер; порог дохода номад-визы — формулой («≈3× минзарплаты»), не фикс-числом; евро.

| Тема | Целевой EN-запрос | Тип | Денежная связка | Статус |
|---|---|---|---|---|
| Pillar: переезд | moving to montenegro / living in montenegro | MONEY | Wise + хаб | ⬜ |
| Стоимость жизни | cost of living in montenegro | MONEY | Wise, eSIM, страховка | ✅ `cost-of-living-in-montenegro` |
| Номад-виза | montenegro digital nomad visa | MONEY (YMYL) | SafetyWing рекуррент, лид-ген | ⬜ |
| Регистрация компании | register company in montenegro / open d.o.o. | MONEY (YMYL) | лид-ген, Wise бизнес | ⬜ |
| Налоги для иностранцев | montenegro taxes for foreigners | MONEY (YMYL) | лид-ген, Wise | ⬜ |
| ВНЖ/резидентство | montenegro residence permit | MONEY (YMYL) | лид-ген | ⬜ |
| Жизнь по городам | living in tivat / budva / podgorica | MONEY | недвижимость, Wise | ⬜ |

> Подкластер **«register company / taxes for foreigners»** — реалистичный EN-вход (анализ §4: там в основном юрфирмы, мало нейтрального контента).

## 6. Достопримечательности — TRAFFIC (каталог, `attractions`)

Монетизация: **GetYourGuide/Viator** (туры, 8%). Регион: `coastal`/`central`/`northern`.

| Тема | Целевой EN-запрос | Регион | Статус |
|---|---|---|---|
| Pillar: что посмотреть | things to do in montenegro | — | ⬜ |
| Залив/Старый город Котор | kotor old town / bay of kotor | coastal | ⬜ |
| Дурмитор + Тара | durmitor national park / tara canyon | northern | ✅ `durmitor-national-park` |
| Свети-Стефан | sveti stefan | coastal | ⬜ |
| Скадарское озеро | lake skadar | central | ⬜ |
| Монастырь Острог | ostrog monastery | central | ⬜ |
| Ловчен + мавзолей Негоша | lovcen / njegos mausoleum | central | ⬜ |

## 7. Города — TRAFFIC (`cities/`)

Монетизация: **Booking** (отели, ~4%), туры. Города директории еды — Budva/Kotor/Podgorica.

| Тема | Целевой EN-запрос | Slug | Статус |
|---|---|---|---|
| Котор | kotor travel guide | `kotor` | ⬜ |
| Будва | budva guide / what to do in budva | `budva` | ⬜ |
| Тиват (Porto Montenegro) | tivat / porto montenegro | `tivat` | ⬜ |
| Подгорица | podgorica guide | `podgorica` | ⬜ |
| Херцег-Нови | herceg novi guide | `herceg-novi` | ⬜ |
| Цетине | cetinje | `cetinje` | ⬜ |
| Жабляк (Дурмитор) | zabljak / durmitor town | `zabljak` | ⬜ |

## 8. Маршруты — TRAFFIC→MONEY (AIO-стойкий, приоритетный EN-вход)

Монетизация: **DiscoverCars** + отели. Коллекция `routes/`.

| Тема | Целевой EN-запрос | Slug (`/routes/…`) | Статус |
|---|---|---|---|
| Pillar: road trip | montenegro road trip itinerary | `montenegro-road-trip` | ⬜ |
| 7 дней | montenegro 7 day itinerary | `montenegro-7-days` *(предв.)* | ⬜ |
| Кольцо Дурмитора | durmitor ring road | `durmitor-ring` *(предв.)* | ⬜ |
| Бока день-трип | bay of kotor day trip | `boka-kotorska-day-trip` | ⬜ |

## 9. Еда — TRAFFIC + прямые размещения (`eda/` = `restaurants/` + статьи)

Кухня — черногорская/адриатическая (морепродукты, гриль, негушский пршут, вино Vranac). Города директории — Budva/Kotor/Podgorica.

| Тема | Целевой EN-запрос | Где | Статус |
|---|---|---|---|
| Что попробовать (кухня) | montenegrin food / what to eat in montenegro | `food/what-to-eat` | ⬜ |
| Где поесть по городам | best restaurants in kotor / budva | гайды по городам (`where-to-eat-budva`/`-kotor`/`-podgorica`) | ⬜ |
| Карточки заведений | — | `restaurants/` (метка «Проверено» обязательна, CONTENT_GUIDE §13) | ⬜ |

## 10. Развлечения / события — TRAFFIC (`entertainment/`)

Афиша (Sea Dance/KotorArt) — **SEO-магнит** (тикетинг-партнёрок нет); монетизация жильём/авто/турами.

| Тема | Целевой EN-запрос | razvlType | Статус |
|---|---|---|---|
| Пляжи | best beaches in montenegro | mesta | ⬜ |
| События/афиша | sea dance festival / kotorart | afisha | ⬜ |
| Ночная жизнь Будвы | budva nightlife | nochnaya-zhizn | ⬜ |
| Казино | montenegro casinos | kazino | ⬜ |

---

## 11. Стартовая очередь (первые материалы, EN-first)

Порядок исполнения (certainty-first, по приоритету кластеров + AIO-стойкости):

1. ✅ **Pillar «montenegro travel guide»** (Планирование) — ведёт вниз на всё ядро.
2. ✅ **«best time to visit montenegro»** (Планирование) — высокий спрос, ведёт на сезонные разделы.
3. ✅ **«renting a car in montenegro»** (MONEY, аренда) — ключевой денежный, авто-страна.
4. ✅ **«durmitor national park»** (Достопримечательности) — кластер-партнёр гида/сезона/аренды; туры (взят вместо road-trip как опорная точка перелинковки; road-trip — следующим).
5. ✅ **«cost of living in montenegro»** (Релокация) — дорогой EN-интент, круглогодичный.

> **Готово 2026-06-21:** пункты 1–5 (первый кластер, 15 файлов en/ru/uk, `qa` = GO). Дальше:

6. ⬜ **«montenegro road trip itinerary»** (Маршруты) — AIO-стойкий коммерческий EN-вход.
7. ⬜ **«kotor travel guide»** + **«budva guide»** (Города) — топ-направления, отели/туры.
8. ⬜ **«montenegro travel insurance»** (MONEY, страховка) — рекуррент.
9. ⬜ **«things to do in montenegro» / «bay of kotor»** (Достопримечательности) — туры.

После 8–10 материалов и покупки домена — подключить GSC, снять baseline, пересортировать очередь по реальному спросу.

---

## 12. Предусловия к контенту (не блокеры плана, но важны)

- **Hero-картинки и `og-default`** — пока грузинские заглушки (`src/assets/hero/*.jpg`, `public/og-default.jpg`); заменить на кадры Черногории (Бока-Которска, Дурмитор, Свети-Стефан, Будва, Ловчен).
- **Партнёрки** — добавить в `partners.json`: DiscoverCars, GetYourGuide/Viator, Booking (опц. Wise/Saily); починить EKTA-атрибуцию (`SPEC.md` §16).
- **Брифы** — на каждую статью `briefs/<slug>.md` (ключевой EN-запрос, вопросы читателя, факты владельца, цены €, фото). Образцы структуры — `docs/_georgia-reference/briefs/`.
- **Домен** — купить (предусловие к GSC/деплою).
