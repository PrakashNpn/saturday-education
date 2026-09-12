'use client'

import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

const SERVICES = [
  { key: 'testPrep', tag: 'tagPaid' },
  { key: 'scholarship', tag: 'tagPaid' },
  { key: 'arrival', tag: 'tagPaid' },
  { key: 'loans', tag: 'tagPartner' },
] as const

const EASE = [0, 0, 0.2, 1] as const
// Matches the grid's own lg:grid-cols-4 — the widest column count it reaches.
const COLS = 4

export default function AdditionalServicesSection() {
  const t = useTranslations('Landing.additionalServices')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-surface py-10 max-tablet:py-8">
      <div className="mx-auto max-w-wrap px-6">
        <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          {t('eyebrow')}
        </h2>
        <p className="mb-8 max-w-[46ch] text-section font-medium">{t('headline')}</p>

        {/* The hairlines between cards are the container's own background
            showing through a 1px grid gap, so there are no borders to double
            up where cards meet or to trim at the rounded corners. */}
        <div className="grid gap-px overflow-hidden rounded-md border border-stroke bg-stroke sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.4, delay: (index % COLS) * 0.08, ease: EASE }
              }
              className="bg-surface p-5"
            >
              <b className="mb-1 block text-card font-medium">{t(`${service.key}Title`)}</b>
              <p className="mb-3 text-label font-normal text-secondary-text">
                {t(`${service.key}Desc`)}
              </p>
              {/* The asterisk is outside the translated string so it never
                  drifts from the footnote below. */}
              <span className="inline-block rounded-full bg-surface-2 px-3 py-1 text-min font-medium text-primary-text">
                {t(service.tag)}*
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-5 text-min text-muted-text">{t('footnote')}</p>
      </div>
    </section>
  )
}
