'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ComparisonUniversity } from '@/features/landing/services/comparison-service'
import { useComparisonAdvisor } from '../hooks/useComparisonAdvisor'
import { AdvisorPanel } from './comparison/AdvisorPanel'
import { UniversityDetails } from './comparison/UniversityDetails'
import { UniversityPicker } from './comparison/UniversityPicker'
import { EASE } from './comparison/shared'

interface Props {
  universities: ComparisonUniversity[]
}

export default function ComparisonToolSection({ universities }: Props) {
  const t = useTranslations('Landing.comparisonTool')

  const [leftId, setLeftId] = useState(universities[0]?.id ?? '')
  const [rightId, setRightId] = useState(universities[1]?.id ?? '')
  const [showUsd, setShowUsd] = useState(false)
  const advisor = useComparisonAdvisor(universities, leftId, rightId)
  const prefersReducedMotion = useReducedMotion()

  // Orchestrates UniversityDetails's own child blocks (see its `item`
  // variant): this container has no visible motion of its own, it only
  // staggers when each child's hidden -> visible transition starts.
  const detailsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  }

  const left = universities.find((u) => u.id === leftId) ?? universities[0]
  const right = universities.find((u) => u.id === rightId) ?? universities[1]

  if (!left || !right) return null

  return (
    <section className="relative overflow-hidden border-t border-stroke bg-surface-0 py-10 max-tablet:py-8">
      <div className="mx-auto max-w-wrap px-6">
        <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          {t('eyebrow')}
        </h2>
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <p className="max-w-[52ch] text-section font-medium">{t('headline')}</p>
          <button
            type="button"
            onClick={advisor.openAdvisor}
            className="inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
          >
            {t('askAdvisor')}
          </button>
        </div>

        {/* One shared glass panel, search fields included: they used to sit
            in their own row above the panel, on the section's flat grey
            background, which gave them nothing to actually look like glass
            against and left them reading as a separate, plainer element
            bolted on top. Folding them into the panel's own first row means
            they sit on the same wash and blur as everything below, and the
            vertical divider line now runs the full height of the panel
            instead of starting partway down it. */}
        <div className="relative overflow-hidden rounded-[28px] border border-stroke bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,51,58,0.04)] backdrop-blur-md">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(23,126,141,0.07)_0%,rgba(23,126,141,0)_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-7 bottom-7 left-1/2 z-[1] hidden w-px bg-[linear-gradient(180deg,rgba(23,126,141,0)_0%,rgba(23,126,141,0.35)_50%,rgba(23,126,141,0)_100%)] md:block"
          />
          <span className="absolute top-1/2 left-1/2 z-[2] hidden size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-stroke bg-surface text-label font-bold text-action shadow-[0_10px_24px_-8px_rgba(0,51,58,0.3)] md:grid">
            {t('vs')}
          </span>

          <div className="relative z-[1] grid md:grid-cols-2">
            <div className="relative border-b border-stroke p-6 md:border-b-0 md:p-7">
              <UniversityPicker
                label={t('compareUni1')}
                universities={universities}
                selectedId={leftId}
                onSelect={setLeftId}
              />
              <div className="relative mt-5 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={left.id}
                    initial="hidden"
                    animate="visible"
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, transition: { duration: 0.2, ease: EASE } }}
                    variants={detailsContainer}
                  >
                    <UniversityDetails
                      university={left}
                      showUsd={showUsd}
                      onToggleCurrency={() => setShowUsd((v) => !v)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Mobile fallback for the line + badge above: centred on this
                  half's own bottom border via translate-y-1/2, the same
                  overlap technique the Services step badges use, rather than
                  on 50% of the stacked pair's combined (and uneven) height. */}
              <span className="absolute bottom-0 left-1/2 z-[2] grid size-9 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border border-stroke bg-surface text-min font-bold text-action shadow-[0_6px_16px_-6px_rgba(0,51,58,0.3)] md:hidden">
                {t('vs')}
              </span>
            </div>
            <div className="p-6 md:p-7">
              <UniversityPicker
                label={t('compareUni2')}
                universities={universities}
                selectedId={rightId}
                onSelect={setRightId}
              />
              <div className="relative mt-5 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={right.id}
                    initial="hidden"
                    animate="visible"
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, transition: { duration: 0.2, ease: EASE } }}
                    variants={detailsContainer}
                  >
                    <UniversityDetails
                      university={right}
                      showUsd={showUsd}
                      onToggleCurrency={() => setShowUsd((v) => !v)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdvisorPanel
        open={advisor.open}
        loading={advisor.loading}
        failed={advisor.failed}
        result={advisor.result}
        onClose={advisor.close}
        onRetry={advisor.retry}
      />
    </section>
  )
}
