'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { CheckCheck, Clock3, Flag, ListChecks } from 'lucide-react'
import type { ExamFormat } from '../types'
import { InstructionColumns } from '@/shared/components/practice-test/PracticeDialog'

export function ExamInstructions({ format }: { format: ExamFormat }) {
  const t = useTranslations('imat')
  const number = useFormatter()
  const count = format.sections.reduce((sum, section) => sum + section.count, 0)
  return <InstructionColumns overview={<>
      <dl className="grid grid-cols-2 gap-4 border-b border-stroke pb-4">
        {[{ label: 'setup.questions', value: count, Icon: ListChecks }, { label: 'setup.duration', value: format.minutes, Icon: Clock3 }].map(({ label, value, Icon }) => <div key={label}>
          <dt className="flex items-center gap-1.5 text-min text-muted-text"><Icon className="size-4 text-action" aria-hidden="true" />{t(label)}</dt>
          <dd className="mt-2 text-section font-semibold leading-none tabular-nums text-deep">{number.number(value)}</dd>
          {label === 'setup.duration' && <p className="mt-1 text-min text-muted-text">{t('landing.minutesLabel')}</p>}
        </div>)}
      </dl>
      <h3 className="mt-4 text-label font-semibold text-primary-text">{t('setup.scoring')}</h3>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[{ label: 'correct', value: format.correct }, { label: 'incorrect', value: format.incorrect }, { label: 'setup.blank', value: 0 }].map(({ label, value }) => <div key={label} className="rounded-lg border border-stroke bg-surface px-1 py-2">
          <p className={`font-semibold tabular-nums ${value > 0 ? 'text-action' : 'text-primary-text'}`}>{value > 0 ? '+' : ''}{number.number(value)}</p>
          <p className="mt-1 break-words text-min text-muted-text">{t(label)}</p>
        </div>)}
      </div>
      <p className="mt-3 text-min text-muted-text">{t('setup.maximumScore')}: {number.number(count * format.correct)}</p>
    </>}>
      <h3 className="text-label font-semibold text-primary-text">{t('startGuide.title')}</h3>
      <ul className="mt-4 space-y-4">
        {[{ key: 'navigation', Icon: Flag }, { key: 'timing', Icon: Clock3 }, { key: 'results', Icon: CheckCheck }].map(({ key, Icon }) => <li key={key} className="flex items-start gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-tint text-action"><Icon className="size-3.5" aria-hidden="true" /></span>
          <span className="text-label leading-relaxed">{t(`startGuide.${key}`)}</span>
        </li>)}
      </ul>
  </InstructionColumns>
}
