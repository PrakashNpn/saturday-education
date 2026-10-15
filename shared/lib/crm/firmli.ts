// Firmli CRM lead sync — server-side only.
// Add these in Vercel's environment settings (no NEXT_PUBLIC_ prefix; this
// never runs in the browser, unlike Firmli's own embeddable widget):
//   FIRMLI_CLIENT_NUMBER = c191z26royal58
//   FIRMLI_FORM_NUMBER   = FRM1790061849437W26JWECS31
//   FIRMLI_UTM_NUMBER    = UTM1790583080779Q26HZFCX32
const FIRMLI_CLIENT_NUMBER = process.env.FIRMLI_CLIENT_NUMBER
const FIRMLI_FORM_NUMBER = process.env.FIRMLI_FORM_NUMBER
// Optional, like Firmli's own widget treats it — tags the lead's UTM source
// in their CRM (this specific value maps to "Website" on their end; leads
// sent without it were showing up there as "Email").
const FIRMLI_UTM_NUMBER = process.env.FIRMLI_UTM_NUMBER

const apiBase = () => `https://${FIRMLI_CLIENT_NUMBER}-api.firmli.com/v1`

// Firmli's destination-country picklist IDs for this account (from
// GET /v1/dropdowns/destination-countries-dropdown), limited to the countries
// our consultation form's targetCountry select and the chat advisor's lead
// tool can send. Grenada has no entry in Firmli's list, so a Grenada lead is
// saved without a country there. If Firmli ever rejects one of these, re-pull
// that endpoint — the IDs are account-specific, not something Firmli
// documents publicly.
const FIRMLI_COUNTRY_IDS: Record<string, number> = {
  uk: 230,
  usa: 231,
  australia: 13,
  canada: 38,
  newZealand: 157,
  singapore: 196,
  switzerland: 212,
  ireland: 105,
  thailand: 217,
  germany: 82,
  malaysia: 132,
  netherlands: 155,
  spain: 205,
  uae: 229,
}

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
export async function createFirmliLead(data: FirmliLeadInput): Promise<void> {
  if (!FIRMLI_CLIENT_NUMBER || !FIRMLI_FORM_NUMBER) {
    console.warn('FIRMLI_CLIENT_NUMBER / FIRMLI_FORM_NUMBER not set — skipping Firmli CRM sync.')
    return
  }

  const submittedData: Record<string, string | number> = {
    first_name: data.fullName,
    email: data.email,
  }
  if (data.phone) submittedData.mobile = data.phone
  if (data.message) submittedData.note = data.message
  // Firmli's API rejects this as a number ("must be a string"), even though
  // it's a numeric ID in their own dropdown response.
  const countryId = data.targetCountry ? FIRMLI_COUNTRY_IDS[data.targetCountry] : undefined
  if (countryId) submittedData.destination_country_id = String(countryId)

  const payload = {
    data: submittedData,
    form_identifier: FIRMLI_FORM_NUMBER,
    ...(FIRMLI_UTM_NUMBER && { utm_identifier: FIRMLI_UTM_NUMBER }),
  }

  const encryptRes = await fetch(`${apiBase()}/test-path/encrypt-data`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(payload),
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
  })
  if (!saveRes.ok) {
    const body = await saveRes.text().catch(() => '')
    throw new Error(`Firmli forms/save failed: ${saveRes.status} ${body}`)
  }
}
