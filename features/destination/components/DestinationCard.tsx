'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { FLAG_CODES, REGION_DISPLAY } from '../utils/constants'
import type { CountryCardData } from '../types'

interface Props {
  country: CountryCardData
  viewDetailsLabel: string
}

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
            className="h-full w-full object-cover"
          />
        </span>
      )}
      <b className="text-card font-medium text-white">{country.name}</b>
    </span>
  )
}

export function DestinationCard({ country, viewDetailsLabel }: Props) {
  const t = useTranslations('destinations')
  const count = t('cardPartnerCount', { count: country._count.universities })

  return (
    <Link
      href={`/destinations/${country.slug}`}
      className="group relative block overflow-hidden rounded-sm border border-stroke bg-surface-1"
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

        <span className="absolute top-3 left-3 rounded-full bg-primary-text/70 px-2.5 py-1 text-min font-medium tracking-[0.04em] text-white uppercase">
          {REGION_DISPLAY[country.region] ?? country.region}
        </span>

        {/* Resting state: just the country and its partner count. */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-text/80 to-transparent p-4 pt-8 transition-opacity duration-200 group-hover:opacity-0">
          <CountryLabel country={country} />
          <p className="text-label font-normal text-white/85">{count}</p>
        </div>

        {/* Hover: the tagline and the way in. */}
        <div className="absolute inset-0 flex flex-col justify-end bg-primary-text/80 p-4 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100">
          <CountryLabel country={country} />
          <p className="mb-1 text-label font-normal text-white/85">{count}</p>
          {country.tagline && (
            <p className="mb-2 line-clamp-2 text-label font-normal text-white">{country.tagline}</p>
          )}
          <span className="inline-flex w-fit items-center rounded-full bg-white px-3.5 py-1.5 text-min font-medium text-action transition-colors group-hover:bg-white/90">
            {viewDetailsLabel}
          </span>
        </div>
      </div>
    </Link>
  )
}
