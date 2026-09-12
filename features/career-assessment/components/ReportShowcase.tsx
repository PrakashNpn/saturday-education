'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0, 0, 0.2, 1] as const

interface Props {
  onStart: () => void
}

/** Nine of the report's eleven pages, rendered straight from the PDF our
 *  counsellors actually send. The tenth tile stands in for the rest. */
const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const
const BENEFITS = [
  ['b1Title', 'b1Body'],
  ['b2Title', 'b2Body'],
  ['b3Title', 'b3Body'],
  ['b4Title', 'b4Body'],
  ['b5Title', 'b5Body'],
  ['b6Title', 'b6Body'],
] as const

const SHEET =
  'relative aspect-[1/1.414] w-full rounded-none border border-neutral-200/40 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_20px_-3px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.7),0_20px_35px_-6px_rgba(0,0,0,0.9)]'

export function ReportShowcase({ onStart }: Props) {
  const t = useTranslations('careerAssessment.report')
  const prefersReducedMotion = useReducedMotion()

  // The two columns are stacks of three, so the checklist reads down each
  // column rather than across the pair.
  const columns = [BENEFITS.slice(0, 3), BENEFITS.slice(3)]

  return (
    <section className="border-b border-white/10 bg-[#120D1B] py-16 text-white max-tablet:py-12">
      {/* Only the content fades/rises — the dark band stays solid. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="mx-auto max-w-wrap px-6"
      >
        <div className="mb-10 max-w-2xl text-left">
          <h2 className="mb-2 text-section font-medium tracking-tight text-white">{t('title')}</h2>
          <p className="text-body leading-relaxed font-light text-white/80">{t('subtitle')}</p>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 md:grid-cols-5">
          {PAGES.map((page) => (
            <div key={page} className="group flex flex-col">
              <div className={SHEET}>
                {/* A second sheet peeking out behind, so each tile reads as a
                    stack of paper rather than a flat thumbnail. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 translate-x-[2px] translate-y-[2px] rounded-none border border-white/10 bg-white/20"
                />
                <Image
                  src={`/images/career-assessment/report-page-${page}.webp`}
                  alt={t(`pages.p${page}`)}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 200px"
                  className="rounded-none object-cover object-top"
                />
              </div>
              <span className="mt-2 block truncate text-center text-min font-light text-white/65">
                {t(`pages.p${page}`)}
              </span>
            </div>
          ))}

          <div className="flex flex-col">
            <div className="relative flex aspect-[1/1.414] w-full flex-col items-center justify-center rounded-none bg-white/[0.06] p-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_20px_-3px_rgba(0,0,0,0.7)] transition-colors duration-200 hover:bg-white/[0.12]">
              <span className="mb-3.5 text-body leading-snug font-medium text-white">
                {t('morePages')}
              </span>
              <button
                type="button"
                onClick={onStart}
                className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 text-label font-medium whitespace-nowrap text-action transition-colors hover:bg-white/90"
              >
                {t('moreCta')}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-left text-section font-medium text-white">{t('whyTitle')}</h3>
          <div className="grid gap-8 text-left md:grid-cols-2 lg:gap-14">
            {columns.map((column, index) => (
              <div key={index} className="space-y-6 sm:space-y-7">
                {column.map(([titleKey, bodyKey]) => (
                  <div key={titleKey} className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#120D1B] shadow-sm"
                    >
                      ✓
                    </span>
                    <div>
                      <strong className="block text-body font-medium text-white">
                        {t(`benefits.${titleKey}`)}
                      </strong>
                      <p className="mt-1 text-label leading-relaxed font-normal text-white/75">
                        {t(`benefits.${bodyKey}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-16 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover max-tablet:w-full"
          >
            {t('cta')}
          </button>
        </div>
      </motion.div>
    </section>
  )
}
