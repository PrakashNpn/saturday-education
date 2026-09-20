'use client'

import { useTranslations } from 'next-intl'
import type { QuestionScale } from '../data/allQuestions'

interface Props {
  scale: QuestionScale
  value?: number
  onSelect: (value: number) => void
}

const VALUES = [1, 2, 3, 4, 5]

const OPTION = 'group flex flex-col items-center justify-center rounded-xl border p-3.5 text-center transition-all cursor-pointer sm:p-4'
const OPTION_IDLE = 'border-stroke bg-white shadow-2xs hover:-translate-y-0.5 hover:border-action/40 hover:bg-tint/20'
const OPTION_SELECTED = 'border-action bg-tint/60 ring-2 ring-action/20 scale-[1.02]'
const BADGE = 'mb-2.5 flex size-9 items-center justify-center rounded-full text-label font-bold transition-colors'
const BADGE_IDLE = 'bg-surface-0 text-secondary-text group-hover:bg-action group-hover:text-white'
const BADGE_SELECTED = 'bg-action text-white shadow-xs'
const LABEL = 'text-min leading-tight font-medium'
const LABEL_IDLE = 'text-secondary-text group-hover:text-primary-text'
const LABEL_SELECTED = 'font-semibold text-action'

export function LikertScale({ scale, value, onSelect }: Props) {
  const t = useTranslations('careerAssessment.likert')

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5 sm:gap-3">
      {VALUES.map((v) => {
        const selected = value === v
        return (
          <button
            key={v}
            type="button"
            onClick={() => onSelect(v)}
            className={`${OPTION} ${selected ? OPTION_SELECTED : OPTION_IDLE}`}
          >
            <span className={`${BADGE} ${selected ? BADGE_SELECTED : BADGE_IDLE}`}>{v}</span>
            <span className={`${LABEL} ${selected ? LABEL_SELECTED : LABEL_IDLE}`}>{t(`${scale}${v}`)}</span>
          </button>
        )
      })}
    </div>
  )
}
