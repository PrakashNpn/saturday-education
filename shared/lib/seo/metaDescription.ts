/**
 * Shorten overview-style prose for a meta description without cutting mid-word.
 * Caps around 155 characters (common SERP limit).
 */
export function metaDescriptionFromOverview(
  text: string | null | undefined,
  max = 155,
): string | undefined {
  if (!text) return undefined
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= max) return cleaned

  const cut = cleaned.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  const base = (lastSpace > Math.floor(max * 0.55) ? cut.slice(0, lastSpace) : cut).replace(
    /[,:;.\-–—\s]+$/u,
    '',
  )
  return `${base}...`
}
