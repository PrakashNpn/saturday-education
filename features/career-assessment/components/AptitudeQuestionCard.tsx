'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ChevronLeft, Check } from 'lucide-react'
import type { McqFlowQuestion } from '../data/allQuestions'

interface Props {
  question: McqFlowQuestion
  questionNumber: number
  areaLabel: string
  value?: number
  canGoBack: boolean
  onSelect: (index: number) => void
  onBack: () => void
}

export function AptitudeQuestionCard({ question, questionNumber, areaLabel, value, canGoBack, onSelect, onBack }: Props) {
  const t = useTranslations('careerAssessment.question')
  const hasSvgOptions = Array.isArray(question.optionsSvg) && question.optionsSvg.length > 0
  const count = question.options.length

  // Keyboard: 1–n to pick, Backspace / ← to go back.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key >= '1' && e.key <= String(count)) {
        onSelect(Number(e.key) - 1)
      } else if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && canGoBack) {
        e.preventDefault()
        onBack()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count, canGoBack, onSelect, onBack])

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -28 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-2xl"
    >
      <div className="rounded-3xl border border-gray-100 bg-white/95 px-6 py-7 shadow-[0_22px_60px_-25px_rgba(89,13,130,0.25)] backdrop-blur-sm sm:px-9">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-brand-purple-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-purple">
            {areaLabel}
          </span>
          <span className="text-xs font-semibold text-gray-400">Q{questionNumber}</span>
        </div>

        {question.svg && (
          <div
            className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50"
            dangerouslySetInnerHTML={{ __html: question.svg }}
          />
        )}

        <h2 className="text-lg font-bold leading-snug text-neutral-900 sm:text-xl">{question.text}</h2>

        {hasSvgOptions ? (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {question.optionsSvg!.map((svg, i) => {
              const selected = value === i
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={question.options[i]}
                  onClick={() => onSelect(i)}
                  className={[
                    'group relative flex flex-col items-center gap-2 rounded-2xl border bg-white p-3 transition-all duration-150',
                    selected
                      ? 'border-brand-purple bg-brand-purple-50 ring-1 ring-brand-purple'
                      : 'border-gray-200 hover:-translate-y-0.5 hover:border-brand-purple/40 hover:shadow-md',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold',
                      selected ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-500',
                    ].join(' ')}
                  >
                    {selected ? <Check size={12} strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="flex h-20 w-20 items-center justify-center" dangerouslySetInnerHTML={{ __html: svg }} />
                </button>
              )
            })}
          </div>
        ) : (
          <div className="mt-5 space-y-2.5">
            {question.options.map((opt, i) => {
              const selected = value === i
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelect(i)}
                  className={[
                    'group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150',
                    selected
                      ? 'border-brand-purple bg-brand-purple-50 ring-1 ring-brand-purple'
                      : 'border-gray-200 bg-white hover:-translate-y-0.5 hover:border-brand-purple/40 hover:shadow-md',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                      selected ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-brand-purple-100 group-hover:text-brand-purple',
                    ].join(' ')}
                  >
                    {selected ? <Check size={14} strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="text-sm font-medium text-neutral-900">{opt}</span>
                </button>
              )
            })}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-brand-purple"
            >
              <ChevronLeft size={16} />
              {t('back')}
            </button>
          ) : (
            <span />
          )}
          <span className="text-[11px] text-gray-400">{t('tipMcq', { count })}</span>
        </div>
      </div>
    </motion.div>
  )
}
