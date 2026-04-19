import { Link } from '@/i18n/navigation'
import { FallbackImage } from '@/shared/components/common'
import { REGION_BADGE_COLORS, REGION_DISPLAY } from '../utils/constants'
import type { CountryCardData } from '../types'

interface Props {
  country: CountryCardData
  viewDetailsLabel: string
}

export function DestinationCard({ country, viewDetailsLabel }: Props) {
  const badgeClass = REGION_BADGE_COLORS[country.region] ?? 'bg-gray-600 text-white'
  const regionLabel = REGION_DISPLAY[country.region] ?? country.region

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Cover image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-purple-50">
        <FallbackImage
          src={country.cardImageUrl}
          alt={country.name}
          className="w-full h-full object-cover"
        />
        {/* Region badge */}
        <span
          className={`absolute top-3 left-3 text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full uppercase ${badgeClass}`}
        >
          {regionLabel}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-brand-purple">{country.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {/* {country.tagline ?? country.shortDescription ?? ''} */}
          {country.shortDescription}
        </p>
        <div className="mt-4">
          <Link
            href={`/destinations/${country.slug}`}
            className="inline-flex items-center gap-1 border border-gray-300 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:border-brand-purple hover:text-brand-purple transition-colors"
          >
            {viewDetailsLabel} →
          </Link>
        </div>
      </div>
    </div>
  )
}
