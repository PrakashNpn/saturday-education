// Unified, ordered question list for the assessment flow: 60 RIASEC then 40 Big Five.

import { RIASEC_QUESTIONS } from './riasecQuestions'
import { BIG_FIVE_QUESTIONS } from './bigFiveQuestions'

export type QuestionScale = 'like' | 'agree'
export type QuestionSection = 'riasec' | 'bigfive'

export interface FlowQuestion {
  id: string
  text: string
  scale: QuestionScale
  section: QuestionSection
}

export const ALL_QUESTIONS: FlowQuestion[] = [
  ...RIASEC_QUESTIONS.map((q) => ({
    id: q.id,
    text: q.text,
    scale: 'like' as const,
    section: 'riasec' as const,
  })),
  ...BIG_FIVE_QUESTIONS.map((q) => ({
    id: q.id,
    text: q.text,
    scale: 'agree' as const,
    section: 'bigfive' as const,
  })),
]

export const RIASEC_COUNT = RIASEC_QUESTIONS.length // 60
export const TOTAL_QUESTIONS = ALL_QUESTIONS.length // 110

// Fisher–Yates shuffle on a copy.
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * A fresh per-attempt order: questions are shuffled *within* each section
 * (interests, then personality) so the two parts, their scales, and the mid-test
 * transition stay intact. Scoring is by tag, so order never affects results.
 */
export function buildShuffledQuestions(): FlowQuestion[] {
  const riasec = ALL_QUESTIONS.slice(0, RIASEC_COUNT)
  const bigfive = ALL_QUESTIONS.slice(RIASEC_COUNT)
  return [...shuffle(riasec), ...shuffle(bigfive)]
}
