// @ts-check
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * Слаги demo-материалов (`demo: true`) — исключаются из sitemap (аудит 2026-06-17, P0):
 * demo-страницы рендерятся видимыми (бейдж «Пример») но с <meta robots noindex>, и не
 * должны слать конфликтующий сигнал в карту/тратить краулинг-бюджет. Читаем frontmatter
 * контента на этапе конфига (без зависимостей) — робастно к будущим demo.
 */
function collectDemoSlugs() {
  const slugs = new Set();
  /** @param {string} dir */
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.md')) {
        const fm = readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
        if (/^demo:\s*true\s*$/m.test(fm)) {
          const slug = fm.match(/^slug:\s*['"]?([^'"\n]+)/m)?.[1]?.trim();
          if (slug) slugs.add(slug);
        }
      }
    }
  };
  walk('src/content');
  return slugs;
}
const DEMO_SLUGS = collectDemoSlugs();

/**
 * Карта slug → дата последнего обновления (для sitemap `lastmod`, аудит P2-9).
 * Берём `updatedAt` (или `publishedAt`) из frontmatter — даёт Google честный
 * сигнал свежести по конкретным URL. Не-контентные страницы (хабы/главная)
 * остаются без lastmod (не врём «обновлено» на каждый деплой).
 */
function collectContentDates() {
  const map = new Map();
  /** @param {string} dir */
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.md')) {
        const fm = readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
        const slug = fm.match(/^slug:\s*['"]?([^'"\n]+)/m)?.[1]?.trim();
        const date = (
          fm.match(/^updatedAt:\s*['"]?(\d{4}-\d{2}-\d{2})/m) ??
          fm.match(/^publishedAt:\s*['"]?(\d{4}-\d{2}-\d{2})/m)
        )?.[1];
        if (slug && date && !map.has(slug)) map.set(slug, date);
      }
    }
  };
  walk('src/content');
  return map;
}
const CONTENT_DATES = collectContentDates();

// https://astro.build/config
export default defineConfig({
  // ⚠ ПЛЕЙСХОЛДЕР: домен ещё не куплен — заглушка, реальный задаётся на деплое.
  site: 'https://montenegroguidebook.com',
  trailingSlash: 'always',
  output: 'static',
  build: {
    // Files emitted as directory/index.html so URLs keep a trailing slash (§7).
    format: 'directory',
  },
  integrations: [
    // Карта сайта всех языковых версий (§14). i18n-режим добавляет взаимные
    // hreflang-alternates (en/ru/uk) к каждому URL, что совпадает с зеркальной
    // структурой §7/§12 (en — корень, ru — /ru/, uk — /uk/, x-default → en).
    // /go/ — Worker-роут поверх Static Assets (§16), в dist его нет → в карту
    // не попадает; явный filter оставляем как защиту на случай будущих страниц.
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ru: 'ru', uk: 'uk' },
      },
      // /go/ — Worker-роут (§16), в dist его нет; фильтр — защита на будущее.
      // /relocation/services/ пока пуст (коллекция services пустая) → держим вне карты
      // и под noindex по ВСЕМ языкам. УБРАТЬ строку-regex ниже, когда появятся реальные услуги.
      filter: (page) => {
        const p = new URL(page).pathname;
        if (p.startsWith('/go/')) return false;
        if (/^\/(ru\/|uk\/)?relocation\/services\/$/.test(p)) return false;
        // demo-материалы (demo:true) — noindex, держим вне карты (аудит 2026-06-17, P0).
        const lastSeg = p.replace(/\/$/, '').split('/').pop();
        if (lastSeg && DEMO_SLUGS.has(lastSeg)) return false;
        return true;
      },
      // x-default → en (язык по умолчанию) в alternate-ссылках карты (§14).
      serialize(item) {
        if (item.links?.length) {
          const def = item.links.find((l) => l.lang === 'en');
          if (def && !item.links.some((l) => l.lang === 'x-default')) {
            item.links.push({ lang: 'x-default', url: def.url });
          }
        }
        // lastmod из updatedAt/publishedAt контента (аудит P2-9). changefreq/priority
        // не добавляем — Google их игнорирует, а тип changefreq требует enum-импорт,
        // который ломает загрузку конфига. lastmod — единственный реально полезный сигнал.
        const seg = new URL(item.url).pathname.replace(/\/$/, '').split('/').pop();
        if (seg && CONTENT_DATES.has(seg) && !item.lastmod) item.lastmod = CONTENT_DATES.get(seg);
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
