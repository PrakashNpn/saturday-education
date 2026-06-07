import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { FallbackImage } from '@/shared/components/common'
import { REGION_DISPLAY } from '../utils/constants'
import type { CountryCardData } from '../types'

const COVER_GRADIENTS = [
  'bg-gradient-to-br from-brand-purple to-purple-900',
  'bg-gradient-to-br from-purple-900 to-brand-purple-dark',
  'bg-gradient-to-tl from-brand-purple to-violet-900',
  'bg-gradient-to-br from-indigo-900 to-brand-purple',
]

interface Props {
  country: CountryCardData
  viewDetailsLabel: string
  index?: number
}

export function DestinationCard({ country, viewDetailsLabel, index = 0 }: Props) {
  const regionLabel = REGION_DISPLAY[country.region] ?? country.region

  return (
    <Link
      href={`/destinations/${country.slug}`}
      className="group relative block rounded-2xl overflow-hidden h-64 md:h-72 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Background */}
      <FallbackImage
        src={country.cardImageUrl}
        alt={country.name}
        className="absolute inset-0 w-full h-full object-cover"
        fallbackClassName="absolute inset-0 w-full h-full"
        fallbackBg={COVER_GRADIENTS[index % COVER_GRADIENTS.length]}
      />

      {/* Bottom-weighted dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

      {/* Subtle hover brightening */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

      {/* Region badge — top left */}
      <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full uppercase">
        {regionLabel}
      </span>

      {/* Content — bottom anchored */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-bold text-xl text-white leading-tight mb-1">{country.name}</h3>
        {country._count.universities > 0 ? (
          <p className="text-white/70 text-xs font-medium mb-3">
            {country._count.universities} Partner {country._count.universities === 1 ? 'university' : 'universities'}
          </p>
        ) : country.shortDescription ? (
          <p className="text-white/70 text-xs mb-3 line-clamp-1">{country.shortDescription}</p>
        ) : null}
        <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-brand-purple transition-all duration-200">
          {viewDetailsLabel} <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}
