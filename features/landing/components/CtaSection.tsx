'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const EASE = [0, 0, 0.2, 1] as const

export default function CtaSection() {
  const t = useTranslations('Landing.statsCta')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-structure">
      {/* Decorative, so the alt is empty: the heading beside it already says
          everything a screen reader needs. */}
      <Image
        src="/images/landing/final-cta.webp"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary-text/60" />

      {/* Only the content fades/rises — the photo + scrim stay solid
          throughout, rather than materialising from transparent with it. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="relative mx-auto flex max-w-wrap flex-col items-center px-6 py-28 text-center max-tablet:py-16"
      >
        <p className="mb-8 max-w-[20ch] text-display leading-[1.1] font-medium text-white">
          {t('heading')}
        </p>
        {/* White on the photograph rather than purple: the brand colour would
            disappear into the scrim. */}
        <Link
          href="/#consultation"
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-16 text-body font-medium whitespace-nowrap text-action transition-colors hover:bg-white/90"
        >
          {t('button')}
        </Link>
      </motion.div>
    </section>
  )
}
