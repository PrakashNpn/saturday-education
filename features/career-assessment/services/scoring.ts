// Pure scoring functions — no side effects, runnable on client or server.

import { RIASEC_QUESTIONS, type RiasecCategory } from '../data/riasecQuestions'
import { BIG_FIVE_QUESTIONS, type BigFiveTrait } from '../data/bigFiveQuestions'
import { BIG_FIVE_NORMS } from '../data/bigFiveNorms'
import type { AnswerMap, RiasecScore, BigFiveScore, AssessmentScores } from '../types'

const RIASEC_CATEGORIES: RiasecCategory[] = ['R', 'I', 'A', 'S', 'E', 'C']
const BIG_FIVE_TRAITS: BigFiveTrait[] = ['O', 'C', 'E', 'A', 'N']

// Standard normal CDF via the Abramowitz & Stegun (7.1.26) erf approximation.
function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x))
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-x * x)
  return x >= 0 ? y : -y
}

function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2))
}

/**
 * RIASEC: sum the 1–5 Like ratings within each category. Holland code = top 3
 * categories by score. Ties broken by the fixed RIASEC ordering for determinism.
 */
export function computeRiasec(answers: AnswerMap): RiasecScore {
  const scores = Object.fromEntries(
    RIASEC_CATEGORIES.map((c) => [c, 0]),
  ) as Record<RiasecCategory, number>

  for (const q of RIASEC_QUESTIONS) {
    const v = answers[q.id]
    if (typeof v === 'number') scores[q.category] += v
  }

  const ranked = [...RIASEC_CATEGORIES].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a]
    return RIASEC_CATEGORIES.indexOf(a) - RIASEC_CATEGORIES.indexOf(b)
  })

  return {
    scores,
    ranked,
    hollandCode: ranked.slice(0, 3).join(''),
  }
}

/**
 * Big Five: sum the 1–5 agreement ratings per trait, scoring reverse-keyed items
 * as (6 - value). Each trait has 10 items → raw range 10–50 → normalized to 0–100%.
 */
export function computeBigFive(answers: AnswerMap): BigFiveScore {
  const raw = Object.fromEntries(
    BIG_FIVE_TRAITS.map((t) => [t, 0]),
  ) as Record<BigFiveTrait, number>
  const counts = Object.fromEntries(
    BIG_FIVE_TRAITS.map((t) => [t, 0]),
  ) as Record<BigFiveTrait, number>

  for (const q of BIG_FIVE_QUESTIONS) {
    const v = answers[q.id]
    if (typeof v !== 'number') continue
    raw[q.trait] += q.reverse ? 6 - v : v
    counts[q.trait] += 1
  }

  const percent = Object.fromEntries(
    BIG_FIVE_TRAITS.map((t) => {
      const n = counts[t]
      // each answered item contributes 1–5; min total = n, max total = 5n
      const pct = n > 0 ? Math.round(((raw[t] - n) / (4 * n)) * 100) : 0
      return [t, Math.max(0, Math.min(100, pct))]
    }),
  ) as Record<BigFiveTrait, number>

  // Population percentile vs published norms: z = (raw − mean) / sd → Φ(z).
  const percentile = Object.fromEntries(
    BIG_FIVE_TRAITS.map((t) => {
      const { mean, sd } = BIG_FIVE_NORMS[t]
      const z = sd > 0 ? (raw[t] - mean) / sd : 0
      const pct = Math.round(normalCdf(z) * 100)
      return [t, Math.max(1, Math.min(99, pct))]
    }),
  ) as Record<BigFiveTrait, number>

  return { raw, percent, percentile }
}

export function computeScores(answers: AnswerMap): AssessmentScores {
  return {
    riasec: computeRiasec(answers),
    bigFive: computeBigFive(answers),
  }
}
