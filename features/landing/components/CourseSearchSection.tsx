'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { CustomDropdown } from '@/shared/components/common'

// The lists come from the Course Finder feature and are passed in by the page,
// so this component never reaches across features for them. The shapes are
// declared here for the same reason.
type FinderOption = { value: string; label: string }

interface Props {
  options: {
    countries: FinderOption[]
    studyLevels: FinderOption[]
    fieldsOfStudy: FinderOption[]
    /** Null when Firmli did not return both totals. The count line is then dropped. */
    counts: { programs: number; institutions: number } | null
  }
}

/**
 * Firmli's country names mapped to ISO 3166-1 alpha-2, which is how the flag
 * files are named. Kept here rather than in the Course Finder service because
 * it is purely about how this section draws the list. A destination without a
 * mapping is left out of the flag grid (it stays in the phone dropdown).
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

const formatCount = (value: number) => value.toLocaleString('en-US')

// How many flags sit in each explicit row of the country grid. Fixed rather
// than left to flex-wrap, so a row's identity is known and only the row
// holding the selected flag can be given the extra space its caption needs.
const FLAGS_PER_ROW = 9
function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size))
  return rows
}

// border-transparent always present (colour toggles, not width) so a
// selected pill's own border never shifts its size against its siblings.
const SEGMENT_BTN_BASE =
  'flex-1 rounded-sm border border-transparent px-3 py-1.5 text-label font-medium whitespace-nowrap transition-colors'
// A soft tint, not a solid purple fill at any darkness: this pill sits in
// the same card as the "Find Programmes" button below it, and any solid
// purple fill here — dark or bright — visually competed with that actual
// submit button for attention. A light background plus coloured text reads
// as "selected" without reading as "the action to take", the same
// convention selected state uses elsewhere in the app (e.g. the admin
// sidebar's active link). The border is what separates a genuinely
// selected pill from a merely hovered unselected one, which otherwise
// looks identical (hover below also lands on bg-tint/text-brand).
const SEGMENT_BTN_SELECTED = 'bg-tint text-brand font-semibold border-action/20'
// A near-white hover fill was nearly invisible here: the pill track itself is
// already bg-white/50 sitting on the card's own bg-white/55, so white-on-white
// barely shifted at all. A purple tint reads clearly regardless.
const SEGMENT_BTN_UNSELECTED = 'text-secondary-text hover:bg-tint hover:text-brand'

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

const FIELD_LABEL = 'mb-2 text-[15px] font-semibold tracking-wide text-secondary-text uppercase'

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

/**
 * The course finder card for the top of the home page, rendered inside
 * HeroSection, which owns placement and entrance motion. Flags sit in a column
 * on the left with a short name under each one, study level and field of
 * study on the right, and the search button and count line centred below.
 */
export default function CourseSearchSection({ options }: Props) {
  const t = useTranslations('Landing.courseSearch')
  const router = useRouter()

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
    <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/55 px-6 pt-6 pb-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(92,9,245,0.08)] backdrop-blur-xl backdrop-saturate-150 tablet:px-9">
      {/* Liquid glass: a light wash from the top of the card, fading out
          before it reaches the bottom. The card's own translucency and blur
          do the rest of the "liquid" look. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[28px] bg-[linear-gradient(to_bottom,rgba(127,2,235,0.07)_0%,rgba(127,2,235,0.02)_45%,rgba(127,2,235,0)_80%)]"
      />
      <form
        className="relative z-[1] flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          handleSearch()
        }}
      >
        <div className="grid gap-6 tablet:grid-cols-[1.4fr_1fr] tablet:gap-10">
          {/* Country: a flag grid from tablet up, a plain select below it —
              24 small flag buttons wrapping on a phone screen is worse than
              just picking from a list. */}
          <div className="hidden max-tablet:block">
            <p className={FIELD_LABEL}>{t('countryLabel')}</p>
            <CustomDropdown
              variant="field-glass"
              value={country}
              options={options.countries}
              onChange={setCountry}
              placeholder={t('anyCountry')}
            />
          </div>

          <div className="max-tablet:hidden">
            <p className={FIELD_LABEL}>{t('countryLabel')}</p>
            {/* Flag only, no permanent label under it: at 24 destinations, a
                name under every flag was a lot of small repeated text in one
                card. The name still shows, above the flag on hover, below it
                once selected, so at most one is ever visible at a time.
                Rows are explicit (FLAGS_PER_ROW each) rather than a plain
                flex-wrap, so only the row holding the selected flag gets the
                extra space its caption needs below it; every other row stays
                at the tight default gap. */}
            <div className="flex flex-col gap-y-2.5">
              {chunk(
                options.countries.filter((option) => FLAG_CODES[option.label]),
                FLAGS_PER_ROW,
              ).map((row, rowIndex) => {
                const rowHasSelected = row.some((option) => option.value === country)
                return (
                  <div
                    key={rowIndex}
                    className={`flex gap-x-2.5 transition-[margin] duration-150 ${rowHasSelected ? 'mb-4' : ''}`}
                  >
                    {row.map((option) => {
                      const selected = country === option.value
                      return (
                        <div key={option.value} className="group relative">
                          <button
                            type="button"
                            aria-pressed={selected}
                            aria-label={option.label}
                            onClick={() => setCountry(selected ? '' : option.value)}
                            className={`block h-[30px] w-[40px] cursor-pointer overflow-hidden rounded-sm outline-offset-1 transition-[outline-color,outline-width] outline ${
                              selected
                                ? 'outline-[3px] outline-action'
                                : 'outline-1 outline-stroke hover:outline-stroke-strong'
                            }`}
                          >
                            <Image
                              src={`/images/flags/${FLAG_CODES[option.label]}.png`}
                              alt=""
                              width={40}
                              height={30}
                              unoptimized
                              className="h-full w-full object-cover"
                            />
                          </button>

                          {/* Hover: name floats up above the flag. Plain CSS,
                              so it's instant on a pointer device with no
                              state, and a momentary overlap with the row
                              above while hovering is normal tooltip
                              behaviour, unlike the persistent selected
                              caption, it doesn't need reserved space. */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 translate-y-1 rounded-sm bg-structure px-1.5 py-0.5 text-[13px] font-medium whitespace-nowrap text-white opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100"
                          >
                            {option.label}
                          </span>

                          {/* Selected: name drops in below the flag. */}
                          <AnimatePresence>
                            {selected && (
                              <motion.span
                                aria-hidden="true"
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.18 }}
                                className="pointer-events-none absolute top-full left-1/2 mt-1 -translate-x-1/2 text-[13px] font-semibold whitespace-nowrap text-primary-text"
                              >
                                {option.label}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Study level: a plain select below tablet, a segmented pill
                control from tablet up — same data, same state, two controls. */}
            <div className="hidden max-tablet:block">
              <p className={FIELD_LABEL}>{t('levelLabel')}</p>
              <CustomDropdown
                variant="field-glass"
                value={level}
                options={options.studyLevels}
                onChange={setLevel}
                placeholder={t('anyLevel')}
              />
            </div>

            <div className="max-tablet:hidden">
              <p className={FIELD_LABEL}>{t('levelLabel')}</p>
              <div className="flex gap-1 rounded-md border border-stroke/70 bg-white/50 p-1 shadow-[0_1px_2px_rgba(20,10,43,0.05),0_8px_16px_-12px_rgba(92,9,245,0.25)] backdrop-blur-sm">
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

            <div>
              <p className={FIELD_LABEL}>{t('fieldLabel')}</p>
              <CustomDropdown
                variant="field-glass"
                value={field}
                options={options.fieldsOfStudy}
                onChange={setField}
                placeholder={t('anyField')}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-10 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
          >
            {t('searchButton')}
            <ArrowIcon />
          </button>

          <p className="text-center text-[15px] text-secondary-text">
            {options.counts
              ? t('statBanner', {
                  programs: formatCount(options.counts.programs),
                  institutions: formatCount(options.counts.institutions),
                })
              : t('statBannerNoCounts')}
          </p>
        </div>
      </form>
    </div>
  )
}
