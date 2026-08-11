'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { RIASEC_COUNT, PERSONALITY_END, TOTAL_QUESTIONS } from '../data/allQuestions'
import { APTITUDE_AREA_LABELS } from '../data/aptitudeQuestions'
import { useAssessment } from '../hooks/useAssessment'
import { useNavigationGuard } from '../hooks/useNavigationGuard'
import { submitAssessment } from '../services/careerLeadService'
import { savePending, readPending, clearPending } from '../services/pendingSubmission'
import type { AnswerMap, ContactDetails, DashboardData, SubmitResult } from '../types'
import { CareerDiscoveryIntro } from './CareerDiscoveryIntro'
import { CareerOutlookExplorer } from './CareerOutlookExplorer'
import { PreparingScreen } from './PreparingScreen'
import { QuestionScreen } from './QuestionScreen'
import { AptitudeQuestionCard } from './AptitudeQuestionCard'
import { ProgressBar } from './ProgressBar'
import { SectionTransition } from './SectionTransition'
import { ContactForm } from './ContactForm'
import { SubmittingScreen } from './SubmittingScreen'
import { SubmissionSavedScreen } from './SubmissionSavedScreen'
import { ResultsDashboard } from './ResultsDashboard'

type Phase =
  | 'intro'
  | 'preparing'
  | 'questions'
  | 'transition'
  | 'contact'
  | 'submitting'
  | 'saved'
  | 'dashboard'
type NextSection = 'personality' | 'aptitude'

const ADVANCE_DELAY = 220
const PREPARE_MS = 2000

/** Wait before each attempt. The first is immediate; the rest give a flaky mobile
 *  connection time to come back before we give up on it. */
const RETRY_DELAYS_MS = [0, 2000, 5000]

/** The server now answers in ~1-2s. Without a floor the submitting screen flashes past
 *  before its steps finish, which reads as a glitch rather than as work being done. Long
 *  enough for the five steps (5 x STEP_MS) to complete, plus a beat on the last one. */
const MIN_SUBMITTING_MS = 2400

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * Submit, retrying transient failures silently.
 *
 * A rejected promise here means the request never completed — the connection dropped, the
 * tab was suspended, the network flickered. Those are worth retrying and usually succeed
 * within seconds. A resolved `{ success: false }` is a real validation failure from the
 * server, so it is returned immediately rather than retried.
 */
async function submitWithRetry(contact: ContactDetails, answers: AnswerMap): Promise<SubmitResult> {
  let lastError: unknown = null

  for (const delay of RETRY_DELAYS_MS) {
    if (delay) await sleep(delay)
    try {
      return await submitAssessment(contact, answers)
    } catch (error) {
      lastError = error
      console.error('Assessment submit attempt failed, will retry if attempts remain:', error)
    }
  }

  console.error('Assessment submit failed after all retries:', lastError)
  return { success: false, error: 'network' }
}

export function AssessmentFlow() {
  const t = useTranslations('careerAssessment.sections')
  const tc = useTranslations('careerAssessment')
  const { questions, answers, index, setAnswer, goNext, goBack, reset, start, autofill } = useAssessment()

  const [phase, setPhase] = useState<Phase>('intro')
  const [transitionTo, setTransitionTo] = useState<NextSection>('personality')
  const [shown, setShown] = useState<Set<NextSection>>(new Set())
  const [serverError, setServerError] = useState<string | null>(null)
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [leadId, setLeadId] = useState<string | null>(null)
  // Guards the resume-on-mount effect so it can only fire once per page load.
  const resumedRef = useRef(false)

  const inProgress = phase === 'questions' || phase === 'transition' || phase === 'contact'

  // Warn before leaving while in progress: refresh / tab close…
  useEffect(() => {
    if (!inProgress) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [inProgress])

  useNavigationGuard(inProgress, tc('leaveConfirm'))

  // "Preparing" → first question after a short beat.
  useEffect(() => {
    if (phase !== 'preparing') return
    const id = window.setTimeout(() => setPhase('questions'), PREPARE_MS)
    return () => window.clearTimeout(id)
  }, [phase])

  const openTransition = useCallback((to: NextSection) => {
    setTransitionTo(to)
    setPhase('transition')
  }, [])

  const handleSelect = useCallback(
    (value: number) => {
      const q = questions[index]
      if (!q) return
      setAnswer(q.id, value)

      window.setTimeout(() => {
        if (index === RIASEC_COUNT - 1) {
          goNext()
          if (!shown.has('personality')) openTransition('personality')
        } else if (index === PERSONALITY_END - 1) {
          goNext()
          if (!shown.has('aptitude')) openTransition('aptitude')
        } else if (index === TOTAL_QUESTIONS - 1) {
          goNext()
          setPhase('contact')
        } else {
          goNext()
        }
      }, ADVANCE_DELAY)
    },
    [index, questions, setAnswer, goNext, shown, openTransition],
  )

  /** Shared by a fresh submit and by resuming a stored one. */
  const runSubmit = useCallback(
    async (contact: ContactDetails, submissionAnswers: AnswerMap) => {
      setServerError(null)
      setPhase('submitting')

      // Persist before the first attempt so the work survives even if this page does not.
      savePending(contact, submissionAnswers)

      // Hold the submitting screen for at least MIN_SUBMITTING_MS so its steps play out,
      // without adding any delay when the request genuinely takes longer than that.
      const [result] = await Promise.all([
        submitWithRetry(contact, submissionAnswers),
        sleep(MIN_SUBMITTING_MS),
      ])

      if (result.success) {
        clearPending()
        setDashboard(result.dashboard ?? null)
        setLeadId(result.leadId ?? null)
        reset()
        setPhase('dashboard')
        return
      }

      // Network failure after every retry: the answers are safely stored, so offer to
      // finish rather than sending them back to re-enter anything.
      if (result.error === 'network') {
        setPhase('saved')
        return
      }

      // A genuine validation error from the server — the form can fix it.
      setServerError(result.error ?? tc('submitError'))
      setPhase('contact')
    },
    [reset, tc],
  )

  const handleSubmit = useCallback(
    (contact: ContactDetails) => runSubmit(contact, answers),
    [answers, runSubmit],
  )

  /** Retry button on the "answers saved" screen. */
  const handleResumePending = useCallback(() => {
    const pending = readPending()
    if (!pending) {
      setPhase('contact')
      return
    }
    void runSubmit(pending.contact, pending.answers)
  }, [runSubmit])

  // A previous visit submitted but never got confirmation — finish it automatically.
  // Deferred to a timeout so the page paints first (and so state is not set synchronously
  // inside the effect body), then the submitting screen takes over.
  useEffect(() => {
    if (resumedRef.current) return
    resumedRef.current = true
    const pending = readPending()
    if (!pending) return
    const id = window.setTimeout(() => void runSubmit(pending.contact, pending.answers), 0)
    return () => window.clearTimeout(id)
  }, [runSubmit])

  const handleStart = useCallback(() => {
    start() // fresh shuffled order + cleared answers
    setShown(new Set())
    setPhase('preparing')
  }, [start])

  const handleAutofill = useCallback(() => {
    autofill()
    setShown(new Set<NextSection>(['personality', 'aptitude']))
    setPhase('contact')
  }, [autofill])

  const question = questions[Math.min(index, TOTAL_QUESTIONS - 1)]
  const sectionLabel = question
    ? question.section === 'riasec'
      ? t('riasecTitle')
      : question.section === 'bigfive'
        ? t('bigfiveTitle')
        : t('aptitudeTitle')
    : ''
  const showHeader = phase === 'questions' || phase === 'transition'

  return (
    <section className="relative flex min-h-[calc(100dvh-72px)] flex-col bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
      {/* Ambient background (shared by all phases) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-brand-purple/10 blur-3xl" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-accent-gold/10 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-72 w-72 rounded-full bg-brand-purple-light/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(#590D82 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
      </div>

      {/* Sticky progress header (only while answering) */}
      {showHeader && (
        <div className="sticky top-[72px] z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
          <div className="mx-auto w-full max-w-2xl px-4 py-3">
            <ProgressBar
              current={Math.min(index + 1, TOTAL_QUESTIONS)}
              total={TOTAL_QUESTIONS}
              sectionLabel={sectionLabel}
              boundaries={[RIASEC_COUNT / TOTAL_QUESTIONS, PERSONALITY_END / TOTAL_QUESTIONS]}
            />
          </div>
        </div>
      )}

      {/* Phase content */}
      <div className={`relative flex flex-1 ${phase === 'dashboard' ? 'items-start' : 'items-center'} justify-center px-4 py-6`}>
        <div className={`mx-auto w-full ${phase === 'dashboard' ? 'max-w-6xl' : phase === 'intro' ? 'max-w-5xl' : 'max-w-3xl'}`}>
          <AnimatePresence mode="wait">
            {phase === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_24px_70px_-20px_rgba(89,13,130,0.22)]"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="p-5 sm:p-7">
                    <CareerDiscoveryIntro bare onStart={handleStart} onAutofill={handleAutofill} />
                  </div>
                  <div className="border-t border-gray-100 bg-gradient-to-br from-brand-purple-50/80 via-brand-purple-50/30 to-white p-5 sm:p-7 lg:border-l lg:border-t-0">
                    <CareerOutlookExplorer bare />
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'preparing' && <PreparingScreen key="preparing" />}

            {phase === 'questions' && question && question.kind === 'likert' && (
              <QuestionScreen
                key={`q-${question.id}`}
                question={question}
                questionNumber={index + 1}
                value={answers[question.id]}
                canGoBack={index > 0}
                onSelect={handleSelect}
                onBack={goBack}
              />
            )}

            {phase === 'questions' && question && question.kind === 'mcq' && (
              <AptitudeQuestionCard
                key={`q-${question.id}`}
                question={question}
                questionNumber={index + 1}
                areaLabel={APTITUDE_AREA_LABELS[question.area]}
                value={answers[question.id]}
                canGoBack={index > 0}
                onSelect={handleSelect}
                onBack={goBack}
              />
            )}

            {phase === 'transition' && (
              <SectionTransition
                key={`transition-${transitionTo}`}
                to={transitionTo}
                onContinue={() => {
                  setShown((prev) => new Set(prev).add(transitionTo))
                  setPhase('questions')
                }}
              />
            )}

            {phase === 'contact' && (
              <ContactForm key="contact" onSubmit={handleSubmit} serverError={serverError} />
            )}

            {phase === 'submitting' && <SubmittingScreen key="submitting" />}

            {phase === 'saved' && <SubmissionSavedScreen key="saved" onRetry={handleResumePending} />}

            {phase === 'dashboard' && dashboard && (
              <ResultsDashboard key="dashboard" dashboard={dashboard} leadId={leadId} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
