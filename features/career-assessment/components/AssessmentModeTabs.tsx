'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/shared/utils/cn'

export type AssessmentMode = 'outlook' | 'assessment'

interface Props {
  mode: AssessmentMode
  onChange: (mode: AssessmentMode) => void
}

const TAB =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] border px-2.5 py-1.5 text-min whitespace-nowrap transition-colors duration-150 sm:gap-2 sm:px-4 sm:text-label'
const TAB_ON = 'border-transparent bg-white font-medium text-primary-text shadow-xs'
const TAB_OFF = 'border-white/15 bg-white/10 font-medium text-white hover:bg-white/20'

const BADGE = 'rounded-[3px] px-1.5 py-0.5 text-min font-medium transition-colors duration-150 sm:px-2'
const BADGE_ON = 'bg-tint text-action'
const BADGE_OFF = 'bg-white/20 text-white'

/** Sits directly under the site header, which is 62px tall, so the two stack
 *  without a gap when the page scrolls. */
export function AssessmentModeTabs({ mode, onChange }: Props) {
  const t = useTranslations('careerAssessment.modes')

  const tabs = [
    { id: 'outlook', short: t('outlookShort'), long: t('outlook'), badge: t('outlookBadge') },
    { id: 'assessment', short: t('assessmentShort'), long: t('assessment'), badge: t('assessmentBadge') },
  ] as const

  return (
    <div className="sticky top-[62px] z-30 border-b border-white/10 bg-[oklch(20%_0.10_307.4)] py-2.5 text-white shadow-xs backdrop-blur-md">
      <div className="mx-auto flex max-w-wrap items-center justify-center px-6">
        <div className="inline-flex items-center gap-1 rounded-sm border border-white/20 bg-black/40 p-1 shadow-inner">
          {tabs.map((tab) => {
            const active = mode === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(tab.id)}
                className={cn(TAB, active ? TAB_ON : TAB_OFF)}
              >
                {/* Two labels rather than one truncated: the short form keeps
                    both tabs on a single row on a phone. */}
                <span className="sm:hidden">{tab.short}</span>
                <span className="hidden sm:inline">{tab.long}</span>
                <span className={cn(BADGE, active ? BADGE_ON : BADGE_OFF)}>{tab.badge}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
