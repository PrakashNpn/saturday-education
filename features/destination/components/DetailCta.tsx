'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { CountryBackdrop } from './CountryBackdrop'

interface Props {
  backdropUrl: string | null
  title: string
  ctaLabel: string
}

const EASE = [0, 0, 0.2, 1] as const

export function DetailCta({ backdropUrl, title, ctaLabel }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-black py-16 text-center text-white max-tablet:py-12">
      <CountryBackdrop url={backdropUrl} />

      {/* Only the content fades/rises on scroll — the band itself (photo +
          black scrim) stays solid throughout, rather than materialising from
          transparent along with it. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="relative z-10 mx-auto max-w-wrap px-6"
      >
        <p className="mb-6 text-section font-medium text-white">{title}</p>
        <Link
          href="/#consultation"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
        >
          {ctaLabel}
        </Link>
      </motion.div>
    </section>
  )
}
