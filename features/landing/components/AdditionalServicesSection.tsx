'use client'

import Image from 'next/image'
import { BookOpen, Award, Plane, Landmark } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

// One icon per service, in the same order as SERVICES below. Decorative
// only, each service is still identified by its own title.
const SERVICES = [
  { key: 'testPrep', tag: 'tagPaid', Icon: BookOpen },
  { key: 'scholarship', tag: 'tagPaid', Icon: Award },
  { key: 'arrival', tag: 'tagPaid', Icon: Plane },
  { key: 'loans', tag: 'tagPartner', Icon: Landmark },
] as const

const EASE = [0, 0, 0.2, 1] as const

export default function AdditionalServicesSection() {
  const t = useTranslations('Landing.additionalServices')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-surface py-14 max-tablet:py-10">
      {/* Same side glows as Why Saturday Education and Our Services. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_70%_at_0%_50%,rgba(23,126,141,0.06)_0%,rgba(23,126,141,0)_70%),radial-gradient(ellipse_50%_70%_at_100%_50%,rgba(0,51,58,0.06)_0%,rgba(0,51,58,0)_70%)]"
      />
      <div className="relative z-[1] mx-auto max-w-wrap px-6">
        {/* Image on the left, a divided icon list on the right rather than
            another card grid: Why Saturday and Our Services both already use
            a bordered card, a third one in a row would read as repetition
            rather than a system. A flowing list, no per-item border or
            shadow, is a deliberately different shape. */}
        <div className="grid gap-10 md:grid-cols-[7fr_5fr]">
          {/* Stretches to match the content column's own height exactly (the
              grid's default), so top and bottom line up for real rather than
              being tuned by hand to a fixed pixel height. The list beside it
              is tightened so that natural height stays in a range that
              doesn't crop the wide 2.2:1 photo too hard. */}
          <div className="relative min-h-[260px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(0,51,58,0.35)] max-tablet:min-h-[240px]">
            <Image
              src="/images/landing/counselling.webp"
              alt={t('imageAlt')}
              fill
              unoptimized
              sizes="(max-width: 860px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="mb-1 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
              {t('eyebrow')}
            </h2>
            <p className="mb-4 text-section font-medium">{t('headline')}</p>

            <div className="flex flex-col">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.4, delay: index * 0.08, ease: EASE }
                  }
                  className="flex gap-4 border-b border-stroke py-3 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-tint text-brand">
                    <service.Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <b className="text-card font-medium text-primary-text">{t(`${service.key}Title`)}</b>
                      {/* The asterisk is outside the translated string so it
                          never drifts from the footnote below. */}
                      <span className="inline-block rounded-full bg-surface-2 px-2.5 py-0.5 text-min font-medium text-secondary-text">
                        {t(service.tag)}*
                      </span>
                    </div>
                    <p className="text-label font-normal text-secondary-text">{t(`${service.key}Desc`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-5 text-min text-muted-text">{t('footnote')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
