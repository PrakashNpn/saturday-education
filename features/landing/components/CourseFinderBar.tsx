'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { CustomDropdown } from '@/shared/components/common'
import { formatNumber } from '@/shared/utils/formatNumber'
import { FLAG_CODES } from '../utils/flagCodes'

// The lists come from the Course Finder feature and are passed in by the page,
// so this component never reaches across features for them.
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

/** Destinations offered as one-tap chips, by Firmli's own country name. A name
 *  Firmli does not return is skipped, so the row never shows a dead chip. */
const POPULAR = ['Germany', 'Canada', 'Ireland', 'New Zealand', 'Malaysia', 'Thailand']

/** Chips read better short; everything else uses Firmli's name as it is. */
const SHORT_NAME: Record<string, string> = { 'United Kingdom': 'UK', 'United States': 'USA' }


// A small touch on the shared glass field, for this card only: a soft
// teal-tinted hairline, a bright edge along the top, a faint inner shade along
// the bottom and a short light shadow, so each field sits slightly into the
// glass. Hover and focus keep the field's own teal border.
const FIELD_TWEAK =
  '[&>button]:border-[rgba(0,51,58,.13)] [&>button]:bg-white/75 [&>button]:shadow-[inset_0_1px_0_rgba(255,255,255,.95),inset_0_-1px_0_rgba(0,51,58,.03),0_2px_6px_-3px_rgba(0,51,58,.1)]'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0">
      <path
        d="M3.5 8h9m0 0L8.5 4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The course finder for the liquid hero: a row of popular destinations, the
 * three fields and the search button, in one frosted card. Searching sends
 * country, level and field to the Course Finder page.
 */
export default function CourseFinderBar({ options }: Props) {
  const t = useTranslations('Landing.courseSearch')
  const th = useTranslations('heroLiquid')
  const router = useRouter()
  const locale = useLocale()

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

  const popular = POPULAR.map((name) => options.countries.find((option) => option.label === name)).filter(
    (option): option is FinderOption => Boolean(option),
  )

  return (
    <div
      className="relative overflow-hidden rounded-[26px] px-5 pt-6 pb-5 text-left tablet:px-8"
      style={{
        background:
          'linear-gradient(135deg,rgba(255,255,255,.80) 0%,rgba(255,255,255,.66) 50%,rgba(240,251,253,.74) 100%)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        border: '1px solid rgba(255,255,255,.75)',
        boxShadow:
          'inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -1px 0 rgba(255,255,255,.4),0 0 0 1px rgba(0,51,58,.07),0 22px 44px -30px rgba(0,51,58,.28),0 4px 14px -8px rgba(0,51,58,.12)',
      }}
    >
      {/* The liquid part: a bright sheen from the top-left and a faint sky-blue
          glow in the opposite corner, over the card's own blur. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 52% 46% at 8% 0%,rgba(255,255,255,.75) 0%,rgba(255,255,255,0) 70%),linear-gradient(115deg,rgba(255,255,255,.35) 0%,rgba(255,255,255,0) 34%),radial-gradient(ellipse 36% 40% at 100% 100%,rgba(197,248,255,.55) 0%,rgba(197,248,255,0) 72%)',
        }}
      />

      <form
        className="relative flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          handleSearch()
        }}
      >
        {popular.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-min font-semibold tracking-[0.08em] text-secondary-text uppercase">
              {th('popular')}
            </span>
            {popular.map((option) => {
              const selected = country === option.value
              const flag = FLAG_CODES[option.label]
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setCountry(selected ? '' : option.value)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full py-1 pr-3 pl-1.5 text-[13px] transition-colors ${
                    selected
                      ? 'border-[1.5px] border-action bg-[linear-gradient(180deg,rgba(255,255,255,.95),rgba(197,248,255,.55))] font-semibold text-action-hover shadow-[0_8px_16px_-10px_rgba(23,126,141,.7),inset_0_1px_0_#fff]'
                      : 'border border-[rgba(0,51,58,.12)] bg-white/70 text-secondary-text shadow-[inset_0_1px_0_rgba(255,255,255,.95)] hover:bg-white'
                  }`}
                >
                  {flag && (
                    <Image
                      src={`/images/flags/${flag}.png`}
                      alt=""
                      width={20}
                      height={13}
                      unoptimized
                      className="h-[13px] w-5 rounded-[3px] object-cover"
                    />
                  )}
                  {SHORT_NAME[option.label] ?? option.label}
                </button>
              )
            })}
            {/* Text, not a link: it tells the visitor the Destination menu
                below holds more than these six. Teal for the brand, but with
                no underline so it does not promise a click. */}
            <span className="ml-1 text-[13px] font-semibold text-action">{th('allDestinations')}</span>
          </div>
        )}

        <div className="grid gap-3 tablet:grid-cols-[repeat(3,minmax(0,1fr))_auto] tablet:items-end">
          <CustomDropdown
            variant="field-glass"
            size="form"
            className={FIELD_TWEAK}
            label={th('destinationLabel')}
            value={country}
            options={options.countries}
            onChange={setCountry}
            placeholder={t('anyCountry')}
          />
          <CustomDropdown
            variant="field-glass"
            size="form"
            className={FIELD_TWEAK}
            label={t('levelLabel')}
            value={level}
            options={options.studyLevels}
            onChange={setLevel}
            placeholder={t('anyLevel')}
          />
          <CustomDropdown
            variant="field-glass"
            size="form"
            className={FIELD_TWEAK}
            label={t('fieldLabel')}
            value={field}
            options={options.fieldsOfStudy}
            onChange={setField}
            placeholder={t('anyField')}
          />
          <button
            type="submit"
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/55 px-7 text-body font-semibold whitespace-nowrap text-white transition-[filter] hover:brightness-110"
            style={{
              background: 'linear-gradient(180deg,#22A0B1 0%,#177E8D 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.55),0 14px 26px -12px rgba(23,126,141,.85)',
            }}
          >
            {t('searchButton')}
            <ArrowIcon />
          </button>
        </div>

        <p className="text-center text-label text-secondary-text">
          {options.counts
            ? t('statBanner', {
                programs: formatNumber(options.counts.programs, locale),
                institutions: formatNumber(options.counts.institutions, locale),
              })
            : t('statBannerNoCounts')}
        </p>
      </form>
    </div>
  )
}
