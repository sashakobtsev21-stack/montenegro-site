/**
 * Текстовые утилиты для SEO-обвязки (§14).
 */

/**
 * Обрезает строку до n символов ПО ГРАНИЦЕ СЛОВА (не рвёт слово посередине) —
 * для meta description ≤155 (CLAUDE правило 7 / §14). Если строка короче — как есть.
 * Аудит 2026-06-17 (P1-3): `.slice(0,155)` резал описания хабов на полуслове → CTR.
 */
export function clampDesc(s: string, n = 155): string {
  if (s.length <= n) return s;
  return s.slice(0, n).replace(/\s+\S*$/, '');
}
