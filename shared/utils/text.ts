/** Splits a semicolon-separated freeform requirements string into clean bullet items. */
export function splitIntoBullets(text: string): string[] {
  return text
    .split(';')
    .map((item) => item.trim().replace(/\.$/, ''))
    .filter(Boolean)
}

/**
 * Converts text to a URL/path-safe slug. Non-Latin scripts (Thai, Burmese, etc.) don't
 * decompose into ASCII and get stripped entirely — callers should fall back to a generic
 * placeholder when the result is empty, since that's a common case for this app's audience.
 */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
