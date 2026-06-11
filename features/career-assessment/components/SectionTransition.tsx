'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CheckCircle2 } from 'lucide-react'

interface Props {
  onContinue: () => void
}

export function SectionTransition({ onContinue }: Props) {
  const t = useTranslations('careerAssessment.transition')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-md text-center"
    >
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple-50 text-brand-purple">
        <CheckCircle2 size={34} />
      </div>
      <h2 className="text-2xl font-bold text-neutral-900">{t('title')}</h2>
      <p className="mt-2 text-gray-500">{t('subtitle')}</p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-6 rounded-full bg-brand-purple px-8 py-3 font-semibold text-white transition-colors hover:bg-brand-purple-dark"
      >
        {t('continue')}
      </button>
    </motion.div>
  )
}
