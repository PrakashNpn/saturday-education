'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { useRouter } from '@/i18n/navigation'

const EASE = [0, 0, 0.2, 1] as const

// The lists come from the Course Finder feature and are passed in by the page,
// so this component never reaches across features for them. The shapes are
// declared here for the same reason.
type FinderOption = { value: string; label: string }

interface Props {
  options: {
    countries: FinderOption[]
    studyLevels: FinderOption[]
    fieldsOfStudy: FinderOption[]
    /** Null when Firmli did not return both totals. The line is then dropped. */
    counts: { programs: number; institutions: number } | null
  }
}

/**
 * Firmli's country names mapped to ISO 3166-1 alpha-2, which is how the flag
 * files are named. Kept here rather than in the Course Finder service because
 * it is purely about how this section draws the list. Anything unmapped falls
 * back to initials, so a newly signed destination still gets a usable button.
 */
const FLAG_CODES: Record<string, string> = {
  Australia: 'au',
  Austria: 'at',
  Belgium: 'be',
  Canada: 'ca',
  China: 'cn',
  'Czech Republic': 'cz',
  Denmark: 'dk',
  Finland: 'fi',
  France: 'fr',
  Germany: 'de',
  Greece: 'gr',
  Grenada: 'gd',
  'Hong Kong S.A.R.': 'hk',
  Hungary: 'hu',
  India: 'in',
  Indonesia: 'id',
  Ireland: 'ie',
  Italy: 'it',
  Japan: 'jp',
  Malaysia: 'my',
  Mauritius: 'mu',
  Netherlands: 'nl',
  'New Zealand': 'nz',
  Norway: 'no',
  Philippines: 'ph',
  Poland: 'pl',
  Portugal: 'pt',
  Singapore: 'sg',
  'South Korea': 'kr',
  Spain: 'es',
  Sweden: 'se',
  Switzerland: 'ch',
  Taiwan: 'tw',
  Thailand: 'th',
  Turkey: 'tr',
  'United Arab Emirates': 'ae',
  'United Kingdom': 'gb',
  'United States': 'us',
  Vietnam: 'vn',
}

const initials = (label: string) =>
  label
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? '')
    .join('')
    .toUpperCase()

const formatCount = (value: number) => value.toLocaleString('en-US')

const SELECT_CLASS =
  'peer w-full appearance-none pr-10 rounded-[4px] border border-stroke bg-surface-0 px-3.5 py-2 font-sans text-body font-light text-primary-text transition-colors focus:border-action focus:bg-surface focus:outline-none focus:ring-2 focus:ring-action/15'

function Chevron() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-text transition-colors peer-focus:text-action"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CourseSearchSection({ options }: Props) {
  const t = useTranslations('Landing.courseSearch')
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()

  const [country, setCountry] = useState('')
  const [level, setLevel] = useState('')
  const [field, setField] = useState('')

  function handleSearch() {
    const params = new URLSearchParams()
    if (country) params.set('country', country)
    if (level) params.set('level', level)
    if (field) params.set('field', field)

    const query = params.toString()
    router.push(`/course-finder${query ? `?${query}` : ''}`)
  }

  return (
    // The dotted texture drifts one tile over 30s. It stops entirely under
    // prefers-reduced-motion, which the rule in globals.css handles.
    <section className="course-finder-texture relative overflow-hidden border-t border-stroke bg-[oklch(20%_0.10_307.4)] py-14 max-tablet:py-10">
      {/* Only the content fades/rises — the dark textured band stays solid
          throughout. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="relative mx-auto max-w-wrap px-6"
      >
        <div className="mb-8 text-center">
          <h2 className="text-section font-medium text-white">{t('heading')}</h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-lede font-light text-white/85">
            {options.counts
              ? t('subtitle', {
                  // Grouped with Western digits in every locale, to match the
                  // hero stats. Left to the page locale, Burmese would render
                  // these as Myanmar numerals while 3,000+ further up stayed
                  // Western.
                  programs: formatCount(options.counts.programs),
                  institutions: formatCount(options.counts.institutions),
                  countries: formatCount(options.countries.length),
                })
              : t('subtitleNoCounts')}
          </p>
        </div>

        {/* A card is always light, even inside a dark section. */}
        <div className="overflow-hidden rounded-sm border border-stroke bg-surface md:grid md:grid-cols-2">
          <div className="p-6">
            <form
              className="flex flex-col gap-6"
              onSubmit={(event) => {
                event.preventDefault()
                handleSearch()
              }}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="mb-2 text-label font-medium">{t('countryLabel')}</p>
                  <div className="flex flex-wrap gap-2">
                    {options.countries.map((option) => {
                      const code = FLAG_CODES[option.label]
                      const selected = country === option.value
                      return (
                        <div key={option.value} className="group relative">
                          <button
                            type="button"
                            aria-pressed={selected}
                            aria-label={option.label}
                            onClick={() => setCountry(selected ? '' : option.value)}
                            className={`size-9 overflow-hidden rounded-full border-2 transition-colors ${
                              selected
                                ? 'border-action'
                                : 'border-stroke group-hover:border-stroke-strong'
                            }`}
                          >
                            {code ? (
                              <Image
                                src={`/images/flags/${code}.png`}
                                alt=""
                                width={40}
                                height={40}
                                unoptimized
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="grid h-full w-full place-items-center bg-surface-1 text-min font-medium text-muted-text">
                                {initials(option.label)}
                              </span>
                            )}
                          </button>
                          <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-sm bg-primary-text px-2 py-1 text-min whitespace-nowrap text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                            {option.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <label className="flex flex-col gap-1.5 text-label font-medium text-primary-text">
                  {t('levelLabel')}
                  <span className="relative block">
                    <select
                      value={level}
                      onChange={(event) => setLevel(event.target.value)}
                      className={SELECT_CLASS}
                    >
                      <option value="">{t('anyLevel')}</option>
                      {options.studyLevels.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <Chevron />
                  </span>
                </label>

                <label className="flex flex-col gap-1.5 text-label font-medium text-primary-text">
                  {t('fieldLabel')}
                  <span className="relative block">
                    <select
                      value={field}
                      onChange={(event) => setField(event.target.value)}
                      className={SELECT_CLASS}
                    >
                      <option value="">{t('anyField')}</option>
                      {options.fieldsOfStudy.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <Chevron />
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 self-start rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
              >
                {t('searchButton')}
              </button>
            </form>
          </div>

          {/* Sits left of the form from md up, below it on a phone. */}
          <div className="group relative min-h-[220px] overflow-hidden border-t border-stroke max-tablet:min-h-[160px] md:order-first md:border-t-0 md:border-r">
            <Image
              src="/images/landing/desk-globe.webp"
              alt={t('imageAlt')}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="-scale-x-100 object-cover"
            />
            {/* Unsplash attribution. Revealed on hover so it stays out of the
                way, but it is in the markup and reachable by keyboard. */}
            <div className="absolute inset-0 flex items-end bg-primary-text/0 p-4 opacity-0 transition-opacity duration-200 group-hover:bg-primary-text/60 group-hover:opacity-100 focus-within:bg-primary-text/60 focus-within:opacity-100">
              <p className="text-label text-white">
                {t('creditBy')}{' '}
                <a
                  href="https://unsplash.com/@kylejglenn"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:no-underline"
                >
                  Kyle Glenn
                </a>{' '}
                {t('creditOn')}{' '}
                <a
                  href="https://unsplash.com/photos/desk-globe-on-table-nXt5HtLmlgE"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:no-underline"
                >
                  Unsplash
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
