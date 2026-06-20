import { getCollection } from 'astro:content';
import type { CollectionEntry, CollectionKey } from 'astro:content';

/**
 * Обёртка над getCollection, которая молча возвращает [] для пустой коллекции.
 *
 * Зачем: на R2 коллекции `articles`/`routes`/`cities` пусты по дизайну
 * (контент не создаём, §11). Astro при пустой коллекции печатает
 * `console.warn("The collection ... does not exist or is empty ...")`
 * (astro/dist/content/runtime.js). Перф-/CI-правило требует сборку БЕЗ
 * предупреждений. Здесь мы временно подменяем `console.warn` ровно на это
 * одно сообщение на время вызова; все прочие предупреждения проходят как есть.
 *
 * Когда появится первая пара статей (R3+), сообщение перестанет возникать;
 * обёртка остаётся безвредной. Сигнатура и фильтр совпадают с getCollection.
 */
export async function getCollectionSafe<C extends CollectionKey>(
  collection: C,
  filter?: (entry: CollectionEntry<C>) => unknown,
): Promise<CollectionEntry<C>[]> {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]): void => {
    const first = args[0];
    if (typeof first === 'string' && first.includes('does not exist or is empty')) return;
    originalWarn(...(args as Parameters<typeof console.warn>));
  };
  try {
    // Cast keeps the public filter signature while satisfying getCollection's overloads.
    return (await getCollection(collection, filter as never)) as CollectionEntry<C>[];
  } finally {
    console.warn = originalWarn;
  }
}
