import type { ExamFormat, Question } from '../types'

/** Official corrections and disclosed practice policies can accept every valid choice. */
export function isCorrectOption(question: Question, optionId: string | undefined): boolean {
  if (!question.options.some(option => option.id === optionId)) return false
  return question.scoringPolicy?.kind === 'all-options-accepted' || optionId === question.correctOptionId
}

/** PostgreSQL stores marks to two decimal places; calculate in hundredths throughout. */
export function questionScore(question: Question, answer: string | undefined, format: ExamFormat): number {
  if (answer === undefined) return question.scoringPolicy?.blankTreatment === 'full-credit' ? Math.round(format.correct * 100) : 0
  return Math.round((isCorrectOption(question, answer) ? format.correct : format.incorrect) * 100)
}
