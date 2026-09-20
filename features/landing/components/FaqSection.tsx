'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'

const EASE = [0, 0, 0.2, 1] as const

const ITEM_KEYS = ['1', '2', '3', '4', '5'] as const

/**
 * Single-open accordion, matching the design: opening one question closes
 * whichever was open, rather than letting the list grow tall with several
 * answers showing at once. Height animates via a CSS grid-rows trick
 * (0fr → 1fr) instead of framer-motion's height:'auto', which needs a
 * measured pixel value to animate smoothly — the grid-rows approach doesn't,
 * so it works for arbitrary answer lengths with no extra JS.
 */
export default function FaqSection() {
  const t = useTranslations('Landing.faq')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const [openKey, setOpenKey] = useState<string | null>(null)

  const items = ITEM_KEYS.map((key) => ({
    key,
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }))

  return (
    <section id="faq" className="border-b border-stroke bg-surface py-20 max-tablet:py-14">
      <div className="mx-auto max-w-wrap px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: EASE }}
          className="mb-10 text-center"
        >
          <h2 className="text-title leading-[1.18] font-medium tracking-[-0.022em] whitespace-nowrap max-tablet:whitespace-normal">
            {t('heading')}
          </h2>
          <p className="mt-4 text-lede font-light leading-[1.55] text-secondary-text">{t('subtitle')}</p>
        </motion.div>

        <div className="mx-auto max-w-[46rem] divide-y divide-stroke border-y border-stroke">
          {items.map((item) => {
            const open = openKey === item.key
            return (
              <div key={item.key}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenKey(open ? null : item.key)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-card font-medium text-primary-text">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-1 text-secondary-text"
                  >
                    <Plus
                      size={16}
                      className={`transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-6 text-body font-light text-secondary-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
