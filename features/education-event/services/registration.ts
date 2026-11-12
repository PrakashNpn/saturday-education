import * as z from 'zod'
import { LOCALE_CODES } from '@/i18n/languages'
import { isValidPhone } from '@/shared/utils/phone'
import { isCountryKey, OTHER_COUNTRY } from '@/shared/constants/destinationCountries'
import type { CrmOutcome } from '@/shared/lib/crm/syncLead'
import { CANADA_EVENT, EVENT_CAMPAIGN } from '../config'

export type RegistrationError = 'name' | 'email' | 'phone' | 'destination' | 'consent' | 'invalid' | 'rate' | 'failed'
export type RegistrationResult = { success: true } | { success: false; code: RegistrationError }
export type Attendee = {
  eventKey: string; fullName: string; email: string; phone: string; locale: string
  destination: string; registrationSource: string; firmliFormNumber: string
  firmliUtmNumber: string; consentVersion: string
}
export interface RegistrationDependencies {
  insert: (attendee: Attendee) => Promise<string | null>
  exists: (eventKey: string, email: string) => Promise<boolean>
  schedule: (job: () => Promise<void>) => void
  sync: (attendee: Attendee) => Promise<CrmOutcome>
  record: (id: string, outcome: CrmOutcome) => Promise<void>
  alert: (id: string, attendee: Attendee) => Promise<void>
  warn: (code: string) => void
}

const schema = z.object({
  fullName: z.string().trim().min(2).max(120).regex(/^[^\u0000-\u001f\u007f]+$/),
  email: z.string().trim().max(254).pipe(z.email()),
  phone: z.string().trim().min(6).max(40).regex(/^\+[0-9\s().-]+$/),
  destination: z.string().refine(value => isCountryKey(value) || value === OTHER_COUNTRY).default(CANADA_EVENT.destination),
  locale: z.enum(LOCALE_CODES),
  consent: z.literal(true),
  noticeVersion: z.literal(CANADA_EVENT.consentVersion),
  hp: z.string().max(0).optional(),
})

/** Pure orchestration: tests inject storage/CRM so no live leads are created. */
export async function registerAttendee(raw: unknown, dependencies: RegistrationDependencies): Promise<RegistrationResult> {
  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0]
    const code = field === 'fullName' ? 'name' : field === 'email' || field === 'phone' || field === 'destination' || field === 'consent' ? field : 'invalid'
    return { success: false, code }
  }
  const input = parsed.data
  if (!await isValidPhone(input.phone)) return { success: false, code: 'phone' }
  const attendee: Attendee = {
    eventKey: CANADA_EVENT.key, fullName: input.fullName, email: input.email.toLowerCase(),
    phone: input.phone.replace(/[\s().-]/g, ''), locale: input.locale,
    destination: input.destination, registrationSource: CANADA_EVENT.source,
    firmliFormNumber: EVENT_CAMPAIGN.formNumber, firmliUtmNumber: EVENT_CAMPAIGN.utmNumber,
    consentVersion: CANADA_EVENT.consentVersion,
  }
  let id: string | null
  try {
    id = await dependencies.insert(attendee)
    if (!id) return await dependencies.exists(attendee.eventKey, attendee.email)
      ? { success: true } : { success: false, code: 'failed' }
  } catch { return { success: false, code: 'failed' } }
  const registrationId = id
  let alerted = false
  const recover = async () => {
    if (alerted) return
    alerted = true
    try { await dependencies.alert(registrationId, attendee) }
    catch { dependencies.warn('event-crm-alert-failed') }
  }
  const record = async (outcome: CrmOutcome) => {
    try { await dependencies.record(registrationId, outcome) }
    catch { dependencies.warn('event-crm-status-not-recorded'); await recover() }
  }
  try {
    dependencies.schedule(async () => {
      let outcome: CrmOutcome
      try { outcome = await dependencies.sync(attendee) }
      catch { outcome = { status: 'failed', error: 'Event CRM delivery failed' } }
      await record(outcome)
      if (outcome.status !== 'synced') await recover()
    })
  } catch {
    dependencies.warn('event-crm-not-scheduled')
    await record({ status: 'failed', error: 'Event CRM delivery could not be scheduled' })
    await recover()
  }
  // A CRM outage must not discard a registration already stored successfully.
  return { success: true }
}

const MAX_BYTES = 8_000
const clients = new Map<string, { count: number; expires: number }>()
/** Generous per-instance limit accommodates attendees sharing the venue Wi-Fi. */
function limited(key: string) {
  const now = Date.now()
  for (const [client, value] of clients) if (value.expires <= now) clients.delete(client)
  const value = clients.get(key) ?? { count: 0, expires: now + 60 * 60_000 }
  if (!clients.has(key) && clients.size >= 5_000) return true
  clients.set(key, value)
  return ++value.count > 600
}

export async function processRegistrationRequest(request: Request, dependencies: RegistrationDependencies) {
  const reply = (body: RegistrationResult, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
  const fail = (code: RegistrationError, status: number) => reply({ success: false, code }, status)
  if (request.headers.get('origin') !== new URL(request.url).origin) return fail('invalid', 403)
  if (!/^application\/json(?:;|$)/i.test(request.headers.get('content-type') ?? '')) return fail('invalid', 415)
  const client = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim().slice(0,100) || 'unknown'
  if (limited(client)) return fail('rate', 429)
  if (Number(request.headers.get('content-length')) > MAX_BYTES) return fail('invalid', 413)
  const reader = request.body?.getReader()
  if (!reader) return fail('invalid', 400)
  let size = 0, body = ''
  const decoder = new TextDecoder()
  try {
    while (true) {
      const chunk = await reader.read()
      if (chunk.done) break
      size += chunk.value.byteLength
      if (size > MAX_BYTES) { await reader.cancel(); return fail('invalid', 413) }
      body += decoder.decode(chunk.value, { stream: true })
    }
    body += decoder.decode()
    const result = await registerAttendee(JSON.parse(body), dependencies)
    return reply(result, result.success ? 200 : result.code === 'failed' ? 503 : 400)
  } catch { return fail('invalid', 400) }
  finally { reader.releaseLock() }
}
