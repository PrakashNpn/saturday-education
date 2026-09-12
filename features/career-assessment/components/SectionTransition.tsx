'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CheckCircle2 } from 'lucide-react'

interface Props {
  onContinue: () => void
  to: 'personality' | 'aptitude' // which section is coming up next
}

// No reference for this screen in the design — the batch-fill shortcut on
// their preview skips straight past it. Built to the same language as the
// rest of the flow: the question card's shell, the modal's tone-coded badge
// circles, the same button.
export function SectionTransition({ onContinue, to }: Props) {
  const t = useTranslations(`careerAssessment.${to === 'aptitude' ? 'transitionAptitude' : 'transition'}`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-2xl rounded-md border border-stroke bg-white p-6 text-center shadow-xs sm:p-8"
    >
      <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-dark-green/10 text-dark-green">
        <CheckCircle2 size={28} />
      </div>
      <h2 className="text-xl font-bold text-primary-text sm:text-2xl">{t('title')}</h2>
      <p className="mt-2 text-body text-secondary-text">{t('subtitle')}</p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-8 inline-flex min-h-13 cursor-pointer items-center justify-center rounded-full bg-action px-10 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
      >
        {t('continue')}
      </button>
    </motion.div>
  )
}
