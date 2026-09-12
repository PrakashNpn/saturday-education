'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  searchValue: string
  onSearchChange: (value: string) => void
}

const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.09

export function DestinationsHero({ searchValue, onSearchChange }: Props) {
  const t = useTranslations('destinations')
  const [draft, setDraft] = useState(searchValue)
  const prefersReducedMotion = useReducedMotion()

  // Above the fold, so this runs on mount rather than on scroll into view —
  // same reasoning as the homepage's own HeroSection.
  const rise = (step: number, distance = 14, duration = 0.5) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay: step * STAGGER, ease: EASE },
  })

  return (
    // Same drifting dot texture as the homepage Course Finder, so the two dark
    // purple bands on the site read as the same surface.
    <section className="course-finder-texture relative overflow-hidden bg-[oklch(20%_0.10_307.4)] py-11 max-tablet:py-8">
      <div className="relative mx-auto max-w-wrap px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            {...rise(0)}
            className="text-title leading-tight font-medium text-white max-tablet:text-balance lg:whitespace-nowrap"
          >
            {t('heroTitle')}
          </motion.h1>
          <motion.p
            {...rise(1)}
            className="mx-auto mt-3 max-w-3xl text-balance text-body leading-relaxed font-light text-white/85"
          >
            {t('heroSubtitle')}
          </motion.p>
        </div>

        <motion.form
          {...rise(2)}
          onSubmit={(event) => {
            event.preventDefault()
            onSearchChange(draft)
          }}
          className="mx-auto mt-5 flex max-w-2xl items-center gap-3 rounded-full bg-surface p-2 pl-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="size-5 shrink-0 text-muted-text"
          >
            <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M17 17l-3.8-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            className="flex-1 border-0 bg-transparent text-body font-light text-primary-text placeholder:text-muted-text focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full bg-action px-6 text-label font-medium text-white transition-colors hover:bg-action-hover"
          >
            {t('searchButton')}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
