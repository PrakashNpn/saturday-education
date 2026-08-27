// Turning our own query string into the one the embedded finder understands.
//
// The tool keeps its whole filter set in a single `programFilters` param
// holding a JSON object, and reads it back on load: the results arrive already
// filtered and the dropdowns inside the frame show the selection, still
// editable. That is the same URL its own Apply Filter button produces.
//
// Passing country_id or institution_id as top level params instead would also
// filter, but the tool treats those as a locked embed and hides the matching
// dropdown, so a student could not widen the search afterwards. Hence the JSON.

// --color-brand-purple from globals.css without the hash, which in a URL would
// start a fragment. Repaints the tool's accent to match ours.
const BRAND_PURPLE = '590D82'

const EMBED_BASE = 'https://coursefinder.saturdayeducation.com/embeddable-programs'

export type CourseFinderFilters = {
  /** Firmli's numeric country id, e.g. "132" for Malaysia. */
  country?: string
  /** A study level category, passed verbatim, e.g. "Bachelor Degree". */
  level?: string
  /** Firmli's numeric discipline id, e.g. "6" for Computer Science. */
  field?: string
}

const NUMERIC_ID = /^\d{1,6}$/
// Study levels are plain labels rather than ids: "Bachelor Degree",
// "Certificate/Diploma", "Doctorate Degree".
const LEVEL_LABEL = /^[A-Za-z][A-Za-z/ &-]{0,39}$/

function readParam(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value ?? '').trim()
}

/**
 * Reads our own /course-finder query string. Anything unrecognised is dropped
 * rather than forwarded, so a mangled or stale link degrades to the full
 * catalogue instead of an empty result set.
 */
export function parseCourseFinderFilters(
  searchParams: Record<string, string | string[] | undefined>,
): CourseFinderFilters {
  const country = readParam(searchParams.country)
  const level = readParam(searchParams.level)
  const field = readParam(searchParams.field)

  return {
    ...(NUMERIC_ID.test(country) && { country }),
    ...(LEVEL_LABEL.test(level) && { level }),
    ...(NUMERIC_ID.test(field) && { field }),
  }
}

export function buildEmbedUrl(filters: CourseFinderFilters): string {
  const programFilters: Record<string, string[]> = {
    ...(filters.country && { country_id: [filters.country] }),
    ...(filters.level && { study_level_category: [filters.level] }),
    ...(filters.field && { discipline_id: [filters.field] }),
  }

  const params = new URLSearchParams({ theme: BRAND_PURPLE })
  if (Object.keys(programFilters).length > 0) {
    params.set('programFilters', JSON.stringify(programFilters))
  }

  return `${EMBED_BASE}?${params.toString()}`
}
