'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const FACTOR_KEYS = ['factor1', 'factor2', 'factor3', 'factor4', 'factor5'] as const

export default function CountryGuideSection() {
  const t = useTranslations('Landing.countryGuide')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  return (
    <section className="bg-neutral-100">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — CTA Content */}
          <div>
            <h2
              className="font-extrabold text-brand-purple leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.75rem)' }}
            >
              {t('heading')}
            </h2>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-500 max-w-lg">
              {t('description')}
            </p>

            <Link
              href="/country-finder"
              className="inline-block mt-8 sm:mt-10 bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold rounded-full px-8 py-4 text-base sm:text-lg transition-colors duration-200"
            >
              {t('ctaButton')}
            </Link>
          </div>

          {/* RIGHT — Factors Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-brand-purple mb-6">
              {t('factorsHeading')}
            </h3>

            <ul>
              {FACTOR_KEYS.map((key, index) => (
                <motion.li
                  key={key}
                  className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-b-0"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: prefersReducedMotion ? 0 : 16 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: 0.3 + index * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-brand-purple font-bold text-sm flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-800">
                    {t(key)}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
