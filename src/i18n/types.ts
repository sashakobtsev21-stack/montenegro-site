/**
 * Типы i18n-словарей (SPEC §12). Ключи навигации совпадают с разделами IA (§7).
 * Все UI-строки — только через словарь; хардкод в компонентах запрещён.
 */

export const LANGS = ['ru', 'uk', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

/** Разделы IA (§7). `home` — это `/`, остальные совпадают с категориями коллекций. */
export type SectionKey =
  | 'home'
  | 'dostoprimechatelnosti'
  | 'goroda'
  | 'eda'
  | 'razvlecheniya'
  | 'marshruty'
  | 'transport'
  | 'arenda-avto'
  | 'strahovka'
  | 'novosti'
  | 'relokatsiya'
  | 'planirovanie'
  | 'o-sajte'
  | 'kontakty';

/**
 * Контентные разделы, которые получают шаблон Хаба (§8.3). Совпадают с
 * категориями коллекции `articles` (§11). `eda` сюда НЕ входит — у неё свой
 * шаблон-директория (§8.6, EdaDirectory).
 */
export type HubSectionKey =
  | 'dostoprimechatelnosti'
  | 'goroda'
  | 'razvlecheniya'
  | 'marshruty'
  | 'transport'
  | 'arenda-avto'
  | 'strahovka'
  | 'novosti'
  | 'planirovanie';

/** Вводный текст конкретного хаба (§8.3). */
export interface HubSectionContent {
  /** Вводный текст раздела 300–500 слов (§8.3) — массив абзацев. */
  intro: string[];
}

/**
 * Слаги типов достопримечательностей (§8.3) — совпадают с enum ATTRACTION_TYPES
 * в content.config.ts (поле `attractionType`). Лейблы — в словарях
 * (`attractionTypes`), порядок здесь = порядок чипов/опций фильтра каталога.
 */
export const ATTRACTION_TYPE_SLUGS = [
  'gory-priroda',
  'vodopady-kanony-ozera',
  'peschery',
  'hramy-monastyri',
  'kreposti-zamki',
  'kurorty-termy',
  'muzei-gorodskoe',
] as const;
export type AttractionTypeSlug = (typeof ATTRACTION_TYPE_SLUGS)[number];

/**
 * Ключи per-city страниц «Где поесть в {городе}» (§8.6). Слаги URL и слаги
 * городов (/goroda/) задаются в EDA_CITY_PAGES (i18n/index.ts); локализованные
 * названия и тексты — в словарях (`eda.cityPages.items`).
 */
export const EDA_CITY_KEYS = ['tbilisi', 'batumi', 'kutaisi'] as const;
export type EdaCityKey = (typeof EDA_CITY_KEYS)[number];

/**
 * Слаги регионов (мхаре) Грузии (§7) — совпадают с enum REGIONS в
 * content.config.ts (поле `region`). Лейблы — в словарях (`regions`).
 */
export const REGION_SLUGS = [
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
export type RegionSlug = (typeof REGION_SLUGS)[number];

/**
 * Слаги подкатегорий «Развлечений» (§7) — совпадают с enum RAZVL_TYPES в
 * content.config.ts (поле `razvlType`). Лейблы — в словарях (`razvlTypes`).
 */
export const RAZVL_TYPE_SLUGS = ['nochnaya-zhizn', 'afisha', 'aktivnyy', 'kazino', 'mesta'] as const;
export type RazvlTypeSlug = (typeof RAZVL_TYPE_SLUGS)[number];

/**
 * Слаги рубрик директории «Услуги» (§7) — совпадают с enum SERVICE_RUBRICS в
 * content.config.ts (поле `rubric` коллекции services). Лейблы — в словарях
 * (`serviceRubrics`).
 */
export const SERVICE_RUBRIC_SLUGS = [
  'zhilyo-rieltory',
  'klining',
  'pereezd',
  'remont',
  'dokumenty',
  'perevodchiki',
] as const;
export type ServiceRubricSlug = (typeof SERVICE_RUBRIC_SLUGS)[number];

/** Язык-нейтральные ключи кухни /eda/ ↔ enum CUISINE_KEYS в content.config (check-enums). */
export const CUISINE_KEY_SLUGS = [
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
export type CuisineKeySlug = (typeof CUISINE_KEY_SLUGS)[number];

export interface UIDictionary {
  siteName: string;
  tagline: string;
  langName: string;
  skipToContent: string;
  /** Плавающая кнопка «наверх» на длинных страницах (aria-label). */
  backToTop: string;
  /** Страница 404 (не найдена) — единая на сайт, рендерится на языке по умолчанию. */
  notFound: { heading: string; text: string; home: string };
  /** Блок «Сейчас в Грузии» на главной (§8.4): погода + курс лари. */
  liveData: {
    heading: string;
    /** Короткое описание слева от панели (вёрстка «сбоку»). */
    desc: string;
    weather: string;
    sea: string;
    fx: string;
    cities: { tbilisi: string; kutaisi: string; batumi: string };
    updated: string;
    source: string;
  };
  /** Подписи навигации по разделам. */
  nav: Record<SectionKey, string>;
  /** Управление шапкой/меню. */
  header: {
    openMenu: string;
    closeMenu: string;
    /** Короткая видимая подпись кнопки-меню на десктопе («Menu»). */
    menuShort: string;
    primaryNav: string;
  };
  /** Переключатель языка (§12). */
  lang: {
    label: string;
    /** aria-label на ссылке «другой язык», {lang} — название языка. */
    switchTo: string;
  };
  footer: {
    disclaimer: string;
    navHeading: string;
    /** Короткая подпись о принципе коллективной проверки в подвале. */
    note: string;
    /** Префикс перед именем создателя в подвале («Made by» / «Автор:»). */
    creatorPrefix: string;
    /** Подпись-кредит создателя сайта в подвале. */
    creator: string;
  };
  /** VerifiedBadge (signature §9, §10). */
  verified: {
    /** «Проверено · {date}». */
    inPlace: string;
    /** Компактная метка без даты — «Проверено» (для карточек заведений/услуг). */
    short: string;
    /** «Обновлено · {date}» (вариант без места проверки). */
    updated: string;
    /** Мелкая подпись-расшифровка под бейджем («опытными путешественниками…»). */
    caption: string;
    /** alt для опционального фото места (не автора). */
    photoAlt: string;
    /** Плейсхолдер-дата на примере-образце (R2 — реальных дат нет). */
    samplePlaceholder: string;
  };
  /** Главная (§8.4). */
  home: {
    heroTitle: string;
    heroSubtitle: string;
    /** Кредит фото hero (§12 — из словаря, не хардкод в компоненте). */
    heroCredit: string;
    /** Префикс подписи фото hero: «Фото»/«Photo» (полный кредит собирается в компоненте). */
    photoPrefix: string;
    search: {
      label: string;
      placeholder: string;
      /** Пустое состояние поиска (контента ещё нет). */
      emptyNoContent: string;
      /** Нет совпадений по запросу. */
      emptyNoMatch: string;
      /** Подсказка под полем. */
      hint: string;
    };
    /** Блок «5 главных плиток входа». */
    entriesHeading: string;
    tiles: {
      dostoprimechatelnosti: string;
      goroda: string;
      eda: string;
      razvlecheniya: string;
      marshruty: string;
    };
    /** Витрина партнёров (золотая лента-карусель, §8.4/§16). */
    showcase: {
      heading: string;
      lead: string;
      /** Подпись-прозрачность: витрина включает партнёрские размещения (§16). */
      partnerNote: string;
      /** aria-label области ленты. */
      aria: string;
      /** Надстрочный лейбл открытого рекламного места. */
      adKicker: string;
      /** Заголовок открытого рекламного места (CTA на контакты). */
      adTitle: string;
      /** Короткие надстрочные лейблы карточек по типу контента. */
      kickers: {
        city: string;
        route: string;
        sight: string;
        food: string;
        nightlife: string;
      };
    };
    /** Блок «Все разделы». */
    allSectionsHeading: string;
    /** Коллективная плашка «Проверено опытными путешественниками, гидами и местными». */
    trustHeading: string;
    /** Лид-строка плашки (краткий коллективный посыл). */
    trustLead: string;
    trust: {
      ratingTitle: string;
      ratingText: string;
      localsTitle: string;
      localsText: string;
      updatedTitle: string;
      updatedText: string;
    };
    /** Образец VerifiedBadge на главной. */
    badgeSampleHeading: string;
    /** «Свежие материалы». */
    /** Заголовок on-page сетки «Разделы путеводителя» на главной (§8.4). */
    sectionsHeading: string;
    freshHeading: string;
    freshEmpty: string;
    /** Блок «О проекте» (нейтральный, со ссылкой на /o-sajte/). */
    about: {
      heading: string;
      text: string;
      link: string;
    };
  };
  /** Кнопки (общие подписи). */
  /** Блок «Новости»: лента на главной (NewsStrip) + раздел /novosti/ (§8.4/§8). */
  newsFeed: {
    recentHeading: string;
    all: string;
    recentEmpty: string;
  };
  actions: {
    more: string;
    /** Раскрытие партнёрства рядом с CTA в AffiliateBox (§18). */
    affiliateDisclosure: string;
  };
  /** Общие строки хлебных крошек/навигации (Breadcrumbs §14). */
  breadcrumbs: {
    /** Крошка «Главная». */
    home: string;
    /** aria-label на навигации крошек. */
    aria: string;
  };
  /** Шаблон Хаба (§8.3): на каждый контентный раздел — вводный текст. */
  hub: {
    /** Заголовок сетки статей раздела. */
    listHeading: string;
    /** Пустое состояние: в разделе пока нет статей. */
    empty: string;
    /** Вводный текст по каждому контентному разделу. */
    sections: Record<HubSectionKey, HubSectionContent>;
  };
  /**
   * Общие строки блока карты (MapEmbed §9). Обобщены под два случая:
   * место (одна точка, статья §8.1) и маршрут (несколько остановок §8.2).
   * Маршрут переопределяет заголовок/aria/hint своими route-строками.
   */
  map: {
    /** Заголовок блока карты для статьи о МЕСТЕ («На карте»). */
    placeHeading: string;
    /** aria-label контейнера карты места. */
    placeAria: string;
    /** Подпись-плейсхолдер под кнопкой для карты места. */
    placeHint: string;
    /** Текст кнопки «показать карту» (общий). */
    show: string;
    /** Текст ошибки загрузки карты (общий). */
    error: string;
    /** Атрибуция тайлов OSM — обязательна по лицензии (общая). */
    attribution: string;
    /** Подпись ссылки «Открыть в Google Картах» (GoogleMap §8.1). */
    openInGoogle: string;
    /** Лейбл-источник под картой Google (GoogleMap §8.1). */
    label: string;
  };
  /**
   * Блок «Как доехать» (AccessFrom §8.1) — расстояние/время из крупных
   * точек въезда. Лейблы городов-истоков по слугам tbilisi/kutaisi/batumi.
   */
  access: {
    /** Заголовок <summary> блока. */
    heading: string;
    /** Единица расстояния (км). */
    km: string;
    /** Локализованные названия городов-истоков. */
    origins: {
      tbilisi: string;
      kutaisi: string;
      batumi: string;
    };
  };
  /** Блок «Вход и часы работы» места (VisitInfo §8.1). */
  visit: {
    /** Заголовок блока. */
    heading: string;
    /** Подпись строки стоимости входа. */
    price: string;
    /** Подпись строки часов работы. */
    hours: string;
    /** Префикс даты проверки актуальности. */
    checked: string;
  };
  /**
   * Фотогалерея места + лайтбокс (PhotoGallery §8.1). Заголовок секции и
   * подписи кнопок управления оверлеем (close/prev/next) — прокидываются в
   * lightbox.js через data-атрибуты для доступности.
   */
  gallery: {
    /** Заголовок секции «Фотографии». */
    heading: string;
    /** aria-label кнопки закрытия оверлея. */
    close: string;
    /** aria-label кнопки «предыдущее фото». */
    prev: string;
    /** aria-label кнопки «следующее фото». */
    next: string;
  };
  /**
   * Виджет поиска отелей Trip.com (HotelWidget §8.1, §16). Click-to-load:
   * до клика ничего стороннего не грузится (перф §15, приватность §18).
   */
  hotelWidget: {
    /** Заголовок блока над виджетом. */
    heading: string;
    /** Текст кнопки-заглушки (по клику грузится виджет). */
    cta: string;
    /** Пояснение-атрибуция под виджетом (партнёрская оговорка). */
    note: string;
    /** title встраиваемого iframe (для скринридеров). */
    frameTitle: string;
  };
  /** Шаблон Статьи (§8.1). */
  article: {
    /** Заголовок оглавления (TOC §9). */
    tocHeading: string;
    /** Заголовок блока связанных статей (RelatedPosts §9). */
    relatedHeading: string;
    /** Блок AboutNote «как отбираем/проверяем» (§9). */
    about: {
      heading: string;
      text: string;
      link: string;
    };
    /** Пометка-дисклеймер в начале демо-статьи (шаблон до наполнения). */
    demoNoteHeading: string;
    demoNote: string;
    /** Бейдж «Пример» на демо-карточке статьи в хабе. */
    demoLabel: string;
  };
  /** Шаблон Маршрута (§8.2): RouteTimeline, карта, заголовки блоков. */
  route: {
    /** Сводка над таймлайном — подписи метрик. */
    summary: {
      /** «Дней в пути». */
      days: string;
      /** Подпись числа дней, {count} — число (для plural-нейтральной строки). */
      daysValue: string;
      /** «Расстояние». */
      distance: string;
      /** Значение расстояния, {km} — число км. */
      distanceValue: string;
      /** «Бюджет от». */
      budget: string;
      /** «Лучший сезон». */
      season: string;
    };
    /** Заголовок блока маршрута-таймлайна (нитка остановок). */
    timelineHeading: string;
    /** aria-label списка остановок (для скринридеров). */
    timelineAria: string;
    /** Подпись «км от старта» у остановки, {km} — число. */
    stopKm: string;
    /** Подпись «старт маршрута» у первой остановки (0 км). */
    stopStart: string;
    /** Подпись времени стоянки, {min} — минуты. */
    stopStay: string;
    /** Заголовок блока карты маршрута. */
    mapHeading: string;
    /** Подпись-плейсхолдер под кнопкой карты маршрута. */
    mapHint: string;
    /** Доступная подпись региона карты маршрута (aria-label контейнера). */
    mapAria: string;
    /** Заголовок AffiliateBox «авто под этот маршрут» (§8.2, §16). */
    affiliateHeading: string;
    /** Текст слота-заглушки AffiliateBox (оставляется для словаря, не рендерится с R4). */
    affiliatePlaceholder: string;
    /**
     * Пояснение под заголовком в AffiliateBox на странице маршрута (§8.2, §16).
     * Рендерится как `note` в реальном AffiliateBox (не заглушка).
     */
    affiliateNote: string;
    /** AffiliateBox «жильё по маршруту» (trip-hotels, §8.2/§16). */
    affiliateHotelsHeading: string;
    affiliateHotelsNote: string;
    /** Подпись месяцев сезона (массив 12 названий, индекс = месяц). */
    months: string[];
    /** Дисклеймер демо-маршрута (поверх общего demoNote — про цифры маршрута). */
    demoNote: string;
  };
  /**
   * Копирайт AffiliateBox для хабов с партнёрами (§8.3, §16).
   * Partial: только для трёх хабов с партнёрками (arenda-avto, transport, goroda);
   * остальные хабы не имеют этого поля — render guard проверяет наличие.
   */
  hubAffiliate: Partial<Record<HubSectionKey, { title: string; note: string }>>;
  /** Страница «О проекте» (§8.5) — методология и прозрачность, без культа автора. */
  about: {
    /** H1 страницы. */
    heading: string;
    /** Крошка раздела в Breadcrumbs (BreadcrumbList §14). */
    breadcrumb: string;
    /** Лид-абзацы под H1. */
    intro: string[];
    /** Содержательные секции H2 + абзацы. */
    sections: { heading: string; paragraphs: string[] }[];
    /** Финальный блок-ссылка на «Обратную связь». */
    feedback: {
      heading: string;
      text: string;
      /** Подпись ссылки на /kontakty/. */
      link: string;
    };
  };
  /**
   * Главная страница раздела «Страховки» (§8.3 хаб с выделенным контентом,
   * InsuranceHub). Регуляторная тема: действующие правила въезда в Грузию +
   * описание сервисов покупки. Бейдж «Обновлено · {date}» + оговорка про
   * актуальность. AffiliateBox нет (партнёров в partners.json нет — R4).
   * Спорные/неподтверждённые данные как факт НЕ публикуем (см. бриф п.4/п.6).
   */
  insurance: {
    /** H1 страницы. */
    heading: string;
    /** Крошка раздела в Breadcrumbs (BreadcrumbList §14). */
    breadcrumb: string;
    /** Лид-абзацы под H1. */
    intro: string[];
    /** Подпись-ссылка на подробный гайд-статью «как выбрать страховку» (перелинковка хаб→статья §14). */
    guideLink: string;
    /** Видимая дата для бейджа «Обновлено · {date}» (ISO yyyy-mm-dd, форматируется по локали). */
    updatedIso: string;
    /** Заметный Callout «Действующие правила» (регуляторика). */
    callout: {
      /** Заголовок плашки. */
      heading: string;
      /** Текст оговорки об актуальности (регуляторика меняется). */
      disclaimer: string;
      /** Подпись-сноска про первоисточник. */
      sourceNote: string;
    };
    /** Блок «Что нужно» — список требований. */
    requirements: {
      heading: string;
      items: string[];
    };
    /** Блок «Штраф за отсутствие полиса». */
    penalty: {
      heading: string;
      /** Абзацы (базовый штраф + оговорка про экстрим-активности). */
      paragraphs: string[];
    };
    /** Блок «Сервисы покупки» — карточки сервисов (без цен и прямых ссылок, §16/R4). */
    services: {
      heading: string;
      /** Вводная строка над карточками (про ориентир цен и /go/ позже). */
      lead: string;
      /** Пометка-плейсхолдер вместо кнопки «оформить» (партнёрки — R4). */
      ctaPlaceholder: string;
      items: { name: string; note: string; text: string }[];
    };
    /** Партнёрский бокс SafetyWing (AffiliateBox → /go/, §16). */
    affiliate: { title: string; note: string; label: string };
    /** Блок «Нюансы» — практические оговорки. */
    notes: {
      heading: string;
      items: string[];
      /** Подпись ссылки на раздел аренды (отдельная страховка проката). */
      rentalLink: string;
    };
    /** Блок «Что делать при страховом случае» (как заявлять; общая практика, без выдумки). */
    claims: {
      heading: string;
      items: string[];
    };
    /** Иллюстративные фото раздела (CC; credit обязателен §18). src одинаков для языков, alt/caption/credit локализуются. */
    photos: { src: string; alt: string; caption: string; credit: string }[];
    /** Подвал страницы: источники (sources, §14). */
    sources: {
      heading: string;
      items: string[];
    };
  };
  /** Страница «Обратная связь» (§8/§25) — каркас без форм (§18). */
  contacts: {
    /** H1 страницы. */
    heading: string;
    /** Крошка раздела в Breadcrumbs. */
    breadcrumb: string;
    /** Лид-абзацы под H1. */
    intro: string[];
    /** Заголовок списка «о чём писать». */
    reasonsHeading: string;
    /** Поводы написать (буллеты). */
    reasons: string[];
    /** Реальный контакт обратной связи: почта сайта (§18, форм нет). */
    channels: {
      heading: string;
      /** Текст перед ссылкой («Пишите на почту:»). */
      emailLabel: string;
      /** Видимый адрес почты (info@…). */
      email: string;
      /** mailto-ссылка. */
      emailUrl: string;
    };
  };
  /**
   * Хаб «Релокация» (§7, §8.3 — выделенный контент, паттерн InsuranceHub).
   * Фазовый запуск (решение владельца 2026-06-15): сейчас — не-регуляторные
   * практические шаги обустройства; регуляторные темы (виза/ВНЖ/налоги/бизнес)
   * — только указатель на ОФИЦИАЛЬНЫЕ первоисточники + дисклеймер, без
   * перепечатки меняющихся правил (CLAUDE правило 4). Бейдж «Обновлено · {date}».
   */
  relocation: {
    heading: string;
    breadcrumb: string;
    intro: string[];
    /** CTA-карточка на под-директорию услуг (/relokatsiya/uslugi/). */
    uslugi: { heading: string; text: string; cta: string };
    /** ISO-дата «момента проверки» для бейджа «Обновлено · {date}». */
    updatedIso: string;
    /** Регуляторный Callout-дисклеймер (вверху, акцент вином). */
    callout: { heading: string; disclaimer: string; sourceNote: string };
    /** Практические не-регуляторные шаги обустройства (карточки). */
    /** Секция-перечень детальных под-статей релокации (queried в RelocationHub). */
    guides: { heading: string; lead: string };
    steps: { heading: string; items: { title: string; text: string }[] };
    /** AffiliateBox «жильё на первое время» (trip-hotels, §16). */
    affiliate: { title: string; note: string; label: string };
    /** AffiliateBox eSIM (airalo, §16) — мобильный интернет на первое время. */
    esim: { title: string; note: string; label: string };
    /** Внутренняя перелинковка на профильные разделы (воронка §14). */
    links: { heading: string; lead: string; items: { section: string; text: string }[] };
    /** Регуляторика — указатель на официальные госисточники (внешние ссылки). */
    regulatory: {
      heading: string;
      lead: string;
      items: { topic: string; org: string; url: string }[];
      /** Видимая/доступная подпись внешней ссылки. */
      linkLabel: string;
    };
    /** Практические нюансы (чек-лист). */
    notes: { heading: string; items: string[] };
    /** Официальные источники в подвале (§14, строки-цитаты). */
    sources: { heading: string; items: string[] };
  };
  /** Директория «Где поесть» (§8.6). */
  eda: {
    /** H1 директории. */
    heading: string;
    /** Краткий вводный текст под H1. */
    lead: string;
    /** Крошка «Главная» (BreadcrumbList §14). */
    breadcrumbHome: string;
    /** Группа фильтров — заголовок (для скринридеров). */
    filtersLegend: string;
    filters: {
      cityLabel: string;
      districtLabel: string;
      cuisineLabel: string;
      priceLabel: string;
      /** Значение «все» в выпадающих фильтрах. */
      anyOption: string;
      /** Сброс фильтров. */
      reset: string;
    };
    /** Локализованные лейблы ключей кухни (фильтр /eda/) по CUISINE_KEY_SLUGS. */
    cuisineKeys: Record<CuisineKeySlug, string>;
    /** Подпись-ориентир ценника (для скринридеров/легенды). */
    priceHint: string;
    /** Бейдж спонсорского размещения на карточке (§16). */
    sponsoredBadge: string;
    /** Бейдж «иллюстрация» — обложка не фото самого заведения (честность §15). */
    illustrativeBadge: string;
    /** Заголовок блока цен на основные позиции (§8.6). */
    dishesLabel: string;
    /** Подпись-ориентир к ценам блюд («ориентир, уточняйте»). */
    dishesHint: string;
    /** Подпись часов работы (a11y, §8.6). */
    hoursLabel: string;
    /** Подпись-ссылка на якорную статью о кухне «Что попробовать». */
    cuisineGuide: string;
    /** AffiliateBox «жильё» в директории и city-страницах еды (trip-hotels, §16). */
    lodgingHeading: string;
    lodgingInCity: string;
    lodgingNote: string;
    /** Ссылка карточки «На карте». */
    onMap: string;
    /** Доступная подпись ссылки на карту, {name} — название места. */
    onMapAria: string;
    /** Ссылка карточки на сайт/соцсети заведения. */
    website: string;
    /** Строка-счётчик результатов после фильтрации, {count} — число. */
    resultsCount: string;
    /** Пустое состояние: фильтры не дали совпадений. */
    emptyFiltered: string;
    /** Пустое состояние: в директории пока нет мест. */
    emptyNoData: string;
    /** Заголовок блока «как мы отбираем места» (доверие, §15). */
    selectionHeading: string;
    /** Текст блока «как мы отбираем места» (доверие, §15). */
    selectionNote: string;
    /**
     * Per-city страницы «Где поесть в {городе}» (§8.6). Лёгкий шаблон
     * CityFoodPage: интро по городу + проверенные карточки этого города +
     * перелинковка (вся директория, гид по кухне, путеводитель города).
     */
    cityPages: {
      /** Заголовок блока ссылок «по городам» на хабе /eda/. */
      navHeading: string;
      /** Заголовок сетки карточек на city-странице. */
      picksHeading: string;
      /** Ссылка назад на всю директорию /eda/. */
      backToAll: string;
      /** Подпись ссылки на путеводитель города /goroda/{slug}/. */
      cityGuideLink: string;
      /** Контент по каждому городу (название города = поле `city` коллекции). */
      items: Record<
        EdaCityKey,
        { cityName: string; heading: string; lead: string; intro: string[] }
      >;
    };
  };
  /**
   * Лейблы типов достопримечательностей (§8.3) по слугам ATTRACTION_TYPE_SLUGS.
   * Полная запись (Record) — расхождение слугов схемы и словаря ловит TypeScript.
   */
  attractionTypes: Record<AttractionTypeSlug, string>;
  /** Лейблы регионов (мхаре) Грузии (§7) по слугам REGION_SLUGS. */
  regions: Record<RegionSlug, string>;
  /** Лейблы подкатегорий «Развлечений» (§7) по слугам RAZVL_TYPE_SLUGS. */
  razvlTypes: Record<RazvlTypeSlug, string>;
  /** Лейблы рубрик директории «Услуги» (§7) по слугам SERVICE_RUBRIC_SLUGS. */
  serviceRubrics: Record<ServiceRubricSlug, string>;
  /**
   * Хаб «Развлечения» (§7, EntertainmentHub) — фильтр по подкатегории.
   * Заголовок/интро берутся из nav + hub.sections.razvlecheniya; здесь —
   * строки фильтра и сетки. Фильтр показывается только при >1 подкатегории.
   */
  entertainment: {
    filtersLegend: string;
    typeLabel: string;
    anyOption: string;
    reset: string;
    resultsCount: string;
    listHeading: string;
    emptyFiltered: string;
  };
  /**
   * Каталог достопримечательностей (§8.3, шаблон-каталог «Что посмотреть»).
   * Мастер-карта меток + фильтры тип/регион + сетка карточек.
   */
  catalog: {
    /** H1 каталога. */
    heading: string;
    /** Вводный текст под H1 (массив абзацев). */
    intro: string[];
    /** Крошка «Главная» (BreadcrumbList §14). */
    breadcrumbHome: string;
    /** Заголовок блока мастер-карты. */
    mapHeading: string;
    /** aria-label контейнера мастер-карты. */
    mapAria: string;
    /** Подпись-плейсхолдер под кнопкой показа карты. */
    mapHint: string;
    /** Группа фильтров — заголовок (для скринридеров). */
    filtersLegend: string;
    /** Лейбл фильтра по типу достопримечательности. */
    typeLabel: string;
    /** Лейбл фильтра по региону. */
    regionLabel: string;
    /** Значение «любой» в выпадающих фильтрах. */
    anyOption: string;
    /** Сброс фильтров. */
    reset: string;
    /** Строка-счётчик результатов после фильтрации, {count} — число. */
    resultsCount: string;
    /** Заголовок сетки карточек. */
    listHeading: string;
    /** Пустое состояние: фильтры не дали совпадений. */
    emptyFiltered: string;
    /** Пустое состояние: в каталоге пока нет мест. */
    emptyNoData: string;
  };
  /**
   * Директория «Услуги» (§7, /relokatsiya/uslugi/) — сервисы для живущих в
   * Грузии. Шаблон-директория (ServicesDirectory) с фильтром по рубрике;
   * платное размещение — золотая рамка (решение владельца 2026-06-16).
   */
  uslugi: {
    heading: string;
    breadcrumb: string;
    intro: string[];
    rubricLabel: string;
    anyOption: string;
    reset: string;
    filtersLegend: string;
    resultsCount: string;
    listHeading: string;
    contactLabel: string;
    siteLabel: string;
    /** Бейдж «Пример» на демо-карточках услуг. */
    demoLabel: string;
    emptyFiltered: string;
    emptyNoData: string;
    ctaHeading: string;
    ctaText: string;
    ctaLabel: string;
  };
  /**
   * CoordCopy (§9) — блок координат с кнопкой копирования (карточки еды и
   * статьи о месте с geo). Нативный clipboard, фидбэк через aria-live.
   */
  coordCopy: {
    /** Подпись «Координаты». */
    label: string;
    /** Текст кнопки «Скопировать». */
    copy: string;
    /** Фидбэк после копирования «Скопировано». */
    copied: string;
    /** aria-label кнопки, {coords} — строка координат (доступная подпись). */
    copyAria: string;
  };
}
