'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'
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

const SVG_OPTION = 'group relative flex flex-col items-center gap-2 rounded-xl border bg-white p-3 transition-all cursor-pointer'
const SVG_OPTION_IDLE = 'border-stroke hover:-translate-y-0.5 hover:border-action/40 hover:bg-tint/20'
const SVG_OPTION_SELECTED = 'border-action bg-tint/60 ring-2 ring-action/20'
const SVG_BADGE = 'absolute left-2 top-2 flex size-5 items-center justify-center rounded-full text-min font-bold'
const SVG_BADGE_IDLE = 'bg-surface-0 text-secondary-text'
const SVG_BADGE_SELECTED = 'bg-action text-white'

const TEXT_OPTION = 'group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all cursor-pointer'
const TEXT_OPTION_IDLE = 'border-stroke bg-white hover:-translate-y-0.5 hover:border-action/40 hover:bg-tint/20'
const TEXT_OPTION_SELECTED = 'border-action bg-tint/60 ring-2 ring-action/20'
const TEXT_BADGE = 'flex size-7 shrink-0 items-center justify-center rounded-full text-min font-bold transition-colors'
const TEXT_BADGE_IDLE = 'bg-surface-0 text-secondary-text group-hover:bg-action group-hover:text-white'
const TEXT_BADGE_SELECTED = 'bg-action text-white'

export function AptitudeQuestionCard({
  question,
  questionNumber,
  areaLabel,
  value,
  canGoBack,
  onSelect,
  onBack,
}: Props) {
  const t = useTranslations('careerAssessment.question')
  const hasSvgOptions = Array.isArray(question.optionsSvg) && question.optionsSvg.length > 0
  const count = question.options.length

  // Keyboard: 1–n to pick, Backspace / ← to go back. No visible back button,
  // matching QuestionScreen — see the note there.
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
      className="mx-auto w-full max-w-2xl rounded-md border border-stroke bg-white p-6 shadow-xs sm:p-8"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-tint px-3 py-1 text-min font-semibold text-action">
          Q{questionNumber}
        </span>
        <span className="text-min text-muted-text">{areaLabel}</span>
      </div>

      {question.svg && (
        <div
          className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-xl border border-stroke bg-surface-0"
          dangerouslySetInnerHTML={{ __html: question.svg }}
        />
      )}

      <h2 className="mb-8 text-xl leading-snug font-bold text-primary-text sm:text-2xl">{question.text}</h2>

      {hasSvgOptions ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {question.optionsSvg!.map((svg, i) => {
            const selected = value === i
            return (
              <button
                key={i}
                type="button"
                aria-label={question.options[i]}
                onClick={() => onSelect(i)}
                className={`${SVG_OPTION} ${selected ? SVG_OPTION_SELECTED : SVG_OPTION_IDLE}`}
              >
                <span className={`${SVG_BADGE} ${selected ? SVG_BADGE_SELECTED : SVG_BADGE_IDLE}`}>
                  {selected ? <Check size={12} strokeWidth={3} /> : i + 1}
                </span>
                <span className="flex h-20 w-20 items-center justify-center" dangerouslySetInnerHTML={{ __html: svg }} />
              </button>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2.5">
          {question.options.map((opt, i) => {
            const selected = value === i
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                className={`${TEXT_OPTION} ${selected ? TEXT_OPTION_SELECTED : TEXT_OPTION_IDLE}`}
              >
                <span className={`${TEXT_BADGE} ${selected ? TEXT_BADGE_SELECTED : TEXT_BADGE_IDLE}`}>
                  {selected ? <Check size={14} strokeWidth={3} /> : i + 1}
                </span>
                <span className="text-label font-medium text-primary-text">{opt}</span>
              </button>
            )
          })}
        </div>
      )}

      <p className="mt-8 text-center text-min text-muted-text">{t('tipMcq', { count })}</p>
    </motion.div>
  )
}
