// Turns a raw streamed assistant reply into display-safe text plus an optional
// call-to-action. The model is told never to use dashes and to emit a marker such
// as [[book-consultation]] when an action is relevant; here we strip any dash that
// slips through and map the marker to a branded CTA button.

export interface CtaLink {
  href: string
  /** key under the `chatWidget` i18n namespace */
  labelKey: string
}

/** Markers the model may emit (mirrored in the system prompt) → CTA descriptor.
 *  Only confirmed, real routes. */
export const CTA_LINKS: Record<string, CtaLink> = {
  '[[book-consultation]]': { href: '/#consultation', labelKey: 'consultationCta' },
  '[[career-assessment]]': { href: '/career-assessment', labelKey: 'careerAssessmentCta' },
  // '[[universities]]' is intentionally disabled: the universities page is hidden
  // pending partnership contracts. Re-enable by uncommenting the line below AND
  // restoring the [[universities]] marker + guidance in prompts/system.ts.
  // '[[universities]]': { href: '/universities', labelKey: 'universitiesCta' },
  '[[destinations]]': { href: '/destinations', labelKey: 'destinationsCta' },
}

const MARKERS = Object.keys(CTA_LINKS)

/** Replace em/en dashes with natural punctuation. Real hyphens (part-time, F-1)
 *  are left untouched; numeric ranges keep a hyphen. */
export function stripDashes(text: string): string {
  return text
    .replace(/(\d)\s*[–—―]\s*(\d)/g, '$1-$2') // numeric range: 2–4 -> 2-4
    .replace(/\s*[–—―]\s*/g, ', ') // dash punctuation -> comma
    .replace(/\s*,\s*,\s*/g, ', ') // collapse doubled commas
    .replace(/[ \t]{2,}/g, ' ') // collapse runs of spaces
}

export interface ParsedReply {
  text: string
  cta: CtaLink | null
}

/**
 * Prepare a streamed assistant reply for display: pick the first CTA marker (if
 * present), remove ALL markers, hide a trailing half-streamed marker fragment so
 * it never flashes mid-stream, and strip stray dashes.
 */
export function parseAssistantReply(content: string): ParsedReply {
  const marker = MARKERS.find((m) => content.includes(m)) ?? null
  const cta = marker ? CTA_LINKS[marker] : null

  // Strip ANY bracket marker (including ones we no longer render a button for, e.g.
  // a disabled [[universities]]) so it can never leak into the text, plus a trailing
  // half-streamed marker so it doesn't flash mid-stream.
  let text = content.replace(/\[\[[^\]]*\]\]/g, ' ').replace(/\[\[[^\]]*$/, '')
  text = stripDashes(text)
  return { text: text.replace(/\s{2,}/g, ' ').trim(), cta }
}
