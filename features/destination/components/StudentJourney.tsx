import { getTranslations } from 'next-intl/server'
import type { CountryProcessStepData } from '../types'

interface Props {
  steps: CountryProcessStepData[]
}

export async function StudentJourney({ steps }: Props) {
  const t = await getTranslations('destinations')

  if (steps.length === 0) return null

  return (
    <div>
      {/* Section header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          {t('process')}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{t('journeyTitle')}</h2>
        <p className="text-gray-500 text-sm md:text-base">{t('journeySubtitle')}</p>
      </div>

      <div className="relative">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1
          return (
            <div key={step.id} className="flex gap-5">
              {/* Number circle + connector line */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-brand-purple ring-4 ring-brand-purple/15 flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-white text-sm font-bold">{step.stepNumber}</span>
                </div>
                {!isLast && <div className="w-0.5 flex-1 bg-brand-purple/40 my-1" />}
              </div>
              {/* Content card */}
              <div className={`${isLast ? 'pb-0' : 'pb-6'} flex-1`}>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-neutral-900 mb-1">{step.title}</h3>
                  {step.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
