// Deterministic matching of the student's scores to the frozen career catalog.
// interestFit = RIASEC alignment; skillsFit = aptitude alignment; skillGap maps
// the student's measured aptitude strengths to each career's required skills.
// (The personal "why it fits you" is added separately by the AI.)

import { CAREERS, type Career } from '@/shared/lib/careers/catalog'
import type { AptitudeArea } from '../data/aptitudeQuestions'
import type { AssessmentScores, MatchedCareer, CareerSkillGap, RiasecCategory } from '../types'

// Which aptitude areas matter most for each field (drives skillsFit + skill-gap).
const FIELD_APTITUDES: Record<string, AptitudeArea[]> = {
  'Computer Science & IT': ['logical', 'numerical'],
  Engineering: ['numerical', 'logical', 'spatial'],
  'Business & Management': ['verbal', 'numerical'],
  'Finance & Economics': ['numerical', 'logical'],
  'Medicine & Health': ['logical', 'verbal'],
  'Natural Sciences': ['logical', 'numerical'],
  'Social Sciences & Psychology': ['verbal', 'logical'],
  'Arts, Design & Media': ['spatial', 'verbal'],
  Law: ['verbal', 'logical'],
  Education: ['verbal'],
  'Humanities & Languages': ['verbal'],
  'Hospitality & Tourism': ['verbal'],
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))

/** How well the student's interests align with the career's Holland types
 *  (primary type weighted most). */
function interestFit(scores: AssessmentScores, career: Career): number {
  const norm = (c: RiasecCategory) => (scores.riasec.scores[c] / 50) * 100
  if (!career.riasec.length) return 50
  let total = 0
  let wsum = 0
  career.riasec.forEach((code, i) => {
    const w = i === 0 ? 1 : i === 1 ? 0.6 : 0.4
    total += norm(code) * w
    wsum += w
  })
  return clamp(total / wsum)
}

function relevantAptitudes(career: Career): AptitudeArea[] {
  return FIELD_APTITUDES[career.field] ?? ['logical', 'verbal']
}

/** Average of the student's % correct on the aptitude areas this field leans on. */
function skillsFit(scores: AssessmentScores, career: Career): number {
  const areas = relevantAptitudes(career)
  const pctByArea = new Map(scores.aptitude.areas.map((a) => [a.area, a.percent]))
  const vals = areas.map((a) => pctByArea.get(a) ?? 50)
  return clamp(vals.reduce((s, v) => s + v, 0) / vals.length)
}

function buildSkillGap(scores: AssessmentScores, career: Career): CareerSkillGap {
  const areas = relevantAptitudes(career)
  const byArea = new Map(scores.aptitude.areas.map((a) => [a.area, a]))
  const strengths: { label: string; percent: number }[] = []
  const focus: string[] = []
  // Compare the student's measured aptitudes to the ones this career leans on.
  for (const a of areas) {
    const r = byArea.get(a)
    if (!r) continue
    if (r.percent >= 60) strengths.push({ label: r.label, percent: r.percent })
    else focus.push(r.label)
  }
  return { strengths, focus }
}

/** Rank the whole catalog for this student and return the top matches. */
export function matchCareers(scores: AssessmentScores, limit = 5): MatchedCareer[] {
  const scored = CAREERS.map((career) => {
    const iFit = interestFit(scores, career)
    const sFit = skillsFit(scores, career)
    const score = iFit * 0.6 + sFit * 0.4
    const matched: MatchedCareer = {
      ...career,
      interestFit: iFit,
      skillsFit: sFit,
      match: clamp(score),
      skillGap: buildSkillGap(scores, career),
    }
    return { matched, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((s) => s.matched)
}

export function skillGap(scores: AssessmentScores, career: Career): CareerSkillGap {
  return buildSkillGap(scores, career)
}
