'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const EASE = [0, 0, 0.2, 1] as const

export default function WhySaturdaySection() {
  const t = useTranslations('Landing.whySaturday')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  const facts = [
    { title: t('supportTitle'), body: t('supportBody') },
    { title: t('pricingTitle'), body: t('pricingBody') },
    { title: t('visaTitle'), body: t('visaBody') },
  ]

  return (
    // Dark applies to the section, never to a surface sitting on it. Black
    // rather than purple, so a full-width band does not spend the brand colour.
    <section className="bg-structure py-14 text-white max-tablet:py-10">
      <div className="mx-auto max-w-wrap px-6">
        {/* Only this block animates in the design; the facts row and the button
            below are static. `initial` never branches on the motion preference,
            which is null during SSR: the transition carries that instead. */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: EASE }
          }
          className="mb-10 grid items-start gap-10 border-b border-white/15 pb-10 md:grid-cols-[1fr_1fr]"
        >
          <div>
            <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-white/60 uppercase">
              {t('eyebrow')}
            </h2>
            <p className="mb-6 max-w-[28ch] text-section font-medium">{t('headline')}</p>
            <p className="mb-6 max-w-[46ch] text-body font-light text-white/70">{t('body')}</p>
            <p className="text-title leading-none font-medium tabular-nums">{t('statCount')}</p>
            <p className="mt-1 text-label font-normal text-white/60">{t('statLabel')}</p>
          </div>

          <div className="overflow-hidden rounded-sm">
            <Image
              src="/images/landing/counsellor-consultation.webp"
              alt={t('imageAlt')}
              width={1000}
              height={834}
              unoptimized
              sizes="(max-width: 860px) 100vw, 500px"
              className="h-auto w-full"
            />
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.title}>
              <b className="mb-1 block text-label font-medium">{fact.title}</b>
              <p className="text-label font-normal text-white/60">{fact.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          {/* The small primary: 40px tall, not the 52px the hero uses. One big
              ask per screen, and this is not it. */}
          <Link
            href="/#consultation"
            className="inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-action px-6 text-label font-medium text-white transition-colors hover:bg-action-hover"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
