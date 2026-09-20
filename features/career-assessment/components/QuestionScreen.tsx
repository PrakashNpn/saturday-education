'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { LikertFlowQuestion } from '../data/allQuestions'
import { LikertScale } from './LikertScale'

interface Props {
  question: LikertFlowQuestion
  questionNumber: number // 1-based across all questions
  sectionNumber: number // 1, 2 or 3 — which of the three parts this sits in
  value?: number
  canGoBack: boolean
  onSelect: (value: number) => void
  onBack: () => void
}

const TOTAL_SECTIONS = 3

export function QuestionScreen({
  question,
  questionNumber,
  sectionNumber,
  value,
  canGoBack,
  onSelect,
  onBack,
}: Props) {
  const t = useTranslations('careerAssessment.question')

  // Keyboard: 1–5 answers, Backspace / ← goes back. The design has no visible
  // back button — only the tip line below the options — so this is the only
  // way to revisit a previous answer.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key >= '1' && e.key <= '5') {
        onSelect(Number(e.key))
      } else if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && canGoBack) {
        e.preventDefault()
        onBack()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onSelect, onBack, canGoBack])

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -28 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-2xl rounded-md border border-stroke bg-white p-6 shadow-xs sm:p-8"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-tint px-3 py-1 text-min font-semibold text-action">
          Q{questionNumber}
        </span>
        <span className="text-min text-muted-text">
          {t('sectionOf', { current: sectionNumber, total: TOTAL_SECTIONS })}
        </span>
      </div>

      <h2 className="mb-2 text-xl leading-snug font-bold text-primary-text sm:text-2xl">{question.text}</h2>
      <p className="mb-1 text-body font-medium text-secondary-text">
        {question.scale === 'like' ? t('promptLike') : t('promptAgree')}
      </p>
      <p className="mb-8 text-label text-muted-text">{t('helper')}</p>

      <LikertScale scale={question.scale} value={value} onSelect={onSelect} />

      <p className="mt-8 text-center text-min text-muted-text">{t('tipMcq', { count: 5 })}</p>
    </motion.div>
  )
}
