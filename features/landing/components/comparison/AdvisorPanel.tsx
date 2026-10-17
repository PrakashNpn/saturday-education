'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { stripDashes } from '@/shared/utils/dashes'
import { EASE, type AdvisorResult } from './shared'

function SparkleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-3.5">
      <path d="M8 1.5 9.2 5.3 13 6.5 9.2 7.7 8 11.5 6.8 7.7 3 6.5l3.8-1.2L8 1.5ZM13 10l.6 1.9L15.5 12.5l-1.9.6L13 15l-.6-1.9-1.9-.6 1.9-.6L13 10Z" />
    </svg>
  )
}

/** Loading state for the advisor panel. Sits on the teal panel, so the bars
 *  are white at low alpha rather than the grey the shared Skeleton uses. */
function AdvisorSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <div className="flex flex-col gap-2">
        <div className="h-5 w-11/12 animate-pulse rounded-sm bg-white/25" />
        <div className="h-5 w-3/5 animate-pulse rounded-sm bg-white/25" />
      </div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex gap-3">
          <div className="size-6 shrink-0 animate-pulse rounded-full bg-white/25" />
          <div className="flex w-full flex-col gap-2">
            <div className="h-4 w-2/5 animate-pulse rounded-sm bg-white/25" />
            <div className="h-3 w-full animate-pulse rounded-sm bg-white/15" />
            <div className="h-3 w-5/6 animate-pulse rounded-sm bg-white/15" />
          </div>
        </div>
      ))}
    </div>
  )
}

/** The slide-in panel with the AI advisor's comparison: a backdrop, then the dialog
 *  with a loading state, an error with retry, or the verdict and three questions. */
export function AdvisorPanel({
  open,
  loading,
  failed,
  result,
  onClose,
  onRetry,
}: {
  open: boolean
  loading: boolean
  failed: boolean
  result: AdvisorResult | null
  onClose: () => void
  onRetry: () => void
}) {
  const t = useTranslations('Landing.comparisonTool')
  const prefersReducedMotion = useReducedMotion()

  // Same stagger pattern for the advisor panel's verdict, its numbered
  // questions, and the disclaimer: each mounts fresh when a result arrives
  // (the loading branch unmounts this block in between), so a plain
  // initial/animate pair is enough, no AnimatePresence needed here.
  const advisorContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  }
  const advisorItem = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: EASE },
    },
  }

  return (
    <>
      {/* Both fixed to the viewport, not absolute within this section: the
          dialog used inset-y-0 against the section before, so its height
          and position depended on where this section happened to be
          scrolled to, and on top of that it tied on z-index with the
          navbar's own `sticky z-20` (shared/components/layout/Navbar.tsx),
          losing that tie by DOM order and painting over it. Fixed
          positioning anchors both to the viewport regardless of scroll. The
          desktop panel starts at top-16, below the navbar's own measured
          height, rather than overlapping it and relying on z-index to lose
          gracefully: the navbar stays reachable while the panel is open,
          the way a page-level nav should. z-10 keeps both comfortably above
          ordinary page content without needing to outrank the navbar. */}
      <button
        type="button"
        aria-label={t('advisorCloseBackdrop')}
        onClick={onClose}
        className={`fixed inset-0 z-10 bg-primary-text/40 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('advisorDialogLabel')}
        className={`fixed top-16 right-0 bottom-0 z-10 flex w-full max-w-[560px] flex-col overflow-y-auto rounded-l-[28px] bg-[linear-gradient(165deg,#177E8D_0%,#177E8D_55%,#00333A_100%)] p-6 text-white transition-transform duration-300 ease-out will-change-transform max-tablet:inset-x-0 max-tablet:inset-y-auto max-tablet:bottom-0 max-tablet:max-h-[85vh] max-tablet:max-w-none max-tablet:rounded-t-[28px] max-tablet:rounded-l-none ${
          open ? 'translate-x-0 max-tablet:translate-y-0' : 'translate-x-full max-tablet:translate-x-0 max-tablet:translate-y-full'
        }`}
      >
        {/* Same liquid-glass family as the rest of the page, just inverted:
            a soft white highlight on the gradient instead of a teal wash
            on white. Positioned (it's absolute), so the real content below
            needs its own z-index to paint above it rather than behind it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_25%_0%,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_60%)]"
        />

        <div className="relative z-[1] mb-4 flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-min font-medium text-brand">
            <SparkleIcon />
            {t('advisorBadge')}
          </span>
          <button
            type="button"
            aria-label={t('advisorClose')}
            onClick={onClose}
            className="cursor-pointer text-white/70 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5">
              <path
                d="M5 5l10 10M15 5 5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="relative z-[1]" aria-live="polite" aria-busy={loading}>
          {loading && (
            <>
              <p className="mb-6 text-lede font-medium text-white/70">
                {t('advisorLoading')}
                <span className="animate-pulse">...</span>
              </p>
              <AdvisorSkeleton />
            </>
          )}

          {!loading && failed && (
            <div>
              <p className="mb-4 text-lede font-medium text-white">{t('advisorError')}</p>
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full bg-white px-6 text-label font-medium text-brand transition-colors hover:bg-white/90"
              >
                {t('advisorRetry')}
              </button>
            </div>
          )}

          {!loading && !failed && result && (
            <motion.div initial="hidden" animate="visible" variants={advisorContainer}>
              <motion.p variants={advisorItem} className="mb-6 text-lede font-medium text-white">
                {stripDashes(result.verdict)}
              </motion.p>

              <ol className="flex flex-col gap-5">
                {result.questions.map((item, index) => (
                  <motion.li key={item.q} variants={advisorItem} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-min font-medium text-brand shadow-[0_4px_10px_-2px_rgba(0,51,58,0.3)]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="mb-1 text-label font-medium text-white">{stripDashes(item.q)}</p>
                      <p className="text-label font-normal text-white/80">{stripDashes(item.a)}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>

              <motion.p variants={advisorItem} className="mt-6 text-min text-white/60">
                {t('advisorDisclaimer')}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
