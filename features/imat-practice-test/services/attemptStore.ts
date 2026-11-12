'use client'

import type { createExamEngine } from './exam'
import type { Attempt } from '../types'

export function createAttemptStore(engine: ReturnType<typeof createExamEngine>) {
  const { finishAttempt, restoreAttempt } = engine
  const KEY = 'saturday-imat-attempt-v1'
  type Snapshot = { ready: boolean; attempt: Attempt | null; storageAvailable: boolean; discarded: boolean }
  const SERVER: Snapshot = { ready: false, attempt: null, storageAvailable: true, discarded: false }
  let snapshot = SERVER
  const listeners = new Set<() => void>()
  const emit = () => listeners.forEach((listener) => listener())

  function hydrate() {
    try {
      const raw = localStorage.getItem(KEY)
      const attempt = restoreAttempt(raw)
      snapshot = { ready: true, attempt, storageAvailable: true, discarded: !!raw && !attempt }
    } catch {
      snapshot = { ready: true, attempt: null, storageAvailable: false, discarded: false }
    }
    emit()
  }

  function subscribeAttempt(listener: () => void) {
    listeners.add(listener)
    if (!snapshot.ready) hydrate()
    const sync = (event: StorageEvent) => {
      if (event.key === KEY || event.key === null) hydrate()
    }
    window.addEventListener('storage', sync)
    return () => {
      listeners.delete(listener)
      window.removeEventListener('storage', sync)
    }
  }
  const getAttemptSnapshot = () => snapshot
  const getServerAttemptSnapshot = () => SERVER

  function updateAttempt(attempt: Attempt | null) {
    // An elapsed test is finalised before accepting any further interaction.
    const value = attempt && attempt.completedAt === null && Date.now() >= attempt.deadline ? finishAttempt(attempt) : attempt
    let storageAvailable = snapshot.storageAvailable
    try {
      if (value) localStorage.setItem(KEY, JSON.stringify(value))
      else localStorage.removeItem(KEY)
      storageAvailable = true
    } catch {
      storageAvailable = false
    }
    snapshot = { ready: true, attempt: value, storageAvailable, discarded: false }
    emit()
  }

  function changeAttempt(change: (attempt: Attempt) => Attempt) {
    const current = snapshot.attempt
    if (!current || current.completedAt !== null) return
    if (Date.now() >= current.deadline) updateAttempt(finishAttempt(current))
    else {
      const next = change(current)
      if (next !== current) updateAttempt(next)
    }
  }

  return { subscribeAttempt, getAttemptSnapshot, getServerAttemptSnapshot, updateAttempt, changeAttempt }
}
