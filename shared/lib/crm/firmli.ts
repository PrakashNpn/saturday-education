// Firmli CRM lead sync — server-side only.
// Add these in Vercel's environment settings (no NEXT_PUBLIC_ prefix; this
// never runs in the browser, unlike Firmli's own embeddable widget):
//   FIRMLI_CLIENT_NUMBER = c191z26royal58
//   FIRMLI_FORM_NUMBER   = FRM1790061849437W26JWECS31   ("Website Form", consultation form)
//   FIRMLI_UTM_NUMBER    = UTM1790583080779Q26HZFCX32   (source "Website")
// A failed sync is recorded on the lead and emailed to CRM_ALERT_EMAIL (see leadStorage.ts).
// The AI chatbot has its own Firmli form and UTM source so its leads can be told
// apart from the consultation form's. If these two are unset, chat leads fall
// back to the consultation form above, so nothing is lost before they are set:
//   FIRMLI_CHAT_FORM_NUMBER = FRM1792068158127E26EXDHR92   ("AI Chatbot - Website Form")
//   FIRMLI_CHAT_UTM_NUMBER  = UTM1792207569261M26WXWZI49   (source "AIChatbot_website")
import { COUNTRIES } from '@/shared/constants/destinationCountries'

const FIRMLI_CLIENT_NUMBER = process.env.FIRMLI_CLIENT_NUMBER
const FIRMLI_FORM_NUMBER = process.env.FIRMLI_FORM_NUMBER
const FIRMLI_CHAT_FORM_NUMBER = process.env.FIRMLI_CHAT_FORM_NUMBER
const FIRMLI_CHAT_UTM_NUMBER = process.env.FIRMLI_CHAT_UTM_NUMBER
// Optional, like Firmli's own widget treats it — tags the lead's UTM source
// in their CRM (this specific value maps to "Website" on their end; leads
// sent without it were showing up there as "Email").
const FIRMLI_UTM_NUMBER = process.env.FIRMLI_UTM_NUMBER

// Without a limit a hung Firmli request would hold the student's form open.
const REQUEST_TIMEOUT_MS = 8000

const apiBase = () => `https://${FIRMLI_CLIENT_NUMBER}-api.firmli.com/v1`

// Firmli's destination-country IDs and names come from shared/constants/destinationCountries.ts
// (originally read from GET /v1/dropdowns/destination-countries-dropdown; the IDs
// are account-specific, not something Firmli documents publicly). A country with
// no Firmli entry (Belgium, Grenada) is saved without a destination there. If
// Firmli ever rejects one, re-pull that endpoint and update the list.
// The consultation form sends the ID; the chat form's multi-select takes the NAME.
const FIRMLI_COUNTRY_IDS: Record<string, number> = Object.fromEntries(
  COUNTRIES.flatMap((c) => (c.firmliId ? [[c.key, c.firmliId]] : [])),
)
const FIRMLI_COUNTRY_NAMES: Record<string, string> = Object.fromEntries(
  COUNTRIES.flatMap((c) => (c.firmliName ? [[c.key, c.firmliName]] : [])),
)

// Firmli's "Additional Inquiry" is a short text field, not a textarea, so the
// chat transcript note is trimmed for the CRM (the database keeps the full text).
const CHAT_INQUIRY_MAX = 250

/** Which Firmli form a lead goes to: the consultation form, or the AI chatbot's own. */
export type FirmliChannel = 'consultation' | 'chat'

interface FirmliLeadInput {
  fullName: string
  email: string
  phone?: string | null
  targetCountry?: string | null
  message?: string | null
}

function headers() {
  return {
    'Content-Type': 'application/json',
    'fi-client-number': FIRMLI_CLIENT_NUMBER!.toUpperCase(),
  }
}

/**
 * Mirrors what Firmli's own embeddable widget does client-side — POST the
 * plain lead data to their encrypt-data endpoint, then POST the encrypted
 * result to forms/save. Same public endpoints their widget calls from a
 * browser, just invoked from our server instead of embedding their UI, so
 * our own consultation form stays exactly as designed. Undocumented (found
 * by reading the widget script, not Firmli's public docs), so it can break
 * if Firmli changes it without notice — callers should treat failures here
 * as non-fatal.
 */
export async function createFirmliLead(
  data: FirmliLeadInput,
  options: { channel?: FirmliChannel } = {},
): Promise<'sent' | 'skipped'> {
  if (!FIRMLI_CLIENT_NUMBER || !FIRMLI_FORM_NUMBER) {
    console.warn('FIRMLI_CLIENT_NUMBER / FIRMLI_FORM_NUMBER not set — skipping Firmli CRM sync.')
    return 'skipped'
  }

  // The chatbot has its own form and UTM source, but only when both are set;
  // otherwise it keeps using the consultation form so leads still arrive.
  const useChatForm = options.channel === 'chat' && !!FIRMLI_CHAT_FORM_NUMBER && !!FIRMLI_CHAT_UTM_NUMBER

  const submittedData: Record<string, string | number | string[]> = {
    first_name: data.fullName,
    email: data.email,
  }
  if (data.phone) submittedData.mobile = data.phone

  if (useChatForm) {
    // "AI Chatbot - Website Form": different field names from the consultation form.
    if (data.message) submittedData.additional_inquiry = data.message.slice(0, CHAT_INQUIRY_MAX)
    const countryName = data.targetCountry ? FIRMLI_COUNTRY_NAMES[data.targetCountry] : undefined
    if (countryName) submittedData.destination_of_interest = [countryName]
  } else {
    if (data.message) submittedData.note = data.message
    // Firmli's API rejects this as a number ("must be a string"), even though
    // it's a numeric ID in their own dropdown response.
    const countryId = data.targetCountry ? FIRMLI_COUNTRY_IDS[data.targetCountry] : undefined
    if (countryId) submittedData.destination_country_id = String(countryId)
  }

  const payload = {
    data: submittedData,
    form_identifier: useChatForm ? FIRMLI_CHAT_FORM_NUMBER : FIRMLI_FORM_NUMBER,
    ...(useChatForm
      ? { utm_identifier: FIRMLI_CHAT_UTM_NUMBER }
      : FIRMLI_UTM_NUMBER && { utm_identifier: FIRMLI_UTM_NUMBER }),
  }

  const encryptRes = await fetch(`${apiBase()}/test-path/encrypt-data`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  if (!encryptRes.ok) {
    throw new Error(`Firmli encrypt-data failed: ${encryptRes.status}`)
  }
  const encryptResult = await encryptRes.json()
  const encrypted = encryptResult?.data?.encryptedFormData
  if (!encrypted || encrypted.isError) {
    throw new Error('Firmli encryption failed')
  }
  const content = `${encrypted.publicKey}^#^${encrypted.encryptedData}`

  const saveRes = await fetch(`${apiBase()}/public/forms/save`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ content }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  if (!saveRes.ok) {
    const body = await saveRes.text().catch(() => '')
    throw new Error(`Firmli forms/save failed: ${saveRes.status} ${body}`)
  }
  return 'sent'
}
