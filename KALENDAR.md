# Контент-календарь Черногория — 24.06.2026 – 23.09.2026 (~3 статьи/нед)
Фон: /news по графику (сбор → фильтр → превью владельцу → «ок» → публикация; см. «News schedule» ниже — НЕ слепой daily). Замеры GA/GSC — по понедельникам (15 мин).

**Статус публикаций (сверено с `src/content` 23.06.2026):** опубликовано **14 статей плана** (kotor, podgorica, budva, tivat, how-many-days-in-montenegro, durmitor-national-park, best-time-to-visit-montenegro, lake-skadar, ostrog-monastery, cost-of-living-in-montenegro, montenegro-travel-guide, montenegro-travel-insurance, budva-nightlife, renting-a-car-in-montenegro) + **1 маршрут** (bay-of-kotor-coast) + **3 ресторана** (cave-coffee-kotor, konoba-scala-santa, restaurant-galion). Новости вне счётчика плана (exit-festival-montenegro-2026, montenegro-airports-summer-2026 — категория news). Пометка `[x] ОПУБЛИКОВАНО` ниже = слот примирён с фактическим slug.

**Опубликовано вне 13-недельного плана (сироты, помечены `[x]`):** `montenegro-travel-guide` (planning, зонтичный гид), `montenegro-travel-insurance` (insurance, YMYL/деньги), `budva-nightlife` (entertainment), `cost-of-living-in-montenegro` (relocation — см. примирение W11), `lake-skadar` (attractions — см. примирение W9), 3 ресторана директории еды (`cave-coffee-kotor`, `konoba-scala-santa`, `restaurant-galion`). Это легитимный опубликованный контент; внесены в учёт, чтобы план = реальность.

## News schedule (Montenegro)
- **Дни: Пн + Ср + Пт** (Mon + Wed + Fri). НЕ daily.
- Near-daily — только в виде исключения: летние фестивали (Sea Dance / Kotor Carnival / регаты Боки) или крупное изменение правил (визы/въезд/налоги).
- Механика: collect → filter → **owner preview → OK → publish**. Если ничего не прошло фильтр — skip (день пропускаем, не публикуем ради публикации).
- Даты/числа — только из источника текущего года; кросс-фактчек (дата/место/год/реальность) перед превью. План корректируется по GA: растущие хабы усиливаем смежными статьями и перелинковкой; недобирающие темы сдвигаем вниз очереди; сезонные окна не двигаем. Темп: Ср / Пт / Вс. Очередь: P0 → P1 → P2. Слаги — английские, из SEO-отчёта.

## Неделя 1 (24–30.06) — Старт хаба: Котор/Бока + ядро воронки
- 📰 Ср 24.06 — /news (дайджест) · сбор → фильтр → превью владельцу → «ок» → публикация
- 📰 Пт 26.06 — /news (дайджест) · сбор → фильтр → превью владельцу → «ок» → публикация
- _Дни новостей W1: Пн нет (старт хаба, первый замер GA — Пн 29.06 в W2); Ср 24.06 + Пт 26.06._
- ✅ Ср 24.06 — [Статья] Kotor, Montenegro: Old Town, Walls & Bay Guide · `kotor montenegro` · /cities/kotor/ · категория **cities** (город Котор, 13 фото CC Wikimedia) · 💰 trip-hotels / trip-tours · **опубликовано 2026-06-22**, пара en/ru, `npm run qa` = GO. _(Реализовано как статья-ГОРОД `category=cities`, англ. слаг `kotor` — по стандарту репо «город = cities», а не план. слаг `things-to-do-in-kotor`/`goroda`. Перелинк: Подгорица, Montenegro guide, best-time, Durmitor, аренда авто, хаб /cities/; доперелинковать на itinerary/boat tour/Perast после их публикации.)_
- ⭐ **P0 ПРИОРИТЕТ #1 (head-term, не опубл. — вынести вперёд)** · Пт 26.06 — [Статья] Montenegro Itinerary: The Perfect 7 Days (2026 Road Trip) · `montenegro 7 day itinerary` · /montenegro-7-day-itinerary/ · категория routes · фото ≥5 · 💰 аренда авто / отели · перелинк: → Kotor (W1), → Car rental (W3), → How many days in Montenegro (опубл., сателлит), → 5-day (W10, сателлит), → 3-day (W10, сателлит). _**Канонический itinerary-хаб кластера.** #1 запрос воронки, в плане с W1 но ещё НЕ опубликован — высший приоритет публикации. Все остальные itinerary-страницы (how-many-days опубл., 5-day, 3-day) сводятся к этому хабу как сателлиты и линкуются на него (см. «Консолидация itinerary-кластера» в метаданных)._
- Вс 28.06 — [Статья] Bay of Kotor Boat Tour: Perast, Our Lady of the Rocks & Blue Cave · `bay of kotor boat tour` · /bay-of-kotor-boat-tour/ · категория attractions · фото ≥5 · 💰 лодочные туры · перелинк: → Kotor (W1), → Perast & Our Lady of the Rocks (W4)
- ⭐ **P0 head-term (вставка по аудиту, ближайшее окно W1–W2 — приоритет подтверждён)** — [Статья] Things to Do in Montenegro: Top Experiences & Highlights · `things to do in montenegro` · /things-to-do-in-montenegro/ · категория attractions (country-level head-term) · фото ≥5 · 💰 туры / отели · перелинк: → Kotor (W1), → Montenegro 7-day itinerary (W1), → Best beaches in Montenegro (W2), → Durmitor (W5). _Крупнейший необслуженный country-level head-term: сейчас обслужен только косвенно через Kotor/itineraries. Ставим рано как зонтичную страницу-хаб верхней воронки. Приоритет проверен: вместе с 7-day и things-to-do образуют верхушку воронки — публикуются прежде узких/нишевых тем._
- 🆕 **ВСТАВКА P0 (КРИТИЧЕСКИЙ ПРОБЕЛ — въезд/виза/ETIAS, поставить ДО ОКТЯБРЯ)** — [Статья] Montenegro Entry Requirements: Visa, ETIAS & Border (2026) · `montenegro entry requirements` · /planning/montenegro-entry-requirements/ · категория **planning** · фото ≥5 · 💰 страховка · перелинк: → Montenegro travel guide (опубл.), → How many days in Montenegro (опубл.), → Best time to visit (опубл.), → Montenegro travel insurance (опубл.). _**Темы НЕ БЫЛО во всём 13-недельном плане вовсе** — критический пробел верхней воронки. Высокочастотный планировочный запрос; **ETIAS для шенгена стартует в конце 2026** (Черногория вне ЕС/Шенгена, но турист часто въезжает через Дубровник/HR — пояснить связь визы Шенгена/ETIAS и безвиза в Черногории до 90 дней). YMYL: только официальные источники (gov.me / MUP / EU ETIAS) + видимая дата проверки + дисклеймер, правила не печатать как фикс-факт. Окно — до октября (вынесено в W1), чтобы статья индексировалась к старту ETIAS._

## Неделя 2 (01–07.07) — Столица + пляжный хаб
- Пн 29.06 — 📊 Замер GA/GSC (первый замер: базовые показы/индексация стартовых страниц) + 📰 /news (дайджест)
- 📰 Ср 01.07 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 03.07 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W2: Пн 29.06 (с замером) + Ср 01.07 + Пт 03.07._
- ✅ Ср 01.07 — [Статья] Podgorica Travel Guide: Capital of Montenegro · `podgorica montenegro` · /podgorica-travel-guide/ · категория **cities** (СТОЛИЦА; 15 фото: cover + 14, все CC Wikimedia) · 💰 отели (HotelWidget) / аренда авто · опубликовано 2026-06-22, пара en/ru, `npm run qa` = GO. _(перелинк W1/W6 — на ещё не опубликованные статьи; временно слинковано на montenegro-travel-guide, best-time, car-rental, durmitor + хаб /cities/; доперелинковать на itinerary/airport после публикации.)_
- ⭐ **P0 head-term (вынесен вперёд)** · Пт 03.07 — [Статья] Best Beaches in Montenegro (2026) · `best beaches in montenegro` · /best-beaches-in-montenegro/ · категория attractions · фото ≥5 · 💰 отели · перелинк: → Budva (опубл.), → Tivat (опубл.), → Sveti Stefan (W4), → Things to do in Montenegro (W1). _Country-level head-term пляжного кластера; держим в W2 как опору beaches-хаба, прежде узких пляжных тем (Sveti Stefan)._
- ✅ Вс 05.07 — [Статья] How Many Days in Montenegro? (+ Is It Worth Visiting) · `how many days in montenegro` · /planning/how-many-days-in-montenegro/ · категория **planning** · 6 фото CC · 💰 trip-hotels · **опубликовано 2026-06-22**, пара en/ru, `npm run qa` = GO. _(По запросу владельца реализовано в `category=planning` (раздел `/planning/`), а не план. `routes`, и слаг с разделом `/planning/how-many-days-in-montenegro/`. Лид = прямой ответ (мин. 3–4 дня, идеал 5–7); разделы: стоит ли ехать / сколько дней по интересам (таблица) / планы 3·5·7 дней / когда ехать / как добраться, без FAQ. Перелинк: маршрут `bay-of-kotor-coast`, Montenegro guide, best-time, Котор, Подгорица, аренда авто + хаб `/planning/`. Добавлена в `showcasePicks`. Доперелинковать на 7-day/5-day/3-day itinerary и best beaches после их публикации.)_

## Неделя 3 (08–14.07) — Города-курорты + деньги (авто)
- Пн 06.07 — 📊 Замер GA/GSC (растущие страницы Котор/itinerary; правка title/meta по CTR) + 📰 /news (дайджест)
- 📰 Ср 08.07 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 10.07 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W3: Пн 06.07 (с замером) + Ср 08.07 + Пт 10.07._
- ✅ Ср 08.07 — [Статья] Budva, Montenegro: Old Town, Beaches & Nightlife · `budva montenegro` · /cities/budva/ · категория **cities** (город Будва, 13 фото CC Wikimedia — cover + 7 инлайн + 6 gallery) · 💰 trip-hotels / trip-tours · **опубликовано 2026-06-22**, пара en/ru, `npm run qa` = GO. _(Реализовано как статья-ГОРОД `category=cities`, англ. слаг `budva` — по стандарту репо «город = cities», а не план. слаг `/budva-travel-guide/`/`goroda`, как Котор/Подгорица. Добавлена 3-м пиком в витрину главной. Перелинк: Котор ×2, Подгорица, Montenegro guide, best-time, аренда авто, хаб /cities/; доперелинковать на Best beaches / Sveti Stefan / Tivat после их публикации.)_
- [x] **ОПУБЛИКОВАНО (slug: `tivat`)** · Пт 10.07 — [Статья] Tivat & Porto Montenegro Guide · `tivat montenegro` · категория **cities** (город Тиват) · 💰 отели / яхт-чартер · перелинк: → Budva (W3), → Yacht charter Montenegro (W12). _Опубл. как город `category=cities`, слаг `tivat` (по стандарту репо «город = cities»), не план. `/cities/tivat/`._
- [x] **ОПУБЛИКОВАНО (slug: `renting-a-car-in-montenegro`)** · Вс 12.07 — [Статья] Car Rental in Montenegro: Tips & Where to Book · `car rental montenegro` · категория **car-rental** · 💰 аренда авто / страховка · перелинк: → Montenegro 7-day itinerary (W1), → Driving in Montenegro (W6). _Slug выровнен с опубл.: план. `car-rental-montenegro` → факт `renting-a-car-in-montenegro` (опубл. `category=car-rental`). Канонический slug — `renting-a-car-in-montenegro`._
- ⭐ **ВСТАВКА P0 head-page (вынесена вперёд — accommodation-хаб)** — [Статья] Where to Stay in Montenegro: Best Areas & Towns · `where to stay in montenegro` · /where-to-stay-in-montenegro/ · категория attractions (planning, country-level head-term) · фото ≥5 · 💰 отели · перелинк: → Budva (опубл.), → Kotor (опубл.), → Tivat (опубл.), → Best beaches in Montenegro (W2), → Montenegro 7-day itinerary (W1). _**Зонтичный head-page «где остановиться»** — высокочастотный планировочный запрос, не покрыт; сводит города/районы (Бока vs Будванская ривьера vs север) в одну точку решения и кормит отельную монетизацию по всем городам. Канон accommodation-хаба._
- 🆕 **ВСТАВКА P1 (по аудиту, окно W3–W4)** — [Статья] Herceg Novi Travel Guide: Old Town, Forts & Riviera · `herceg novi montenegro` · /cities/herceg-novi/ · категория **cities** (город Херцег-Нови, ≥10 фото) · 💰 trip-hotels / trip-tours · перелинк: → Kotor (W1), → Things to do in Montenegro (W1), → Bay of Kotor coast road trip (W4). _Незакрытый базовый город побережья (есть Kotor/Budva/Tivat/Podgorica) — добираем гео-покрытие Боки._

## Неделя 4 (15–21.07) — Маршрут (road trip) + Бока-достопримечательности
- Пн 13.07 — 📊 Замер GA/GSC (конверсия денежной страницы car rental в GA; новые запросы из GSC) + 📰 /news (дайджест)
- 📰 Ср 15.07 — /news (дайджест, в этот день также выходит МАРШРУТ) · превью владельцу → «ок» → публикация
- 📰 Пт 17.07 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W4: Пн 13.07 (с замером) + Ср 15.07 + Пт 17.07._
- ✅ Ср 15.07 — [МАРШРУТ] Bay of Kotor & Coast Road Trip Itinerary · `bay of kotor road trip` · /routes/bay-of-kotor-coast/ · коллекция **routes** (МАРШРУТ — фото КАЖДОЙ остановки) · 💰 trip-carhire / trip-hotels · **опубликовано 2026-06-22**, пара en/ru, `npm run qa` = GO. _(Реализовано как первый маршрут коллекции `routes` (а не статья `category=routes`/слаг `montenegro-road-trip`) — по стандарту репо «маршрут = коллекция routes», стартовый пакет «маршрут Montenegro Road Trip / Bay of Kotor: фото каждой остановки». 6 остановок: Котор → Пераст/Богородица-на-Рифе → Будва → Свети-Стефан → Ловчен/мавзолей Негоша → Цетине опц.; days4/140км/€60; cover + 6 фото остановок + 2 инлайн-фигуры (9 CC-webp); геометрия OSRM запечена. Перелинк: Котор, Будва, Подгорица, аренда авто, best-time, Montenegro guide, хаб /routes/.)_
- Пт 17.07 — [Статья] Perast & Our Lady of the Rocks: Visiting Guide · `perast montenegro` · /perast-our-lady-of-the-rocks/ · категория attractions · фото ≥5 · 💰 лодочные туры · перелинк: → Bay of Kotor boat tour (W1), → Kotor (W1)
- ⭐ **ВСТАВКА P0 head-page (вынесена вперёд — getting-around-хаб)** · Ср 15.07 — [Статья] Getting Around Montenegro: Buses, Taxis, Car & Ferries · `getting around montenegro` · /getting-around-montenegro/ · категория attractions (practical, country-level транспортный head-term) · фото ≥5 · 💰 аренда авто / трансфер · перелинк: → Renting a car in Montenegro (опубл.), → Driving in Montenegro (W6), → Tivat vs Podgorica airport (W6), → Kotor to Budva bus (W4, сателлит). _**Зонтичный head-page транспортного хаба** — сейчас обслужен только узко (`kotor-to-budva-bus`, airports, car rental, driving), но нет country-level «как передвигаться по Черногории». Канон getting-around-хаба; все узкие транспортные страницы (kotor↔budva, airports, transfers) сводятся к нему._
- 🆕 **P1 сателлит getting-around-хаба (окно W4–W5)** — [Статья] Kotor to Budva: Bus, Taxi & Driving (How to Get There) · `kotor to budva bus` · /kotor-to-budva-bus/ · категория attractions (practical, intra-country транспорт) · фото ≥5 · 💰 аренда авто / трансфер · перелинк: → Getting around Montenegro (W4, хаб), → Car rental (опубл.), → Budva (опубл.), → Kotor (опубл.). _Узкий intra-country запрос «город↔город автобус»; сателлит зонтичной getting-around-страницы, якорь для серии Kotor↔X / Budva↔X._
- Вс 19.07 — [Статья] Sveti Stefan: What to Know Before You Go · `sveti stefan montenegro` · /sveti-stefan-montenegro/ · категория attractions · фото ≥5 · 💰 отели / туры · перелинк: → Best beaches in Montenegro (W2), → Budva (W3)

## Неделя 5 (22–28.07) — Нацпарки (Дурмитор) + Тара в сезоне
- Пн 20.07 — 📊 Замер GA/GSC (растёт ли Бока-хаб; усилить перелинковку на лидеров) + 📰 /news (дайджест)
- 📰 Ср 22.07 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 24.07 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W5: Пн 20.07 (с замером) + Ср 22.07 + Пт 24.07._
- [x] **ОПУБЛИКОВАНО (slug: `durmitor-national-park`)** · Ср 22.07 — [Статья] Durmitor National Park & Black Lake: Complete Guide · `durmitor national park` · категория **attractions** (`attractionType=gory-priroda`, `region=northern`) · 💰 аренда авто / туры · перелинк: → Bay of Kotor coast road trip (W4), → Tara canyon rafting (W5)
- Пт 24.07 — [Статья] Tara Canyon: Rafting, Zipline & Viewpoints · `tara canyon montenegro` · /tara-canyon-rafting/ · категория attractions · фото ≥5 · 💰 туры · перелинк: → Durmitor national park (W5), → Best day trips from Kotor (W7)
- Вс 26.07 — [Статья] Kotor City Walls & Fortress of San Giovanni · `kotor city walls` · /kotor-city-walls-fortress/ · категория attractions · фото ≥5 · 💰 нет · перелинк: → Kotor (W1), → Bay of Kotor boat tour (W1)

## Неделя 6 (29.07–04.08) — Логистика (вождение/аэропорты) + лучшее время
- Пн 27.07 — 📊 Замер GA/GSC (рост Durmitor/parks-хаба; добавить смежную статью если растёт) + 📰 /news (дайджест)
- 📰 Ср 29.07 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 31.07 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W6: Пн 27.07 (с замером) + Ср 29.07 + Пт 31.07._
- Ср 29.07 — [Статья] Driving in Montenegro: Rules, Roads & Parking · `driving in montenegro` · /driving-in-montenegro/ · категория attractions (practical) · фото ≥5 · 💰 аренда авто · перелинк: → Car rental Montenegro (W3), → Bay of Kotor coast road trip (W4)
- Пт 31.07 — [Статья] Tivat vs Podgorica Airport: Which to Fly Into · `tivat airport montenegro` · /tivat-vs-podgorica-airport/ · категория attractions (practical) · фото ≥5 · 💰 трансфер / аренда авто · перелинк: → Driving in Montenegro (W6), → Montenegro airport transfers (W7)
- [x] **ОПУБЛИКОВАНО (slug: `best-time-to-visit-montenegro`)** · Вс 02.08 — [Статья] Best Time to Visit Montenegro (Month by Month) · `best time to visit montenegro` · категория **planning** · 💰 отели · перелинк: → Montenegro 7-day itinerary (W1), → Montenegro weather by month (W8). _Опубл. как `category=planning` (не план. attractions), слаг `best-time-to-visit-montenegro`._

## Неделя 7 (05–11.08) — Day trips из Котора + трансферы
- Пн 03.08 — 📊 Замер GA/GSC (растущие запросы GSC → в очередь P1/P2; CTR planning-страниц) + 📰 /news (дайджест)
- 📰 Ср 05.08 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 07.08 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W7: Пн 03.08 (с замером) + Ср 05.08 + Пт 07.08._
- Ср 05.08 — [Статья] Best Day Trips from Kotor · `day trips from kotor` · /day-trips-from-kotor/ · категория routes · фото ≥5 · 💰 туры / аренда авто · перелинк: → Kotor (W1), → Lovcen national park (W7)
- Пт 07.08 — [Статья] Lovcen National Park & Njegoš Mausoleum · `lovcen national park` · /lovcen-national-park/ · категория attractions · фото ≥5 · 💰 туры / аренда авто · перелинк: → Best day trips from Kotor (W7), → Durmitor national park (W5)
- Вс 09.08 — [Статья] Airport Transfers in Montenegro (Tivat, Podgorica, Dubrovnik) · `montenegro airport transfer` · /montenegro-airport-transfers/ · категория attractions (practical) · фото ≥5 · 💰 трансфер · перелинк: → Tivat vs Podgorica airport (W6), → Dubrovnik to Kotor (W8)

## Неделя 8 (12–18.08) — Гейтвей из Дубровника + погода
- Пн 10.08 — 📊 Замер GA/GSC (конверсия трансфер/туры в GA; усилить лидера хаба) + 📰 /news (дайджест)
- 📰 Ср 12.08 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 14.08 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W8: Пн 10.08 (с замером) + Ср 12.08 + Пт 14.08._
- Ср 12.08 — [Статья] Dubrovnik to Kotor: How to Get There · `dubrovnik to kotor` · /dubrovnik-to-kotor/ · категория routes (practical) · фото ≥5 · 💰 трансфер / туры · перелинк: → Montenegro airport transfers (W7), → Dubrovnik to Montenegro day trip (W8)
- Пт 14.08 — [Статья] Dubrovnik to Montenegro Day Trip: Bus, Ferry or Tour · `dubrovnik to montenegro day trip` · /dubrovnik-to-montenegro-day-trip/ · категория routes · фото ≥5 · 💰 туры / трансфер · перелинк: → Dubrovnik to Kotor (W8), → Best day trips from Kotor (W7)
- Вс 16.08 — [Статья] Montenegro Weather by Month · `montenegro weather by month` · /montenegro-weather-by-month/ · категория attractions (planning) · фото ≥5 · 💰 нет · перелинк: → Best time to visit Montenegro (W6), → Montenegro in September (W9)

## Неделя 9 (19–25.08) — Сентябрьское окно + озёра/монастырь
- Пн 17.08 — 📊 Замер GA/GSC (готовность сентябрьского спроса; растущие planning-запросы) + 📰 /news (дайджест)
- 📰 Ср 19.08 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 21.08 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W9: Пн 17.08 (с замером) + Ср 19.08 + Пт 21.08._
- Ср 19.08 — [Статья] Montenegro in September: Worth It? (Sea, Crowds, Prices) · `montenegro in september` · /montenegro-in-september/ · категория attractions (seasonal — окно перед сентябрём) · фото ≥5 · 💰 отели · перелинк: → Best time to visit Montenegro (W6), → Best beaches in Montenegro (W2)
- [x] **ОПУБЛИКОВАНО (slug: `lake-skadar`)** · Пт 21.08 — [Статья] Lake Skadar: Boat Tours, Wine & Viewpoints · `lake skadar montenegro` · категория **attractions** (`attractionType=vodopady-kanony-ozera`, `region=central`) · 💰 туры · перелинк: → Best day trips from Kotor (W7), → Ostrog monastery (W9)
- ✅ Вс 23.08 — [Статья] Ostrog Monastery: How to Visit Montenegro's Cliff Shrine · `ostrog monastery` · /attractions/ostrog-monastery/ · категория **attractions** (`attractionType=hramy-monastyri`, `region=central`; 5 фото CC Wikimedia: cover + 4 инлайн, все webp ≤200КБ) · 💰 trip-tours · **опубликовано 2026-06-22**, пара en/ru, `npm run qa` = GO. _(Лид = прямой ответ: монастырь в отвесной скале, главная святыня Черногории, мощи Св. Василия. Разделы: что это/история (†1671) · верхний монастырь и мощи · нижний монастырь и подъём 3 км (босиком) · как добраться (~50 км от Подгорицы, серпантин, парковки) · дресс-код/часы (ориентир + «уточняйте», вход свободный). Факты: Wikipedia / montenegro.travel / montenegropulse. Перелинк: ↔ Durmitor (встречная ссылка добавлена), → Подгорица, Montenegro guide, аренда авто + хаб /attractions/. Lake Skadar (W9) ещё не опубликован — доперелинковать после. Добавлен в `showcasePicks` главной.)_

## Неделя 10 (26.08–01.09) — Итинерари добивка + nomad-старт
- Пн 24.08 — 📊 Замер GA/GSC (что из parks/seasonal растёт; добавить смежное по данным) + 📰 /news (дайджест)
- 📰 Ср 26.08 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 28.08 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W10: Пн 24.08 (с замером) + Ср 26.08 + Пт 28.08._
- 🔁 **САТЕЛЛИТ itinerary-кластера (fold к 7-day хабу)** · Ср 26.08 — [Статья] 5 Days in Montenegro: Coast & Mountains Itinerary · `montenegro 5 day itinerary` · /montenegro-5-day-itinerary/ · категория routes · фото ≥5 · 💰 аренда авто · перелинк: → **Montenegro 7-day itinerary (W1, канон-хаб — обязательная ссылка)**, → How many days in Montenegro (опубл.), → 3-day (W10). _Сателлит канонического 7-day хаба: каноникал/перелинк наверх к 7-day; если объём не подтвердится по GSC — fold в 7-day секцией, не отдельной страницей._
- 🔁 **САТЕЛЛИТ itinerary-кластера (fold к 7-day хабу)** · Пт 28.08 — [Статья] 3 Days in Montenegro: First-Timer's Itinerary · `3 days in montenegro` · /3-days-in-montenegro/ · категория routes · фото ≥5 · 💰 туры / трансфер · перелинк: → **Montenegro 7-day itinerary (W1, канон-хаб — обязательная ссылка)**, → 5-day (W10), → Dubrovnik to Montenegro day trip (W8). _Сателлит канонического 7-day хаба: каноникал/перелинк наверх к 7-day; если объём не подтвердится по GSC — fold в 7-day секцией, не отдельной страницей._
- Вс 30.08 — [Статья] Montenegro Digital Nomad Visa 2026: Requirements & Process · `montenegro digital nomad visa` · /montenegro-digital-nomad-visa/ · категория attractions (relocation) · фото ≥5 · 💰 страховка / long-stay аренда · перелинк: → Cost of living Montenegro (W11), → Living in Montenegro nomad (W11)

## Неделя 11 (02–08.09) — Relocation/long-stay хаб
- Пн 31.08 — 📊 Замер GA/GSC (всплеск осеннего nomad-спроса; CTR визовой страницы) + 📰 /news (дайджест)
- 📰 Ср 02.09 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 04.09 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W11: Пн 31.08 (с замером) + Ср 02.09 + Пт 04.09._
- [x] **ОПУБЛИКОВАНО (slug: `cost-of-living-in-montenegro`)** · Ср 02.09 — [Статья] Cost of Living in Montenegro (2026 Budget Breakdown) · `cost of living montenegro` · категория **relocation** · 💰 long-stay аренда / страховка · перелинк: → Montenegro digital nomad visa (W10), → Is Montenegro expensive (W12). _Slug выровнен с опубл.: план. `cost-of-living-montenegro` → факт `cost-of-living-in-montenegro` (опубл. `category=relocation`). Канонический slug — `cost-of-living-in-montenegro`._
- ⬇️ **ДЕПРИ / кандидат на трим (низкий объём)** · Пт 04.09 — [Статья] Living in Budva vs Tivat vs Podgorica for Remote Workers · `living in montenegro` · /living-in-montenegro-nomad/ · категория attractions (relocation) · фото ≥5 · 💰 long-stay аренда · перелинк: → Cost of living in Montenegro (опубл.), → Montenegro digital nomad visa (W10) · ⚠️ **депри: низкий объём, нишевый запрос** — публиковать ТОЛЬКО если освобождается слот и GSC покажет спрос; иначе fold в cost-of-living (опубл.) секцией. Не двигать вперёд голов/P0.
- ⬇️ **ДЕПРИ / кандидат на трим (низкий объём)** · Вс 06.09 — [Статья] Coworking & Coliving in Montenegro · `coworking montenegro` · /coworking-coliving-montenegro/ · категория attractions (relocation) · фото ≥5 · 💰 коворкинг / коливинг · перелинк: → Living in Montenegro nomad (W11), → Montenegro digital nomad visa (W10) · ⚠️ **депри: низкий объём, нишевый запрос** — публиковать ТОЛЬКО при свободном слоте и подтверждённом спросе GSC; иначе fold в nomad-хаб. Не двигать вперёд голов/P0.

## Неделя 12 (09–15.09) — Деньги-страницы (бюджет, eSIM, чартер)
- Пн 07.09 — 📊 Замер GA/GSC (конверсия nomad-хаба; растущие запросы → очередь) + 📰 /news (дайджест)
- 📰 Ср 09.09 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 11.09 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W12: Пн 07.09 (с замером) + Ср 09.09 + Пт 11.09._
- Ср 09.09 — [Статья] Is Montenegro Expensive? Trip Cost & Daily Budget (2026) · `is montenegro expensive` · /montenegro-trip-cost-budget/ · категория attractions (practical) · фото ≥5 · 💰 отели / страховка · перелинк: → Cost of living Montenegro (W11), → Best eSIM for Montenegro (W12)
- Пт 11.09 — [Статья] Best eSIM for Montenegro: Plans Compared · `esim montenegro` · /best-esim-montenegro/ · категория attractions (practical) · фото ≥5 · 💰 eSIM · перелинк: → Is Montenegro expensive (W12), → Is Montenegro safe (W13)
- ⬇️ **ДЕПРИ / кандидат на трим (низкий объём)** · Вс 13.09 — [Статья] Sailing & Yacht Charter in Montenegro (Bay of Kotor) · `yacht charter montenegro` · /yacht-charter-montenegro/ · категория attractions · фото ≥5 · 💰 яхт-чартер · перелинк: → Tivat (опубл.), → Bay of Kotor boat tour (W1) · ⚠️ **депри: низкий объём, узкий спрос** — высокая монетизация, но мало запросов; публиковать в самом конце окна или fold в Tivat/Porto Montenegro секцией. Не двигать вперёд голов/P0.

## Неделя 13 (16–23.09) — Сравнения, безопасность, закрытие пробелов
- Пн 14.09 — 📊 Замер GA/GSC (квартальный итог: топ-страницы, лучшие связки, план Q4) + 📰 /news (дайджест)
- 📰 Ср 16.09 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- 📰 Пт 18.09 — /news (дайджест, в этот день также выходит статья) · превью владельцу → «ок» → публикация
- _Дни новостей W13: Пн 14.09 (с замером) + Ср 16.09 + Пт 18.09._
- Ср 16.09 — [Статья] Montenegro vs Croatia: Which to Visit · `montenegro vs croatia` · /montenegro-vs-croatia/ · категория attractions (comparison) · фото ≥5 · 💰 нет · перелинк: → Dubrovnik to Montenegro day trip (W8), → Montenegro 7-day itinerary (W1)
- Пт 18.09 — [Статья] Is Montenegro Safe for Tourists? · `is montenegro safe` · /is-montenegro-safe/ · категория attractions (practical) · фото ≥5 · 💰 страховка · перелинк: → Is Montenegro expensive (W12), → Driving in Montenegro (W6)
- Вс 20.09 — [Статья] Перелинк-ревизия + обновление хабовых статей по данным GA (без новой публикации): достроить внутренние ссылки между 5 хабами, обновить цены/расписания 2026 на топ-страницах, отметить кандидатов на сезонную переработку для лета-2027 · перелинк: укрепить itinerary-хаб ↔ деньги-страницы (авто/туры/eSIM/чартер)

> На будущее (вне 13-недельного окна): зимний ski-контент Жабляк/Дурмитор — публиковать окт-ноя 2026 (сезон дек-март); планировочные кластеры best time / itinerary / beaches / car rental для лета-2027 — обновить/переопубликовать фев-апр 2027; события (Sea Dance, Котор Карнавал, регаты Боки) — точечно через /news под проверенные даты года.

---
## Метаданные плана
**Стартовый пакет:**
- Неделя 1-3 (front-load, туристический хаб Котор/Бока в приоритете): столица Podgorica (cities, ≥15 фото) + ключевые города Kotor, Budva, Tivat (≥10 фото каждый) + маршрут Montenegro Road Trip / Bay of Kotor (фото каждой остановки)
- P0-ядро воронки (головы вперёд): **Montenegro 7-day itinerary (#1, канон itinerary-хаба, не опубл. — высший приоритет)**, Things to Do in Montenegro (country head-term), **Montenegro entry requirements / visa / ETIAS (новый критический пробел, до октября)**, **Where to stay in Montenegro (accommodation head-page)**, **Getting around Montenegro (транспортный head-page)**, Best beaches in Montenegro (head-term); опубл.: How many days, Kotor, Durmitor
- P0 деньги+логистика рано: Car rental (опубл. `renting-a-car-in-montenegro`), Bay of Kotor boat tour, Best time to visit (опубл.)
- **Консолидация itinerary-кластера (SEO):** один канонический хаб = **Montenegro 7-day itinerary**; сателлиты = 5-day (W10), 3-day (W10), how-many-days (опубл.) — каждый каноникал/линк наверх к 7-day; при неподтверждённом объёме fold сателлита секцией в 7-day, не плодить тонкие дубли.
- Тематические хабы для перелинковки: (1) Itinerary-хаб ← 7-day (канон) ← 5-day/3-day/how-many-days + все города/маршруты/нацпарки; (2) Kotor/Boka-хаб ← Perast, boat tour, day trips, city walls; (3) Beaches-хаб ← Budva, Tivat, Sveti Stefan, where-to-stay; (4) Getting-around-хаб ← getting-around (head) ← driving, airports, transfers, kotor↔budva; (5) Parks-хаб ← Tara, Lovcen, Skadar, Ostrog; (6) Planning/YMYL-хаб ← entry-requirements, best-time, how-many-days, where-to-stay
- **Дедуп/трим (депри, низкий объём):** living-in-budva-vs-tivat (W11), coworking-coliving (W11), yacht-charter (W12) — публиковать только при свободном слоте и спросе GSC, иначе fold; никогда не двигать вперёд голов/P0.
- Стартовый принцип перелинковки: каждая статья недели ссылается минимум на 1 уже опубликованную статью того же хаба и на itinerary-страницу верхней воронки

**Замеры:** Замер GA/GSC — каждый понедельник, 15 мин (первый замер Пн 29.06, т.к. Пн 22.06 раньше старта). Смотрим: топ-растущие страницы по кликам/показам в GSC, новые запросы с импрешенами без позиций (контент-пробелы), CTR проседающих страниц (правка title/meta), какие денежные связки (авто/туры/eSIM/чартер) реально конвертят в GA. Правила корректировки по данным GA: (1) если страница хаба растёт быстрее ожиданий — на следующей неделе добавляем смежную статью того же кластера и усиливаем внутреннюю перелинковку на неё; (2) если P0-тема не набирает показов за 3-4 недели — сдвигаем смежные темы вниз очереди, не плодим дубли; (3) растущие запросы из GSC, которых нет в плане, добавляем в очередь P1/P2 на ближайшее свободное окно; (4) сезонные окна (см. ниже) не двигаем по GA — они привязаны к календарю спроса. План недели фиксируется в воскресенье вечером на основе понедельничного замера прошлой недели.

**Сезонность:** Окно публикации июнь-сентябрь = пик высокого сезона побережья, поэтому в первые недели грузим спрос «здесь и сейчас» (Котор/Бока, пляжи, нацпарки, аренда авто, itinerary, boat tour) — это то, что ищут уже приехавшие/едущие. 'Montenegro in September' ставим на неделю 9 (19.08) — за ~2-3 недели до сентябрьского окна (sweet spot из отчёта: 'September' разгонять к июлю-августу). 'Best time to visit' и 'Weather by month' — evergreen, ставим в недели 6-10 как опору планирования следующего сезона. Рафтинг по Таре (апрель-октябрь) — в сезоне, ставим неделю 5. Digital-nomad/relocation (P1, evergreen со всплеском осенью) — недели 10-12, к осеннему всплеску планирования переезда; визу держим актуальной (программа заявлена до 31.12.2026). **Въезд/виза/ETIAS (entry-requirements, W1) — поставить ДО октября:** ETIAS для Шенгена стартует в конце 2026, статья должна быть проиндексирована к запуску (Черногория вне Шенгена — безвиз до 90 дней — но связь с ETIAS объяснить для въезжающих через HR/Дубровник); YMYL — официальные источники + дата проверки + дисклеймер, держать актуальной. ВЫХОДИТ ЗА 13-НЕДЕЛЬНОЕ ОКНО (отметить на будущее): сезонные планировочные кластеры 'best time / itinerary / beaches / car rental' для лета-2027 надо разгонять февраль-апрель 2027 (за 2-3 мес до окна) — переопубликовать/обновить; зимний ski-контент Жабляк/Дурмитор (декабрь-март) — публиковать октябрь-ноябрь 2026; события (Sea Dance, Котор Карнавал, регаты Боки) — точечно под даты года через /news, проверяя даты перед публикацией.

---
## Расширение плана — long-tail backlog (Этап 2, под трафик/рекламную модель)

> **Итог:** 47 слотов (отдедуплено против опубл. в `src/content` и 13-недельного плана). По кластерам: Cities/towns 8 · Attractions/POIs 9 · Itineraries 5 · Best time/weather+seasonal 6 · Budget 1 · Transport 6 · Food 3 · Day trips 1 · Comparisons/decision 5 · Practical 6 · EN-track 0 (весь backlog — EN-first, Tier-1 Запад). **Приоритет: EN-first, Tier-1; head → mid → long-tail внутри кластера.** Это очередь P1/P2 на свободные окна и под подтверждённый GSC-спрос — НЕ двигать вперёд голов/P0 из основного плана. ⚠ слоты с пометкой DEDUPE — согласовать с владельцем перед публикацией (риск двойной публикации с планом).

### Cities & towns
- [Статья] Ulcinj Travel Guide: Beaches, Old Town & Velika Plaza · key `ulcinj montenegro` · /ulcinj-montenegro/ · категория cities · фото≥10 (город) · 💰 отели · кластер cities-towns [mid]
- [Статья] Bar, Montenegro: Old Town, Port & Day Trips · key `bar montenegro` · /bar-montenegro/ · категория cities · фото≥10 (город) · 💰 отели / трансфер · кластер cities-towns [mid]
- [Статья] Cetinje Travel Guide: Old Royal Capital & Museums · key `cetinje montenegro` · /cetinje-montenegro/ · категория cities · фото≥10 (город) · 💰 туры · кластер cities-towns [mid]
- [Статья] Žabljak & Durmitor Base Town: Where to Stay in the North · key `zabljak montenegro` · /zabljak-montenegro/ · категория cities · фото≥10 (город) · 💰 отели · кластер cities-towns [mid]
- [Статья] Perast Travel Guide: Baroque Town on the Bay of Kotor · key `perast travel guide` · /perast-travel-guide/ · категория cities · фото≥10 (город) · 💰 отели · кластер cities-towns [mid] · ⚠ DEDUPE: разводить с план. attraction `perast-our-lady-of-the-rocks` (визит на островки) — здесь town-level (где жить/есть)
- [Статья] Kolašin Travel Guide: Mountain Resort & Biogradska Gora Base · key `kolasin montenegro` · /kolasin-montenegro/ · категория cities · фото≥10 (город) · 💰 отели / ски-пасс · кластер cities-towns [long-tail]
- [Статья] Petrovac Travel Guide: Quiet Riviera Beach Town · key `petrovac montenegro` · /petrovac-montenegro/ · категория cities · фото≥10 (город) · 💰 отели · кластер cities-towns [long-tail]
- [Статья] Nikšić Travel Guide: Montenegro's Second City & Lakes · key `niksic montenegro` · /niksic-montenegro/ · категория cities · фото≥10 (город) · 💰 отели · кластер cities-towns [long-tail]

### Attractions & POIs
- [Статья] Best Beaches in Budva: Mogren, Jaz, Slovenska & More · key `budva beaches` · /budva-beaches/ · категория attractions · фото≥5 · 💰 отели · кластер attractions-pois [mid] · сателлит план. country `best-beaches`
- [Статья] Blue Cave Montenegro: Boat Tours from Kotor & Herceg Novi · key `blue cave montenegro` · /blue-cave-montenegro/ · категория attractions · фото≥5 · 💰 туры (GetYourGuide) · кластер attractions-pois [mid]
- [Статья] Biogradska Gora National Park: Lake, Forest & Hikes · key `biogradska gora national park` · /biogradska-gora-national-park/ · категория attractions · фото≥5 · 💰 туры · кластер attractions-pois [mid]
- [Статья] Sveti Đorđe & Our Lady of the Rocks: The Islands of Perast · key `our lady of the rocks perast` · /our-lady-of-the-rocks/ · категория attractions · фото≥5 · 💰 туры · кластер attractions-pois [mid] · ⚠ DEDUPE: если план. `perast-our-lady-of-the-rocks` выходит объединённым — FOLD сюда; не публиковать обе. Согласовать с владельцем
- [Статья] Prokletije National Park: Hiking the Accursed Mountains · key `prokletije national park` · /prokletije-national-park/ · категория attractions · фото≥5 · 💰 туры / гид · кластер attractions-pois [long-tail]
- [Статья] Ada Bojana: Montenegro's Island Beach & Kitesurf Spot · key `ada bojana montenegro` · /ada-bojana-montenegro/ · категория attractions · фото≥5 · 💰 туры / активности · кластер attractions-pois [long-tail]
- [Статья] Lipa Cave: Visiting Montenegro's Show Cave near Cetinje · key `lipa cave montenegro` · /lipa-cave-montenegro/ · категория attractions · фото≥5 · 💰 туры / билеты · кластер attractions-pois [long-tail]
- [Статья] Luštica Peninsula Guide: Beaches, Bays & Hidden Coves · key `lustica peninsula montenegro` · /lustica-peninsula-montenegro/ · категория attractions · фото≥5 · 💰 отели / туры · кластер attractions-pois [long-tail]
- [Статья] Kotor to Lovćen: Ladder of Kotor Hike & Serpentine Road · key `ladder of kotor hike` · /ladder-of-kotor-hike/ · категория attractions · фото≥5 · 💰 туры / аренда авто · кластер attractions-pois [long-tail]

### Itineraries
- [Статья] Montenegro Road Trip Itinerary: The Ultimate Self-Drive Route · key `montenegro road trip` · /montenegro-road-trip/ · категория routes · фото≥5 · 💰 аренда авто · кластер itineraries [head]
- [Статья] Montenegro 10-Day Itinerary: Coast, Mountains & Lakes · key `montenegro 10 day itinerary` · /montenegro-10-day-itinerary/ · категория routes · фото≥5 · 💰 аренда авто / отели · кластер itineraries [mid] · сателлит канон. 7-day хаба
- [Статья] Montenegro Without a Car: How to Travel by Bus & Tours · key `montenegro without a car` · /montenegro-without-a-car/ · категория routes · фото≥5 · 💰 туры / трансфер · кластер itineraries [mid]
- [Статья] Montenegro Family Itinerary: Best Things to Do with Kids · key `montenegro with kids` · /montenegro-with-kids/ · категория routes · фото≥5 · 💰 отели / туры · кластер itineraries [mid]
- [Статья] Croatia & Montenegro Itinerary: Combined 7–10 Day Trip · key `croatia and montenegro itinerary` · /croatia-montenegro-itinerary/ · категория routes · фото≥5 · 💰 аренда авто / отели · кластер itineraries [mid]

### Best time & weather
- [Статья] Montenegro Sea Temperature by Month: When to Swim · key `montenegro sea temperature` · /montenegro-sea-temperature/ · категория planning · фото≥5 · 💰 отели · кластер best-time-weather [mid] · сателлит план. `weather-by-month`
- [Статья] Best Time to Visit Montenegro for Hiking & the Mountains · key `montenegro hiking season` · /best-time-hiking-montenegro/ · категория planning · фото≥5 · 💰 туры / гид · кластер best-time-weather [long-tail] · 🛰 сателлит /best-time-to-visit-montenegro/ (опубл.)

### Seasonal
- [Статья] Montenegro in October: Weather, Sea & What's Open · key `montenegro in october` · /montenegro-in-october/ · категория planning · фото≥5 · 💰 отели · кластер seasonal [mid] · сиблинг план. `montenegro-in-september`
- [Статья] Montenegro in Winter: Skiing, Christmas & Off-Season Travel · key `montenegro in winter` · /montenegro-in-winter/ · категория planning · фото≥5 · 💰 отели / ски-пасс · кластер seasonal [mid] · окно публ. окт-ноя 2026
- [Статья] Skiing in Montenegro: Kolašin 1600 & Savin Kuk (Žabljak) · key `skiing in montenegro` · /skiing-in-montenegro/ · категория attractions · фото≥5 · 💰 ски-пасс / прокат · кластер seasonal [long-tail] · окно публ. окт-ноя 2026

### Budget & cost
- [Статья] Montenegro Travel: One Week Coast & Mountains Budget Breakdown · key `montenegro one week cost` · /montenegro-week-trip-budget/ · категория articles · фото≥5 · 💰 отели / страховка · кластер budget-cost [mid] · разводить с план. `is-montenegro-expensive` и опубл. /cost-of-living-in-montenegro/

### Transport
- [Статья] Tivat Airport to Kotor: Taxi, Transfer & Bus Options · key `tivat airport to kotor` · /tivat-airport-to-kotor/ · категория articles · фото≥5 · 💰 трансфер · кластер transport [head]
- [Статья] Kotor to Dubrovnik: Bus, Transfer & Border Crossing · key `kotor to dubrovnik` · /kotor-to-dubrovnik/ · категория articles · фото≥5 · 💰 трансфер · кластер transport [head] · ⚠ DEDUPE: реверс план. `dubrovnik-to-kotor` — если владелец делает страницу двунаправленной, FOLD
- [Статья] Podgorica to Kotor: Bus, Transfer & Driving Guide · key `podgorica to kotor` · /podgorica-to-kotor/ · категория articles · фото≥5 · 💰 трансфер / аренда авто · кластер transport [mid]
- [Статья] Kotor Cruise Port Guide: What to Do on a Day in Port · key `kotor cruise port` · /kotor-cruise-port-guide/ · категория articles · фото≥5 · 💰 туры · кластер transport [mid]
- [Статья] Budva to Kotor: Bus, Boat & How to Get Between Them · key `budva to kotor` · /budva-to-kotor/ · категория articles · фото≥5 · 💰 трансфер / туры · кластер transport [mid] · ⚠ DEDUPE: реверс план. `kotor-to-budva-bus` (+ multi-mode/boat) — если планируемая страница станет двунаправленной, FOLD
- [Статья] Ferry to Montenegro: Bari & Ancona to Bar (Italy Crossings) · key `ferry to montenegro` · /ferry-to-montenegro/ · категория articles · фото≥5 · 💰 паромы / билеты · кластер transport [long-tail] · пара к Bar city page

### Food
- [Статья] Montenegrin Food: 15 Traditional Dishes You Must Try · key `montenegrin food` · /montenegrin-food-dishes/ · категория articles · фото≥5 · 💰 туры / рестораны · кластер food [mid] · хаб food-вертикали
- [Статья] Where to Eat in Kotor: Best Restaurants & Konobas · key `where to eat in kotor` · /where-to-eat-in-kotor/ · категория articles · фото≥5 · 💰 рестораны / туры · кластер food [mid] · связать с опубл. /konoba-scala-santa/, /restaurant-galion/, /cave-coffee-kotor/
- [Статья] Montenegro Wine Guide: Vranac, Plantaže & Skadar Vineyards · key `montenegro wine` · /montenegro-wine-guide/ · категория articles · фото≥5 · 💰 туры (винные) · кластер food [long-tail] · связать с опубл. /lake-skadar/

### Day trips
- [Статья] Best Day Trips from Budva (Sveti Stefan, Kotor, Skadar) · key `day trips from budva` · /day-trips-from-budva/ · категория routes · фото≥5 · 💰 туры / аренда авто · кластер day-trips [mid] · сиблинг план. `day-trips-from-kotor`

### Comparisons & decision
- [Статья] Is Montenegro Worth Visiting? An Honest 2026 Take · key `is montenegro worth visiting` · /is-montenegro-worth-visiting/ · категория articles · фото≥5 · 💰 нет · кластер comparisons-decision [head]
- [Статья] Montenegro vs Albania: Which Balkan Country to Visit · key `montenegro vs albania` · /montenegro-vs-albania/ · категория articles · фото≥5 · 💰 нет · кластер comparisons-decision [mid] · ⚠ паритет: нейтральные pros/cons, НЕ «дешевле Албании» (правило STRATEGY)
- [Статья] Kotor or Budva: Where Should You Stay in Montenegro? · key `kotor or budva` · /kotor-or-budva/ · категория articles · фото≥5 · 💰 отели · кластер comparisons-decision [mid] · сателлит план. `where-to-stay` хаба
- [Статья] Is Kotor Worth Visiting? What to Expect (Crowds & Highlights) · key `is kotor worth visiting` · /is-kotor-worth-visiting/ · категория articles · фото≥5 · 💰 туры · кластер comparisons-decision [long-tail] · связать с опубл. /kotor/
- [Статья] Currency & Money in Montenegro: Euro, ATMs & Card Tips · key `montenegro currency` · /montenegro-currency-money/ · категория planning · фото≥5 · 💰 нет · кластер comparisons-decision [head] (practical)

### Practical
- [Статья] Montenegro Packing List: What to Bring (Season by Season) · key `montenegro packing list` · /montenegro-packing-list/ · категория planning · фото≥5 · 💰 снаряжение (Amazon) · кластер practical [mid]
- [Статья] SIM Cards & Mobile Data in Montenegro (Telenor, m:tel, One) · key `montenegro sim card` · /montenegro-sim-card/ · категория planning · фото≥5 · 💰 eSIM / связь · кластер practical [mid] · сателлит план. eSIM-страницы (физ-SIM intent)
- [Статья] Do They Speak English in Montenegro? Language & Useful Phrases · key `language in montenegro` · /language-in-montenegro/ · категория planning · фото≥5 · 💰 нет · кластер practical [long-tail]
- [Статья] Tipping in Montenegro: How Much & When (Restaurants, Taxis) · key `tipping in montenegro` · /tipping-in-montenegro/ · категория planning · фото≥5 · 💰 нет · кластер practical [long-tail]

### Where to stay
- _Хаб `where-to-stay` ведётся в основном плане; сюда отнесён сателлит-сравнение `kotor-or-budva` (см. Comparisons). Город-уровневые «где жить» — в Cities & towns (Žabljak, Perast и др.)._

### EN-track (Tier-1 Запад)
- _Весь backlog выше — EN-first под Tier-1 Запад (правило хаба: Черногория EN-first, ru/uk вторичны). Отдельных не-EN слотов в Этапе-2 нет; ru/uk — вторичный трек по приоритетным головам после публикации EN._
