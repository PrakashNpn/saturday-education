'use client'

import { lazy, Suspense, useEffect, useState, useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import { RotateCcw } from 'lucide-react'
import { SIMULATION_FORMAT } from '../data/formats'
import { ExamSession, useExamSession } from './ExamSession'
import type { ExamCatalog } from '../types'
import { ConfirmDialog } from './ConfirmDialog'
import { ImatLanding } from './ImatLanding'
import { ExamRunner } from './ExamRunner'
import { ExamResults } from './ExamResults'
import { PRIMARY_BUTTON } from './styles'
import { ExamSetup, type ExamSelection } from './ExamSetup'
import { ExamInstructions } from './ExamInstructions'
const ResultContactGate = lazy(() => import('./ResultContactGate'))

export function ImatPractice({ catalog }: { catalog: ExamCatalog }) {
  return <ExamSession key={catalog.bankVersion} catalog={catalog}><Practice /></ExamSession>
}
function Practice() {
  const { catalog, engine, store: attemptStore } = useExamSession()
  const { createAttempt, formatFor, remainingSeconds, finishAttempt } = engine
  const { changeAttempt, getAttemptSnapshot, getServerAttemptSnapshot, subscribeAttempt, updateAttempt } = attemptStore
  const t = useTranslations('imat')
  const store = useSyncExternalStore(subscribeAttempt, getAttemptSnapshot, getServerAttemptSnapshot)
  const [view, setView] = useState<'home' | 'setup' | 'exam'>('home')
  const [mode, setMode] = useState<'mock' | 'paper'>('mock')
  const [selection, setSelection] = useState<ExamSelection | null>(null)
  const [error, setError] = useState(false)
  const attempt = store.attempt
  const active = !!attempt && attempt.completedAt === null

  // Native unload warning; ordinary navigation remains recoverable through local storage.
  useEffect(() => {
    if (!active) return
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    const expire = () => changeAttempt((current) => remainingSeconds(current) === 0 ? finishAttempt(current) : current)
    window.addEventListener('beforeunload', warn)
    const interval = window.setInterval(expire, 1000)
    return () => { window.removeEventListener('beforeunload', warn); window.clearInterval(interval) }
  }, [active, changeAttempt, remainingSeconds, finishAttempt])

  function start() {
    if (!selection) return
    try {
      updateAttempt(createAttempt(selection.mode, selection.paperId))
      setSelection(null)
      setView('exam')
      setError(false)
      window.scrollTo({ top: 0 })
    } catch { setError(true) }
  }
  function home() { setView('home'); window.scrollTo({ top: 0 }) }
  function openSetup(nextMode: 'mock' | 'paper' = 'mock') {
    setMode(nextMode)
    setView('setup')
    window.scrollTo({ top: 0 })
  }

  const selectedFormat = selection ? formatFor({ mode: selection.mode, paperId: selection.paperId ?? null }) : SIMULATION_FORMAT
  const selectedPaper = selection?.mode === 'paper' ? catalog.papers.find(paper => paper.id === selection.paperId) : undefined
  const savedAttempt = <div className={!store.ready || store.discarded || attempt ? `space-y-4 ${view === 'setup' ? '' : 'py-6'}` : 'hidden'}>
            {!store.ready && <p role="status" className="text-label text-muted-text">{t('loading')}</p>}
            {store.discarded && <p role="status" className="rounded-xl border border-stroke bg-surface p-4 text-label">{t('invalidSave')}</p>}
            {attempt && <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-action/30 bg-tint p-4">
              <div><p className="text-label font-semibold text-primary-text">{t(active ? 'savedTitle' : 'savedResult')}</p><p className="mt-1 text-label text-secondary-text">{t(active ? 'timerContinues' : 'localOnly')}</p></div>
              <button type="button" className={PRIMARY_BUTTON} onClick={() => {
                if (active && remainingSeconds(attempt) === 0) updateAttempt(finishAttempt(attempt))
                setView('exam')
              }}><RotateCcw className="size-4" aria-hidden="true" />{t(active ? 'resume' : 'viewResults')}</button>
            </div>}
  </div>
  return (
    <main>
      {!store.storageAvailable && <p role="status" className="mx-auto max-w-wrap px-6 py-4 text-label text-error">{t('storageWarning')}</p>}
      {view === 'exam' && attempt
        ? attempt.completedAt === null
          ? <ExamRunner attempt={attempt} onLeave={home} />
          : attempt.leadCaptured
            ? <ExamResults key={attempt.id} attempt={attempt} onHome={home} />
            : <Suspense fallback={<p role="status" className="mx-auto max-w-wrap px-6 py-8 text-label text-muted-text">{t('contactGate.loading')}</p>}><ResultContactGate key={attempt.id} attempt={attempt} onHome={home} onSaved={() => {
                const current = getAttemptSnapshot().attempt
                if (current?.id === attempt.id && current.completedAt !== null) updateAttempt({ ...current, leadCaptured: true })
              }} /></Suspense>
        : view === 'setup' ? <ExamSetup mode={mode} onModeChange={setMode} ready={store.ready} reviewing={selection !== null} onReview={(next) => { setSelection(next); setError(false) }} onBack={home}>{savedAttempt}</ExamSetup> : <ImatLanding onStart={openSetup}>{savedAttempt}</ImatLanding>}
      {selection && <ConfirmDialog wide title={t('instructions')} action={t('startTest')} onConfirm={start} onClose={() => { setSelection(null); setError(false) }}>
        <ExamInstructions format={selectedFormat} />
        {selectedPaper?.scoringNotice && <p lang="en" className="rounded-lg border border-action/30 bg-tint p-3 text-secondary-text">{selectedPaper.scoringNotice}</p>}
        {attempt && <p className="font-medium text-error">{t('replaceWarning')}</p>}
        {error && <p role="alert" className="text-error">{t('startError')}</p>}
      </ConfirmDialog>}
    </main>
  )
}
