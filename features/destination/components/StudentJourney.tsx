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
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">{t('journeyTitle')}</h2>
      <div className="relative">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1
          return (
            <div key={step.id} className="flex gap-5">
              {/* Number circle + connector line */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-brand-purple flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-white text-sm font-bold">{step.stepNumber}</span>
                </div>
                {!isLast && <div className="w-0.5 flex-1 bg-brand-purple/20 my-1" />}
              </div>
              {/* Content */}
              <div className={`${isLast ? 'pb-0' : 'pb-8'} flex-1`}>
                <p className="text-xs font-semibold tracking-wider uppercase text-brand-purple/70 mb-1">
                  {t('step', { number: step.stepNumber })}
                </p>
                <h3 className="font-bold text-neutral-900 mb-1">{step.title}</h3>
                {step.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
