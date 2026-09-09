'use client'

import { useTranslations } from 'next-intl'
import { RIASEC_COUNT, PERSONALITY_END, TOTAL_QUESTIONS } from '../data/allQuestions'

interface Props {
  onStart: () => void
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className="size-3.5 shrink-0 text-secondary-text"
    >
      <circle cx="12" cy="13" r="7.5" strokeWidth="1.8" />
      <path
        d="M12 9.5v3.5l2.5 1.5M12 5.5V2.5M9.5 2.5h5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AssessmentMethod({ onStart }: Props) {
  const t = useTranslations('careerAssessment.method')

  // Read straight off the question banks so these can never drift from the
  // assessment people actually sit. The design's mock split them 60/60/30;
  // ours is 60/50/40.
  const steps = [
    { n: 1, count: RIASEC_COUNT, key: 'step1' },
    { n: 2, count: PERSONALITY_END - RIASEC_COUNT, key: 'step2' },
    { n: 3, count: TOTAL_QUESTIONS - PERSONALITY_END, key: 'step3' },
  ]

  return (
    <section className="relative z-0 overflow-hidden border-b border-stroke bg-surface-0 pt-16 pb-0 max-tablet:pt-12">
      <div className="mx-auto mb-16 max-w-wrap px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Second on a phone so the argument leads and the detail follows. */}
          <div className="order-2 lg:order-1">
            <div className="relative flex max-w-[500px] flex-col gap-4">
              {steps.map((step, index) => (
                <div key={step.key} className="relative flex items-center gap-4">
                  {/* Each row but the last draws the connector down to the next,
                      starting at its own badge centre. */}
                  {index < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-[15px] z-0 h-[calc(100%+1rem)] border-l-2 border-dashed border-stroke-strong"
                    />
                  )}

                  <span className="z-10 grid size-8 shrink-0 place-items-center rounded-full border border-stroke bg-surface-2 text-label font-medium text-secondary-text shadow-2xs">
                    {step.n}
                  </span>

                  <div className="flex-1 rounded-sm border-2 border-stroke bg-surface p-4 shadow-2xs transition-colors hover:border-stroke-strong">
                    <h3 className="mb-2 text-card leading-snug font-medium text-action">
                      {t(`${step.key}Title`)}
                    </h3>
                    <p className="mb-3 text-label leading-relaxed font-normal text-secondary-text">
                      {t(`${step.key}Body`)}
                    </p>

                    <div className="flex items-center justify-between gap-3 border-t border-stroke pt-2.5 text-min text-secondary-text">
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap">
                          {t('questionCount', { count: step.count })}
                        </span>
                        <span className="hidden text-stroke-strong sm:inline">|</span>
                        <span className="hidden font-normal sm:inline">
                          {t(`${step.key}Framework`)}
                        </span>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-stroke bg-surface-0 px-2.5 py-0.5 text-min font-medium whitespace-nowrap text-secondary-text">
                        <ClockIcon />
                        {t(`${step.key}Time`)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* The desktop CTA lives in the right column, which stacks below the
                steps on a phone; this one keeps the action next to them. */}
            <div className="mt-8 lg:hidden">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-16 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover max-tablet:w-full"
              >
                {t('cta')}
              </button>
            </div>
          </div>

          <div className="order-1 text-left lg:order-2">
            <div>
              <span className="mb-3 block text-min font-medium tracking-[0.06em] text-secondary-text uppercase">
                {t('eyebrow')}
              </span>
              <h2 className="text-section leading-tight font-medium tracking-tight text-primary-text sm:text-title">
                {t('titleLine1')}
                <br />
                {t('titleLine2')}
              </h2>
              <div className="mt-8 space-y-4">
                <p className="text-body leading-relaxed font-light text-secondary-text">
                  {t('body1')}
                </p>
                <p className="text-body leading-relaxed font-light text-secondary-text">
                  {t('body2')}
                </p>
              </div>
            </div>

            {/* Hidden below lg in the design: on a phone the hero and the report
                section already carry a call to action above this point. */}
            <div className="mt-14 hidden lg:block">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-16 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover max-tablet:w-full"
              >
                {t('cta')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sits flush at the section's bottom edge, which is why the section has
          no bottom padding of its own. */}
      <div className="w-full border-t border-[#067647]/15 bg-[#067647]/10 py-3">
        <div className="mx-auto flex max-w-wrap items-center justify-center gap-2.5 px-6 text-center text-label leading-relaxed font-normal text-dark-green">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
            className="size-4 shrink-0 text-dark-green"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          <span>{t('autosave')}</span>
        </div>
      </div>
    </section>
  )
}
