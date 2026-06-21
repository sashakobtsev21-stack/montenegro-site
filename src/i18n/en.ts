/**
 * English UI dictionary (SPEC §12).
 * In components, strings come only from the dictionary — hardcoding is forbidden.
 */
import type { UIDictionary } from './types';

export const en: UIDictionary = {
  siteName: 'Montenegro Guidebook',
  tagline: 'Montenegro travel guide: vetted places',
  langName: 'English',
  skipToContent: 'Skip to content',
  backToTop: 'Back to top',
  notFound: {
    heading: 'Page not found',
    text: 'The page you are looking for doesn’t exist or has moved. Use the menu above or head back to the homepage.',
    home: 'Go to homepage',
  },
  liveData: {
    heading: 'Right now in Montenegro',
    desc: 'Weather in the main cities and the euro exchange rate — check before you travel.',
    weather: 'Weather',
    sea: 'Sea, Budva',
    fx: 'Euro rate',
    cities: { podgorica: 'Podgorica', budva: 'Budva', kotor: 'Kotor' },
    updated: 'updated',
    source: 'weather: open-meteo · rate: open.er-api.com',
  },
  nav: {
    home: 'Home',
    attractions: 'What to see',
    cities: 'Cities',
    food: 'Food',
    entertainment: 'Entertainment',
    routes: 'Routes',
    planning: 'Before you go',
    transport: 'Transport',
    'car-rental': 'Car rental',
    insurance: 'Insurance',
    news: 'News',
    relocation: 'Relocation',
    about: 'About',
    contact: 'Contact',
  },
  header: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuShort: 'Menu',
    primaryNav: 'Primary navigation',
  },
  lang: {
    label: 'Language',
    switchTo: 'Switch to {lang}',
  },
  footer: {
    disclaimer:
      'Some links on the site are affiliate links. This does not change the price for you and helps support the project.',
    navHeading: 'Sections',
    note: 'Places are chosen by rating and cross-checked with experienced travelers, guides and locals.',
    creatorPrefix: 'Made by',
    creator: 'KOBTSEV',
  },
  verified: {
    inPlace: 'Verified · {date}',
    short: 'Verified',
    updated: 'Updated · {date}',
    caption: 'by experienced travelers, guides, and locals',
    photoAlt: 'Photo of the place',
    samplePlaceholder: 'date verified',
  },
  home: {
    heroTitle: 'Montenegro travel guide: vetted places',
    heroSubtitle:
      'Plan your Montenegro trip without the tourist traps: we pick places by rating and cross-check them with guides and locals. Updated regularly.',
    heroCredit: 'Photo: Braveheart / Wikimedia Commons · CC BY-SA 4.0',
    photoPrefix: 'Photo',
    search: {
      label: 'Search the site',
      placeholder: 'Where are you headed? Kotor, Budva, car rental…',
      emptyNoContent: 'Nothing found yet. Try another word — search runs over the articles already published.',
      emptyNoMatch: 'Nothing found. Try a different query.',
      hint: 'Search runs over already published articles, right in your browser.',
    },
    entriesHeading: 'Where to start',
    tiles: {
      attractions: 'Nature, monasteries, fortresses, canyons, and the Bay of Kotor',
      cities: 'City guides: what to see, where to eat, how to get around',
      food: 'What to try and where to eat honestly — without tourist markups',
      entertainment: 'Where to go out: clubs and bars, quizzes, beaches, casinos, and parks',
      routes: 'Ready-made road trips: a day-by-day plan, budget, and map',
    },
    showcase: {
      heading: 'Montenegro showcase',
      lead: 'The best places, routes and vetted venues — Montenegro at a glance.',
      partnerNote: 'Includes partner placements.',
      aria: 'Showcase: featured places, routes and venues',
      adKicker: 'Advertising',
      adTitle: 'Place your business here',
      kickers: {
        city: 'City',
        route: 'Route',
        sight: 'See',
        food: 'Food',
        nightlife: 'Nightlife',
      },
    },
    allSectionsHeading: 'All sections',
    trustHeading: 'Verified by experienced travelers, guides, and locals',
    trustLead:
      'We don’t rely on memory or old blog posts. Every place is chosen and cross-checked across several sources, so the details stay current.',
    trust: {
      ratingTitle: 'Selected by high ratings',
      ratingText: 'The guide includes places rated 4+★ across several independent sources.',
      localsTitle: 'Confirmed by locals and guides',
      localsText:
        'We check the details with experienced travelers, guides, and locals, not from old blogs.',
      updatedTitle: 'Regular updates',
      updatedText: 'Each article shows the date of its last check — we revisit them by season.',
    },
    badgeSampleHeading: 'What the verification mark looks like',
    sectionsHeading: 'Guide sections',
    freshHeading: 'Latest articles',
    freshEmpty: 'Nothing to show here right now — please check back soon. We keep adding vetted, up-to-date guides.',
    about: {
      heading: 'About the project',
      text: 'Montenegro Guidebook is a travel guide to Montenegro: attractions, cities, food, routes, and car rental. We pick places by rating, cross-check the facts, and date-stamp every article — here’s how we work.',
      link: 'More about the project',
    },
  },
  newsFeed: {
    recentHeading: 'Latest news',
    all: 'All news',
    recentEmpty: 'No recent news yet.',
  },
  actions: {
    more: 'Read more',
    affiliateDisclosure: 'Affiliate link — the price for you stays the same.',
  },
  breadcrumbs: {
    home: 'Home',
    aria: 'Breadcrumbs',
  },
  hub: {
    listHeading: 'In this section',
    empty:
      'The first articles in this section are coming soon. We’re preparing vetted guides with up-to-date information.',
    sections: {
      attractions: {
        intro: [
          'What to see in Montenegro — from the Bay of Kotor and the Durmitor peaks above the Tara Canyon to Lake Skadar, clifftop monasteries, and ancient fortress towns. In this section we gather the places worth traveling for: nature, fortresses, monasteries, and viewpoints across the country — from the Adriatic coast to the northern mountains.',
          'For each attraction we try to honestly answer the main questions: what exactly to see, how to get there, how much time to set aside, and when to go so you’re not disappointed. Where it makes sense, the end of the article has tips on car rental and tours, because the most convenient way to reach many places in Montenegro is by car.',
        ],
      },
      cities: {
        intro: [
          'Montenegro’s cities are like different countries in miniature: the UNESCO bay town of Kotor, lively seaside Budva, yacht-marina Tivat, the year-round capital Podgorica, the old royal capital Cetinje, and mountain-gateway Žabljak. This section has city guides: what to see, where to eat honestly, how to get there, and where to stay.',
          'Cities are a handy starting point for planning: routes branch out from them, attractions are nearby, and this is where you book accommodation, pick up a car, and sort out connectivity. That’s why in the city guides we link to related sections — food, routes, and rental — to put your whole trip in one place.',
        ],
      },
      entertainment: {
        intro: [
          'Entertainment in Montenegro — where to go for experiences beyond old towns and mountains: Adriatic beaches, the Kotor cable car and national parks, museums, and casinos. In this section we gather places to relax and have fun across the country’s cities — with a focus on what matters in practice: where it is, how much admission costs, and when it’s open.',
          'We keep building the section out, city by city. Prices and opening hours are listed per place, so a night out or a day trip is easy to plan ahead.',
        ],
      },
      routes: {
        intro: [
          'Ready-made road trips around Montenegro: a day-by-day plan, a budget guideline, key stops, and a map. The country is compact but mountainous — a car opens up what’s hard to reach by public transport: the Kotor serpentine, the lakeside villages of Skadar, the Durmitor ring, and the canyon roads of the north.',
          'How to choose a direction. The coast — the Bay of Kotor with Perast and Kotor, Budva and Sveti Stefan down to Ulcinj; the centre — Cetinje and the Lovćen mausoleum, Ostrog monastery, Lake Skadar; the north — Durmitor and the Tara Canyon around Žabljak, and the forests of Biogradska Gora near Kolašin; to the mountains — the climb from the bay over Lovćen. And to see it all in one trip, there’s a grand tour of Montenegro, roughly two weeks long.',
          'Season and preparation. The best time for most routes is from late spring to autumn. In winter the mountain sections (the high passes to Durmitor, the Lovćen and Njegoš roads, the northern canyons) are harder, and passes are sometimes closed because of snow — check road conditions before setting off. For the high mountains and narrow serpentines, take a smaller, manoeuvrable car or an SUV. The mileage, days, and budget in the cards are guidelines, not exact measurements: it all depends on the number of stops, the season, and accommodation.',
        ],
      },
      transport: {
        intro: [
          'Transport in Montenegro — how to get around the country: airports, the coastal railway, intercity buses, transfers, and ferries across the Bay of Kotor. This section has practical guides: how to get from point to point, roughly how long the trip takes, and what options there are.',
          'Here you’ll find the country’s airports (Podgorica, Tivat, and nearby Dubrovnik in Croatia), city transport, and popular routes like Podgorica → Budva or Kotor → Budva (bus, car) — and we keep adding directions and modes of transport. It’s handy to plan transport together with the “Car rental” and “Routes” sections.',
        ],
      },
      'car-rental': {
        intro: [
          'Car rental in Montenegro is one of the most common questions before a trip: where to get a car, how much it costs, whether you need a deposit, and what catches there are in the contracts. In this section we break down rental by city and airport and compare the options — from international aggregators to local rental companies.',
          'We write about rental from the perspective of a traveler who has personally dealt with deposits, surcharges, and “insurance on site.” Specific prices and terms are something that goes out of date fast, so we mark the date they’re current and don’t pass off old figures as fresh.',
        ],
      },
      insurance: {
        intro: [
          'Insurance for a trip to Montenegro and for living in the country is a topic that’s easy to put off and that people regret at the worst possible moment. In this section we break down which insurance policies actually work for travelers and relocators, how they differ, and what to look for when choosing.',
          'Different readers need different solutions: a tourist staying a week needs one kind of insurance, someone living in Montenegro for months needs another, with regular renewal. For Ukrainian travelers we call out options that still work, such as EKTA, since some of the standard policies are off-limits to them.',
        ],
      },
      planning: {
        intro: [
          'Planning a trip to Montenegro is what people look up before booking: do you need a visa, when to go, how much money to bring, and what about insurance and safety. This section gives short, practical answers with links to the sections that cover each topic in depth.',
          'We keep only what actually affects your prep here: visa and entry rules, seasons and weather, money and budget, and travel insurance. Regulatory things (visas, entry) change fast — we mark the date and link the official source (gov.me) rather than passing off old facts as current.',
        ],
      },
      news: {
        intro: [
          'News and updates to the guide: new vetted places, seasonal tips, and changes worth knowing before a trip. Montenegro changes — venues open and close, prices and rental terms shift, new routes appear — and this section keeps the guide up to date.',
          'We don’t chase “hot” news for the sake of traffic. What lands here is what actually affects trip planning: what we’ve re-checked, what we’ve updated by season, and which places we’ve added after cross-checking with locals and guides. The entries show a date — so you always know how current the information is.',
        ],
      },
    },
  },
  map: {
    placeHeading: 'On the map',
    placeAria: 'Interactive map with the location of the place',
    placeHint: 'The map loads on click — to keep the page lightweight.',
    show: 'Show map',
    error: 'The map didn’t load. Check your connection and refresh the page.',
    attribution: '© OpenStreetMap contributors',
    openInGoogle: 'Open in Google Maps',
    label: 'Map · Google',
  },
  access: {
    heading: 'Distance',
    km: 'km',
    origins: {
      podgorica: 'Podgorica',
      tivat: 'Tivat',
      budva: 'Budva',
    },
  },
  visit: {
    heading: 'Admission and opening hours',
    price: 'Admission price',
    hours: 'Opening hours',
    checked: 'Details checked',
  },
  gallery: {
    heading: 'Photos',
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
  },
  hotelWidget: {
    heading: 'Search and book hotels',
    cta: 'Show hotel search',
    note: 'Trip.com partner widget. Loads on click. Prices and availability are on the service’s side.',
    frameTitle: 'Hotel search in Montenegro — Trip.com',
  },
  article: {
    tocHeading: 'Contents',
    relatedHeading: 'Read also',
    about: {
      heading: 'How we select and verify places',
      text: 'Places make it into the guide by high ratings across several independent sources and are cross-checked with experienced travelers, guides, and locals. We don’t reprint others’ ratings verbatim and we update articles regularly — each one shows the date it was checked.',
      link: 'More about the project',
    },
    demoNoteHeading: 'An example listing',
    demoNote:
      'This is a sample card for this section — a real venue will appear here with its address, opening hours, prices and our own description. Want your venue featured? Get in touch via the Contact page.',
    demoLabel: 'Example',
  },
  route: {
    summary: {
      days: 'Days on the road',
      daysValue: '{count}',
      distance: 'Distance',
      distanceValue: '≈{km} km',
      budget: 'Budget from',
      season: 'Best season',
    },
    timelineHeading: 'Route day by day',
    timelineAria: 'Route stops in order',
    stopKm: '{km} km from the start',
    stopStart: 'Route start',
    stopStay: 'stop ≈{min} min',
    mapHeading: 'Route map',
    mapHint: 'The map with stops loads on click — to keep the page lightweight.',
    mapAria: 'Interactive route map with stops',
    affiliateHeading: 'A car for this route',
    affiliatePlaceholder:
      'The most convenient way to do this route is by car. How to get a car without surprises is in the “Car rental” section.',
    affiliateNote: 'Get a car for this route — compare prices on Trip.com.',
    affiliateHotelsHeading: 'Where to stay along the route',
    affiliateHotelsNote: 'Overnight stops along the way — hotels and apartments on Trip.com.',
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    demoNote:
      'Mileage, travel time, and budget are rounded guidelines. Before your trip, verify the current figures, prices, and road conditions.',
  },
  about: {
    heading: 'About the project',
    breadcrumb: 'About',
    intro: [
      'Montenegro Guidebook is a guide to all of Montenegro, available in English, Russian and Ukrainian. We bring together in one place everything you need for a trip: attractions, cities, food, ready-made routes, car rental, insurance, and news. The goal is simple — to help you plan a trip without outdated advice and tourist traps.',
      'We don’t write “from memory” and we don’t retell other people’s articles. The guide has a clear principle: how we select places, how we verify facts, and why each article shows the date it was checked. More on that below.',
    ],
    sections: [
      {
        heading: 'How we select places',
        paragraphs: [
          'Not everything makes it into the guide — only places with high ratings, from 4★ and up, and across several independent sources at that. If a place is rated well in just one place while others are silent or negative about it, that’s not a consensus for us, and we don’t add it.',
          'A high rating from several sources is a filter at the entrance, not a finished article. Then our work begins: our own honest description, a check of the details, and a current date. Thin “tick-the-box” spots with no real value don’t make it into the guide.',
        ],
      },
      {
        heading: 'How we verify facts',
        paragraphs: [
          'We cross-check the details — how to get there, when to go, what to budget time and money for — with experienced travelers, guides, and locals, rather than taking them from blogs five years old. That’s collective verification: several points of view instead of a single opinion.',
          'Each article shows the date of its last check or update. So you immediately know how current the information is. We revisit articles by season: places change, some close, prices and terms drift — the guide should reflect that.',
        ],
      },
      {
        heading: 'Honest about figures and prices',
        paragraphs: [
          'We don’t reprint others’ ratings and review counts verbatim — that’s platform data, and their rules forbid such copying. For us a rating is a selection criterion, not content: to see the current rating and reviews, follow the link to the source or the map.',
          'Prices, opening hours, and terms in our articles are guidelines as of the check date, not a guarantee. Montenegro changes fast, so always verify the details that matter for your trip (the rental price, the deposit, the admission cost) on the other side before you pay.',
        ],
      },
      {
        heading: 'How the project runs',
        paragraphs: [
          'Some links on the site are affiliate links: car rental, accommodation, tours, insurance, connectivity. If you follow such a link and book something, we get a small commission from the service. The price for you stays the same — and the project exists and is updated on these funds.',
          'Partnership doesn’t affect selection: a place makes it into the guide for its rating and verification, not because it has an affiliate program. If it’s better or more honest to recommend an option without an affiliate link, we recommend it.',
        ],
      },
    ],
    feedback: {
      heading: 'Spotted an inaccuracy?',
      text: 'The guide lives on updates. If a place has closed, prices or terms have changed — or you want to suggest a good place — write to us. That keeps the information current for everyone.',
      link: 'Go to contact',
    },
  },
  insurance: {
    heading: 'Insurance for a trip to Montenegro: what you need and where to get it',
    breadcrumb: 'Insurance',
    intro: [
      'Travel medical insurance isn’t something Montenegro forces on tourists at the border, but going without it is a gamble you don’t want to take: a policy covers treatment, an accident, or evacuation if something goes wrong far from home. Below are the things worth checking in a policy and the services through which travelers usually buy one.',
      'Entry and insurance rules can change, so we don’t present any figure as a fixed legal requirement. We’ve gathered practical guidance into one block and advise verifying the current entry conditions against official sources before your trip — links are at the bottom of the page.',
    ],
    updatedIso: '2026-06-14',
    callout: {
      heading: 'Before you travel: check the current entry rules',
      disclaimer:
        'Montenegro does not currently require tourists to hold travel insurance to enter, but we still recommend a policy for any trip. Entry conditions can change, so don’t treat this page as a legal source — verify the current requirements before your trip.',
      sourceNote:
        'For the official entry rules check government resources: the Government of Montenegro (gov.me), the Ministry of Foreign Affairs, and your nearest Montenegrin embassy or consulate. Links to the sources are at the bottom of the page.',
    },
    guideLink: 'In depth: how to choose and buy a policy',
    requirements: {
      heading: 'What to look for in a policy',
      items: [
        'Get a policy for everyone travelling, including children — medical care abroad is expensive and a single incident can cost far more than the premium.',
        'Pick a sensible coverage limit. There’s no fixed legal minimum for Montenegro, but for Europe a limit around €30,000–50,000 is a common, comfortable benchmark.',
        'The policy should cover the entire trip: from the entry date to the exit date.',
        'The issuer can be a Montenegrin or a foreign insurance company — what matters is that the coverage is valid in Montenegro/Europe.',
        'Coverage should include both medical expenses and accidents — ideally a “health and accident” policy. Check that medical evacuation and repatriation are included.',
        'Keep the policy in English where possible: it’s the easiest language to present at a clinic or to an assistance service. A version in your own language alongside is fine.',
        'Carry the policy details with you (on your phone is enough): the certificate, the coverage limit, and the 24/7 assistance number.',
        'Montenegro uses the euro (€), so quote and compare coverage limits in euros to avoid confusion at a clinic or with the insurer.',
      ],
    },
    penalty: {
      heading: 'What it costs to skip insurance',
      paragraphs: [
        'There’s no border fine for travelling without insurance, but the real cost is medical: without a policy you pay clinics and any evacuation out of pocket, and in a serious case that can run into thousands of euros. It’s far cheaper to buy a policy in advance than to count on “sorting it out on site.”',
        'For active travel — hiking in Durmitor, rafting the Tara, skiing, diving, or other adventure activities — you usually need a separate coverage option: a basic tourist policy may not cover such cases. Verify the exact coverage terms for adventure activities with the insurer before your trip.',
      ],
    },
    services: {
      heading: 'Where to get a policy',
      lead: 'Below are the services through which travelers most often get insurance for Montenegro. Whichever option you choose, check the essentials: a sensible coverage limit for the whole trip (around €30,000–50,000 is a comfortable benchmark for Europe), a policy you can present in English, and accident cover included (basic plans often don’t have it — it’s added as a separate option). Prices depend on age, duration, and the coverage set, so we give only guidelines, without exact amounts.',
      ctaPlaceholder: 'Sign up on the service’s website. Before buying, verify the current terms and rate.',
      items: [
        {
          name: 'EKTA',
          note: 'a working option for everyone, including citizens of Ukraine',
          text: 'Online insurance paid by card from anywhere in the world; the policy arrives by email. Coverage is easy to adjust, and the limit can be raised well above a comfortable European benchmark of €30,000–50,000. The service’s legal entity is registered in an offshore jurisdiction — this doesn’t affect how the policy works, but keep it in mind.',
        },
        {
          name: 'SafetyWing (Nomad Insurance)',
          note: 'for digital nomads and long trips',
          text: 'Subscription insurance billed monthly — convenient for those who live in Montenegro or travel for a long time and don’t want to buy a policy for a fixed period. Suits a relocation and wintering scenario. The service has changed its terms and rates — verify the current ones before buying.',
        },
        {
          name: 'Cherehapa, Polis812',
          note: 'aggregators for citizens of Russia',
          text: 'Comparison services: they show offers from several insurers at once and help you pick a policy for the limit and duration you need. Handy when you want to compare terms in one place; the set of insurers and the service’s availability change over time — go by the current list on the service itself.',
        },
        {
          name: 'Lovćen Osiguranje, Sava Montenegro, Generali',
          note: 'local Montenegrin insurers',
          text: 'Montenegrin companies: handy if you’re already in the country or want a locally issued policy in euros. Branches are easy to reach in the bigger towns; check that the plan covers medical treatment and an accident, and ask for an English-language certificate so it’s simple to use at a clinic.',
        },
      ],
    },
    affiliate: {
      title: 'Get SafetyWing insurance',
      note: 'Nomad Insurance billed monthly — convenient for long trips and living in Montenegro. Before buying, verify the current terms and that they meet the entry requirements.',
      label: 'Sign up online',
    },
    notes: {
      heading: 'What’s important to keep in mind',
      items: [
        'Check that the policy includes accident cover. The best policies are “health and accident,” and in basic medical plans an accident often comes as a separate option: medical coverage alone may not be enough.',
        'Citizens of Ukraine find it more convenient to get a policy through EKTA or Ukrainian services (for example, Green Travel, Finance.ua). This is a practical recommendation based on service availability, not a ban: “Russian insurance is banned for Ukrainians” is an unconfirmed claim, and we don’t present it as a rule.',
        'Buy the policy before you travel: some services have a 5–7 day “waiting period” — the insurance doesn’t take effect immediately after payment.',
        'Visa-free entry (for many countries — up to 90 days) is not the same as insurance: it doesn’t cover your medical costs, so a policy is still worth having.',
        'Car rental insurance is a separate matter. A medical policy doesn’t cover damage to the car: for the rental you need your own insurance (CDW / collision), which is arranged together with the rental.',
      ],
      rentalLink: 'More about car rental and its insurance',
    },
    claims: {
      heading: 'What to do in case of a claim',
      items: [
        'Keep your insurer’s assistance service contact (usually a 24/7 phone line or app) — it’s listed in your policy. Save it to your phone before the trip.',
        'If you fall ill or get injured, call the assistance service first whenever possible: many policies require treatment to be pre-authorised. If you go to a clinic without it, the costs may not be reimbursed.',
        'Keep all documents: bills and payment receipts, discharge notes, diagnoses, referrals and prescriptions. Without supporting documents, reimbursement is difficult.',
        'Check how your policy works: the insurer either pays the clinic directly (direct billing) or you pay yourself and are reimbursed later against your receipts.',
        'Respect the deadline for filing a claim — it’s stated in your policy terms. Don’t delay: late claims are often rejected.',
        'Montenegro’s single emergency number is 112 (ambulance, police, rescue). In a serious situation, call for help first and sort things out with the insurer afterwards.',
      ],
    },
    photos: [],
    sources: {
      heading: 'Sources',
      items: [
        'Government of Montenegro (gov.me) — official entry and stay conditions.',
        'Ministry of Foreign Affairs of Montenegro (mfa.gov.me) — visa and entry rules for foreign nationals.',
        'Your nearest Montenegrin embassy or consulate — current entry requirements for your citizenship.',
        'Montenegrin insurance companies (Lovćen Osiguranje, Sava Montenegro, Generali) — coverage terms and limits in euros.',
      ],
    },
  },
  contacts: {
    heading: 'Contact',
    breadcrumb: 'Contact',
    intro: [
      'The guide stays current thanks in part to readers. If you’ve spotted outdated information, know a good place, or have a question about a trip — tell us.',
      'There are no forms on the site — this is a deliberate choice: less spam and no storing of your personal data. For suggestions, advertising, and any questions, write to us by email — it’s listed below.',
    ],
    reasonsHeading: 'What’s worth writing about',
    reasons: [
      'A place has closed, moved, or its prices and terms have changed — we’ll help update the article.',
      'You want to suggest a vetted place, route, or tip for the guide.',
      'Advertising, collaboration, or a commercial proposal — we’ll discuss placement terms.',
      'You have a trip question you didn’t find an answer to in the articles.',
      'You found an error or inaccuracy in the text.',
    ],
    channels: {
      heading: 'How to get in touch',
      emailLabel: 'Write to us by email:',
      email: 'info@montenegroguidebook.com',
      emailUrl: 'mailto:info@montenegroguidebook.com',
    },
  },
  relocation: {
    heading: 'Relocating to Montenegro: how to settle in',
    breadcrumb: 'Relocation',
    uslugi: {
      heading: 'Services for living in Montenegro',
      text: 'Real estate agents, cleaning, moving, repairs, documents, translators — a directory of vetted services so you don’t have to dig through chats.',
      cta: 'Open services',
    },
    intro: [
      'Montenegro is an increasingly popular base for a long stay and relocation: visa-free entry for citizens of many countries (typically 90 days in 180), the euro, inexpensive Adriatic living, fast internet, and growing Russian- and Ukrainian-speaking communities on the coast. This section is a practical guide to settling in on the ground.',
      'We start with the non-regulatory things everyone needs: housing, connectivity, banking, transport, insurance. Documents, residence permits, and taxes are regulated by the state, and they change periodically — for those we give direct links to official sources and are preparing separate breakdowns.',
    ],
    updatedIso: '2026-06-15',
    callout: {
      heading: 'Documents and taxes change — verify with the primary source',
      disclaimer:
        'The rules for entry, residence permits, business registration, and taxes in Montenegro are revised periodically (for example, the digital nomad permit and the new Company Law). Don’t rely on retellings in chats and outdated articles — verify the terms as of the time of your move directly with the government bodies (gov.me / MUP; links below).',
      sourceNote:
        'That’s why we don’t fix specific deadlines, amounts, and requirements here as unchanging, but point you to the official sites — they always have the current version.',
    },
    guides: {
      heading: 'Detailed guides',
      lead: 'In-depth, non-regulatory how-tos for settling in — updated as things change.',
    },
    steps: {
      heading: 'Where to start on the ground',
      items: [
        {
          title: 'Housing for your first weeks',
          text: 'For the first weeks it’s convenient to stay in a hotel, guesthouse, or apart-hotel, and look for a long-term rental on the ground, having seen the neighborhood in person. The largest local listing boards are nekretnine.me and 4zida.me; there are also many options through local Facebook groups, chats, and agencies.',
        },
        {
          title: 'SIM card and internet',
          text: 'A local SIM is sold with a passport at operators’ offices and shops — the main ones are Crnogorski Telekom, m:tel, and Yettel. Mobile internet is fast and inexpensive, Wi-Fi is everywhere in the cities; this is one of Montenegro’s strengths for remote work.',
        },
        {
          title: 'Bank account',
          text: 'An account and a card are opened for foreigners by the major banks — CKB, NLB, Hipotekarna, and Erste are among the larger ones. Requirements and check times are periodically tightened, so verify the document set and terms at a branch in advance.',
        },
        {
          title: 'Long-term rental',
          text: 'The lease is usually for 6–12 months, with a deposit most often equal to one month. Prices depend on the city and season: on the coast (Budva, Kotor, Tivat) summer rents spike, while in Podgorica demand is steadier year-round. Check the meters, the internet, and who pays for utilities.',
        },
        {
          title: 'Transport and getting around',
          text: 'In the cities — cheap public buses (Podgorica has the densest network); between cities — frequent intercity buses and the coastal Bar–Podgorica railway. For freedom of movement many rent a car — how that works is in our rental section.',
        },
        {
          title: 'Health and insurance',
          text: 'There are public and private clinics; the level of private medicine in the big cities is good. For the move and for trips, medical insurance with coverage abroad is convenient — options are in our insurance section.',
        },
        {
          title: 'Daily life and community',
          text: 'The euro (€) — cash is handy in smaller towns and at markets, while in the cities cards are accepted almost everywhere. The coast (Budva, Bar, Herceg Novi) and Podgorica have growing Russian- and Ukrainian-speaking communities, and cafes and services often speak English — it’s easy to adapt even without Montenegrin.',
        },
      ],
    },
    affiliate: {
      title: 'Where to stay the first weeks',
      note: 'Hotels and apartments for your first weeks in Montenegro — compare prices on Trip.com.',
      label: 'Find a place for your first weeks',
    },
    esim: {
      title: 'eSIM with internet for your first days',
      note: 'Mobile internet from arrival, until you get a local SIM — the eSIM activates online.',
      label: 'Buy an eSIM for Montenegro',
    },
    links: {
      heading: 'What’s already on the site',
      lead: 'Practical sections that come in handy when relocating:',
      items: [
        { section: 'insurance', text: 'medical insurance with coverage abroad' },
        { section: 'car-rental', text: 'car rental: how, where, and without overpaying' },
        { section: 'transport', text: 'how to get there and travel between cities' },
        { section: 'cities', text: 'Montenegro’s cities — where to live and what’s nearby' },
        { section: 'food', text: 'where to eat: vetted places by city' },
      ],
    },
    regulatory: {
      heading: 'Documents, visas, and taxes: official sources',
      lead: 'For these topics we point you straight to government sites — they have the current rules, deadlines, and amounts. We prepare separate breakdowns relying on these same sources.',
      items: [
        {
          topic: 'Visa, visa-free entry, and length of stay',
          org: 'Ministry of Foreign Affairs of Montenegro',
          url: 'https://www.gov.me/en/mvp',
        },
        {
          topic: 'Residence and work permit, digital nomad permit',
          org: 'Ministry of Interior (MUP)',
          url: 'https://www.gov.me/en/mup',
        },
        {
          topic: 'Taxes for individuals and companies',
          org: 'Revenue and Customs Administration',
          url: 'https://www.gov.me/en/uphi',
        },
        {
          topic: 'Registering a company (d.o.o.)',
          org: 'Central Registry of Business Entities (CRPS)',
          url: 'https://www.gov.me/en/uphi',
        },
        {
          topic: 'Driver’s license and vehicle registration',
          org: 'Ministry of Interior (MUP)',
          url: 'https://www.gov.me/en/mup',
        },
      ],
      linkLabel: 'official site',
    },
    notes: {
      heading: 'Nuances people ask about',
      items: [
        'The language is Montenegrin, but in the cities and on the coast you can easily get by with English and Russian: signs and menus are often duplicated.',
        'The money is the euro (€) — Montenegro uses it unilaterally. We show the current euro rate on the home page in the “Right now in Montenegro” block.',
        'Internet and connectivity are cheap and fast, which is why remote workers love Montenegro.',
        'Housing on the coast (Budva, Kotor, Tivat) gets noticeably more expensive in the summer season — worth keeping in mind for a long-term rental.',
      ],
    },
    sources: {
      heading: 'Official sources',
      items: [
        'Ministry of Foreign Affairs of Montenegro (visa, entry) — gov.me/en/mvp',
        'Ministry of Interior, MUP (residence and work permit, digital nomad permit) — gov.me/en/mup',
        'Revenue and Customs Administration (taxes for individuals and companies) — gov.me/en/uphi',
        'Central Registry of Business Entities, CRPS (company registration) — gov.me',
        'Government of Montenegro portal (official services and updates) — gov.me',
      ],
    },
  },
  eda: {
    heading: 'Where to eat in Montenegro',
    lead: 'Restaurants, cafes, wine bars, bakeries and markets — by city. Each place has its address, hours, our honest write-up and a link to the map.',
    breadcrumbHome: 'Home',
    filtersLegend: 'Place filters',
    filters: {
      cityLabel: 'City',
      districtLabel: 'District',
      cuisineLabel: 'Cuisine',
      priceLabel: 'Price level',
      anyOption: 'Any',
      reset: 'Reset filters',
    },
    cuisineKeys: {
      montenegrin: 'Montenegrin',
      seafood: 'Seafood',
      grill: 'Grill (roštilj)',
      wine: 'Wine bar',
      cafe: 'Café',
      bakery: 'Bakery',
      vegetarian: 'Vegetarian',
      street: 'Street food',
      bar: 'Bar',
    },
    priceHint: 'Price level: € — cheap, €€ — mid-range, €€€ — above average.',
    sponsoredBadge: 'Partner',
    illustrativeBadge: 'Illustration',
    dishesLabel: 'Prices for main dishes',
    dishesHint: 'a guideline, check on site',
    hoursLabel: 'Opening hours',
    cuisineGuide: 'What to try in Montenegro: a guide to the cuisine',
    lodgingHeading: 'Where to stay in Montenegro',
    lodgingInCity: 'Where to stay in {city}',
    lodgingNote: 'Hotels and apartments near the best places — compare on Trip.com.',
    onMap: 'On the map',
    onMapAria: 'Open “{name}” on the map (in a new tab)',
    website: 'Website',
    resultsCount: 'Places shown: {count}',
    emptyFiltered: 'Nothing matches the selected filters. Reset some of the conditions.',
    emptyNoData: 'This section is being filled in: vetted places with honest descriptions and a check date will appear here soon.',
    selectionHeading: 'How we pick these places',
    selectionNote:
      'Places make it here on merit: we take venues with high ratings (4+★) across several sources and cross-check them with experienced travelers, guides and locals. A rating is a selection criterion, not the write-up itself — we don’t reprint other sites’ scores word for word; see the exact rating on the map. We write every description ourselves. The gold medal on a card is our seal of quality: only places we have checked in person that meet a high standard of service and food quality receive it.',
    cityPages: {
      navHeading: 'Where to eat, by city',
      picksHeading: 'Our vetted places',
      backToAll: 'The whole “Where to eat” directory',
      cityGuideLink: 'City guide',
      items: {
        budva: {
          cityName: 'Budva',
          heading: 'Budva restaurants & cafes',
          lead: 'Budva is the heart of the Montenegrin riviera: fresh Adriatic seafood, konobas in the walled old town, and lively terraces along the promenade. Vetted places by the beach and inside Stari Grad.',
          intro: [
            'Budva’s dining splits between the medieval old town (Stari Grad), the Slovenska Plaža promenade and the marina. Expect grilled fish and seafood, Balkan grill (ćevapi, pljeskavica), and Adriatic-Italian pizza and pasta, with busy summer terraces. Prices climb in the old town and along the beachfront and ease off a few streets inland.',
            'Below are our vetted places in Budva — seafood, konoba classics, wine and cafes. What to order across Montenegrin cuisine — fresh fish, njeguški pršut, grilled meats, local wine — is in the guide to the cuisine. We verify each venue and note the check date.',
          ],
        },
        kotor: {
          cityName: 'Kotor',
          heading: 'Kotor restaurants & cafes',
          lead: 'Kotor is a UNESCO old town wrapped in the bay: Mediterranean and Adriatic cooking, seafood and Boka specialties in stone-walled konobas. Vetted places inside the walls and around the waterfront.',
          intro: [
            'Inside Kotor’s walls the squares are lined with restaurants and wine bars; along the Bay of Kotor (Boka) you’ll find seafood konobas, mussels and fresh fish from the bay. The old town is more touristy and pricier; Dobrota and Muo just outside are calmer and often better value.',
            'Below are our vetted places in Kotor. For the basics of Montenegrin and Boka cuisine — buzara mussels, black risotto, fresh fish, local wine — see the guide to the cuisine; each venue shows the check date.',
          ],
        },
        podgorica: {
          cityName: 'Podgorica',
          heading: 'Podgorica restaurants & cafes',
          lead: 'Podgorica is the year-round capital: Balkan grill, riverside cafes and a local food scene beyond the coast. Vetted places across the centre and along the Morača.',
          intro: [
            'As the capital, Podgorica eats all year round, not just in summer. The scene runs from Balkan grill houses (roštilj, ćevapi) and traditional konobas to modern cafes and international spots around the city centre and the Morača river. Prices are generally lower and more local than on the coast.',
            'Below are our vetted places in Podgorica. What to try across Montenegrin cuisine is in the guide to the cuisine; each venue lists the check date.',
          ],
        },
      },
    },
  },
  attractionTypes: {
    'gory-priroda': 'Mountains and nature',
    'vodopady-kanony-ozera': 'Waterfalls, canyons, lakes',
    peschery: 'Caves and cave towns',
    'hramy-monastyri': 'Churches and monasteries',
    'kreposti-zamki': 'Fortresses and castles',
    'kurorty-termy': 'Resorts and hot springs',
    'muzei-gorodskoe': 'Museums and city sights',
  },
  regions: {
    coastal: 'Adriatic coast',
    central: 'Central',
    northern: 'North',
  },
  razvlTypes: {
    'nochnaya-zhizn': 'Nightlife',
    afisha: 'What’s on',
    aktivnyy: 'Active leisure',
    kazino: 'Casinos',
    mesta: 'Places',
  },
  serviceRubrics: {
    'zhilyo-rieltory': 'Housing and real estate agents',
    klining: 'Cleaning',
    pereezd: 'Moving and freight',
    remont: 'Repairs and tradespeople',
    dokumenty: 'Documents and lawyers',
    perevodchiki: 'Translators and notary services',
  },
  entertainment: {
    filtersLegend: 'Entertainment filters',
    typeLabel: 'Type',
    anyOption: 'Any',
    reset: 'Reset filters',
    resultsCount: 'Shown: {count}',
    listHeading: 'Where to go out',
    emptyFiltered: 'Nothing yet for the selected type. Reset the filter.',
  },
  catalog: {
    heading: 'What to see in Montenegro',
    intro: [
      'A catalog of Montenegro’s attractions: nature and mountains, canyons and lakes, fortress towns, ancient churches and monasteries, and the bays of the Adriatic coast. Filter them by type and region below and open a card with the details.',
      'Places make it into the catalog not “from an old blog from memory.” We select them by high ratings across several independent sources and check the details with experienced travelers, guides, and locals. Every article shows the date of its last check.',
    ],
    breadcrumbHome: 'Home',
    mapHeading: 'All places on the map',
    mapAria: 'Interactive map of Montenegro’s attractions',
    mapHint: 'The map with all the markers loads on click — to keep the page lightweight.',
    filtersLegend: 'Attraction filters',
    typeLabel: 'Type',
    regionLabel: 'Region',
    anyOption: 'Any',
    reset: 'Reset filters',
    resultsCount: 'Places shown: {count}',
    listHeading: 'Attractions',
    emptyFiltered: 'Nothing matches the selected filters. Reset some of the conditions.',
    emptyNoData: 'This section is being filled in: vetted places with honest descriptions and a check date will appear here soon.',
  },
  uslugi: {
    heading: 'Services in Montenegro: for living and relocating',
    breadcrumb: 'Services',
    intro: [
      'Services that those living in Montenegro and those relocating need: real estate agents and help with housing, cleaning, freight, repairs, paperwork, translators. Conveniently gathered in one place — by category and city.',
      'We add to this section as requests come in. Paid placements are marked with a gold border; everything else we add once we’ve verified the service.',
    ],
    rubricLabel: 'Category',
    anyOption: 'Any',
    reset: 'Reset filters',
    filtersLegend: 'Service filters',
    resultsCount: 'Services shown: {count}',
    listHeading: 'Services',
    contactLabel: 'Contact',
    siteLabel: 'Website',
    demoLabel: 'Sample',
    emptyFiltered: 'Nothing yet for the selected category. Reset the filter.',
    emptyNoData: 'This section is being filled in: vetted services for living in Montenegro will appear here soon.',
    ctaHeading: 'Is your service here?',
    ctaText: 'Real estate agents, cleaning, tradespeople, and other services for those living in Montenegro — write to us and we’ll tell you about placement.',
    ctaLabel: 'Ask about placement',
  },
  coordCopy: {
    label: 'Coordinates',
    copy: 'Copy',
    copied: 'Copied',
    copyAria: 'Copy coordinates {coords}',
  },
  hubAffiliate: {
    'car-rental': {
      title: 'Car rental in Montenegro',
      note: 'Compare rental prices on Trip.com.',
    },
    transport: {
      title: 'Flights to Montenegro',
      note: 'Search flights and fares on Trip.com.',
    },
    cities: {
      title: 'Where to stay',
      note: 'Hotels and apartments across Montenegro on Trip.com.',
    },
    entertainment: {
      title: 'Tours & activities',
      note: 'Find tours and activities across Montenegro on Trip.com.',
    },
  },
};
