'use client'

import { motion } from 'framer-motion'

interface Props {
  current: number // 1-based question number
  total: number
  sectionLabel?: string
  boundaries?: number[] // 0–1 positions of the section splits
}

export function ProgressBar({ current, total, sectionLabel, boundaries }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round((current / total) * 100)))
  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
        {sectionLabel ? (
          <span className="truncate font-semibold uppercase tracking-wider text-brand-purple">{sectionLabel}</span>
        ) : (
          <span className="font-medium text-gray-500">{pct}%</span>
        )}
        <span className="whitespace-nowrap font-medium text-gray-500">
          {pct}% · {current} / {total}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        />
        {boundaries
          ?.filter((b) => b > 0 && b < 1)
          .map((b, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-[2px] bg-white/70"
              style={{ left: `${b * 100}%` }}
              aria-hidden
            />
          ))}
      </div>
    </div>
  )
}
