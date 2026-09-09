'use client'

import { ALL_QUESTIONS } from '../data/allQuestions'
import type { FlowQuestion } from '../data/allQuestions'
import type { AnswerMap } from '../types'

/**
 * In-progress assessment state, so a closed tab, a dropped connection or a flat
 * battery does not cost 150 answers.
 *
 * Distinct from pendingSubmission, which holds a *completed* attempt waiting on
 * the network. This one covers the twenty-odd minutes before that point.
 *
 * The shuffled question order is saved alongside the answers: without it a
 * restored run would show the questions in a different sequence, so `index`
 * would point at the wrong one.
 */

const KEY = 'se-assessment-progress-v1'

/** A half-finished attempt is worth keeping for a week; beyond that the student
 *  has almost certainly moved on, and stale answers are worse than none. */
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

export interface SavedProgress {
  /** Question ids in the order this attempt is presenting them. */
  order: string[]
  answers: AnswerMap
  index: number
  savedAt: number
}

const QUESTIONS_BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.id, q]))

export function saveProgress(questions: FlowQuestion[], answers: AnswerMap, index: number): void {
  if (typeof window === 'undefined') return
  try {
    const payload: SavedProgress = {
      order: questions.map((q) => q.id),
      answers,
      index,
      savedAt: Date.now(),
    }
    localStorage.setItem(KEY, JSON.stringify(payload))
  } catch {
    /* private mode or quota exceeded — the run still works, just not resumable */
  }
}

export interface RestoredProgress {
  questions: FlowQuestion[]
  answers: AnswerMap
  index: number
  answeredCount: number
}

/**
 * Returns a usable attempt, or null. Anything we cannot reconstruct exactly is
 * discarded rather than partially restored: an expired save, a bank that has
 * changed since, or a run with nothing answered yet.
 */
export function readProgress(): RestoredProgress | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<SavedProgress>
    if (!Array.isArray(parsed.order) || !parsed.answers || typeof parsed.index !== 'number') return null
    if (!parsed.savedAt || Date.now() - parsed.savedAt > MAX_AGE_MS) {
      clearProgress()
      return null
    }

    // Every id must still exist and the count must match, otherwise the question
    // bank has changed under the save and the answers no longer line up.
    if (parsed.order.length !== ALL_QUESTIONS.length) {
      clearProgress()
      return null
    }
    const questions: FlowQuestion[] = []
    for (const id of parsed.order) {
      const q = QUESTIONS_BY_ID.get(id)
      if (!q) {
        clearProgress()
        return null
      }
      questions.push(q)
    }

    const answeredCount = Object.keys(parsed.answers).length
    if (answeredCount === 0) return null

    return {
      questions,
      answers: parsed.answers,
      index: Math.min(Math.max(parsed.index, 0), questions.length),
      answeredCount,
    }
  } catch {
    // Unparseable: drop it rather than leaving a record that can never be read.
    clearProgress()
    return null
  }
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  snapshot = null
  loaded = true
  for (const listener of listeners) listener()
}

// ── useSyncExternalStore adapter ──────────────────────────────────────────────
// Components need this value after mount but never on the server. Reading it in
// an effect and calling setState is the obvious approach and the wrong one: it
// is an extra render and the lint rule rejects it. A store gives React a stable
// snapshot instead. The snapshot is read once and only invalidated by
// clearProgress, so getSnapshot always returns the same reference and cannot
// loop; saveProgress deliberately leaves it alone, since a run in progress has
// already left the screen that reads this.

let snapshot: RestoredProgress | null = null
let loaded = false
const listeners = new Set<() => void>()

export function subscribeProgress(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getProgressSnapshot(): RestoredProgress | null {
  if (!loaded) {
    snapshot = readProgress()
    loaded = true
  }
  return snapshot
}

/** The server has no localStorage, so there is never saved progress there. */
export function getProgressServerSnapshot(): RestoredProgress | null {
  return null
}
