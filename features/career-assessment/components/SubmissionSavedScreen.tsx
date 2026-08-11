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
      className="mx-auto w-full max-w-sm"
    >
      <div className="rounded-3xl border border-gray-100 bg-white/95 px-7 py-8 text-center shadow-[0_24px_70px_-20px_rgba(89,13,130,0.22)] backdrop-blur-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-purple-50 text-brand-purple">
          <CloudOff size={22} />
        </div>

        <h2 className="text-lg font-bold text-neutral-900">{t('title')}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">{t('body')}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-purple/30 active:translate-y-0 active:scale-[0.98]"
        >
          <RefreshCw size={15} />
          {t('retry')}
        </button>

        <p className="mt-3 text-xs text-gray-400">{t('hint')}</p>
      </div>
    </motion.div>
  )
}
