'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { FLAG_CODES, REGION_DISPLAY } from '../utils/constants'
import { CountryBackdrop } from './CountryBackdrop'

interface Props {
  slug: string
  name: string
  tagline: string | null
  backdropUrl: string | null
  region: string
  destinationsLabel: string
  regionLabel: string
}

const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.09

/** The design sets the flag as an emoji, which Windows cannot draw: Segoe UI
 *  Emoji has the regional-indicator letters but none of the flag ligatures, so
 *  it falls back to a boxed "SG". Rather than approximate it, these are the
 *  actual Noto Color Emoji glyphs exported to PNG (see the README beside them),
 *  so the waving artwork is identical on every platform, including macOS, which
 *  would otherwise substitute Apple's differently drawn flag.
 *
 *  The box reproduces the glyph's own metrics, measured from the font: a
 *  1.248em advance box, 0.868em tall, sitting 0.115em below the baseline, with
 *  the glyph centred inside it by object-contain exactly as the font centres it
 *  in the advance, then a 0.26em space before the name.
 *  Everything is in em, so it tracks the text-title clamp down to mobile. */
function Flag({ slug }: { slug: string }) {
  const code = FLAG_CODES[slug]
  if (!code) return null

  return (
    <span
      aria-hidden="true"
      className="relative mr-[0.26em] inline-block h-[0.868em] w-[1.248em] align-[-0.115em]"
    >
      {/* unoptimized: already quantised to a few kilobytes at the glyph's own
          resolution, so the optimiser would cost a round trip and save nothing.
          Eager because the flag sits in the hero, above the fold. */}
      <Image
        src={`/images/flags/wave/${code}.png`}
        alt=""
        fill
        loading="eager"
        unoptimized
        className="object-contain"
      />
    </span>
  )
}

export function DetailHero({
  slug,
  name,
  tagline,
  backdropUrl,
  region,
  destinationsLabel,
  regionLabel,
}: Props) {
  const prefersReducedMotion = useReducedMotion()

  // Above the fold, so this runs on mount rather than on scroll into view —
  // same reasoning as the homepage's own HeroSection and DestinationsHero.
  const rise = (step: number, distance = 14, duration = 0.5) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay: step * STAGGER, ease: EASE },
  })

  return (
    <section className="relative overflow-hidden bg-black py-12 max-tablet:py-9">
      <CountryBackdrop url={backdropUrl} priority />

      <div className="relative z-10 mx-auto max-w-wrap px-6 text-white">
        <motion.p {...rise(0)} className="mb-3 text-min font-normal text-white/80">
          <Link href="/destinations" className="transition-colors hover:text-white">
            {destinationsLabel}
          </Link>{' '}
          / {name}
        </motion.p>

        <motion.span
          {...rise(1)}
          className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-min font-medium text-white backdrop-blur-sm"
        >
          {regionLabel || (REGION_DISPLAY[region] ?? region)}
        </motion.span>

        <motion.h1 {...rise(2)} className="mb-2 text-title font-medium text-white">
          <Flag slug={slug} />
          {name}
        </motion.h1>

        {tagline && (
          <motion.p {...rise(3)} className="max-w-[52ch] text-lede font-light text-white/90">
            {tagline}
          </motion.p>
        )}
      </div>
    </section>
  )
}
