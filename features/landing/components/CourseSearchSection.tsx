'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useRouter } from '@/i18n/navigation'
import { CustomDropdown } from '@/shared/components/common'

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
    /** Null when Firmli did not return both totals. The banner line is then dropped. */
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

const SEGMENT_BTN_BASE =
  'flex-1 rounded-[4px] px-2 py-1.5 text-label font-medium whitespace-nowrap transition-colors'
const SEGMENT_BTN_SELECTED = 'bg-surface text-primary-text shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
const SEGMENT_BTN_UNSELECTED = 'text-secondary-text hover:text-primary-text'

/**
 * The design's segmented control shows exactly 5 pills with short labels, not
 * Firmli's full list of 12 study-level categories. Matched by Firmli's real
 * label so the value sent to the embedded finder is still theirs; the display
 * text is ours. Order here is the display order.
 */
const PILL_STUDY_LEVELS: { firmliLabel: string; translationKey: string }[] = [
  { firmliLabel: 'Bachelor Degree', translationKey: 'pillBachelor' },
  { firmliLabel: 'Master Degree', translationKey: 'pillMaster' },
  { firmliLabel: 'Diploma', translationKey: 'pillDiploma' },
  { firmliLabel: 'Certificate', translationKey: 'pillCertificate' },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0">
      <path
        d="M3.5 8h9m0 0L8.5 4m4 4-4 4"
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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="relative mx-auto max-w-wrap px-6"
      >
        {/* Self-contained card: the stats line that used to sit above the card
            as its own heading now lives inside it, as the top banner, so
            nothing above the card duplicates what the banner already says. */}
        <div className="overflow-hidden rounded-md border border-stroke bg-surface text-left shadow-card">
          <div className="border-b border-stroke bg-surface-0 px-8 py-4 text-center max-tablet:px-6">
            <p className="text-body font-normal text-secondary-text">
              {options.counts
                ? t('statBanner', {
                    programs: formatCount(options.counts.programs),
                    institutions: formatCount(options.counts.institutions),
                    countries: formatCount(options.countries.length),
                  })
                : t('statBannerNoCounts')}
            </p>
          </div>

          <form
            className="flex flex-col gap-6 p-8 max-tablet:p-6"
            onSubmit={(event) => {
              event.preventDefault()
              handleSearch()
            }}
          >
            {/* Country: a flag grid from tablet up, a plain select below it —
                15+ small flag buttons wrapping on a phone screen is worse than
                just picking from a list. */}
            <div className="hidden max-tablet:block">
              <CustomDropdown
                variant="field"
                label={t('countryLabel')}
                value={country}
                options={options.countries}
                onChange={setCountry}
                placeholder={t('anyCountry')}
              />
            </div>

            <div className="max-tablet:hidden">
              <p className="mb-2 text-label font-medium">{t('countryLabel')}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-3">
                {options.countries.map((option) => {
                  const code = FLAG_CODES[option.label]
                  const selected = country === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      aria-label={option.label}
                      onClick={() => setCountry(selected ? '' : option.value)}
                      className="group relative flex w-[46px] flex-col items-center gap-1.5"
                    >
                      <span
                        className={`h-[30.4px] w-[45.6px] overflow-hidden rounded-[2px] outline-offset-1 transition-[outline-color,outline-width] outline ${
                          selected
                            ? 'outline-[3px] outline-action'
                            : 'outline-1 outline-stroke hover:outline-stroke-strong'
                        }`}
                      >
                        {code ? (
                          <Image
                            src={`/images/flags/${code}.png`}
                            alt=""
                            width={46}
                            height={30}
                            unoptimized
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="grid h-full w-full place-items-center bg-surface-1 text-min font-medium text-muted-text">
                            {initials(option.label)}
                          </span>
                        )}
                      </span>
                      {selected ? (
                        <span className="text-center text-min leading-tight font-medium text-primary-text">
                          {option.label}
                        </span>
                      ) : (
                        <span className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 rounded-sm bg-primary-text px-2 py-1 text-min whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                          {option.label}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Study level: a plain select below tablet, a segmented pill
                control from tablet up — same data, same state, two controls. */}
            <div className="hidden max-tablet:block">
              <CustomDropdown
                variant="field"
                label={t('levelLabel')}
                value={level}
                options={options.studyLevels}
                onChange={setLevel}
                placeholder={t('anyLevel')}
              />
            </div>

            {/* Study level and Field of study share a row, as in the design —
                the segmented control (5 pills: "Any" plus the same 4 study
                levels the mockup shows, not Firmli's full list of 12,
                matched by label so the value sent is still Firmli's) beside
                the Field of study select. */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="max-tablet:hidden">
                <p className="mb-1.5 text-label font-medium">{t('levelLabel')}</p>
                <div className="flex gap-1 rounded-sm border border-stroke bg-surface-0 p-1">
                  <button
                    type="button"
                    aria-pressed={level === ''}
                    onClick={() => setLevel('')}
                    className={`${SEGMENT_BTN_BASE} ${level === '' ? SEGMENT_BTN_SELECTED : SEGMENT_BTN_UNSELECTED}`}
                  >
                    {t('anyLevelPill')}
                  </button>
                  {PILL_STUDY_LEVELS.map(({ firmliLabel, translationKey }) => {
                    const option = options.studyLevels.find((item) => item.label === firmliLabel)
                    if (!option) return null
                    const selected = level === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setLevel(selected ? '' : option.value)}
                        className={`${SEGMENT_BTN_BASE} ${selected ? SEGMENT_BTN_SELECTED : SEGMENT_BTN_UNSELECTED}`}
                      >
                        {t(translationKey)}
                      </button>
                    )
                  })}
                </div>
              </div>

              <CustomDropdown
                variant="field"
                label={t('fieldLabel')}
                value={field}
                options={options.fieldsOfStudy}
                onChange={setField}
                placeholder={t('anyField')}
              />
            </div>

            <button
              type="submit"
              className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 self-end rounded-full bg-action px-8 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
            >
              {t('searchButton')}
              <ArrowIcon />
            </button>
          </form>
        </div>

        <p className="mx-auto mt-6 text-center text-label font-normal text-white/70">
          {t.rich('consultationPrompt', {
            link: (chunks) => (
              <Link
                href="/#consultation"
                className="text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </motion.div>
    </section>
  )
}
