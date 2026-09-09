'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ALL_QUESTIONS, TOTAL_QUESTIONS, buildShuffledQuestions } from '../data/allQuestions'
import type { FlowQuestion } from '../data/allQuestions'
import type { AnswerMap } from '../types'
import { saveProgress, clearProgress, type RestoredProgress } from '../services/assessmentProgress'

// Progress is written to localStorage on every answer so a closed tab or a
// dropped connection does not cost the whole run. See assessmentProgress.
export function useAssessment() {
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [index, setIndex] = useState(0)
  // Defaults to the fixed order (SSR-safe); replaced with a shuffled order on start().
  const [questions, setQuestions] = useState<FlowQuestion[]>(ALL_QUESTIONS)

  // Only true once a run is under way, so an idle visitor on the landing page
  // never writes an empty record.
  const active = useRef(false)

  // One write per state change rather than one per keystroke: answers and index
  // move together, and localStorage writes are synchronous.
  useEffect(() => {
    if (!active.current) return
    saveProgress(questions, answers, index)
  }, [questions, answers, index])

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
    active.current = false
    clearProgress()
    setAnswers({})
    setIndex(0)
  }, [])

  // Begin a fresh attempt: new random (within-section) order + cleared answers.
  const start = useCallback(() => {
    clearProgress()
    active.current = true
    setQuestions(buildShuffledQuestions())
    setAnswers({})
    setIndex(0)
  }, [])

  /** Pick up a saved attempt exactly where it was left. */
  const resume = useCallback((saved: RestoredProgress) => {
    active.current = true
    setQuestions(saved.questions)
    setAnswers(saved.answers)
    setIndex(saved.index)
  }, [])

  // Dev/testing helper: fill every question — Likert 1–5, MCQ a random option index.
  const autofill = useCallback(() => {
    const filled: AnswerMap = {}
    for (const q of ALL_QUESTIONS) {
      filled[q.id] = q.kind === 'mcq' ? Math.floor(Math.random() * q.options.length) : 1 + Math.floor(Math.random() * 5)
    }
    active.current = true
    setAnswers(filled)
    setIndex(TOTAL_QUESTIONS)
  }, [])

  const answeredCount = Object.keys(answers).length

  return {
    questions,
    answers,
    index,
    answeredCount,
    setAnswer,
    goNext,
    goBack,
    reset,
    start,
    resume,
    autofill,
  }
}
