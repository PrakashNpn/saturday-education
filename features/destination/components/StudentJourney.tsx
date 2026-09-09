import { getTranslations } from 'next-intl/server'
import type { CountryProcessStepData } from '../types'

interface Props {
  steps: CountryProcessStepData[]
}

export async function StudentJourney({ steps }: Props) {
  const t = await getTranslations('destinations')

  if (steps.length === 0) return null

  return (
    <>
      <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
        {t('process')}
      </h2>
      <p className="mb-8 max-w-[52ch] text-section font-medium">{t('journeyTitle')}</p>

      {/* The design hangs the dashed rail inside the <ol>; it lives on this
          wrapper instead, which has the same box but keeps the list valid. It
          stops 16px short at each end so it runs between badge centres. */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute top-4 bottom-4 left-4 border-l-2 border-dashed border-stroke-strong"
        />

        <ol className="relative flex flex-col gap-8">
          {steps.map((step) => (
            <li key={step.id} className="relative flex gap-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-action text-label font-medium text-white">
                {step.stepNumber}
              </span>
              <div>
                <b className="mb-1 block text-body font-medium text-primary-text">{step.title}</b>
                {step.description && (
                  <p className="max-w-[58ch] text-label leading-relaxed font-normal text-secondary-text">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
