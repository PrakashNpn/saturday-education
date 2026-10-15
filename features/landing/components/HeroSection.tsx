'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { cn } from '@/shared/utils/cn'

// Same entrance as HeroSection: each block starts about 84ms after the one
// above it, on a plain ease-out.
const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.084

// Raw values rather than tokens: these are tuned against the photo behind them
// and are used nowhere else. AQUA marks the brand name, TURQUOISE the numbers,
// SKY the small supporting text (it is --color-light).
const AQUA = '#52D8EA'
const TURQUOISE = '#2DD4BF'
const SKY = '#C5F8FF'

const SHADOW_HEADLINE = '0 2px 20px rgba(0,51,58,.46),0 1px 3px rgba(0,51,58,.32)'
const SHADOW_NAME = '0 2px 18px rgba(0,51,58,.4),0 1px 3px rgba(0,51,58,.32)'
const SHADOW_NUMBER = '0 2px 14px rgba(0,51,58,.9),0 1px 3px rgba(0,51,58,.75)'
const SHADOW_SOFT = '0 1px 12px rgba(0,51,58,.56),0 1px 2px rgba(0,51,58,.38)'
const SHADOW_LABEL = '0 1px 10px rgba(0,51,58,.8)'

// Photo clarity, 0 to 100. This one number drives every overlay below. 75 is the
// first approved look; 100 is the photo almost bare. The dark areas sit only
// behind the copy (the bright wall at the top of the photo is where white text
// needs them), and the lower half, where the people are, is left clear.
const CLARITY = 83

// The overlay strengths at clarity 75 and at clarity 100; every other value
// is a straight line between the two.
const AT_75 = { washTop: 0.145, washBottom: 0.255, poolTop: 0.705, poolMid: 0.56 }
const AT_100 = { washTop: 0, washBottom: 0.04, poolTop: 0.4, poolMid: 0.18 }
const mix = (key: keyof typeof AT_75) => {
  const t = (CLARITY - 75) / 25
  return AT_75[key] + (AT_100[key] - AT_75[key]) * t
}
const a = (value: number) => Math.max(0, value).toFixed(3)

const WASH = `linear-gradient(180deg,rgba(23,126,141,${a(mix('washTop'))}) 0%,rgba(0,51,58,${a(mix('washBottom'))}) 100%)`
const POOL_TOP = `radial-gradient(ellipse 62% 44% at 50% 24%,rgba(0,51,58,${a(mix('poolTop'))}) 0%,rgba(0,51,58,${a(mix('poolTop') * 0.7)}) 55%,rgba(0,51,58,0) 100%)`
const POOL_MID = `radial-gradient(ellipse 56% 30% at 50% 68%,rgba(0,51,58,${a(mix('poolMid'))}) 0%,rgba(0,51,58,${a(mix('poolMid') * 0.5)}) 60%,rgba(0,51,58,0) 100%)`

interface Props {
  /** Dropped by the page when Firmli's lists are unreachable. The hero then
   *  closes under the stats instead of leaving a gap where the card would be. */
  courseFinder?: ReactNode
}

/**
 * The home hero: the counsellor photo behind the headline, with the course
 * finder in a frosted card overlapping the bottom edge.
 */
export default function HeroSection({ courseFinder }: Props) {
  const t = useTranslations('hero')
  const th = useTranslations('heroLiquid')
  const prefersReducedMotion = useReducedMotion()

  /**
   * `initial` deliberately does not branch on prefersReducedMotion:
   * useReducedMotion() is null during SSR, so branching there would render
   * opacity:0 on the server with nothing on the client to bring it back. The
   * preference is honoured by the zero-duration transition instead.
   */
  const rise = (step: number, distance = 14, duration = 0.55) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedMotion ? { duration: 0 } : { duration, delay: step * STAGGER, ease: EASE },
  })

  const stats = [
    { value: t('studentsCount'), label: t('studentsLabel') },
    { value: t('visaCount'), label: t('visaLabel') },
    { value: th('partnersCount'), label: th('partnersLabel') },
  ]

  return (
    <>
      <section className={cn('relative overflow-hidden bg-structure px-6 pt-12', courseFinder ? 'pb-40' : 'pb-14')}>
        <Image
          src="/images/hero/counselling.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:50%_38%] [filter:saturate(1.08)_contrast(1.05)_brightness(1.04)] max-tablet:[object-position:36%_38%]"
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: WASH }} />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: POOL_TOP }} />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: POOL_MID }} />

        <div className="relative mx-auto flex max-w-wrap flex-col items-center text-center">
          <motion.span
            {...rise(0)}
            className="text-min font-semibold tracking-[0.14em] uppercase"
            style={{ color: SKY, textShadow: '0 1px 12px rgba(0,51,58,.7)' }}
          >
            {th('eyebrow')}
          </motion.span>

          <motion.h1
            {...rise(1)}
            className={cn(
              'mt-4 font-semibold tracking-[-0.03em] text-white',
              'text-[clamp(1.875rem,1.2rem+2.6vw,3.125rem)] leading-[1.1]',
            )}
            style={{ textShadow: SHADOW_HEADLINE }}
          >
            {t('titleLine1')}
            {t('titleLine2') && ` ${t('titleLine2')}`}
            <br />
            <span style={{ color: AQUA, textShadow: SHADOW_NAME }}>
              {/* Non-breaking space between the first two words only, so a
                  narrow phone breaks before "Consulting" and not mid-name. */}
              {t('titleHighlight').replace(' ', '\u00A0')}
            </span>
            {t('titleSuffix') && (
              <>
                <br />
                {t('titleSuffix')}
              </>
            )}
          </motion.h1>

          <motion.p
            {...rise(2)}
            className="mt-4 max-w-[48rem] text-[18px] leading-[1.55] font-medium text-white"
            style={{ textShadow: SHADOW_SOFT }}
          >
            {t('ledeLine1')} {t('ledeLine2')}
          </motion.p>

          <motion.div {...rise(3)} className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/#consultation"
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-body font-semibold text-action-hover shadow-[0_16px_30px_-18px_rgba(0,0,0,.5)] transition-colors hover:bg-tint"
            >
              {th('bookConsultation')}
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0">
                <path
                  d="M3.5 8h9m0 0L8.5 4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/career-assessment"
              className="inline-flex items-center rounded-full border-[1.5px] border-white/80 bg-[rgba(0,51,58,.32)] px-6 py-3 text-[16px] font-medium text-white backdrop-blur-[6px] transition-colors hover:bg-[rgba(0,51,58,.5)]"
            >
              {th('careerAssessment')}
            </Link>
          </motion.div>

          <motion.div
            {...rise(4)}
            className="mt-8 flex flex-wrap items-stretch justify-center gap-y-6"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'px-7 text-center tablet:px-10',
                  index > 0 && 'tablet:border-l tablet:border-[rgba(197,248,255,.45)]',
                )}
              >
                <div
                  className="text-[34px] leading-[1.05] font-bold tracking-[-0.01em] tabular-nums tablet:text-[36px]"
                  style={{ color: TURQUOISE, textShadow: SHADOW_NUMBER }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-1.5 text-label font-medium"
                  style={{ color: SKY, textShadow: SHADOW_LABEL }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {courseFinder && (
        <div className="mx-auto max-w-wrap px-6 pb-12">
          <motion.div {...rise(5)} className="relative z-10 -mt-32">
            {courseFinder}
          </motion.div>
        </div>
      )}
    </>
  )
}
