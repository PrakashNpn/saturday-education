'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ChevronLeft } from 'lucide-react'
import type { LikertFlowQuestion } from '../data/allQuestions'
import { LikertScale } from './LikertScale'

interface Props {
  question: LikertFlowQuestion
  questionNumber: number // 1-based across all questions
  value?: number
  canGoBack: boolean
  onSelect: (value: number) => void
  onBack: () => void
}

export function QuestionScreen({ question, questionNumber, value, canGoBack, onSelect, onBack }: Props) {
  const t = useTranslations('careerAssessment.question')

  // Keyboard: 1–5 answers, Backspace / ← goes back.
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
    <div className="mx-auto w-full max-w-2xl">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -28 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl border border-gray-100 bg-white/95 p-7 shadow-[0_22px_60px_-25px_rgba(89,13,130,0.25)] backdrop-blur-sm sm:p-9"
      >
        <span className="inline-flex items-center rounded-full bg-brand-purple-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-purple">
          Q{questionNumber}
        </span>
        <p className="mt-4 text-xl font-bold leading-snug text-neutral-900 sm:text-2xl">{question.text}</p>

        <div className="mb-6 mt-2">
          <p className="text-sm font-medium text-gray-600">
            {question.scale === 'like' ? t('promptLike') : t('promptAgree')}
          </p>
          <p className="mt-0.5 text-xs text-gray-400">{t('helper')}</p>
        </div>

        <LikertScale scale={question.scale} value={value} onSelect={onSelect} />
      </motion.div>

      <div className="mt-4 flex items-center justify-between px-1">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-brand-purple"
          >
            <ChevronLeft size={16} />
            {t('back')}
          </button>
        ) : (
          <span />
        )}
        <span className="hidden text-[11px] text-gray-400 sm:inline">Tip: press 1–5 on your keyboard</span>
      </div>
    </div>
  )
}
