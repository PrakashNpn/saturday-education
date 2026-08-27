'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRouter } from '@/i18n/navigation'
import { SelectMenu } from '@/shared/components/ui/SelectMenu'

// The lists come from the Course Finder feature and are passed in by the page,
// so this component never reaches across features for them. The shapes are
// declared here for the same reason.
type FinderOption = { value: string; label: string }

const formatCount = (value: number) => value.toLocaleString('en-US')

interface Props {
  options: {
    countries: FinderOption[]
    studyLevels: FinderOption[]
    fieldsOfStudy: FinderOption[]
    /** Null when Firmli did not return both totals. The line is then dropped. */
    counts: { programs: number; institutions: number } | null
  }
}

export default function CourseSearchSection({ options }: Props) {
  const t = useTranslations('Landing.courseSearch')
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
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
    <section className="bg-neutral-100 py-12 md:py-16">
      <motion.div
        ref={ref}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const }
        }
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 px-6 sm:px-10 lg:px-14 py-10 sm:py-12">

          {/* Message on the left, controls on the right, so the width of the card
              is doing something. Collapses to one column below lg. */}
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple">
                {t('eyebrow')}
              </p>
              <h2
                className="font-extrabold text-brand-purple leading-tight mt-2.5"
                style={{ fontSize: 'clamp(1.6rem, 1.1rem + 2vw, 2.5rem)' }}
              >
                {t('heading')}
              </h2>
              <p className="text-gray-500 mt-3 text-base">{t('subtitle')}</p>

              {options.counts && (
                <p className="text-sm text-gray-500 mt-4">
                  {t.rich('stats', {
                    // Grouped with Western digits in every locale, to match the
                    // hero stats directly above. Left to the page locale,
                    // Burmese would render these as Myanmar numerals while
                    // 3,000+ a few hundred pixels higher stayed Western.
                    programs: formatCount(options.counts.programs),
                    institutions: formatCount(options.counts.institutions),
                    b: (chunks) => (
                      <span className="font-bold text-gray-900">{chunks}</span>
                    ),
                  })}
                </p>
              )}
            </div>

            {/* Destination and level share a row; the wider field of study and the
                button run the full width beneath them. */}
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectMenu
                label={t('destinationLabel')}
                placeholder={t('allOption')}
                options={options.countries}
                value={country}
                onChange={setCountry}
              />
              <SelectMenu
                label={t('levelLabel')}
                placeholder={t('allOption')}
                options={options.studyLevels}
                value={level}
                onChange={setLevel}
              />
              <div className="sm:col-span-2">
                <SelectMenu
                  label={t('fieldLabel')}
                  placeholder={t('allOption')}
                  options={options.fieldsOfStudy}
                  value={field}
                  onChange={setField}
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="sm:col-span-2 w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold rounded-full px-10 py-3.5 mt-1 cursor-pointer transition-colors duration-200"
              >
                {t('searchButton')}
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  )
}
