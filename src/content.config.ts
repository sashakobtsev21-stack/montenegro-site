import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { contentGlob } from './loaders/contentGlob';

/**
 * Контент-модель Georgia Guidebook (SPEC §11, v3.1).
 *
 * ВАЖНО: эти схемы — будущий API мобильного приложения (§23) и источник
 * автоматических schema.org. Менять только осознанно, со сверкой со SPEC §11.
 *
 * Коллекции на R1 ПУСТЫЕ — контент не создаём. Сборка обязана проходить
 * с пустыми коллекциями. `draft: true` в сборку не попадает (§11) —
 * фильтрация делается на этапе запроса контента (getCollection), схема лишь
 * хранит флаг.
 */

const LANGS = ['ru', 'uk', 'en'] as const;

const CATEGORIES = [
  'dostoprimechatelnosti',
  'goroda',
  'eda',
  'razvlecheniya',
  'marshruty',
  'transport',
  'arenda-avto',
  'relokatsiya',
  'strahovka',
  'novosti',
  'planirovanie',
] as const;

/** Уровни цен для директории «Где поесть» (§8.6, §11). */
const PRICE_LEVELS = ['₾', '₾₾', '₾₾₾'] as const;

/**
 * Язык-нейтральные ключи кухни для фильтра /eda/ (аудит 2026-06-20). Чип
 * локализуется (i18n eda.cuisineKeys ↔ CUISINE_KEY_SLUGS, см. check-enums);
 * карточка по-прежнему показывает полную строку `cuisine`.
 */
const CUISINE_KEYS = [
  'georgian',
  'seafood',
  'wine',
  'cafe',
  'bakery',
  'vegetarian',
  'asian',
  'street',
  'bar',
] as const;

/**
 * Тип достопримечательности (§8.3 «что посмотреть»). Используется ТОЛЬКО
 * статьями категории `dostoprimechatelnosti` — для фильтра/чипов каталога.
 * Опционально, на контракт прочих категорий не влияет (§23). Слаги ↔ ru/uk
 * лейблы в i18n (`attractionTypes`); набор финализирован: 7 типов.
 */
const ATTRACTION_TYPES = [
  'gory-priroda', // горы / перевалы / природа
  'vodopady-kanony-ozera', // водопады / каньоны / озёра
  'peschery', // пещеры / пещерные города
  'hramy-monastyri', // храмы / монастыри
  'kreposti-zamki', // крепости / замки
  'kurorty-termy', // курорты / термы
  'muzei-gorodskoe', // музеи / городские объекты
] as const;

/**
 * Регион (мхаре) Грузии (§7) — для фильтра каталога достопримечательностей.
 * Опционально (используют только достопримечательности). Слаги ↔ ru/uk лейблы
 * в i18n (`regions`). 11 мхаре + столица Тбилиси.
 */
const REGIONS = [
  'tbilisi',
  'adjara',
  'guria',
  'imereti',
  'kakheti',
  'kvemo-kartli',
  'mtskheta-mtianeti',
  'racha-lechkhumi',
  'samegrelo-zemo-svaneti',
  'samtskhe-javakheti',
  'shida-kartli',
] as const;

/**
 * Подкатегория раздела «Развлечения» (§7, решение владельца 2026-06-16).
 * Используется только статьями категории `razvlecheniya` — фильтр/чипы хаба.
 * Опционально. Слаги ↔ ru/uk лейблы в i18n (`razvlTypes`). 5 подкатегорий.
 */
const RAZVL_TYPES = [
  'nochnaya-zhizn', // клубы, бары, лаунж
  'afisha', // квизы, киновечера, концерты
  'aktivnyy', // велопрокат, аквапарки, активный отдых
  'kazino', // казино (игорные заведения; выделено в отдельную подкатегорию)
  'mesta', // пляжи, парки, музеи, рынки
] as const;

/**
 * Рубрика директории «Услуги» (§7, под-раздел /relokatsiya/uslugi/) — сервисы
 * для живущих в Грузии (риелторы, клининг и т.п.). Слаги ↔ ru/uk лейблы в i18n
 * (`serviceRubrics`).
 */
const SERVICE_RUBRICS = [
  'zhilyo-rieltory', // жильё / риелторы
  'klining', // клининг / уборка
  'pereezd', // переезд / грузоперевозки
  'remont', // ремонт / мастера
  'dokumenty', // документы / юристы
  'perevodchiki', // переводчики / нотариат
] as const;

const MONTHS = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentyabr',
  'oktyabr',
  'noyabr',
  'dekabr',
] as const;

/** [lat, lng] — гео-координата (§11). */
const coord = z.tuple([z.number(), z.number()]);

/** Изображение с обязательным alt (§11, доступность §15). */
const image = z.object({
  src: z.string(),
  alt: z.string(),
});

/** Партнёрский блок — ссылка идёт через /go/{partner}?c={slug} (§16). */
const affiliateItem = z.object({
  partner: z.string(),
  label: z.string(),
  priceFrom: z.number().optional(),
  position: z.string(),
});

/**
 * Базовые поля статьи (§11). Выносим в фабрику, чтобы коллекция `routes`
 * наследовала их без дублирования.
 */
const articleBase = z.object({
  title: z.string(),
  /** Подставлять текущий год в конец title/h1/schema на сборке (P1-2, «денежные» гайды). */
  yearInTitle: z.boolean().default(false),
  description: z.string().max(155),
  slug: z.string(),
  lang: z.enum(LANGS),
  category: z.enum(CATEGORIES),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  verifiedAt: z.coerce.date().optional(),
  verifiedPhoto: image.optional(),
  /**
   * Ручной приоритет в списках раздела (§8): меньшее число — выше. Задаётся
   * избранным статьям (напр. ключевые города), у остальных undefined →
   * сортируются по publishedAt desc, затем slug. Влияет только на порядок
   * карточек в HubPage; контракт API (§23) и SEO не меняет.
   */
  featuredOrder: z.number().optional(),
  geo: z
    .object({
      coord,
      address: z.string().optional(),
    })
    .optional(),
  /** Знак качества (медаль) — ТОЛЬКО по запросу владельца (как у заведений §13). */
  qualityMark: z.boolean().default(false),
  /** Личный сайт заведения (для статей-мест: клуб/казино и т.п.) — кнопка «Сайт». */
  website: z.string().optional(),
  /** Instagram заведения (статьи-места) — кнопка «Instagram» (спрашивать у владельца). */
  instagram: z.string().optional(),
  /**
   * Тип достопримечательности (§8.3) — фильтр/чип каталога «что посмотреть».
   * Опционально: задаётся только статьями категории `dostoprimechatelnosti`,
   * у прочих категорий не используется и контракт API (§23) не меняет.
   */
  attractionType: z.enum(ATTRACTION_TYPES).optional(),
  /**
   * Регион (мхаре) Грузии (§7) — фильтр/чип каталога достопримечательностей.
   * Опционально, как и `attractionType`.
   */
  region: z.enum(REGIONS).optional(),
  /**
   * Подкатегория «Развлечений» (§7) — фильтр/чип хаба /razvlecheniya/.
   * Опционально: задаётся только статьями категории `razvlecheniya`. Мирроринг
   * attractionType; контракт прочих категорий и API (§23) не меняет.
   */
  razvlType: z.enum(RAZVL_TYPES).optional(),
  /**
   * Свободные теги места («дом + теги», §7): напр. «велопрокат», «киновечера» —
   * показывают заведение в смежных разделах, не меняя его канонический раздел.
   * Опционально. На контракт API (§23) не влияет.
   */
  tags: z.array(z.string()).optional(),
  /**
   * Обложка статьи (§11). Опциональна (v3.3): часть достопримечательностей
   * каталога идёт без фото — карта-точка вместо обложки (§18/план). Шаблоны
   * (ArticlePage/ArticleCard) рендерят фигуру обложки только при наличии cover.
   * Контракт routes/restaurants не меняется (у них cover задан там, где нужен).
   */
  cover: image.optional(),
  /**
   * Атрибуция обложки (§18): обязательна для CC/чужих фото — видимый кредит
   * «автор + лицензия» под изображением. Опционально (свои фото без неё).
   */
  coverCredit: z.string().optional(),
  /**
   * Фотогалерея места (§8.1, R3-наполнение). Опционально: статьи с
   * несколькими фото получают PhotoGallery + лайтбокс. Каждая запись —
   * путь к webp (≤200 КБ, §15), обязательный alt (доступность §15) и
   * опциональный credit (юр. атрибуция CC/чужого фото, §18). Контракт
   * routes/restaurants не меняется (поле опциональное, наследуется как undefined).
   */
  gallery: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
        credit: z.string().optional(),
      }),
    )
    .optional(),
  /**
   * «Как доехать» из крупных точек въезда (§8.1). Опционально: статьи о
   * местах получают блок AccessFrom с расстоянием/временем из Тбилиси,
   * Кутаиси и Батуми. Все поля внутри опциональны — указываем только то,
   * что известно (CLAUDE правило 4). На контракт API (§23) не влияет.
   */
  accessFrom: z
    .object({
      tbilisi: z
        .object({
          km: z.number().optional(),
          duration: z.string().optional(),
          note: z.string().optional(),
        })
        .optional(),
      kutaisi: z
        .object({
          km: z.number().optional(),
          duration: z.string().optional(),
          note: z.string().optional(),
        })
        .optional(),
      batumi: z
        .object({
          km: z.number().optional(),
          duration: z.string().optional(),
          note: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  /**
   * «Вход и часы работы» места (§8.1, VisitInfo). Опционально: для мест, где
   * это релевантно. Все поля — строки (гибко: «Вход свободный», «5 GEL»,
   * «10:00–18:00, пн — выходной»). Цены/часы НЕ выдумывать (CLAUDE правило 4):
   * только из надёжного источника/данных владельца; нет данных → не указывать
   * или note «уточняйте на месте». `checkedAt` — дата проверки актуальности.
   */
  visit: z
    .object({
      price: z.string().optional(),
      hours: z.string().optional(),
      note: z.string().optional(),
      checkedAt: z.coerce.date().optional(),
    })
    .optional(),
  affiliate: z.array(affiliateItem).default([]),
  sources: z.array(z.string()).optional(),
  /**
   * Демо-материал шаблона (R3): помечает статью как образец до наполнения
   * реальной фактурой → шаблон рисует честный дисклеймер (CLAUDE правило 4).
   * Опционально, по умолчанию false — не влияет на контракт API (§23).
   */
  demo: z.boolean().default(false),
  /**
   * Виджет поиска отелей Trip.com (HotelWidget §8.1, §16). Опционально, по
   * умолчанию false. Click-to-load: до клика ничего от Trip.com не грузится
   * (перф §15, приватность §18). Включается у статей с высоким спросом на
   * жильё (ключевые города). На контракт API (§23) не влияет.
   */
  hotelWidget: z.boolean().default(false),
  draft: z.boolean().default(false),
});

const articles = defineCollection({
  loader: contentGlob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: articleBase,
});

/** Маршруты наследуют поля articles + специфику маршрута (§11). */
const routes = defineCollection({
  loader: contentGlob({ pattern: '**/*.{md,mdx}', base: './src/content/routes' }),
  schema: articleBase.extend({
    category: z.literal('marshruty'),
    /**
     * Маршрут всегда с обложкой: переопределяем опциональный cover базы (§11) на
     * обязательный — карточка маршрута и OG-картинка без фото не имеют смысла, а
     * RoutePage рассчитывает на cover. Опциональность cover введена только ради
     * каталога достопримечательностей; контракт routes не меняется.
     */
    cover: image,
    days: z.number().int().positive(),
    distanceKm: z.number().positive(),
    budgetFrom: z.object({
      amount: z.number(),
      currency: z.string(),
    }),
    stops: z
      .array(
        z.object({
          name: z.string(),
          km: z.number(),
          coord,
          stayMin: z.number().optional(),
          note: z.string().optional(),
          /**
           * Фото остановки (§8.2) — миниатюра в RouteTimeline. Опционально:
           * указываем только там, где есть проверенное CC-фото (src, обяз. alt,
           * опц. credit — юр. атрибуция §18). Можно переиспользовать фото из
           * карточек каталога той же точки. На контракт API (§23) не влияет.
           */
          photo: z
            .object({
              src: z.string(),
              alt: z.string(),
              credit: z.string().optional(),
            })
            .optional(),
        }),
      )
      .default([]),
    bestSeason: z.array(z.enum(MONTHS)).default([]),
  }),
});

/** Города — короткие поля для карточек хабов (§11). */
const cities = defineCollection({
  loader: contentGlob({ pattern: '**/*.{md,mdx}', base: './src/content/cities' }),
  schema: z.object({
    name: z.string(),
    region: z.string(),
    coord,
    lang: z.enum(LANGS),
    slug: z.string(),
    summary: z.string().max(200).optional(),
    cover: image.optional(),
    /** Ссылка на статью-путеводитель города в коллекции articles, если есть. */
    article: reference('articles').optional(),
  }),
});

/**
 * Директория «Где поесть» (§8.6). Рейтинг — текстом (`ratingNote`); чужие цифры
 * Google/TripAdvisor дословно не перепечатываем (ToS, §15) — рейтинг как критерий
 * отбора + ссылка. В справочник попадают места с консенсусом >4★ из нескольких источников.
 */
const restaurants = defineCollection({
  loader: contentGlob({ pattern: '**/*.{md,mdx}', base: './src/content/restaurants' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    lang: z.enum(LANGS),
    city: z.string(),
    district: z.string().optional(),
    cuisine: z.string().optional(),
    /** Язык-нейтральный ключ кухни для фильтра (чип локализуется, карточка — полная строка). */
    cuisineKey: z.enum(CUISINE_KEYS).optional(),
    priceLevel: z.enum(PRICE_LEVELS),
    geo: z.object({ coord, address: z.string().optional() }),
    mapUrl: z.string(),
    /** Личный сайт заведения — кнопка «Сайт» на карточке/в витрине (§13). */
    website: z.string().optional(),
    /** Instagram заведения — кнопка «Instagram» (спрашивать у владельца, §13). */
    instagram: z.string().optional(),
    ratingNote: z.string(),
    sources: z.array(z.string()).default([]),
    summary: z.string(),
    verifiedAt: z.coerce.date(),
    /** Метка «Проверено» БЕЗ публичной даты (verifiedAt хранится для записи; в карточке — компактный бейдж). §13. */
    verifiedNoDate: z.boolean().default(false),
    /**
     * Знак качества (золотая медаль) на обложке — ставится ТОЛЬКО по явному
     * запросу владельца (правило 2026-06-18). По умолчанию выключен: большинство
     * заведений знак НЕ несут. true → медаль в правом верхнем углу обложки.
     */
    qualityMark: z.boolean().default(false),
    /**
     * Тип заведения (§8.6) — для иконки/фильтра и формата «еды по дороге».
     * Опционально, по умолчанию обычный ресторан.
     */
    placeType: z
      .enum([
        'restaurant',
        'cafe',
        'bakery',
        'wine',
        'street',
        'market',
        'bar',
        'club',
        'quiz',
        'cinema',
      ])
      .optional(),
    /**
     * Свободные теги заведения («дом + теги», §7): напр. «велопрокат»,
     * «киновечера», «квизы» — показывают место в смежных разделах (Развлечения),
     * не меняя его канонический раздел (Еда). Опционально.
     */
    tags: z.array(z.string()).optional(),
    /**
     * Фото места (§8.6, §18) — обложка карточки + опц. мини-галерея. Только свои
     * фото или CC/с разрешения заведения; coverCredit обязателен для CC/чужого
     * (видимая атрибуция автор+лицензия). Путь к webp ≤200 КБ (§15).
     */
    cover: image.optional(),
    coverCredit: z.string().optional(),
    /**
     * Обложка — жанровая иллюстрация (релевантное блюдо/кухня), а НЕ фото самого
     * заведения: CC-фото конкретных ресторанов почти не существует (решение
     * владельца 2026-06-17). Тогда true → карточка рисует бейдж «иллюстрация»,
     * чтобы читатель не принял за снимок места (честность §15). coverCredit
     * по-прежнему обязателен (автор+лицензия+источник).
     */
    coverIllustrative: z.boolean().default(false),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string(), credit: z.string().optional() }))
      .optional(),
    /**
     * Часы работы (§8.6, правило цена+режим). Свободная строка
     * («10:00–23:00», «круглосуточно»); НЕ выдумывать — только из надёжного
     * источника, иначе не указывать.
     */
    hours: z.string().optional(),
    /**
     * Цены на основные позиции (§8.6) — ориентиры, не прайс-лист. Цены НЕ
     * выдумывать (правило 4): только из меню/надёжного источника на дату
     * проверки; нет данных → не указывать. `price` — строка с валютой.
     */
    dishes: z
      .array(z.object({ name: z.string(), price: z.string(), note: z.string().optional() }))
      .optional(),
    /**
     * Наш разбор отзывов (§8.6, §15): СВОЙ агрегированный вывод «за что хвалят /
     * на что обратить внимание». Чужие рецензии дословно НЕ копируем (ToS §15).
     */
    review: z
      .object({
        loved: z.array(z.string()).default([]),
        watch: z.array(z.string()).default([]),
      })
      .optional(),
    /**
     * Спонсорское размещение (§16, прямая реклама — этап 2). sponsored → бейдж
     * «Партнёр» + приоритет показа; sponsoredUntil — дата окончания (карточка
     * сама «истекает» по дате сборки). Платное место честно помечается и НЕ
     * выдаётся за коллективно-проверенный отбор (§15).
     */
    sponsored: z.boolean().default(false),
    sponsoredUntil: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Директория «Услуги» (§7, под-раздел /relokatsiya/uslugi/) — сервисы для
 * живущих в Грузии (риелторы, клининг, переезд и т.п.). Платное размещение —
 * `sponsored` (золотая рамка как единственный маркёр, решение владельца
 * 2026-06-16). Контакты/цены не выдумывать (правило 4); пустая коллекция
 * строится штатно (§11).
 */
const services = defineCollection({
  loader: contentGlob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    lang: z.enum(LANGS),
    rubric: z.enum(SERVICE_RUBRICS),
    city: z.string().optional(),
    summary: z.string(),
    /**
     * Дата нашей сверки услуги → метка «Проверено» (правило verified-mark-mandatory).
     * Ставить ТОЛЬКО при реальной сверке (правило 4). Опционально: демо/непроверенные — без неё.
     */
    verifiedAt: z.coerce.date().optional(),
    url: z
      .string()
      .regex(/^https?:\/\//, 'URL должен начинаться с http(s)://')
      .optional(),
    contact: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: image.optional(),
    coverCredit: z.string().optional(),
    sponsored: z.boolean().default(false),
    sponsoredUntil: z.coerce.date().optional(),
    demo: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, routes, cities, restaurants, services };
