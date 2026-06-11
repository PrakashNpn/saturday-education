import type { RiasecCategory } from '../data/riasecQuestions'
import type { BigFiveTrait } from '../data/bigFiveQuestions'

export type { RiasecCategory } from '../data/riasecQuestions'
export type { BigFiveTrait } from '../data/bigFiveQuestions'

// A single answer is a Likert value 1–5, keyed by question id (e.g. "R1", "O3").
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

export interface AssessmentScores {
  riasec: RiasecScore
  bigFive: BigFiveScore
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

export interface CounselorSynthesis {
  read: string // a short "counselor read" paragraph tying interests + personality together
  careerDirections: CareerDirection[]
  suggestedFields: string[]
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

// ── Submit result returned to the client ─────────────────────────────────────

export interface SubmitResult {
  success: boolean
  error?: string
}
