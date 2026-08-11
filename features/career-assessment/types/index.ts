import type { RiasecCategory } from '../data/riasecQuestions'
import type { BigFiveTrait } from '../data/bigFiveQuestions'
import type { AptitudeArea } from '../data/aptitudeQuestions'
import type { AptitudeBandLabel } from '../data/aptitudeBands'
import type { Career } from '@/shared/lib/careers/catalog'

export type { RiasecCategory } from '../data/riasecQuestions'
export type { BigFiveTrait } from '../data/bigFiveQuestions'
export type { AptitudeArea } from '../data/aptitudeQuestions'
export type { AptitudeBandLabel } from '../data/aptitudeBands'

// One answer keyed by question id: a Likert value 1–5 for interests/personality,
// or the selected option index for aptitude (e.g. "R1": 4, "NUM1": 2).
export type AnswerMap = Record<string, number>

// ── Scoring outputs ──────────────────────────────────────────────────────────

export interface RiasecScore {
  // raw summed score per category (each out of 50: 10 items × max 5)
  scores: Record<RiasecCategory, number>
  // categories sorted high → low
  ranked: RiasecCategory[]
  // top-3 Holland code, e.g. "SIA"
  hollandCode: string
}

export interface BigFiveScore {
  // raw summed score per trait (each out of 50: 10 items × max 5, reverse-adjusted)
  raw: Record<BigFiveTrait, number>
  // scale-relative 0–100% per trait (raw position within the 10–50 range)
  percent: Record<BigFiveTrait, number>
  // population percentile (1–99) per trait, computed against published norms
  percentile: Record<BigFiveTrait, number>
}

// ── Aptitude scoring outputs ─────────────────────────────────────────────────

export interface AptitudeAreaResult {
  area: AptitudeArea
  label: string
  correct: number
  total: number
  percent: number // 0–100, % correct in this area
  band: AptitudeBandLabel
}

export interface AptitudeDirectionGroup {
  area: AptitudeArea
  label: string
  fields: string[]
}

export interface AptitudeResult {
  areas: AptitudeAreaResult[]
  overallCorrect: number
  overallTotal: number
  overallPercent: number
  overallBand: AptitudeBandLabel
  strengthAreas: AptitudeArea[] // top area(s) by percent
  directions: AptitudeDirectionGroup[]
}

export interface AssessmentScores {
  riasec: RiasecScore
  bigFive: BigFiveScore
  aptitude: AptitudeResult
}

// ── Contact / lead input ─────────────────────────────────────────────────────

export interface ContactDetails {
  fullName: string
  email: string
  phone: string
  educationLevel?: string
  preferredCountry?: string
}

// ── AI synthesis (counselor-facing) ──────────────────────────────────────────

export interface CareerDirection {
  title: string
  why: string
}

// A ranked career suggestion with dual fit scores (for the report's career table).
export interface CareerPath {
  title: string // e.g. "Business Analytics"
  roles?: string // example job titles, e.g. "Data Analyst, Marketing Analyst"
  psychFit: number // 0–100, interests + personality alignment
  skillsFit: number // 0–100, aptitude alignment
}

export interface CounselorSynthesis {
  read: string // a short "counselor read" paragraph tying interests + personality together
  careerDirections: CareerDirection[]
  suggestedFields: string[]
  careerPaths: CareerPath[] // ranked, with fit scores (top 5) — counselor-facing (PDF/email)
  // Student-facing layer (shown on the results dashboard):
  studentRead?: string // a warm ~50-word summary written TO the student
  careerFit?: { id: string; whyFit: string }[] // per matched catalog career (id = slug)
}

// ── Matched career (catalog entry + this student's fit) ───────────────────────
// The catalog FACTS (outlook, skills) are frozen; interestFit/skillsFit/skillGap
// are computed deterministically; whyFit is the AI's personal note for this student.

export interface CareerSkillGap {
  // The student's measured aptitudes that this career leans on, split by how they
  // scored — so it's distinct from the career's own skill list (no duplication).
  strengths: { label: string; percent: number }[] // relevant aptitudes they're strong in
  focus: string[] // relevant aptitudes worth strengthening
}

export interface MatchedCareer extends Career {
  interestFit: number // 0–100, interests alignment
  skillsFit: number // 0–100, aptitude alignment
  match: number // 0–100, weighted rank score (interestFit*0.6 + skillsFit*0.4)
  whyFit?: string // AI, second-person "why this fits you"
  skillGap: CareerSkillGap
}

// ── University teaser (gated hook on the results page) ───────────────────────
// A real, personalised teaser of the recommendation tree (counts + countries +
// blurred sample) — the full shortlist stays gated behind the consultation.

export interface UniversityTeaser {
  totalCount: number // matching programs across the tree
  countries: string[] // distinct destination countries (top few)
  fields: string[] // matching field-of-study buckets (top few)
  sample: string[] // a few real "Program · Country · University" lines to blur
}

// ── Structured recommendation tree ───────────────────────────────────────────
// Profile → field-of-study bucket → countries strong for it → universities (in our DB).

export interface RecUniversity {
  name: string
  program: string
  degreeLevel: string
  ranking?: number
}

export interface RecCountry {
  country: string
  strongFit: boolean // country's academicSpecialties include this bucket (internal tie-break)
  preferred: boolean // matches the student's stated preferred destination
  moreCount: number // additional matching programs not shown
  bestRank?: number // best university ranking in this country (internal ordering)
  universities: RecUniversity[]
}

export interface RecBucket {
  bucket: string // canonical field-of-study area, e.g. "Computer Science & IT"
  countries: RecCountry[]
  moreCountries: number // additional countries with matching programs not shown
}

export interface RecommendationTree {
  buckets: RecBucket[]
  fields: string[] // flat list of bucket labels (stored in the recommendedFields column)
}

// ── Dashboard data shown to the student (visual profile) ─────────────────────
// The student's SCORES (for the charts) — but NOT the interpretation (career
// directions, university matches, counselor read), which stays gated server-side.

export interface DashboardData {
  fullName: string
  email: string
  phone?: string
  archetype: string // e.g. "The Thinker Persuader"
  archetypeSummary: string // one-line read of the top interests
  hollandCode: string // e.g. "IES"
  interests: { category: RiasecCategory; label: string; value: number }[] // all 6, 0–100
  personality: { trait: BigFiveTrait; label: string; low: string; high: string; percentile: number }[] // 5
  aptitude: { area: string; label: string; percent: number; band: AptitudeBandLabel }[] // 4
  aptitudeOverall: { percent: number; band: AptitudeBandLabel }
  studentRead?: string // a warm, student-facing summary (AI, falls back to archetypeSummary)
  // NOTE: career matches (outlook/skills/fit/skill-gap) are intentionally NOT sent to the
  // client — they're gated to the counsellor PDF. See buildAssessmentPdf.
  universityTeaser?: UniversityTeaser // personalised gated hook (undefined if no matches in DB)
}

// ── Submit result returned to the client ─────────────────────────────────────

export interface SubmitResult {
  success: boolean
  error?: string
  dashboard?: DashboardData
  /** Saved lead id — the dashboard uses it to pick up the AI paragraph once the
   *  background synthesis finishes. */
  leadId?: string
}
