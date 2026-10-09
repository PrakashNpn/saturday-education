'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Home, Tag, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0, 0, 0.2, 1] as const

// One icon per fact, in the same order as `facts` below. Decorative only, the
// three facts are still identified by their own text, not by these.
const FACT_ICONS = [Home, Tag, ShieldCheck]

export default function WhySaturdaySection() {
  const t = useTranslations('Landing.whySaturday')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  const facts = [
    { title: t('supportTitle'), body: t('supportBody') },
    { title: t('pricingTitle'), body: t('pricingBody') },
    {
      title: t('visaTitle'),
      // The 95% gets the same gold the "3,000+" stat above uses, rather than
      // reading as plain body text next to a number that's styled as a
      // headline figure.
      body: t.rich('visaBody', {
        percent: (chunks) => <span className="font-medium text-accent-ink">{chunks}</span>,
      }),
    },
  ]

  return (
    // White, not grey: the cards carry their own definition (a real border
    // and shadow) rather than relying on a tinted page background to stand
    // out against. Side glows now too, same two-tone purple/violet pairing
    // as the hero's own hero-glow-l/r and the footer, self-contained here
    // rather than reusing those classes directly since they're tuned for the
    // hero's own top-heavy layout, not this section's centred row.
    <section className="relative overflow-hidden bg-surface py-14 max-tablet:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_70%_at_0%_50%,rgba(127,2,235,0.06)_0%,rgba(127,2,235,0)_70%),radial-gradient(ellipse_50%_70%_at_100%_50%,rgba(92,9,245,0.06)_0%,rgba(92,9,245,0)_70%)]"
      />
      <div className="relative z-[1] mx-auto max-w-wrap px-6">
        {/* Only this block animates in the design; the facts row and the button
            below are static. `initial` never branches on the motion preference,
            which is null during SSR: the transition carries that instead. */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: EASE }
          }
          // 5fr/7fr rather than an even split: the counselling photo is a wide
          // 2.2:1 group shot, it needs the wider column. Grid default
          // (stretch) rather than items-start: the photo now fills the full
          // row height to match the text column, cropped via object-cover,
          // instead of sitting at its own natural, much shorter height.
          className="grid gap-10 md:grid-cols-[5fr_7fr]"
        >
          <div>
            <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
              {t('eyebrow')}
            </h2>
            <p className="mb-6 max-w-[28ch] text-section font-medium text-[#140A2B]">{t('headline')}</p>
            <p className="mb-6 max-w-[46ch] text-body font-light text-[#5B5370]">{t('body')}</p>
            <p className="text-title leading-none font-medium text-accent-ink tabular-nums">{t('statCount')}</p>
            <p className="mt-1 text-label font-normal text-[#6F6789]">{t('statLabel')}</p>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(20,10,43,0.35)]">
            <Image
              src="/images/hero/counselling.webp"
              alt={t('imageAlt')}
              fill
              unoptimized
              sizes="(max-width: 860px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* A soft gradient line instead of a flat hairline. */}
        <div aria-hidden="true" className="my-10 h-px bg-gradient-to-r from-transparent via-[#140A2B]/10 to-transparent" />

        {/* Same three facts, each a solid white card with a real border and
            shadow so it reads clearly on a white page, and a gentle scale on
            hover for a bit of premium interactivity. */}
        <div className="grid gap-4 sm:grid-cols-3">
          {facts.map((fact, index) => {
            const Icon = FACT_ICONS[index]
            return (
              <div
                key={fact.title}
                className="cursor-default rounded-2xl border border-stroke bg-white p-5 shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_20px_40px_-20px_rgba(127,2,235,0.35)]"
              >
                <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-surface-1">
                  <Icon className="size-4 text-brand" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <b className="mb-1 block text-label font-medium text-[#140A2B]">{fact.title}</b>
                <p className="text-label font-normal text-[#6F6789]">{fact.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
