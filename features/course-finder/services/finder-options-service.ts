// The dropdown options behind the homepage course search.
//
// These come from the same three endpoints the embedded finder itself calls,
// with the same tenant header, so the ids we hand back are exactly the ones the
// tool expects in its own filter URL. The header is a tenant identifier rather
// than a secret: the embed sends it from the browser on every request. It stays
// server side here only because there is no reason to ship it twice.
//
// Firmli has not documented any of this, so every failure path returns null and
// the caller drops the search rather than rendering an empty one.
import { FIRMLI_API, CLIENT_NUMBER } from '@/shared/lib/courseFinder/firmliClient'

// The lists change when Firmli signs a new country or discipline, which is rare.
const REVALIDATE_SECONDS = 60 * 60 * 24
const TIMEOUT_MS = 8000

export type FinderOption = { value: string; label: string }

/** Size of the searchable catalogue, shown beside the search. */
export type CourseFinderCounts = { programs: number; institutions: number }

export type CourseFinderOptions = {
  countries: FinderOption[]
  studyLevels: FinderOption[]
  fieldsOfStudy: FinderOption[]
  /** Null when either count is unavailable. The search still works without it. */
  counts: CourseFinderCounts | null
}

type FirmliRow = { value?: string | number; label?: string }

/**
 * One dropdown endpoint. Two response shapes are in use: most return a bare
 * array under `data`, the larger lists nest it under `data.recordsInfo`.
 */
async function fetchOptions(path: string): Promise<FinderOption[] | null> {
  try {
    const response = await fetch(`${FIRMLI_API}${path}`, {
      headers: { 'fi-client-number': CLIENT_NUMBER },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!response.ok) return null

    const body: unknown = await response.json()
    const data = (body as { data?: unknown })?.data
    const rows: unknown = Array.isArray(data)
      ? data
      : (data as { recordsInfo?: unknown })?.recordsInfo

    if (!Array.isArray(rows)) return null

    const options = (rows as FirmliRow[])
      .map((row) => ({
        value: String(row?.value ?? '').trim(),
        // Some institution labels arrive with a leading space or hard space.
        label: String(row?.label ?? '').replace(/\s+/g, ' ').trim(),
      }))
      .filter((option) => option.value !== '' && option.label !== '')

    return options.length > 0 ? options : null
  } catch {
    return null
  }
}

/** The catalogue is still growing, so both numbers are read rather than fixed. */
async function fetchCounts(): Promise<CourseFinderCounts | null> {
  try {
    const [programsResponse, institutionsResponse] = await Promise.all([
      // per_page=1 because only the total in metaInfo is wanted.
      fetch(`${FIRMLI_API}/public/program-finder?page=1&per_page=1`, {
        headers: { 'fi-client-number': CLIENT_NUMBER },
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }),
      // No count endpoint exists, so the institution dropdown is measured. It is
      // the largest of these payloads, which is why it is fetched once a day and
      // not on every render.
      fetch(`${FIRMLI_API}/dropdowns/institutions`, {
        headers: { 'fi-client-number': CLIENT_NUMBER },
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }),
    ])
    if (!programsResponse.ok || !institutionsResponse.ok) return null

    const programsBody: unknown = await programsResponse.json()
    const institutionsBody: unknown = await institutionsResponse.json()

    const programs = (programsBody as { data?: { metaInfo?: { totalRecords?: unknown } } })
      ?.data?.metaInfo?.totalRecords
    const institutions = (institutionsBody as { data?: { recordsInfo?: unknown } })
      ?.data?.recordsInfo

    if (typeof programs !== 'number' || !Number.isFinite(programs) || programs <= 0) return null
    if (!Array.isArray(institutions) || institutions.length === 0) return null

    return { programs, institutions: institutions.length }
  } catch {
    return null
  }
}

/**
 * Returns null if any list is unavailable. A search box missing one of its
 * three fields is worse than no search box, and a half-filled one would send
 * students to an unfiltered catalogue while looking like it had worked.
 */
export async function getCourseFinderOptions(): Promise<CourseFinderOptions | null> {
  const [countries, studyLevels, fieldsOfStudy, counts] = await Promise.all([
    // number_only matters. Without it this endpoint returns opaque string ids
    // that the programme search does not accept.
    fetchOptions('/dropdowns/destination-countries-dropdown?number_only=true'),
    fetchOptions('/dropdowns/study-levels/categories'),
    fetchOptions('/dropdowns/disciplines'),
    fetchCounts(),
  ])

  if (!countries || !studyLevels || !fieldsOfStudy) return null

  // Firmli's discipline list carries its own "All Subjects" row. Left in, the
  // field dropdown offers two ways to say the same thing, and they are not
  // equivalent: the placeholder sends no filter at all while "All Subjects"
  // sends discipline 18. The placeholder is the one that belongs to us.
  const fields = fieldsOfStudy.filter(
    (option) => option.label.trim().toLowerCase() !== 'all subjects',
  )

  // counts is allowed to be null: the line beside the search is simply omitted.
  return { countries, studyLevels, fieldsOfStudy: fields, counts }
}
