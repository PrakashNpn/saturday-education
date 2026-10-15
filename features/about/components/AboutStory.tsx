'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0, 0, 0.2, 1] as const

export function AboutStory() {
  const t = useTranslations('about')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[color-mix(in_srgb,var(--color-action)_40%,black)] py-16 text-white max-tablet:py-12">
      {/* The same photograph twice: blurred and dimmed here as an ambient
          backdrop, sharp in the frame on the right. The scrim is #00262B,
          the same 40%-of-action-on-black mix as the section background
          above (computed once rather than nested color-mix() calls, since
          Tailwind's opacity suffixes need a plain colour to work from), so it
          stays the same brand teal the rest of the site's dark bands use. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/about/counsellor-training.webp"
          alt=""
          aria-hidden="true"
          fill
          unoptimized
          sizes="100vw"
          className="scale-125 object-cover object-center opacity-35 blur-2xl filter"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00262B]/90 via-[#00262B]/75 to-[#00262B]/50" />
      </div>

      {/* Only this content fades/rises on scroll — the dark band and its
          backdrop photo stay solid throughout. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="relative z-10 mx-auto max-w-wrap px-6"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="mb-2 text-min font-medium tracking-[0.06em] text-white/60 uppercase">
              {t('storyLabel')}
            </p>
            <h2 className="mb-4 text-section font-medium leading-[1.2] text-white">
              {t('storyTitle')}
            </h2>
            <div className="space-y-4 text-body font-light leading-[1.65] text-white/85">
              <p>{t('storyBody1')}</p>
              <p>{t('storyBody2')}</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] border border-white/20 bg-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/images/about/counsellor-training.webp"
                alt={t('storyImageAlt')}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
