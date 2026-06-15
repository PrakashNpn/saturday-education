'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Sparkles, Check, Loader2 } from 'lucide-react'

const STEP_KEYS = ['step1', 'step2', 'step3', 'step4', 'step5']
const STEP_MS = 1300

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
      className="mx-auto w-full max-w-sm"
    >
      <div className="rounded-3xl border border-gray-100 bg-white/95 px-7 py-8 shadow-[0_24px_70px_-20px_rgba(89,13,130,0.22)] backdrop-blur-sm">
        {/* Header */}
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="relative mb-3 h-12 w-12">
            <motion.div
              className="absolute inset-0 rounded-2xl bg-brand-purple/30 blur-md"
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple-dark to-brand-purple-light text-white shadow-lg shadow-brand-purple/30">
              <Sparkles size={22} />
            </div>
          </div>
          <h2 className="text-lg font-bold text-neutral-900">{t('title')}</h2>
          <p className="mt-1 text-xs text-gray-400">{t('subtitle')}</p>
        </div>

        {/* Steps */}
        <ul className="relative">
          {STEP_KEYS.map((key, idx) => {
            const status = idx < active ? 'done' : idx === active ? 'active' : 'pending'
            const isLast = idx === STEP_KEYS.length - 1
            return (
              <li key={key} className="relative flex items-start gap-3 pb-4 last:pb-0">
                {/* connecting line */}
                {!isLast && (
                  <span
                    className={[
                      'absolute left-4 top-8 bottom-0 w-px -translate-x-1/2 transition-colors duration-300',
                      idx < active ? 'bg-brand-purple' : 'bg-gray-200',
                    ].join(' ')}
                  />
                )}
                {/* status circle */}
                <span
                  className={[
                    'relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                    status === 'done'
                      ? 'bg-brand-purple text-white'
                      : status === 'active'
                        ? 'bg-brand-purple-50 text-brand-purple'
                        : 'bg-gray-100 text-gray-300',
                  ].join(' ')}
                >
                  {status === 'done' ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    >
                      <Check size={15} strokeWidth={3} />
                    </motion.span>
                  ) : status === 'active' ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  )}
                </span>
                {/* label */}
                <span
                  className={[
                    'pt-1.5 text-sm transition-colors duration-300',
                    status === 'active'
                      ? 'font-semibold text-neutral-900'
                      : status === 'done'
                        ? 'text-gray-500'
                        : 'text-gray-400',
                  ].join(' ')}
                >
                  {t(`steps.${key}`)}
                </span>
              </li>
            )
          })}
        </ul>

        {/* Progress bar */}
        <div className="mt-7 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light"
            initial={{ width: '6%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
