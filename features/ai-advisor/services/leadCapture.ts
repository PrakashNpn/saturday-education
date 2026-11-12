// Takes a student's details from the chat's lead form and hands them to a
// counsellor.
//
// The browser posts the form here. Everything in it is untrusted: this file
// validates it, rate-limits it, and only then calls the injected `submit`
// function. The consultation feature's save function is passed in by the API
// route rather than imported here, because features may not import each other.
//
// It also reads the chat history to decide whether the Career Assessment may be
// offered yet.

// libphonenumber-js is the library underneath the website form's phone field, so
// the validity check matches. It is imported directly rather than via
// react-phone-number-input: that package ships React components and crashes
// when loaded in a route handler.
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js/min'
import { LEAD_KNOWN_MARKER, LEAD_SAVED_MARKER } from '../utils/leadMarkers'

export type LeadSubmission = {
  fullName: string
  email: string
  phone: string
  message?: string
}

export type SubmitLead = (lead: LeadSubmission) => Promise<{ success: boolean; error?: string }>

export type LeadFormResult =
  | { success: true }
  | { success: false; code: 'name' | 'email' | 'phone' | 'rate' | 'failed' }

// In-memory limits. They reset on a cold start and are per server instance, so
// this is a speed bump against a script hammering the endpoint, not a hard cap.
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_CLIENT_PER_WINDOW = 3
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000
const clientHits = new Map<string, number[]>()
const recentEmails = new Map<string, number>()

function prune(now: number) {
  for (const [key, hits] of clientHits) {
    const fresh = hits.filter((t) => now - t < WINDOW_MS)
    if (fresh.length === 0) clientHits.delete(key)
    else clientHits.set(key, fresh)
  }
  for (const [email, at] of recentEmails) {
    if (now - at >= DUPLICATE_WINDOW_MS) recentEmails.delete(email)
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function submitLeadForm(
  raw: unknown,
  submit: SubmitLead,
  clientKey: string,
): Promise<LeadFormResult> {
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>

  // A hidden field no person fills in. A bot that does gets a success and
  // nothing is saved, so it learns nothing about what was rejected.
  if (asString(input.hp)) return { success: true }

  const fullName = asString(input.fullName).slice(0, 100)
  const email = asString(input.email).toLowerCase().slice(0, 254)
  const phoneRaw = asString(input.phone)

  if (fullName.length < 2) return { success: false, code: 'name' }
  if (!EMAIL_RE.test(email)) return { success: false, code: 'email' }

  // Must carry a country code: Firmli's lead form rejects a number without one,
  // so letting one through would save to the database but never reach the CRM.
  const compact = phoneRaw.replace(/[\s\-().]/g, '')
  const international = compact.startsWith('00') ? `+${compact.slice(2)}` : compact
  if (!international || !isValidPhoneNumber(international)) return { success: false, code: 'phone' }
  const phone = parsePhoneNumberFromString(international)?.number ?? international

  const now = Date.now()
  prune(now)

  // The same student sending twice (a double click, a second tab) is a success
  // for them and nothing new for the counsellors.
  if (recentEmails.has(email)) return { success: true }

  const hits = clientHits.get(clientKey) ?? []
  if (hits.length >= MAX_PER_CLIENT_PER_WINDOW) return { success: false, code: 'rate' }
  clientHits.set(clientKey, [...hits, now])

  const outcome = await submit({
    fullName,
    email,
    phone,
    // Contact registration happens before chatting; do not ingest transcripts
    // or guessed destinations from older clients.
    message: '[Via AI chatbot]',
  })
  if (!outcome.success) return { success: false, code: 'failed' }

  recentEmails.set(email, now)
  return { success: true }
}

export type LeadTurnPlan = {
  /** Appended to that turn's system prompt. Empty when nothing needs saying. */
  directive: string
}

/**
 * Details sent: nothing is added, and the Career Assessment becomes a fair
 * second step the prompt allows. Before that it is off the table for the reply:
 * offering it first sends a student away from the chat before any details are
 * collected. The details themselves are asked for by the chat window, which
 * requires them before the first question.
 */
export function planLeadTurn(messages: { role: string; content: string }[]): LeadTurnPlan {
  const sent = messages.some(
    (m) => m.content.includes(LEAD_SAVED_MARKER) || m.content.includes(LEAD_KNOWN_MARKER),
  )
  if (sent) return { directive: '' }

  return {
    directive:
      '\n\nIn this reply do not mention the Career Assessment and do not use the [[career-assessment]] marker. Answer the student yourself first.',
  }
}
