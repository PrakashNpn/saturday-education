'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.055

// A barely-there purple that deepens across the four cards. At this chroma it
// reads as a direction of travel rather than as colour.
const TINTS = [
  'bg-[oklch(97%_0.002_307.4)]',
  'bg-[oklch(97%_0.005_307.4)]',
  'bg-[oklch(97%_0.008_307.4)]',
  'bg-[oklch(97%_0.011_307.4)]',
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 size-4 shrink-0">
      <path
        d="M4 10.5 8 14l8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ServicesSection() {
  const t = useTranslations('Landing.services')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  const steps = [1, 2, 3, 4].map((n) => ({
    n,
    title: t(`step${n}Title`),
    desc: t(`step${n}Desc`),
    items: [t(`step${n}Item1`), t(`step${n}Item2`), t(`step${n}Item3`)],
  }))

  return (
    <section className="border-t border-stroke bg-surface py-14 max-tablet:py-10">
      <div className="mx-auto max-w-wrap px-6 text-center">
        <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          {t('eyebrow')}
        </h2>
        <p className="mx-auto mb-10 max-w-[46ch] text-section font-medium">{t('headline')}</p>

        {/* The four rows are declared on the container and each card takes them
            with grid-rows-subgrid, so the numbers, headings, paragraphs and
            lists line up across all four however long the copy runs. Below the
            tablet breakpoint the cards stack and the divider flips to
            horizontal. */}
        <div
          ref={ref}
          className="grid grid-cols-4 grid-rows-[auto_auto_auto_auto] divide-x divide-stroke overflow-hidden rounded-md border border-stroke max-tablet:grid-cols-1 max-tablet:grid-rows-none max-tablet:divide-x-0 max-tablet:divide-y"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: index * STAGGER, ease: EASE }
              }
              className={`row-span-4 grid grid-rows-subgrid gap-3 px-5 py-8 text-left max-tablet:row-span-1 max-tablet:grid-rows-none max-tablet:block max-tablet:p-6 ${TINTS[index]}`}
            >
              <span className="grid size-8 place-items-center rounded-full bg-structure text-label font-medium text-white">
                {step.n}
              </span>
              <h3 className="text-card font-medium text-primary-text">{step.title}</h3>
              <p className="text-body font-light text-secondary-text">{step.desc}</p>
              <ul className="flex flex-col gap-2">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-label font-medium text-action"
                  >
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
