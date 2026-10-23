/**
 * Canonical Commodity Symbol Normalizer.
 * Fixes common typos like C0 -> CO, strips whitespaces, and converts to uppercase.
 */
export function normalizeCommoditySymbol(raw?: string): string {
  if (!raw) return '';
  return raw.trim().toUpperCase().replace(/C0/g, 'CO');
}
