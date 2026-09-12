'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

interface Props {
  onStart: () => void
}

const EASE = [0, 0, 0.2, 1] as const

export function AssessmentFinalCta({ onStart }: Props) {
  const t = useTranslations('careerAssessment.finalCta')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-canvas py-16 max-tablet:py-12">
      <div className="mx-auto max-w-wrap px-6">
        <div className="relative overflow-hidden rounded-sm border border-stroke bg-structure text-white shadow-card">
          <Image
            src="/images/landing/final-cta.webp"
            alt={t('imageAlt')}
            fill
            unoptimized
            sizes="(max-width: 1080px) 100vw, 1032px"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-primary-text/75" />

          {/* Only the content fades/rises — the card (photo + scrim) stays
              solid throughout. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
            className="relative z-10 flex flex-col items-center px-6 py-20 text-center max-tablet:py-14"
          >
            <h2 className="mb-8 text-section leading-snug font-medium tracking-tight text-white">
              {t('titleLine1')}
              <br />
              {t('titleLine2')}
            </h2>

            <div className="flex flex-col items-center gap-3.5">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-16 text-body font-medium whitespace-nowrap text-action transition-colors hover:bg-white/90"
              >
                {t('start')}
              </button>
              <Link
                href="/#consultation"
                className="text-label font-normal text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                {t('consultation')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
