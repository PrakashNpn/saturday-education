/**
 * Splits a country's work-rights text into the bullets shown on the destination page.
 * It splits at ". " and "; " and drops the trailing punctuation. Translations are written
 * with "; " between parts so they split into the same number of bullets as the English.
 * A stray em dash is replaced by a comma; en dashes (numeric ranges such as "2–4 years") are kept.
 */
export function splitWorkRights(text: string): string[] {
  return text
    .split(/[;.]\s+/)
    .map((s) => s.trim().replace(/[.;]+$/, '').replace(/\s*—\s*/g, ', '))
    .filter(Boolean)
}
