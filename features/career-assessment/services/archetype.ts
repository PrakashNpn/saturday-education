// A professional, personality-aware archetype label derived deterministically from the
// assessment scores (no AI — so it always reads professionally and stays consistent).
//
// noun      = the student's strongest interest (RIASEC top type)
// adjective = their most distinctive Big Five trait (furthest from the population midpoint)
// → e.g. "The Focused Analyst", "The Methodical Strategist", "The Dynamic Organizer".

import type { AssessmentScores, RiasecCategory, BigFiveTrait } from '../types'

const RIASEC_NOUN: Record<RiasecCategory, string> = {
  R: 'Builder',
  I: 'Analyst',
  A: 'Creator',
  S: 'Mentor',
  E: 'Strategist',
  C: 'Organizer',
}

const TRAIT_ADJECTIVE: Record<BigFiveTrait, { high: string; low: string }> = {
  O: { high: 'Inventive', low: 'Practical' },
  C: { high: 'Methodical', low: 'Versatile' },
  E: { high: 'Dynamic', low: 'Focused' },
  A: { high: 'Collaborative', low: 'Independent' },
  N: { high: 'Considered', low: 'Composed' },
}

const TRAIT_ORDER: BigFiveTrait[] = ['O', 'C', 'E', 'A', 'N']

export function buildArchetype(scores: AssessmentScores): string {
  const noun = RIASEC_NOUN[scores.riasec.ranked[0]] ?? 'Professional'

  // Most distinctive trait = the percentile furthest from the population midpoint (50).
  const standout = TRAIT_ORDER.reduce((best, t) =>
    Math.abs(scores.bigFive.percentile[t] - 50) > Math.abs(scores.bigFive.percentile[best] - 50) ? t : best,
  )
  const p = scores.bigFive.percentile[standout]
  const adjective = p >= 50 ? TRAIT_ADJECTIVE[standout].high : TRAIT_ADJECTIVE[standout].low

  return `The ${adjective} ${noun}`
}
