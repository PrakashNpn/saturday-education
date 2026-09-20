'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CloudOff, RefreshCw } from 'lucide-react'

/**
 * Shown only when every submit attempt failed. The student's answers are already in
 * localStorage, so nothing is lost: this screen exists to reassure them and offer a retry
 * that resends the stored payload. It never sends them back to re-enter the form.
 */
export function SubmissionSavedScreen({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations('careerAssessment.saved')

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-sm rounded-md border border-stroke bg-surface p-6 text-center shadow-xs sm:p-8"
    >
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-tint text-action">
        <CloudOff size={22} />
      </div>

      <h2 className="text-xl font-bold text-primary-text sm:text-2xl">{t('title')}</h2>
      <p className="mt-2 text-label leading-relaxed text-muted-text">{t('body')}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-action text-body font-medium text-white transition-colors hover:bg-action-hover"
      >
        <RefreshCw size={15} />
        {t('retry')}
      </button>

      <p className="mt-3 text-min text-muted-text">{t('hint')}</p>
    </motion.div>
  )
}
