// Shared Firmli API client. Two features need it — course-finder (its own
// search dropdowns) and destination (the per-country institution count on
// each destination card) — so it lives here rather than inside either one,
// per the "features never import from other features" rule.

export const FIRMLI_API = 'https://c191z26royal58-api.firmli.com/v1'
export const CLIENT_NUMBER = 'C191Z26ROYAL58'
const HEADERS = { 'fi-client-number': CLIENT_NUMBER }

// The catalogue changes when Firmli signs a new institution, which is rare.
const REVALIDATE_SECONDS = 60 * 60 * 24
const TIMEOUT_MS = 8000

// A handful of our country names don't match Firmli's exactly.
const NAME_ALIASES: Record<string, string> = {
  'united states of america': 'united states',
}

function normalize(name: string): string {
  const lower = name.toLowerCase().trim()
  return NAME_ALIASES[lower] ?? lower
}

/** Firmli's own numeric country id per country name (lowercased), read from
 *  the same dropdown endpoint the embedded finder itself uses. */
async function fetchFirmliCountryMap(): Promise<Map<string, number> | null> {
  try {
    const res = await fetch(`${FIRMLI_API}/dropdowns/destination-countries-dropdown?number_only=true`, {
      headers: HEADERS,
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) return null

    const body: unknown = await res.json()
    const rows = (body as { data?: unknown })?.data
    if (!Array.isArray(rows)) return null

    const map = new Map<string, number>()
    for (const row of rows as { label?: unknown; value?: unknown }[]) {
      if (typeof row?.label === 'string' && typeof row?.value === 'number') {
        map.set(normalize(row.label), row.value)
      }
    }
    return map
  } catch {
    return null
  }
}

/** Confirmed against the live API: unlike the institutions dropdown used
 *  elsewhere (which returns Firmli's whole global catalogue), this endpoint
 *  genuinely filters server-side when given `country_id`. */
async function fetchInstitutionCount(firmliCountryId: number): Promise<number | null> {
  try {
    const res = await fetch(`${FIRMLI_API}/dropdowns/institutions?country_id=${firmliCountryId}`, {
      headers: HEADERS,
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) return null

    const body: unknown = await res.json()
    const rows = (body as { data?: { recordsInfo?: unknown } })?.data?.recordsInfo
    return Array.isArray(rows) ? rows.length : null
  } catch {
    return null
  }
}

/**
 * One institution count per requested country name, sourced from Firmli's
 * own catalogue rather than our own signed-partner list. `null` for any name
 * Firmli has no match for (not every country we list is in Firmli's
 * catalogue) or whose request failed — callers drop the stat for that
 * country rather than show a wrong or misleading number.
 */
export async function getFirmliInstitutionCountsByName(
  names: string[],
): Promise<Map<string, number | null>> {
  const countryMap = await fetchFirmliCountryMap()
  const entries = await Promise.all(
    names.map(async (name) => {
      const firmliId = countryMap?.get(normalize(name))
      const count = firmliId != null ? await fetchInstitutionCount(firmliId) : null
      return [name, count] as const
    }),
  )
  return new Map(entries)
}
