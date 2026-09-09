'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Premium "researching" state: a shimmering skeleton in the SHAPE of the real
// report, so the wait previews the result and morphs cleanly into it rather than
// rearranging when the data lands. Every block below sits at the same size and
// position as its counterpart in ModalBody.
const STEPS = [
  'Scanning labour-market signals',
  'Projecting demand over the next decade',
  'Mapping the skills that matter',
  'Compiling the outlook',
]

/** Six bars, matching the six points a derived horizon always returns. */
const BAR_HEIGHTS = [42, 58, 50, 70, 62, 82]

function Block({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <div className={`rounded-sm bg-stroke ${className}`} style={style} />
}

function SkillRows({ rows }: { rows: number }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex items-center gap-2.5">
          <Block className="h-2.5 w-4 shrink-0" />
          <Block className="h-2.5 flex-1" style={{ maxWidth: `${88 - r * 9}%` }} />
        </div>
      ))}
    </div>
  )
}

function PanelHead() {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <Block className="h-3 w-40" />
      <Block className="h-5 w-24 rounded-full" />
    </div>
  )
}

export function CareerOutlookResearching({ query }: { query: string }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS.length), 1500)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* top progress bar — eases up and stalls near the end */}
      <motion.div
        className="absolute top-0 left-0 z-20 h-0.5 bg-gradient-to-r from-action to-brand-purple-light"
        initial={{ width: '6%' }}
        animate={{ width: '90%' }}
        transition={{ duration: 9, ease: 'easeOut' }}
      />

      <div className="space-y-5 p-6 sm:p-7">
        {/* Header — sits exactly where the title, summary and chips will land. */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tint px-2 py-0.5 text-min font-medium tracking-wider text-action uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-action" />
            Researching
          </span>
          <h2 className="mt-1.5 truncate pr-10 text-title leading-tight font-medium tracking-tight text-primary-text capitalize">
            {query}
          </h2>

          {/* The cycling step stands in for the summary line. */}
          <div className="mt-1.5 flex h-6 items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-body font-normal text-secondary-text"
              >
                {STEPS[step]}…
              </motion.p>
            </AnimatePresence>
          </div>

          <Block className="mt-2 h-3 w-2/3" />

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Block className="h-5 w-36 rounded-[4px]" />
            <Block className="h-5 w-28 rounded-[4px]" />
          </div>
        </div>

        <div className="grid animate-pulse items-stretch gap-5 lg:grid-cols-2">
          <div className="flex h-full flex-col overflow-hidden rounded-sm border border-stroke bg-surface shadow-xs">
            <div className="grid grid-cols-[0.85fr_1.2fr_1.25fr] divide-x divide-stroke border-b border-stroke">
              {[0, 1, 2].map((i) => (
                <div key={i} className="p-3 sm:p-3.5">
                  <Block className="mb-1.5 h-2.5 w-16" />
                  <Block className="h-3.5 w-20" />
                </div>
              ))}
            </div>

            <div className="flex flex-1 flex-col justify-between bg-[#fafafa] p-5 sm:p-5.5">
              <div>
                <Block className="h-4 w-56" />
                <Block className="mt-2 h-3 w-full" />
                <Block className="mt-1.5 h-3 w-2/3" />
              </div>

              <div className="mt-4">
                {/* Bars plot upward on the real chart's geometry, so they settle
                    into place instead of resizing when the data arrives. */}
                <div className="flex h-32 items-end justify-between gap-2 border-b border-stroke pt-3 sm:h-36 sm:gap-3">
                  {BAR_HEIGHTS.map((h, i) => (
                    <div key={i} className="flex h-full flex-1 flex-col items-center justify-end">
                      <motion.div
                        className="w-full max-w-[38px] rounded-t-[3px] bg-action/15"
                        animate={{ height: [`${h * 0.45}%`, `${h}%`, `${h * 0.7}%`] }}
                        transition={{
                          duration: 1.7,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.12,
                        }}
                      />
                      <Block className="mt-2 h-2.5 w-8" />
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <Block className="h-2.5 w-40" />
                  <Block className="h-2.5 w-24" />
                </div>
                <div className="mt-3.5 border-t border-stroke/70 pt-2.5">
                  <Block className="h-2.5 w-full" />
                  <Block className="mt-1.5 h-2.5 w-1/3" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col divide-y divide-stroke overflow-hidden rounded-sm border border-stroke bg-surface shadow-xs">
            <div className="bg-tint/20 p-5 sm:p-5.5">
              <PanelHead />
              <SkillRows rows={3} />
            </div>
            <div className="p-5 sm:p-5.5">
              <PanelHead />
              <SkillRows rows={5} />
            </div>
          </div>
        </div>

        <div className="flex animate-pulse flex-col gap-4 border-t border-stroke pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl flex-1">
            <Block className="h-4 w-72" />
            <Block className="mt-2 h-3 w-full max-w-md" />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Block className="h-10 w-40 rounded-full" />
            <Block className="h-3 w-28" />
          </div>
        </div>
      </div>

      {/* diagonal shimmer sweep across the whole skeleton */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent"
        style={{ width: '40%' }}
        animate={{ x: ['-60%', '320%'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
