'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Props {
  onStart: () => void
  onAutofill?: () => void
}

const CHIP =
  'inline-flex items-center rounded-full border border-stroke bg-surface-0 px-3.5 py-1.5 text-label font-medium text-primary-text shadow-2xs'

export function CareerDiscoveryIntro({ onStart, onAutofill }: Props) {
  const t = useTranslations('careerAssessment.intro')
  const isDev = process.env.NODE_ENV !== 'production'

  return (
    <section className="relative overflow-hidden border-b border-stroke bg-surface py-20 max-tablet:py-12">
      <div
        aria-hidden="true"
        className="assessment-hero-texture pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-10 mx-auto max-w-wrap px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Report cover. Second on a phone so the headline leads. */}
          <div className="relative order-2 flex flex-col items-center justify-center lg:order-1">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tint/50 blur-3xl sm:h-[400px] sm:w-[400px]"
            />

            <div className="relative">
              {/* Styled as a physical document: a spine shadow down the left
                  edge, square on that side and rounded on the other three. */}
              <button
                type="button"
                onClick={onStart}
                className="group relative block cursor-pointer perspective-[1000px]"
              >
                <div className="relative aspect-[1/1.414] w-[280px] rounded-l-xs rounded-r-md border-y border-r border-stroke bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.32),0_8px_18px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:rotate-y-[-4deg] group-hover:scale-[1.02] group-hover:shadow-[0_32px_60px_-15px_rgba(0,0,0,0.4)] sm:w-[330px]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 w-5 rounded-l-xs bg-gradient-to-r from-black/25 via-black/10 to-transparent"
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-l-xs rounded-r-md">
                    <Image
                      src="/images/career-assessment/report-cover.webp"
                      alt={t('coverAlt')}
                      fill
                      priority
                      sizes="330px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </button>
            </div>

            <p className="mt-4 text-center text-min text-secondary-text">{t('coverCaption')}</p>
          </div>

          <div className="order-1 lg:order-2">
            <h1 className="mb-[44px] tracking-tight">
              <span className="block text-title leading-[1.18] font-medium text-primary-text">
                {t('title')}
              </span>
              <span className="mt-2 block text-section leading-snug font-medium text-accent-ink">
                {t('titleAccent')}
              </span>
            </h1>

            <p className="mb-6 max-w-[54ch] text-body leading-relaxed font-normal text-secondary-text">
              {t('subtitle')}
            </p>

            <div className="mb-14 flex flex-wrap items-center gap-2.5">
              <span className={CHIP}>{t('metaQuestions')}</span>
              <span className={CHIP}>{t('metaParts')}</span>
              <span className={CHIP}>{t('metaTime')}</span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onStart}
                  className="inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-16 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover sm:w-auto"
                >
                  {t('startButton')}
                </button>

                {/* Dev-only shortcut that fills the whole questionnaire. */}
                {isDev && onAutofill && (
                  <button
                    type="button"
                    onClick={onAutofill}
                    className="cursor-pointer rounded-full border border-dashed border-stroke-strong px-4 py-2 text-min text-muted-text hover:text-primary-text"
                  >
                    Autofill (dev)
                  </button>
                )}
              </div>

              <p className="text-min text-muted-text">{t('reassurance')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
