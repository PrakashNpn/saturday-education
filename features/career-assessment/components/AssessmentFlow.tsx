'use client'

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { RIASEC_COUNT, PERSONALITY_END, TOTAL_QUESTIONS } from '../data/allQuestions'
import { APTITUDE_AREA_LABELS } from '../data/aptitudeQuestions'
import { useAssessment } from '../hooks/useAssessment'
import { useNavigationGuard } from '../hooks/useNavigationGuard'
import { submitAssessment } from '../services/careerLeadService'
import { savePending, readPending, clearPending } from '../services/pendingSubmission'
import {
  clearProgress,
  invalidateProgressSnapshot,
  subscribeProgress,
  getProgressSnapshot,
  getProgressServerSnapshot,
} from '../services/assessmentProgress'
import type { AnswerMap, ContactDetails, DashboardData, SubmitResult } from '../types'
import { CareerDiscoveryIntro } from './CareerDiscoveryIntro'
import { CareerOutlookExplorer } from './CareerOutlookExplorer'
import { AssessmentModeTabs, type AssessmentMode } from './AssessmentModeTabs'
import { ReportShowcase } from './ReportShowcase'
import { AssessmentMethod } from './AssessmentMethod'
import { AssessmentFinalCta } from './AssessmentFinalCta'
import { BeforeYouBeginModal } from './BeforeYouBeginModal'
import { AssessmentChrome } from './AssessmentChrome'
import { ExitTestButton } from './ExitTestButton'
import { ShareButton } from './ShareButton'
import { SegmentedProgressBar } from './SegmentedProgressBar'
import { QuestionScreen } from './QuestionScreen'
import { AptitudeQuestionCard } from './AptitudeQuestionCard'
import { SectionTransition } from './SectionTransition'
import { ContactForm } from './ContactForm'
import { SubmittingScreen } from './SubmittingScreen'
import { SubmissionSavedScreen } from './SubmissionSavedScreen'
import { ResultsDashboard } from './ResultsDashboard'

type Phase =
  | 'intro'
  | 'questions'
  | 'transition'
  | 'contact'
  | 'submitting'
  | 'saved'
  | 'dashboard'
type NextSection = 'personality' | 'aptitude'

const ADVANCE_DELAY = 220

/** Question count per part, for the segmented progress bar. */
const SECTION_SIZES = [RIASEC_COUNT, PERSONALITY_END - RIASEC_COUNT, TOTAL_QUESTIONS - PERSONALITY_END] as const

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
  const { questions, answers, index, setAnswer, goNext, goBack, reset, start, resume, autofill } =
    useAssessment()

  const [phase, setPhase] = useState<Phase>('intro')
  // Which of the two landing modes the tabs are showing. Only meaningful while
  // the flow is on the intro; once the questions start there is one path.
  const [mode, setMode] = useState<AssessmentMode>('assessment')

  // localStorage is not available on the server, so the store hands React a
  // null server snapshot and the real value after hydration.
  const saved = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getProgressServerSnapshot,
  )
  const [transitionTo, setTransitionTo] = useState<NextSection>('personality')
  const [shown, setShown] = useState<Set<NextSection>>(new Set())
  const [serverError, setServerError] = useState<string | null>(null)
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [leadId, setLeadId] = useState<string | null>(null)
  const [beginModalOpen, setBeginModalOpen] = useState(false)
  // Guards the resume-on-mount effect so it can only fire once per page load.
  const resumedRef = useRef(false)

  const inProgress = phase === 'questions' || phase === 'transition' || phase === 'contact'

  // No beforeunload prompt any more: a refresh or a closed tab costs nothing now
  // that answers autosave, and warning about a loss that cannot happen is worse
  // than not warning at all. The in-app guard stays, because clicking a nav link
  // still drops you out of the flow, even though the answers survive.
  useNavigationGuard(inProgress, tc('leaveConfirm'))

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
        clearProgress()
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

  // Every "Start Assessment" button opens the gate rather than starting
  // directly; the real start happens in handleConfirmStart.
  const handleStart = useCallback(() => {
    setBeginModalOpen(true)
  }, [])

  // Memoized rather than inline: the modal's Escape-key listener is keyed to
  // this reference in a useEffect, and an inline arrow here would give it a
  // new identity on every AssessmentFlow render — tearing down and
  // re-attaching a document-level listener that often, and dropping an
  // Escape press that happens to land in that gap.
  const closeBeginModal = useCallback(() => setBeginModalOpen(false), [])

  const handleConfirmStart = useCallback(
    () => {
      setBeginModalOpen(false)
      start() // fresh shuffled order + cleared answers
      setShown(new Set())
      setPhase('questions')
    },
    [start],
  )

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
  const sectionNumber = question ? (question.section === 'riasec' ? 1 : question.section === 'bigfive' ? 2 : 3) : 1
  const showHeader = phase === 'questions' || phase === 'transition'

  // Exiting deliberately (the header button) is different from navigating
  // away by accident: it always returns to the intro rather than closing the
  // tab, and the run is already autosaved, so there is nothing to clear. The
  // intro's `saved` value is still the page-load snapshot from before any of
  // this run's answers existed, though, so without invalidating it here the
  // CTA would keep showing "Start Assessment Now" until an actual reload.
  const handleExit = useCallback(() => {
    invalidateProgressSnapshot()
    setPhase('intro')
  }, [])

  // The landing is full-bleed and sits on its own sections, so it returns
  // before the centred shell the answering phases use. No entrance animation:
  // this is the page's main content, and an opacity-0 initial would leave it
  // invisible if the JS never arrives.
  const handleResume = () => {
    if (!saved) return
    resume(saved)
    setPhase('questions')
  }

  const handleRestart = () => {
    clearProgress()
  }

  if (phase === 'intro') {
    return (
      <div className="bg-canvas">
        <AssessmentModeTabs mode={mode} onChange={setMode} />

        {mode === 'assessment' ? (
          <>
            {/* A saved run swaps the hero's own CTA into a resume state
                (see CareerDiscoveryIntro) rather than a banner stacked above
                it, so the designed layout never shifts down for it. */}
            <CareerDiscoveryIntro
              onStart={handleStart}
              onAutofill={handleAutofill}
              resumeCount={saved?.answeredCount}
              onResume={handleResume}
              onRestart={handleRestart}
            />
            <ReportShowcase onStart={handleStart} />
            <AssessmentMethod onStart={handleStart} />
            <AssessmentFinalCta onStart={handleStart} />
          </>
        ) : (
          <CareerOutlookExplorer onStart={handleStart} />
        )}

        <BeforeYouBeginModal
          open={beginModalOpen}
          onClose={closeBeginModal}
          onStart={handleConfirmStart}
        />
      </div>
    )
  }

  return (
    <AssessmentChrome
      headerRight={
        phase === 'dashboard' ? (
          dashboard &&
          leadId && (
            <div className="flex items-center gap-2">
              <ShareButton dashboard={dashboard} leadId={leadId} />
              <button
                type="button"
                onClick={handleExit}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-action px-4 py-1.5 text-min font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover sm:text-label"
              >
                {tc('chrome.finish')}
              </button>
            </div>
          )
        ) : (
          <ExitTestButton onExit={handleExit} />
        )
      }
    >
      {/* Progress header (only while answering) */}
      {showHeader && (
        <SegmentedProgressBar
          current={Math.min(index + 1, TOTAL_QUESTIONS)}
          total={TOTAL_QUESTIONS}
          sectionLabel={sectionLabel}
          sectionSizes={SECTION_SIZES}
        />
      )}

      {/* Phase content */}
      <div className={`flex flex-1 justify-center px-4 pt-10 pb-12`}>
        <div className={`w-full ${phase === 'dashboard' ? 'max-w-wrap px-6' : 'max-w-3xl'}`}>
          <AnimatePresence mode="wait">
            {phase === 'questions' && question && question.kind === 'likert' && (
              <QuestionScreen
                key={`q-${question.id}`}
                question={question}
                questionNumber={index + 1}
                sectionNumber={sectionNumber}
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
    </AssessmentChrome>
  )
}
