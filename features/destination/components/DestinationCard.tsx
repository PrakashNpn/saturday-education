'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { FLAG_CODES, REGION_DISPLAY } from '../utils/constants'
import type { CountryCardData } from '../types'

interface Props {
  country: CountryCardData
  viewDetailsLabel: string
  /** Position within the grid. Used only to stagger the reveal by column
   *  (index % COLS), so a card far down a long, filtered list never queues up
   *  a multi-second delay behind everything above it. */
  index?: number
}

const EASE = [0, 0, 0.2, 1] as const
// Matches the grid's own lg:grid-cols-3 — the widest column count it reaches.
const COLS = 3

/** Flag and name, repeated in both the resting and hover layers so the two
 *  cross-fade in place rather than the text jumping. */
function CountryLabel({ country }: { country: CountryCardData }) {
  const code = FLAG_CODES[country.slug]
  return (
    <span className="mb-0.5 flex items-center gap-1.5">
      {code && (
        <span
          title={country.name}
          className="size-5 shrink-0 overflow-hidden rounded-full border border-white/40"
        >
          <Image
            src={`/images/flags/${code}.png`}
            alt=""
            width={40}
            height={40}
            unoptimized
            className="h-full w-full object-cover"
          />
        </span>
      )}
      <b className="text-card font-medium text-white">{country.name}</b>
    </span>
  )
}

export function DestinationCard({ country, viewDetailsLabel, index = 0 }: Props) {
  const t = useTranslations('destinations')
  // Sourced from Firmli's course-finder catalogue, shown as "partner
  // universities" as a deliberate choice while real partnerships with that
  // catalogue are being put in place — not a signed-partner count today.
  // Null when Firmli has no match for this country, in which case the line
  // is simply omitted rather than showing a zero that isn't really zero.
  const count =
    country.firmliInstitutionCount != null
      ? t('cardInstitutionCount', { count: country.firmliInstitutionCount })
      : null
  const prefersReducedMotion = useReducedMotion()

  // The first two rows sit inside the initial viewport on ordinary screen
  // heights (confirmed by measurement), so any card among them can end up
  // being the page's LCP element — their image sizes are all nearly
  // identical, so which one "wins" is really just network timing.
  // `initial={false}` skips the opacity-gated starting state entirely for
  // those rows — measured empirically elsewhere that a framer-motion fade
  // delays when Chrome counts an element as painted, by roughly its full
  // duration, not just its stagger delay. Rows further down, which need an
  // actual scroll to reach, keep the staggered reveal.
  const isAboveFold = index < COLS * 2

  return (
    <motion.div
      initial={isAboveFold ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={
        prefersReducedMotion || isAboveFold
          ? { duration: 0 }
          : { duration: 0.45, delay: (index % COLS) * 0.08, ease: EASE }
      }
    >
      <Link
        href={`/destinations/${country.slug}`}
        className="group relative block overflow-hidden rounded-[28px] border border-stroke bg-surface-1 shadow-[0_1px_2px_rgba(20,10,43,0.04)] transition-shadow duration-300 ease-out hover:shadow-[0_24px_48px_-24px_rgba(127,2,235,0.4)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {country.cardImageUrl && (
            <Image
              src={country.cardImageUrl}
              alt={country.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}

          {/* Frosted glass pill rather than a flat dark chip, same liquid
              material the rest of the site uses now. */}
          <span className="absolute top-3 left-3 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-min font-medium tracking-[0.04em] text-white uppercase backdrop-blur-md">
            {REGION_DISPLAY[country.region] ?? country.region}
          </span>

          {/* Resting state: just the country and its institution count. Scrim
              tinted toward the brand ink (#140A2B, the same deep purple-black
              used for headline text elsewhere) instead of flat neutral black,
              so even the photo cards carry a trace of the brand colour. */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#140A2B]/85 to-transparent p-4 pt-8 transition-opacity duration-200 group-hover:opacity-0">
            <CountryLabel country={country} />
            {count && <p className="text-label font-normal text-white/85">{count}</p>}
          </div>

          {/* Hover: the tagline and the way in. */}
          <div className="absolute inset-0 flex flex-col justify-end bg-[#140A2B]/85 p-4 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100">
            <CountryLabel country={country} />
            {count && <p className="mb-1 text-label font-normal text-white/85">{count}</p>}
            {country.tagline && (
              <p className="mb-2 line-clamp-2 text-label font-normal text-white">{country.tagline}</p>
            )}
            <span className="inline-flex w-fit items-center rounded-full bg-white px-3.5 py-1.5 text-min font-medium text-action transition-colors group-hover:bg-white/90">
              {viewDetailsLabel}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
