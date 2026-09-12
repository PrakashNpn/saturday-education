'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Sparkle, Check } from 'lucide-react'

const STEP_KEYS = ['step1', 'step2', 'step3', 'step4', 'step5']
// The submit used to take 30-90s, so the steps crawled. Now that the counsellor pipeline
// runs in the background the server answers in ~1-2s, so the steps are paced to complete
// within the minimum display time enforced in AssessmentFlow (MIN_SUBMITTING_MS).
const STEP_MS = 420

export function SubmittingScreen() {
  const t = useTranslations('careerAssessment.submitting')
  const [active, setActive] = useState(0)

  // Advance through the real pipeline steps; hold on the last one while the
  // server action is still running (it unmounts this screen when it resolves).
  useEffect(() => {
    const id = window.setInterval(
      () => setActive((p) => Math.min(p + 1, STEP_KEYS.length - 1)),
      STEP_MS,
    )
    return () => window.clearInterval(id)
  }, [])

  const progress = ((active + 0.5) / STEP_KEYS.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-lg rounded-md border border-stroke bg-white p-6 text-center shadow-xs sm:p-8"
    >
      <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-action text-white shadow-2xs">
        <Sparkle size={22} />
      </div>
      <h2 className="mb-1 text-xl font-bold text-primary-text sm:text-2xl">{t('title')}</h2>
      <p className="mb-8 text-label text-muted-text">{t('subtitle')}</p>

      <div className="mx-auto mb-8 max-w-xs space-y-4 text-left">
        {STEP_KEYS.map((key, idx) => {
          const status = idx < active ? 'done' : idx === active ? 'active' : 'pending'
          return (
            <div key={key} className="flex items-center gap-3">
              {status === 'done' ? (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-action text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
              ) : status === 'active' ? (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-action/30 bg-tint">
                  <span className="size-2 animate-ping rounded-full bg-action" />
                </span>
              ) : (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-stroke-strong bg-surface-0">
                  <span className="size-1.5 rounded-full bg-disabled-text" />
                </span>
              )}
              <span
                className={
                  status === 'active'
                    ? 'text-label font-medium text-action'
                    : status === 'done'
                      ? 'text-label font-normal text-primary-text'
                      : 'text-label font-light text-disabled-text'
                }
              >
                {t(`steps.${key}`)}
              </span>
            </div>
          )
        })}
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-action"
          initial={{ width: '6%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
