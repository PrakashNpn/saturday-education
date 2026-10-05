'use client'

import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { cn } from '@/shared/utils/cn'

// Measured off the design: each block starts about 84ms after the one above it
// and takes a little over half a second, on a plain ease-out.
const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.084

export default function HeroSection({ courseFinder }: { courseFinder?: ReactNode }) {
  const t = useTranslations('hero')
  const tc = useTranslations('Landing.courseSearch')
  const prefersReducedMotion = useReducedMotion()

  /**
   * The whole hero is above the fold, so this runs on mount, not on scroll.
   *
   * `initial` deliberately does not branch on prefersReducedMotion.
   * useReducedMotion() is null during SSR and only resolves on the client, so
   * branching there renders opacity:0 on the server and no initial state on the
   * client, which leaves nothing to bring the content back and hides the whole
   * hero. The preference is honoured by the zero-duration transition instead.
   */
  const rise = (step: number, distance = 14, duration = 0.55) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay: step * STAGGER, ease: EASE },
  })

  return (
    <section className="hero-lift relative overflow-hidden pt-12 pb-10 max-tablet:py-10">
      {/* Wireframe globe, barely there at 4% and masked away before it reaches
          the headline. Loaded as a file rather than inlined so 27KB of path
          data stays out of the client bundle. */}
      <div
        aria-hidden="true"
        className="hero-globe-fade pointer-events-none absolute top-[calc(9%-120px)] left-1/2 aspect-square w-[130vw] -translate-x-1/2 bg-[url('/images/hero/globe.svg')] bg-contain bg-center bg-no-repeat opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-wrap px-6">
        <div className="mx-auto text-center">
          <motion.h1
            {...rise(0)}
            // max-[374px]: the clamp floors at 36px regardless of
            // locale, which is fine down to ~375px but leaves no room for
            // "Saturday Education" (held together as one unit below, so it
            // reads as two lines instead of three) to fit an even narrower
            // phone without overflowing the viewport — confirmed at 320 and
            // 360px, where only a smaller floor here fixes it.
            className={cn(
              'mx-auto mb-4 font-medium tracking-[-0.03em]',
              'max-[374px]:text-[1.75rem]',
              'text-[clamp(2.25rem,1.55rem+2.9vw,2.5rem)]',
              'leading-[1.15]',
            )}
          >
            {t('titleLine1')}
            {t('titleLine2') && ` ${t('titleLine2')}`}
            <br />
            {/* The company's own name set in running text is an identity
                moment, so it takes the brand colour rather than the action
                colour. Same value, different reason. */}
            <span className="font-semibold text-brand">
              {/* Non-breaking space between the first two words only: at the
                  narrowest phone widths (320px) the plain string wraps three
                  ways ("Saturday" / "Education" / "Consulting") because the
                  first line break lands wherever it fits, not where it reads
                  best. Pinning "Saturday Education" together forces the one
                  remaining break to fall before "Consulting" instead. */}
              {t('titleHighlight').replace(' ', ' ')}
            </span>
            {/* Burmese word order puts a verb after the brand name ("...with
                Saturday Education, let's start") where English's does not, so
                this only trails the highlight for locales that actually need
                it — empty for English and Thai, so nothing renders there. Its
                own forced line break keeps it off the brand-name line
                regardless of container width, since Burmese runs long here. */}
            {t('titleSuffix') && (
              <>
                <br />
                {t('titleSuffix')}
              </>
            )}
          </motion.h1>

          <motion.div {...rise(1)} className="mx-auto mb-8">
            <p className="flex flex-wrap items-baseline justify-center gap-x-7 gap-y-2">
              {/* tabular-nums so the two figures do not shift width against
                  each other, and accent-ink because gold has to be read here
                  rather than just seen. */}
              <span className="flex items-baseline gap-x-2.5">
                <span className="text-lede leading-none font-medium tracking-[-0.01em] text-accent-ink tabular-nums">
                  {t('visaCount')}
                </span>
                <span className="text-body font-medium text-primary-text">{t('visaLabel')}</span>
              </span>
              <span className="flex items-baseline gap-x-2.5">
                <span className="text-lede leading-none font-medium tracking-[-0.01em] text-accent-ink tabular-nums">
                  {t('studentsCount')}
                </span>
                <span className="text-body font-medium text-primary-text">
                  {t('studentsLabel')}
                </span>
              </span>
            </p>
          </motion.div>

          {courseFinder && (
            <motion.div {...rise(2)} className="mx-auto mb-4">
              {courseFinder}
            </motion.div>
          )}

          <motion.p {...rise(3)} className="text-label font-normal text-muted-text">
            {tc.rich('consultationPrompt', {
              link: (chunks) => (
                <Link href="/#consultation" className="text-action underline underline-offset-4 hover:text-action-hover">
                  {chunks}
                </Link>
              ),
            })}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
