'use client'

import { useTranslations } from 'next-intl'
import { TOTAL_QUESTIONS } from '../data/allQuestions'

interface Props {
  answeredCount: number
  onResume: () => void
  onRestart: () => void
}

/** Offered rather than forced: dropping someone straight back into question 117
 *  with no explanation is disorienting, and they may well want a clean run. */
export function ResumeBanner({ answeredCount, onResume, onRestart }: Props) {
  const t = useTranslations('careerAssessment.intro')

  return (
    <div className="border-b border-action/20 bg-tint">
      <div className="mx-auto flex max-w-wrap flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-card font-medium text-primary-text">{t('resumeTitle')}</p>
          <p className="mt-0.5 text-label font-normal text-secondary-text">
            {t('resumeBody', { answered: answeredCount, total: TOTAL_QUESTIONS })}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onResume}
            className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
          >
            {t('resumeCta')}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="cursor-pointer text-label font-medium text-secondary-text underline-offset-2 transition-colors hover:text-primary-text hover:underline"
          >
            {t('resumeRestart')}
          </button>
        </div>
      </div>
    </div>
  )
}
