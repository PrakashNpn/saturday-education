// ── Career outlook "master" record ───────────────────────────────────────────
// A single AI-generated, human-shaped outlook per career, stored once and cached.
// It holds ONE 10-year yearly trajectory; the 5-year and 10-year views shown in
// the modal are both DERIVED from this same curve (see deriveHorizonView), so the
// two horizons can never tell contradictory stories.
//
// Pure module (no React, no server, no node deps) so it is safe to import from
// both the client modal and the server action.

import type { Career, CareerField, Demand, HollandCode } from './catalog'

export type Horizon = '5' | '10'

/** A known catalog field, or a free-text label the AI coins for an off-catalog
 *  career. Kept separate from the catalog's strict `CareerField` so the curated
 *  entries stay fully type-checked; this widening is display-only — it drives the
 *  field chip + icon, which already fall back gracefully for unknown labels. */
export type FieldLabel = CareerField | (string & {})

/** A derived horizon view: a `Career`-shaped object for the modal, but carrying the
 *  widened field label (an AI-generated career may have a free-text field). */
export type OutlookView = Omit<Career, 'field'> & { field: FieldLabel }

export interface CareerOutlookMaster {
  slug: string
  title: string
  field: FieldLabel
  summary: string
  exampleRoles: string[]
  requiredSkills: string[]
  niceToHaveSkills: string[]
  riasec: HollandCode[]
  relatedFields: string[]
  demand: Demand
  /** 11 yearly points (year 0..10), each 0–100 — a RELATIVE demand-trajectory shape. */
  trend: number[]
  /** One-line note on the next ~5 years. */
  marketNoteNear: string
  /** One-line note on the full ~10 years. */
  marketNoteLong: string
  sources: string[]
}

// Runtime enum lists (the catalog only exports the union *types*) — used for
// coercion of AI/DB output and for any UI that needs to iterate the fields.
export const CAREER_FIELDS: CareerField[] = [
  'Computer Science & IT',
  'Engineering',
  'Business & Management',
  'Finance & Economics',
  'Medicine & Health',
  'Natural Sciences',
  'Social Sciences & Psychology',
  'Arts, Design & Media',
  'Law',
  'Education',
  'Humanities & Languages',
  'Hospitality & Tourism',
  'Sports, Fitness & Recreation',
]
export const DEMAND_LEVELS: Demand[] = ['High', 'Moderate', 'Competitive']
export const HOLLAND_CODES: HollandCode[] = ['R', 'I', 'A', 'S', 'E', 'C']

const FALLBACK_FIELD: CareerField = 'Business & Management'

// ── Small pure helpers ────────────────────────────────────────────────────────

export function normalizeQuery(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function slugify(s: string): string {
  const out = s
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return out || 'career'
}

/** Maps a growth % to an honest label, aligned with growthTone() thresholds. */
export function growthLabelFor(growth: number): string {
  if (growth <= -20) return 'Declining'
  if (growth <= -8) return 'Slowing'
  if (growth < 8) return 'Stable'
  if (growth < 25) return 'Growing'
  return 'Fast-growing'
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))
const str = (v: unknown) => (typeof v === 'string' ? v : '')
const deDash = (s: string) =>
  s.replace(/\s*[—–]\s*/g, ', ').replace(/,\s*,/g, ',').replace(/\s{2,}/g, ' ').trim()
const cleanList = (v: unknown, max: number) =>
  (Array.isArray(v) ? v : [])
    .map((x) => deDash(str(x)))
    .filter(Boolean)
    .slice(0, max)

/** Resample any numeric array to exactly 11 points (years 0..10), clamped 0–100. */
function normalizeTrend(input: unknown): number[] {
  const arr = (Array.isArray(input) ? input : [])
    .map((n) => clamp(Math.round(Number(n)), 0, 100))
    .filter((n) => Number.isFinite(n))
  if (arr.length === 0) return Array(11).fill(50)
  if (arr.length === 1) return Array(11).fill(arr[0])
  if (arr.length === 11) return arr
  const out: number[] = []
  for (let i = 0; i < 11; i++) {
    const pos = (i / 10) * (arr.length - 1)
    const lo = Math.floor(pos)
    const hi = Math.ceil(pos)
    const frac = pos - lo
    out.push(Math.round(arr[lo] + (arr[hi] - arr[lo]) * frac))
  }
  return out
}

// ── Coercion ──────────────────────────────────────────────────────────────────
// Turns an untrusted object (AI JSON or a DB JSON blob) into a safe master, or
// null when it is explicitly not a career / unusable. Shared so the service and
// the cache reader both normalise identically.
export function coerceMasterFromAI(raw: unknown, fallbackQuery: string): CareerOutlookMaster | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (r.valid === false) return null

  const title = deDash(str(r.title)) || deDash(fallbackQuery)
  if (!title) return null

  // Keep a recognised field as-is; otherwise preserve the model's own short field
  // label (display-only) rather than forcing an unrelated fallback. Only fall back
  // when the model returned nothing usable.
  const fieldRaw = deDash(str(r.field)).slice(0, 40)
  const field: FieldLabel = CAREER_FIELDS.includes(fieldRaw as CareerField)
    ? (fieldRaw as CareerField)
    : fieldRaw || FALLBACK_FIELD

  const riasec = (Array.isArray(r.riasec) ? r.riasec : [])
    .map((x) => String(x).toUpperCase())
    .filter((x): x is HollandCode => (HOLLAND_CODES as string[]).includes(x))
    .slice(0, 3)

  const demand = DEMAND_LEVELS.includes(r.demand as Demand) ? (r.demand as Demand) : 'Moderate'

  return {
    slug: slugify(title),
    title,
    field,
    summary: deDash(str(r.summary)) || `${title}.`,
    exampleRoles: cleanList(r.exampleRoles, 6),
    requiredSkills: cleanList(r.requiredSkills, 8),
    niceToHaveSkills: cleanList(r.niceToHaveSkills, 6),
    riasec: riasec.length > 0 ? riasec : ['I'],
    relatedFields: cleanList(r.relatedFields, 4),
    demand,
    trend: normalizeTrend(r.trend),
    marketNoteNear: deDash(str(r.marketNoteNear)),
    marketNoteLong: deDash(str(r.marketNoteLong)) || deDash(str(r.marketNoteNear)),
    sources: cleanList(r.sources, 3),
  }
}

// ── Catalog → master ──────────────────────────────────────────────────────────
// Builds a master from a curated catalog career so the explorer serves the SAME
// data the results page shows for the 43 known careers (AI is reserved for
// free-text careers not in the catalog). The catalog's single market note is used
// for both horizons; the 6-point trend is resampled to the master's 11 points.
export function catalogCareerToMaster(career: Career): CareerOutlookMaster {
  return {
    slug: career.slug,
    title: career.title,
    field: career.field,
    summary: career.summary,
    exampleRoles: career.exampleRoles,
    requiredSkills: career.requiredSkills,
    niceToHaveSkills: career.niceToHaveSkills,
    riasec: career.riasec,
    relatedFields: career.relatedFields,
    demand: career.outlook.demand,
    trend: normalizeTrend(career.outlook.trend),
    marketNoteNear: career.outlook.marketNote,
    marketNoteLong: career.outlook.marketNote,
    sources: career.outlook.sources,
  }
}

// ── Horizon derivation ────────────────────────────────────────────────────────
function sampleYears(trend: number[], years: number[]): number[] {
  const maxIdx = trend.length - 1
  return years.map((y) => trend[Math.min(y, maxIdx)] ?? trend[maxIdx] ?? 0)
}

/**
 * Derive the 5-yr or 10-yr view as a `Career` (so the modal renders unchanged).
 * Both views slice the SAME master.trend, guaranteeing they stay consistent:
 *   10-yr → years 0,2,4,6,8,10   |   5-yr → years 0,1,2,3,4,5
 */
export function deriveHorizonView(master: CareerOutlookMaster, horizon: Horizon): OutlookView {
  const years = horizon === '5' ? [0, 1, 2, 3, 4, 5] : [0, 2, 4, 6, 8, 10]
  const pts = sampleYears(master.trend, years)
  const first = pts[0]
  const last = pts[pts.length - 1]
  const growth = first > 0 ? Math.round(((last - first) / first) * 100) : 0
  return {
    slug: master.slug,
    title: master.title,
    field: master.field,
    summary: master.summary,
    exampleRoles: master.exampleRoles,
    requiredSkills: master.requiredSkills,
    niceToHaveSkills: master.niceToHaveSkills,
    outlook: {
      demand: master.demand,
      growthLabel: growthLabelFor(growth),
      trend: pts,
      marketNote: horizon === '5' ? master.marketNoteNear || master.marketNoteLong : master.marketNoteLong,
      sources: master.sources,
    },
    riasec: master.riasec,
    relatedFields: master.relatedFields,
  }
}
