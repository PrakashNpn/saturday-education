'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { RIASEC_COUNT, TOTAL_QUESTIONS } from '../data/allQuestions'
import { useAssessment } from '../hooks/useAssessment'
import { useNavigationGuard } from '../hooks/useNavigationGuard'
import { submitCareerAssessment } from '../services/careerLeadService'
import type { ContactDetails } from '../types'
import { CareerDiscoveryIntro } from './CareerDiscoveryIntro'
import { PreparingScreen } from './PreparingScreen'
import { QuestionScreen } from './QuestionScreen'
import { ProgressBar } from './ProgressBar'
import { SectionTransition } from './SectionTransition'
import { ContactForm } from './ContactForm'
import { SubmittingScreen } from './SubmittingScreen'
import { ThankYouScreen } from './ThankYouScreen'

type Phase = 'intro' | 'preparing' | 'questions' | 'transition' | 'contact' | 'submitting' | 'thankyou'

const ADVANCE_DELAY = 220
const PREPARE_MS = 2000

export function AssessmentFlow() {
  const t = useTranslations('careerAssessment.sections')
  const tc = useTranslations('careerAssessment')
  const { questions, answers, index, setAnswer, goNext, goBack, reset, start, autofill } = useAssessment()

  const [phase, setPhase] = useState<Phase>('intro')
  const [transitionDone, setTransitionDone] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const inProgress = phase === 'questions' || phase === 'transition' || phase === 'contact'

  // Warn before leaving while in progress: refresh / tab close (beforeunload)…
  useEffect(() => {
    if (!inProgress) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [inProgress])

  // …and in-app nav (nav-link clicks, Back/Forward).
  useNavigationGuard(inProgress, tc('leaveConfirm'))

  // "Preparing your assessment" → first question after a short beat.
  useEffect(() => {
    if (phase !== 'preparing') return
    const id = window.setTimeout(() => setPhase('questions'), PREPARE_MS)
    return () => window.clearTimeout(id)
  }, [phase])

  const handleSelect = useCallback(
    (value: number) => {
      const q = questions[index]
      if (!q) return
      setAnswer(q.id, value)

      window.setTimeout(() => {
        if (index === RIASEC_COUNT - 1) {
          goNext()
          if (!transitionDone) setPhase('transition')
        } else if (index === TOTAL_QUESTIONS - 1) {
          goNext()
          setPhase('contact')
        } else {
          goNext()
        }
      }, ADVANCE_DELAY)
    },
    [index, questions, setAnswer, goNext, transitionDone],
  )

  const handleSubmit = useCallback(
    async (contact: ContactDetails) => {
      setServerError(null)
      setPhase('submitting')
      const result = await submitCareerAssessment(contact, answers)
      if (result.success) {
        reset()
        setPhase('thankyou')
      } else {
        setServerError(result.error ?? 'Something went wrong. Please try again.')
        setPhase('contact')
      }
    },
    [answers, reset],
  )

  const handleStart = useCallback(() => {
    start() // fresh shuffled order + cleared answers
    setTransitionDone(false)
    setPhase('preparing')
  }, [start])

  const handleAutofill = useCallback(() => {
    autofill()
    setTransitionDone(true)
    setPhase('contact')
  }, [autofill])

  const question = questions[Math.min(index, TOTAL_QUESTIONS - 1)]
  const isRiasec = question?.section === 'riasec'
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
              sectionLabel={isRiasec ? t('riasecTitle') : t('bigfiveTitle')}
              boundary={RIASEC_COUNT / TOTAL_QUESTIONS}
            />
          </div>
        </div>
      )}

      {/* Phase content */}
      <div className="relative flex flex-1 items-center justify-center px-4 py-8">
        <div className="mx-auto w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {phase === 'intro' && (
              <CareerDiscoveryIntro key="intro" onStart={handleStart} onAutofill={handleAutofill} />
            )}

            {phase === 'preparing' && <PreparingScreen key="preparing" />}

            {phase === 'questions' && question && (
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

            {phase === 'transition' && (
              <SectionTransition
                key="transition"
                onContinue={() => {
                  setTransitionDone(true)
                  setPhase('questions')
                }}
              />
            )}

            {phase === 'contact' && (
              <ContactForm key="contact" onSubmit={handleSubmit} serverError={serverError} />
            )}

            {phase === 'submitting' && <SubmittingScreen key="submitting" />}

            {phase === 'thankyou' && <ThankYouScreen key="thankyou" />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
