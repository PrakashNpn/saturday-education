'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.055

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-3">
      <path
        d="M4 10.5 8 14l8-8"
        stroke="currentColor"
        strokeWidth="2.2"
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
    label: String(n).padStart(2, '0'),
    title: t(`step${n}Title`),
    desc: t(`step${n}Desc`),
    items: [t(`step${n}Item1`), t(`step${n}Item2`), t(`step${n}Item3`)],
  }))

  return (
    <section className="relative overflow-hidden border-t border-stroke bg-surface py-14 max-tablet:py-10">
      {/* Same side glows as Why Saturday Education, self-contained per
          section rather than a shared class, since each needs this inset
          relative z-[1] treatment matched to its own content wrapper. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_70%_at_0%_50%,rgba(23,126,141,0.06)_0%,rgba(23,126,141,0)_70%),radial-gradient(ellipse_50%_70%_at_100%_50%,rgba(0,51,58,0.06)_0%,rgba(0,51,58,0)_70%)]"
      />
      <div className="relative z-[1] mx-auto max-w-wrap px-6 text-center">
        <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          {t('eyebrow')}
        </h2>
        <p className="mx-auto mb-10 max-w-[46ch] text-section font-medium">{t('headline')}</p>

        {/* Four real cards, not one divided box: this genuinely is a
            sequence, so a faint gradient line behind the numbers shows the
            steps connecting to each other, rather than just four equal-weight
            columns with a vertical rule between them. */}
        <div
          ref={ref}
          className="relative grid grid-cols-4 grid-rows-[auto_auto_auto] gap-5 pt-5 max-tablet:grid-cols-1"
        >
          {/* This container only has top padding (pt-5), no bottom padding,
              so its own height is exactly pt-5 + the cards' height, and the
              cards start exactly pt-5 below its top edge. That makes the
              card's true vertical centre calc(50% + pt-5/2) of THIS
              container, not plain 50% (that would be biased 10px toward the
              top by half of that padding) and not the number badge's own
              position (the badge now sits inside the card's own top padding,
              not straddling this container's edge the way it used to). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[calc(50%+10px)] right-12 left-12 h-px bg-[linear-gradient(90deg,#177E8D_0%,#177E8D_50%,#00333A_100%)] opacity-25 max-tablet:hidden"
          />
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
              // Hover lift lives here, not in a CSS :hover class: this div's
              // `transform` is already driven by Framer Motion for the entry
              // animation above, and a CSS transform on the same property
              // was fighting it, smooth going in, snapping back going out.
              // A `transition` nested inside whileHover applies to both
              // directions of that gesture, so it no longer inherits the
              // entry transition's stagger delay either.
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -6, scale: 1.02, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
              }
              // Subgrid on the badge and title rows: the badge is the same
              // fixed size on every card, so row 1 is simply uniform, but a
              // title that wraps to two lines on one card still shouldn't
              // push that card's own description and checklist down
              // relative to the other three, so row 2 is as tall as the
              // tallest title across all four. Description and checklist are
              // deliberately NOT subgridded the same way, our four
              // descriptions vary more in length than a shared row would
              // tolerate, forcing one into that shared row would leave a gap
              // between it and its own checklist on every shorter card. They
              // stay grouped in row 3 instead, so each card's checklist
              // follows its own description directly, and any leftover
              // height to match the tallest card shows up as quiet space at
              // the card's own bottom, not a mid-card gap.
              className="relative row-span-3 grid grid-rows-subgrid gap-2.5 overflow-visible rounded-2xl border border-stroke bg-white/70 px-6 pt-7 pb-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,51,58,0.04)] backdrop-blur-md transition-shadow duration-300 ease-out hover:shadow-[0_20px_40px_-20px_rgba(23,126,141,0.35)]"
            >
              {/* Liquid glass: the same top-down wash and translucency the
                  course finder card uses, self-contained per card so it
                  doesn't depend on anything sitting behind the section. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(23,126,141,0.09)_0%,rgba(23,126,141,0.02)_45%,rgba(23,126,141,0)_80%)]"
              />
              <span className="relative z-[1] grid size-11 justify-self-center place-items-center rounded-full bg-action text-label font-semibold text-white">
                {step.label}
              </span>
              <h3 className="relative z-[1] text-[19px] font-semibold text-primary-text">{step.title}</h3>
              <div className="relative z-[1] flex flex-col items-center gap-2.5">
                <p className="w-full text-left text-label font-normal text-secondary-text">{step.desc}</p>
                <ul className="mt-1 flex w-full flex-col items-start gap-2 text-left">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] font-normal text-secondary-text">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-tint text-brand">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
