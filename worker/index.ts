/**
 * Georgia Guidebook — Worker-роут поверх Static Assets (SPEC §13, §16).
 *
 * Хостинг — Cloudflare Workers (Static Assets): статика из ./dist отдаётся
 * системой ассетов напрямую (binding ASSETS), а единственная динамика —
 * партнёрский редирект /go/{partner}?c={slug}. Все прочие пути уходят в ASSETS.
 *
 * Логика /go/ (та же, что была в Pages Function, §16):
 *  1. partner — из пути /go/{partner}; c (slug-источник клика) — из query.
 *  2. По карте src/data/partners.json находим шаблон целевого URL.
 *  3. Подставляем c как SubID ({subid}) и отдаём 302.
 *  4. Неизвестный партнёр / невалидный target → безопасный фолбэк на свой
 *     сайт (НЕ open-redirect).
 *
 * НЕ менять логику /go/ без обновления таблицы партнёрок в SPEC §16.
 */
import partnersData from '../src/data/partners.json';

interface PartnersMap {
  fallback: string;
  partners: Record<string, { urlTemplate: string; allowSubId?: boolean }>;
}

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

const DATA = partnersData as unknown as PartnersMap;
const SAFE_FALLBACK = '/';

/** Фолбэк обязан быть относительным путём своего сайта (анти open-redirect). */
function safeFallback(origin: string): string {
  const fallback = DATA.fallback ?? SAFE_FALLBACK;
  if (fallback.startsWith('/') && !fallback.startsWith('//')) {
    return new URL(fallback, origin).href;
  }
  return new URL(SAFE_FALLBACK, origin).href;
}

/** Подставляет SubID в шаблон. Нет плейсхолдера — возвращает шаблон как есть. */
function buildTarget(template: string, subId: string): string {
  return template.replaceAll('{subid}', encodeURIComponent(subId));
}

/** Целевой URL обязан быть абсолютным HTTPS — иначе это не партнёрская ссылка
 *  (аудит 2026-06-17: только https, http отвергаем — все партнёры на https). */
function isValidTarget(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

function handleGo(url: URL): Response {
  const rest = url.pathname.slice('/go/'.length).replace(/\/+$/, '');
  const partnerKey = rest.split('/')[0] ?? '';

  const entry = partnerKey ? DATA.partners[partnerKey] : undefined;
  if (!entry || typeof entry.urlTemplate !== 'string') {
    return Response.redirect(safeFallback(url.origin), 302);
  }

  // SubID (slug-источник клика) подставляем только если партнёр это допускает
  // (allowSubId !== false; по умолчанию true). Аудит 2026-06-17 (P2-8): контракт
  // allowSubId объявлен в partners.json, но раньше не читался.
  const subId = entry.allowSubId !== false ? (url.searchParams.get('c') ?? '') : '';
  const target = buildTarget(entry.urlTemplate, subId);
  if (!isValidTarget(target)) {
    return Response.redirect(safeFallback(url.origin), 302);
  }
  return Response.redirect(target, 302);
}

export default {
  fetch(request: Request, env: Env): Response | Promise<Response> {
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname.startsWith('/go/')) {
      return handleGo(url);
    }
    // Всё остальное — статика из ./dist (404 — по штатному поведению ассетов).
    return env.ASSETS.fetch(request);
  },
};
