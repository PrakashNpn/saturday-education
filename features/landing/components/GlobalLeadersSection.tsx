'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import type { GlobalLeaderDestination } from '../services/globalLeadersService'

const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.055

interface Props {
  destinations: GlobalLeaderDestination[]
}

export default function GlobalLeadersSection({ destinations }: Props) {
  const t = useTranslations('Landing.globalLeaders')
  const tc = useTranslations('destinations')
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
            stroke-coloured container, with the cards opaque on top. Only the
            outer four corners of the whole mosaic are rounded (rounded-2xl
            on this wrapper, clipped by overflow-hidden); individual cards
            stay flush/square against each other, unchanged. */}
        <div
          ref={ref}
          className="grid gap-px overflow-hidden rounded-2xl border border-stroke bg-stroke sm:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.map((destination, index) => {
            const name = t(`${destination.key}Name`)
            // Same source and wording as the destinations page cards — null
            // when Firmli has no match, in which case the line is omitted.
            const count =
              destination.count != null ? tc('cardInstitutionCount', { count: destination.count }) : null
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
                // Framer Motion drives the hover zoom, not a CSS group-hover
                // utility: this build isn't compiling hover/group-hover
                // variants into the stylesheet at all (confirmed directly,
                // the tagline overlay a few lines down doesn't appear on
                // hover either, a pre-existing issue, not something this
                // change caused). whileHover here is a variant label, not a
                // target object, so it only drives this card's own
                // animation where variants defines it (nothing, it doesn't
                // move) and is otherwise just propagated to the image below
                // for its own variants to react to; the Link overlay sits
                // above the image in stacking order, so the image's own
                // hover detection would never fire on its own.
                whileHover={prefersReducedMotion ? undefined : 'hover'}
                variants={{ hover: {} }}
                className="group relative aspect-16/9 overflow-hidden bg-surface-1"
              >
                {/* Not a link in the design, because none of the designer's
                    routes existed. Ours do, and all nine slugs are published. */}
                <Link href={`/destinations/${destination.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">{name}</span>
                </Link>

                <motion.div
                  className="absolute inset-0"
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Image
                    src={`/images/destinations/${destination.file}`}
                    alt={name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-text/70 to-transparent p-4 pt-10">
                  <b className="block text-card font-medium text-white">{name}</b>
                  {count && <p className="text-label font-normal text-white/85">{count}</p>}
                </div>

                {/* The tagline is the hover state, so the resting card stays a
                    photograph with one fact on it. */}
                <div className="absolute inset-0 flex flex-col justify-end bg-primary-text/55 p-4 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100">
                  <b className="text-card font-medium text-white">{name}</b>
                  {count && <p className="mb-1 text-label font-normal text-white/85">{count}</p>}
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
