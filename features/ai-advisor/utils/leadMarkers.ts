// Invisible markers that carry the lead form's state through the chat history.
//
// They live in the assistant message text, so they survive the localStorage
// round trip and are sent back to the server with the history. That is how the
// server knows a form was already shown or sent without any session store. The
// chat UI strips every [[...]] marker from display.

/** The form was submitted in this chat and the details are with a counsellor. */
export const LEAD_SAVED_MARKER = '[[lead-saved]]'
/** Added by the browser, to what it sends and never to what it shows: this
 *  student sent their details in an earlier chat on this device. */
export const LEAD_KNOWN_MARKER = '[[lead-known]]'

/** Asks the chat to render the lead form under this message. May carry the
 *  student's country: [[lead-card:germany]]. */
const CARD_RE = /\[\[lead-card(?::([A-Za-z]+))?\]\]/

export type LeadMarker = { status: 'open' | 'saved' | 'known'; country?: string }

/** What a message says about the lead form, or null if it says nothing. */
export function readLeadMarker(content: string): LeadMarker | null {
  if (content.includes(LEAD_SAVED_MARKER)) return { status: 'saved' }
  if (content.includes(LEAD_KNOWN_MARKER)) return { status: 'known' }
  const card = CARD_RE.exec(content)
  if (card) return { status: 'open', country: card[1] }
  return null
}

/** The same message with its form marker turned into "sent", or with that
 *  marker added when the form was the required step rather than a message. */
export function markLeadSaved(content: string): string {
  return CARD_RE.test(content) ? content.replace(CARD_RE, LEAD_SAVED_MARKER) : `${content} ${LEAD_SAVED_MARKER}`
}
