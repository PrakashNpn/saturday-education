'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'

// Premium "researching" state: a shimmering skeleton in the SHAPE of the real
// report (so the wait previews the result and morphs cleanly into it), with an
// on-theme scanning badge, a cycling research step, a sweeping shimmer, and a
// top progress bar that eases toward ~90%.
const STEPS = [
  'Scanning labour-market signals',
  'Projecting demand over the next decade',
  'Mapping the skills that matter',
  'Compiling the outlook',
]

const BAR_HEIGHTS = [42, 58, 50, 70, 62, 82]

function Block({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <div className={`rounded-md bg-gray-200/80 ${className}`} style={style} />
}

export function CareerOutlookResearching({ query }: { query: string }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS.length), 1500)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative max-h-[92dvh] overflow-hidden sm:max-h-[88dvh]">
      {/* top progress bar — eases up and stalls near the end */}
      <motion.div
        className="absolute left-0 top-0 z-20 h-0.5 bg-gradient-to-r from-brand-purple to-brand-purple-light"
        initial={{ width: '6%' }}
        animate={{ width: '90%' }}
        transition={{ duration: 9, ease: 'easeOut' }}
      />

      {/* Header — mirrors the real field-tinted band; the scanning badge becomes
          the field medallion once data lands. */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-brand-purple-50 to-white p-5 sm:p-6">
        <div className="flex items-start gap-3 pr-8">
          <div className="relative h-12 w-12 flex-shrink-0">
            <motion.span
              className="absolute inset-0 rounded-2xl border-2 border-dashed border-brand-purple/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              className="absolute inset-0 rounded-2xl bg-brand-purple/25"
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
            <span className="absolute inset-1 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple-dark to-brand-purple-light text-white shadow-md shadow-brand-purple/30">
              <Search size={20} />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-purple">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-purple" />
              Researching
            </span>
            <h2 className="mt-1.5 truncate text-xl font-extrabold capitalize leading-tight text-neutral-900 sm:text-2xl">
              {query}
            </h2>
          </div>
        </div>

        {/* cycling research step (sits where the summary will be) */}
        <div className="mt-3 flex h-5 items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-gray-500"
            >
              {STEPS[step]}…
            </motion.p>
          </AnimatePresence>
        </div>

        {/* 3 stat cells */}
        <div className="mt-4 grid grid-cols-3 divide-x divide-gray-100 overflow-hidden rounded-xl border border-gray-100 bg-white/70">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 px-3 py-3">
              <Block className="h-2 w-10" />
              <Block className="h-3.5 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Body skeleton */}
      <div className="animate-pulse space-y-5 p-5 sm:p-6">
        {/* outlook: gauge + plotting bars */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <Block className="h-3 w-32" />
            <Block className="h-5 w-20 rounded-full" />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-[86px] w-[86px] flex-shrink-0 rounded-full border-[9px] border-gray-200/80" />
            <div className="min-w-0 flex-1">
              <Block className="mb-3 h-6 w-28" />
              {/* chart bars that animate up, like data being plotted */}
              <div className="flex h-24 items-end gap-1.5">
                {BAR_HEIGHTS.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-full flex-1 rounded-t-md bg-brand-purple/15"
                    animate={{ height: [`${h * 0.45}%`, `${h}%`, `${h * 0.7}%`] }}
                    transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
                  />
                ))}
              </div>
            </div>
          </div>
          <Block className="mt-4 h-3 w-full" />
          <Block className="mt-2 h-3 w-2/3" />
        </div>

        {/* skills: two cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {[0, 1].map((c) => (
            <div key={c} className="rounded-xl border border-gray-100 p-3.5">
              <Block className="mb-3 h-2.5 w-24" />
              <div className="space-y-2.5">
                {[0, 1, 2, 3].map((r) => (
                  <div key={r} className="flex items-center gap-2">
                    <Block className="h-4 w-4 flex-shrink-0 rounded-full" />
                    <Block className="h-2.5 flex-1" style={{ maxWidth: `${70 - r * 8}%` }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
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
