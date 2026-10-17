// Sends one lead to the Firmli CRM and reports what happened, so the caller can
// record it and raise an alert instead of the failure only reaching the server log.
// The send function is passed in so this can be tested without calling Firmli.

export type CrmChannel = 'consultation' | 'chat'

export interface CrmLead {
  fullName: string
  email: string
  phone?: string | null
  targetCountry?: string | null
  message?: string | null
}

/** 'skipped' means Firmli is not configured here, which is not an error to alert on. */
export type CrmSend = (lead: CrmLead, channel: CrmChannel) => Promise<'sent' | 'skipped'>

export type CrmOutcome =
  | { status: 'synced' }
  | { status: 'skipped' }
  | { status: 'failed'; error: string }

const ATTEMPTS = 2
const ERROR_LIMIT = 500

function describe(error: unknown): string {
  const text = error instanceof Error ? error.message : String(error)
  return text.slice(0, ERROR_LIMIT)
}

/**
 * Tries the send twice, because many failures are brief (a Firmli hiccup, a dropped
 * connection). Never throws: a failure comes back as { status: 'failed', error }.
 */
export async function syncLeadToCrm(
  lead: CrmLead,
  channel: CrmChannel,
  send: CrmSend,
  retryDelayMs = 1000,
): Promise<CrmOutcome> {
  let lastError: unknown
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const result = await send(lead, channel)
      return { status: result === 'skipped' ? 'skipped' : 'synced' }
    } catch (error) {
      lastError = error
      console.error(`Firmli CRM sync attempt ${attempt} of ${ATTEMPTS} failed:`, error)
      if (attempt < ATTEMPTS && retryDelayMs > 0) await new Promise((r) => setTimeout(r, retryDelayMs))
    }
  }
  return { status: 'failed', error: describe(lastError) }
}
