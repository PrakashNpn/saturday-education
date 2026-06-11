'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { QuestionScale } from '../data/allQuestions'

interface Props {
  scale: QuestionScale
  value?: number
  onSelect: (value: number) => void
}

const VALUES = [1, 2, 3, 4, 5]

// Diverging palette: rose (disagree) → grey (neutral) → brand purple (agree).
// `c` = circle fill, `fg` = number text, `accent` = saturated emphasis (selected border/ring).
const PALETTE = [
  { c: '#E11D48', fg: '#FFFFFF', accent: '#E11D48' }, // 1 · Strongly disagree
  { c: '#FECDD3', fg: '#9F1239', accent: '#FB7185' }, // 2 · Disagree
  { c: '#E5E7EB', fg: '#4B5563', accent: '#9CA3AF' }, // 3 · Neutral
  { c: '#E8CCFF', fg: '#6D1A91', accent: '#9D5BB8' }, // 4 · Agree
  { c: '#590D82', fg: '#FFFFFF', accent: '#590D82' }, // 5 · Strongly agree
]

export function LikertScale({ scale, value, onSelect }: Props) {
  const t = useTranslations('careerAssessment.likert')

  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3">
      {VALUES.map((v, i) => {
        const selected = value === v
        const p = PALETTE[i]
        return (
          <motion.button
            key={v}
            type="button"
            onClick={() => onSelect(v)}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: selected ? 1.04 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            style={{ ['--c']: p.c, ['--fg']: p.fg, ['--accent']: p.accent } as React.CSSProperties}
            className={[
              'group relative flex flex-col items-center justify-center gap-2 rounded-2xl border bg-white px-1.5 py-5 text-center transition-colors duration-150',
              selected
                ? 'border-[var(--accent)] ring-1 ring-[var(--accent)] shadow-md'
                : 'border-gray-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md',
            ].join(' ')}
          >
            <span
              className={[
                'flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors duration-150',
                selected
                  ? 'bg-[var(--c)] text-[var(--fg)]'
                  : 'bg-gray-100 text-gray-500 group-hover:bg-[var(--c)] group-hover:text-[var(--fg)]',
              ].join(' ')}
            >
              {v}
            </span>
            <span
              className={[
                'text-[11px] leading-tight sm:text-xs',
                selected ? 'font-semibold text-neutral-800' : 'text-gray-500',
              ].join(' ')}
            >
              {t(`${scale}${v}`)}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
