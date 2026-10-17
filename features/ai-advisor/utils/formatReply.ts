// Turns a raw streamed assistant reply into display-safe text plus an optional
// call-to-action. The model is told never to use dashes and to emit a marker such
// as [[book-consultation]] when an action is relevant; here we strip any dash that
// slips through and map the marker to a branded CTA button.
import { readLeadMarker, type LeadMarker } from './leadMarkers'
import { stripDashes } from '@/shared/utils/dashes'

export interface CtaLink {
  href: string
  /** key under the `chatWidget` i18n namespace */
  labelKey: string
}

/** Markers the model may emit (mirrored in the system prompt) → CTA descriptor.
 *  Only confirmed, real routes. The chat is a lead funnel, so the only button
 *  that leaves it is the Career Assessment, offered after details are sent.
 *  Other markers the model may still write ([[destinations]] and
 *  [[book-consultation]] from older history) are stripped from display and get
 *  no button. */
export const CTA_LINKS: Record<string, CtaLink> = {
  '[[career-assessment]]': { href: '/career-assessment', labelKey: 'careerAssessmentCta' },
}

const MARKERS = Object.keys(CTA_LINKS)

export interface ParsedReply {
  text: string
  cta: CtaLink | null
  /** The lead form's state in this message: open, saved or known from an earlier chat. */
  lead: LeadMarker | null
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
  return { text: text.replace(/\s{2,}/g, ' ').trim(), cta, lead: readLeadMarker(content) }
}
