// Reference norms for the Big Five trait scales, used to convert a student's raw
// score into a population percentile.
//
// Scores are sums of 10 items rated 1–5 (range 10–50, reverse items already flipped).
// The mean/SD below are general adult self-report norms approximated from published
// IPIP-50 (Goldberg) normative data. They are NOT culture- or age-specific, so the
// resulting percentiles are an informed approximation, not a clinical norm.
// Refine these constants against a documented IPIP normative table if needed.

import type { BigFiveTrait } from './bigFiveQuestions'

export interface TraitNorm {
  mean: number
  sd: number
}

export const BIG_FIVE_NORMS: Record<BigFiveTrait, TraitNorm> = {
  O: { mean: 39, sd: 5.5 }, // Openness
  C: { mean: 35, sd: 6.5 }, // Conscientiousness
  E: { mean: 31, sd: 7.5 }, // Extraversion
  A: { mean: 40, sd: 5.5 }, // Agreeableness
  N: { mean: 29, sd: 7.5 }, // Neuroticism
}
