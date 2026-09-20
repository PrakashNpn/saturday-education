// Pure data-shaping for the student's visual profile — no DB, no AI, no
// 'use server' boundary. Split out of careerLeadService.ts so it can be
// called both from the live submission path and from the public results
// page, which recomputes the same shape from a lead's stored raw answers.

import { buildArchetype } from './archetype'
import { RIASEC_INFO } from '../data/riasecFieldMap'
import type {
  AssessmentScores,
  CounselorSynthesis,
  RecommendationTree,
  DashboardData,
  UniversityTeaser,
  RiasecCategory,
  BigFiveTrait,
} from '../types'

const RIASEC_ORDER: RiasecCategory[] = ['R', 'I', 'A', 'S', 'E', 'C']
const RIASEC_SHORT: Record<RiasecCategory, string> = {
  R: 'Realistic',
  I: 'Investigative',
  A: 'Artistic',
  S: 'Social',
  E: 'Enterprising',
  C: 'Conventional',
}
// Bipolar pole labels for the personality bars (low ↔ high of each trait).
const BIG_FIVE_BARS: { trait: BigFiveTrait; label: string; low: string; high: string }[] = [
  { trait: 'O', label: 'Openness', low: 'Practical', high: 'Curious' },
  { trait: 'C', label: 'Conscientiousness', low: 'Flexible', high: 'Organised' },
  { trait: 'E', label: 'Extraversion', low: 'Reserved', high: 'Outgoing' },
  { trait: 'A', label: 'Agreeableness', low: 'Direct', high: 'Compassionate' },
  { trait: 'N', label: 'Emotional sensitivity', low: 'Calm', high: 'Sensitive' },
]

/** A real, personalised teaser of the recommendation tree (counts + countries +
 *  a few blurred sample rows). The full shortlist stays gated. Passing an empty
 *  tree (no buckets) yields `undefined` here, which is how the public results
 *  page — which never fetches a tree at all — cleanly gets no teaser. */
export function buildUniversityTeaser(tree: RecommendationTree): UniversityTeaser | undefined {
  const countries = new Set<string>()
  const sample: string[] = []
  let totalCount = 0

  for (const bucket of tree.buckets) {
    for (const c of bucket.countries) {
      countries.add(c.country)
      totalCount += c.universities.length + (c.moreCount ?? 0)
      for (const u of c.universities) {
        if (sample.length < 3) sample.push(`${u.program} · ${c.country} · ${u.name}`)
      }
    }
  }

  if (totalCount === 0) return undefined
  return {
    totalCount,
    countries: Array.from(countries).slice(0, 4),
    fields: tree.fields.slice(0, 3),
    sample,
  }
}

/** The student's visual profile (scores) for the dashboard charts. Deliberately
 *  excludes the interpretation (career matches, full university shortlist,
 *  counselor read), which stays gated to the counsellor PDF/email. */
export function buildDashboard(
  scores: AssessmentScores,
  synthesis: CounselorSynthesis | null,
  tree: RecommendationTree,
): Omit<DashboardData, 'fullName' | 'email' | 'phone'> {
  const { riasec, bigFive, aptitude } = scores

  const mainLabel = (c: RiasecCategory) => RIASEC_INFO[c].label.replace(/\s*\(.*\)\s*/, '').trim()

  const top2 = riasec.ranked.slice(0, 2)
  const archetype = buildArchetype(scores)
  const archetypeSummary =
    top2.length > 1
      ? `You're drawn most to ${mainLabel(top2[0])} and ${mainLabel(top2[1])} activities.`
      : `You're drawn most to ${mainLabel(top2[0])} activities.`

  return {
    archetype,
    archetypeSummary,
    // Left undefined when the AI has not run yet, so the dashboard knows to go and fetch it
    // via getStudentRead(). The UI renders `studentRead ?? archetypeSummary`, so the student
    // sees the deterministic summary in the meantime either way. Do NOT default it here:
    // a truthy value makes the dashboard think the AI text already arrived and stop polling.
    studentRead: synthesis?.studentRead,
    hollandCode: riasec.hollandCode,
    interests: RIASEC_ORDER.map((c) => ({
      category: c,
      label: RIASEC_SHORT[c],
      value: Math.round((riasec.scores[c] / 50) * 100),
    })),
    personality: BIG_FIVE_BARS.map((b) => ({ ...b, percentile: bigFive.percentile[b.trait] })),
    aptitude: aptitude.areas.map((a) => ({ area: a.area, label: a.label, percent: a.percent, band: a.band })),
    aptitudeOverall: { percent: aptitude.overallPercent, band: aptitude.overallBand },
    universityTeaser: buildUniversityTeaser(tree),
  }
}
