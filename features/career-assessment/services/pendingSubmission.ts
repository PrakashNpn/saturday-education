'use client'

import type { AnswerMap, ContactDetails } from '../types'

/**
 * A submission that has been started but not yet confirmed by the server.
 *
 * The assessment itself is deliberately in-memory only (see useAssessment), but once a
 * student presses submit they have ~25 minutes of work at stake, so the payload is written
 * to localStorage *before* the first network attempt. That way a dropped connection, a
 * backgrounded tab, a reload or a flat battery cannot lose it: the next time the page opens
 * we finish the submission for them.
 *
 * Cleared as soon as the server confirms the lead was saved.
 */

const KEY = 'se-assessment-pending-v1'

/** Anything older than this is assumed abandoned and is discarded rather than resubmitted. */
const MAX_AGE_MS = 24 * 60 * 60 * 1000

export interface PendingSubmission {
  contact: ContactDetails
  answers: AnswerMap
  savedAt: number
}

export function savePending(contact: ContactDetails, answers: AnswerMap): void {
  if (typeof window === 'undefined') return
  try {
    const payload: PendingSubmission = { contact, answers, savedAt: Date.now() }
    localStorage.setItem(KEY, JSON.stringify(payload))
  } catch {
    /* private mode or quota exceeded — retrying in memory still works */
  }
}

export function readPending(): PendingSubmission | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PendingSubmission>
    if (!parsed?.contact?.email || !parsed?.answers || !parsed?.savedAt) return null
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) {
      clearPending()
      return null
    }
    return parsed as PendingSubmission
  } catch {
    return null
  }
}

export function clearPending(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
