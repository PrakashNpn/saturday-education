'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'

type Step = {
  number: number
  titleKey: string
  descKey: string
  itemKeys: [string, string, string]
}

const STEPS: Step[] = [
  { number: 1, titleKey: 'step1Title', descKey: 'step1Desc', itemKeys: ['step1Item1', 'step1Item2', 'step1Item3'] },
  { number: 2, titleKey: 'step2Title', descKey: 'step2Desc', itemKeys: ['step2Item1', 'step2Item2', 'step2Item3'] },
  { number: 3, titleKey: 'step3Title', descKey: 'step3Desc', itemKeys: ['step3Item1', 'step3Item2', 'step3Item3'] },
  { number: 4, titleKey: 'step4Title', descKey: 'step4Desc', itemKeys: ['step4Item1', 'step4Item2', 'step4Item3'] },
]

export default function ServicesSection() {
  const t = useTranslations('Landing.services')
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
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:py-20 lg:pt-28 lg:pb-12"
      >
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
        >
          <h2
            className="font-extrabold text-brand-purple text-center leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.75rem)' }}
          >
            {t('headingPrefix')}{' '}
            {t('headingHighlight')}{' '}
            {t('headingSuffix')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500 text-center max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 mt-10 sm:mt-12">
          {/* Connecting line — runs through vertical center of cards, desktop only */}
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-purple-300 z-0" />
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative z-10 bg-white rounded-2xl shadow-md border border-gray-100 pt-8 pb-8 px-6 text-center cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-purple-200"
            >
              {/* Number badge — scales on card hover */}
              <div className="mx-auto w-12 h-12 rounded-full bg-brand-purple text-white font-bold text-lg flex items-center justify-center shadow-lg mb-4 transition-transform duration-300 ease-out group-hover:scale-110">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-brand-purple text-base sm:text-lg mb-3">
                {t(step.titleKey as Parameters<typeof t>[0])}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm sm:text-base mb-6 leading-relaxed">
                {t(step.descKey as Parameters<typeof t>[0])}
              </p>

              {/* Checklist */}
              <div className="space-y-2.5 text-left">
                {step.itemKeys.map((key) => (
                  <div key={key} className="flex items-start gap-2.5">
                    <Check size={16} className="text-purple-500 mt-0.5 shrink-0" />
                    <span className="text-sm font-semibold text-gray-800">
                      {t(key as Parameters<typeof t>[0])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
