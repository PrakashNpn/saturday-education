'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.09

export function AboutHero() {
  const t = useTranslations('about')
  const prefersReducedMotion = useReducedMotion()

  // Above the fold, so this runs on mount rather than on scroll into view —
  // same reasoning as the homepage's own HeroSection.
  const rise = (step: number, distance = 14, duration = 0.5) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay: step * STAGGER, ease: EASE },
  })

  return (
    // A white centre fading out to a pale purple at the edges, so the page
    // opens lighter than it ends. Values are the design's own rather than
    // tokens: this wash appears nowhere else.
    <section className="relative overflow-hidden bg-[#F2E8F8] bg-[radial-gradient(ellipse_110%_85%_at_50%_35%,#FFFFFF_0%,#FFFFFF_30%,#F8F3FC_62%,#EFE3F6_100%)] pt-16 pb-16 max-tablet:pt-12 max-tablet:pb-12">
      <div className="mx-auto max-w-wrap px-6 text-center">
        <motion.p
          {...rise(0)}
          className="mx-auto mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase"
        >
          {t('heroLabel')}
        </motion.p>
        <motion.h1
          {...rise(1)}
          className="mx-auto max-w-[32ch] text-title font-medium leading-[1.16] tracking-[-0.022em]"
        >
          {t('heroTitle')}
        </motion.h1>

        {/* Aspect ratio is the source file's own, so the frame never crops the
            people at the ends of the row. Deliberately not animated: this is
            the page's LCP element, and framer-motion's opacity:0 initial state
            delays when Chrome counts it as painted — by roughly the fade's
            full duration, not just its stagger delay (measured empirically).
            Left permanently visible instead; the rest of the hero still
            staggers in around it. */}
        <div className="relative mx-auto mt-8 aspect-[1577/779] w-full overflow-hidden rounded-[18px] border border-stroke bg-surface">
          <Image
            src="/images/about/team-group.webp"
            alt={t('heroImageAlt')}
            fill
            priority
            unoptimized
            sizes="(max-width: 1080px) 100vw, 1080px"
            className="object-cover object-center"
          />
        </div>

        <motion.p {...rise(3)} className="mt-3 text-min font-light text-muted-text">
          {t('heroCaption')}
        </motion.p>
      </div>
    </section>
  )
}
