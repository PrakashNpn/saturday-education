'use client'

import { createContext, useContext, useState } from 'react'
import { createExamEngine } from '../services/exam'
import { createAttemptStore } from '../services/attemptStore'
import type { ExamCatalog } from '../types'

function session(catalog: ExamCatalog) {
  const engine = createExamEngine(catalog)
  return { catalog, engine, store: createAttemptStore(engine), questionsById: new Map(catalog.questions.map(q => [q.id, q])) }
}
const Context = createContext<ReturnType<typeof session> | null>(null)
export function ExamSession({ catalog, children }: { catalog: ExamCatalog; children: React.ReactNode }) {
  const [value] = useState(() => session(catalog))
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useExamSession() {
  const value = useContext(Context)
  if (!value) throw new Error('Missing exam session')
  return value
}
