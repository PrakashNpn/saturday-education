'use client'

import { useState, useCallback } from 'react'
import { ALL_QUESTIONS, TOTAL_QUESTIONS, buildShuffledQuestions } from '../data/allQuestions'
import type { FlowQuestion } from '../data/allQuestions'
import type { AnswerMap } from '../types'

// In-memory only — the assessment is meant to be completed in one sitting,
// so progress is intentionally not persisted across reloads.
export function useAssessment() {
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [index, setIndex] = useState(0)
  // Defaults to the fixed order (SSR-safe); replaced with a shuffled order on start().
  const [questions, setQuestions] = useState<FlowQuestion[]>(ALL_QUESTIONS)

  const setAnswer = useCallback((id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }, [])

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, TOTAL_QUESTIONS))
  }, [])

  const goBack = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  const reset = useCallback(() => {
    setAnswers({})
    setIndex(0)
  }, [])

  // Begin a fresh attempt: new random (within-section) order + cleared answers.
  const start = useCallback(() => {
    setQuestions(buildShuffledQuestions())
    setAnswers({})
    setIndex(0)
  }, [])

  // Dev/testing helper: fill every question with a random 1–5 answer.
  const autofill = useCallback(() => {
    const filled: AnswerMap = {}
    for (const q of ALL_QUESTIONS) filled[q.id] = 1 + Math.floor(Math.random() * 5)
    setAnswers(filled)
    setIndex(TOTAL_QUESTIONS)
  }, [])

  const answeredCount = Object.keys(answers).length

  return { questions, answers, index, answeredCount, setAnswer, goNext, goBack, reset, start, autofill }
}
