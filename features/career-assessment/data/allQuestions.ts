// Unified, ordered question list for the combined assessment flow:
// 60 RIASEC (Likert) → 50 Big Five (Likert) → 40 Aptitude (MCQ) = 150.

import { RIASEC_QUESTIONS } from './riasecQuestions'
import { BIG_FIVE_QUESTIONS } from './bigFiveQuestions'
import { APTITUDE_QUESTIONS } from './aptitudeQuestions'
import type { AptitudeArea } from './aptitudeQuestions'

export type QuestionScale = 'like' | 'agree'
export type QuestionSection = 'riasec' | 'bigfive' | 'aptitude'

// Self-report Likert items (interests + personality).
export interface LikertFlowQuestion {
  kind: 'likert'
  id: string
  text: string
  scale: QuestionScale
  section: 'riasec' | 'bigfive'
}

// Objective multiple-choice items (aptitude). `optionsSvg`, when present, supplies
// the option graphics; `options` then act as accessibility labels.
export interface McqFlowQuestion {
  kind: 'mcq'
  id: string
  text: string
  section: 'aptitude'
  area: AptitudeArea
  options: string[]
  svg?: string
  optionsSvg?: string[]
}

export type FlowQuestion = LikertFlowQuestion | McqFlowQuestion

export const ALL_QUESTIONS: FlowQuestion[] = [
  ...RIASEC_QUESTIONS.map(
    (q): LikertFlowQuestion => ({ kind: 'likert', id: q.id, text: q.text, scale: 'like', section: 'riasec' }),
  ),
  ...BIG_FIVE_QUESTIONS.map(
    (q): LikertFlowQuestion => ({ kind: 'likert', id: q.id, text: q.text, scale: 'agree', section: 'bigfive' }),
  ),
  ...APTITUDE_QUESTIONS.map(
    (q): McqFlowQuestion => ({
      kind: 'mcq',
      id: q.id,
      text: q.text,
      section: 'aptitude',
      area: q.area,
      options: q.options,
      svg: q.svg,
      optionsSvg: q.optionsSvg,
    }),
  ),
]

export const RIASEC_COUNT = RIASEC_QUESTIONS.length // 60
export const PERSONALITY_END = RIASEC_QUESTIONS.length + BIG_FIVE_QUESTIONS.length // 110
export const TOTAL_QUESTIONS = ALL_QUESTIONS.length // 150

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
 * A fresh per-attempt order: questions shuffled *within* each section, keeping the
 * three parts in order (interests → personality → aptitude). Scoring is by id, so
 * order never affects results.
 */
export function buildShuffledQuestions(): FlowQuestion[] {
  const riasec = ALL_QUESTIONS.slice(0, RIASEC_COUNT)
  const bigfive = ALL_QUESTIONS.slice(RIASEC_COUNT, PERSONALITY_END)
  const aptitude = ALL_QUESTIONS.slice(PERSONALITY_END)
  return [...shuffle(riasec), ...shuffle(bigfive), ...shuffle(aptitude)]
}
