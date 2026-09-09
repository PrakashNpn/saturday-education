'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.055

// Counts are the designer's own figures, held here rather than derived from the
// database, as agreed. `key` is the message-key stem; `slug` is the real
// destination route.
const DESTINATIONS = [
  { key: 'canada', slug: 'canada', file: 'canada.webp', count: 49 },
  { key: 'unitedkingdom', slug: 'united-kingdom', file: 'united-kingdom.webp', count: 35 },
  { key: 'malaysia', slug: 'malaysia', file: 'malaysia.webp', count: 23 },
  { key: 'unitedstates', slug: 'united-states', file: 'united-states.webp', count: 21 },
  { key: 'thailand', slug: 'thailand', file: 'thailand.webp', count: 18 },
  { key: 'ireland', slug: 'ireland', file: 'ireland.webp', count: 17 },
  { key: 'germany', slug: 'germany', file: 'germany.webp', count: 16 },
  { key: 'newzealand', slug: 'new-zealand', file: 'new-zealand.webp', count: 13 },
  { key: 'australia', slug: 'australia', file: 'australia.webp', count: 11 },
] as const

export default function GlobalLeadersSection() {
  const t = useTranslations('Landing.globalLeaders')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="border-t border-stroke py-14 max-tablet:py-10">
      <div className="mx-auto max-w-wrap px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
              {t('eyebrow')}
            </h2>
            <p className="max-w-[46ch] text-section font-medium">{t('headline')}</p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-label font-medium text-action"
          >
            <span className="underline underline-offset-[3px]">{t('viewAll')}</span>
          </Link>
        </div>

        {/* Same hairline trick as Beyond admissions: a 1px grid gap over a
            stroke-coloured container, with the cards opaque on top. */}
        <div
          ref={ref}
          className="grid gap-px overflow-hidden rounded-sm border border-stroke bg-stroke sm:grid-cols-2 lg:grid-cols-3"
        >
          {DESTINATIONS.map((destination, index) => {
            const name = t(`${destination.key}Name`)
            const count = t('partnerCount', { count: destination.count })
            return (
              <motion.div
                key={destination.key}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: index * STAGGER, ease: EASE }
                }
                className="group relative aspect-16/9 overflow-hidden bg-surface-1"
              >
                {/* Not a link in the design, because none of the designer's
                    routes existed. Ours do, and all nine slugs are published. */}
                <Link href={`/destinations/${destination.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">{name}</span>
                </Link>

                <Image
                  src={`/images/destinations/${destination.file}`}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-text/70 to-transparent p-4 pt-10">
                  <b className="block text-card font-medium text-white">{name}</b>
                  <p className="text-label font-normal text-white/85">{count}</p>
                </div>

                {/* The tagline is the hover state, so the resting card stays a
                    photograph with one fact on it. */}
                <div className="absolute inset-0 flex flex-col justify-end bg-primary-text/80 p-4 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100">
                  <b className="text-card font-medium text-white">{name}</b>
                  <p className="mb-1 text-label font-normal text-white/85">{count}</p>
                  <p className="text-label font-normal text-white">
                    {t(`${destination.key}Tagline`)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
