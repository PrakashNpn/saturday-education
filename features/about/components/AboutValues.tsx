'use client'

import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0, 0, 0.2, 1] as const
// Matches the grid's own md:grid-cols-2.
const COLS = 2

/**
 * The design inlines these rather than importing them, and the version of
 * lucide-react installed here draws three of the four differently: its Compass
 * uses a path where the design has a polygon, and GraduationCap and Users have
 * newer geometry. Inlined to match the design exactly.
 */
const ICONS = {
  eye: (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  graduation: (
    <>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
} as const

// One card sweeps every three seconds, in order, on a twelve-second cycle.
const VALUES = [
  { n: 1, icon: 'eye', delay: '0s' },
  { n: 2, icon: 'compass', delay: '3s' },
  { n: 3, icon: 'graduation', delay: '6s' },
  { n: 4, icon: 'users', delay: '9s' },
] as const

export function AboutValues() {
  const t = useTranslations('about')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-t border-purple-200/60 bg-[#F7F2FA] py-16 max-tablet:py-12">
      <div className="values-section-texture pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-wrap px-6">
        <div className="mx-auto mb-10 max-w-[46ch] text-center">
          <p className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
            {t('valuesLabel')}
          </p>
          <h2 className="text-section font-medium">{t('valuesTitle')}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {VALUES.map(({ n, icon, delay }, index) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.45, delay: (index % COLS) * 0.1, ease: EASE }
              }
              className="relative overflow-hidden rounded-[6px] border border-purple-500/20 bg-gradient-to-br from-[#240B3E] via-[#170528] to-[#0E0219] p-8 text-center max-tablet:p-6"
            >
              <span className="absolute top-5 right-5 font-mono text-sm font-medium text-purple-300/40">
                {String(n).padStart(2, '0')}
              </span>

              <div
                className="animate-shimmer-seq pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ animationDelay: delay }}
              />

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/20 backdrop-blur-xs">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-10 w-10 text-white"
                >
                  {ICONS[icon]}
                </svg>
              </div>

              <h3 className="mb-2 text-xl font-medium tracking-tight text-white">
                {t(`value${n}Title`)}
              </h3>
              <p className="mx-auto max-w-[38ch] text-body leading-[1.6] font-light text-purple-100/85">
                {t(`value${n}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
