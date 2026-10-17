// House style has no em or en dashes in copy. AI output is told not to use them
// and mostly obeys, but some slip through, so everything the models write for
// display goes through these before it is stored or shown.

/** Replaces em/en dashes with natural punctuation. A dash between digits is a
 *  range and becomes a hyphen (2–4 → 2-4); any other becomes a comma. Real
 *  hyphens (part-time, F-1) are left alone. Does not trim, so it is safe on
 *  text that is still streaming in. */
export function stripDashes(text: string): string {
  return text
    .replace(/(\d)\s*[–—―]\s*(\d)/g, '$1-$2')
    .replace(/\s*[–—―]\s*/g, ', ')
    .replace(/\s*,\s*,\s*/g, ', ')
    .replace(/[ \t]{2,}/g, ' ')
}

/** stripDashes for a finished single field: also trims the ends. */
export function deDash(text: string): string {
  return stripDashes(text).trim()
}
