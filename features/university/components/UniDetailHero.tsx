import { MapPin } from 'lucide-react'

interface Props {
  name: string
  shortDescription: string | null
  ranking: number | null
  coverImageUrl: string | null
  logoUrl: string | null
  city: string | null
  countryName: string
  rankedLabel: string
}

export function UniDetailHero({
  name,
  shortDescription,
  ranking,
  coverImageUrl,
  logoUrl,
  city,
  countryName,
  rankedLabel,
}: Props) {
  const location = [city, countryName].filter(Boolean).join(', ')

  return (
    <div className="relative h-[320px] md:h-[440px] overflow-hidden">
      {/* Background image or fallback gradient */}
      {coverImageUrl ? (
        <img
          src={coverImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-purple-900" />
      )}

      {/* Dark overlay — bottom-weighted for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/75" />

      {/* Logo — floating top-right */}
      {logoUrl && (
        <div className="absolute top-6 right-6 md:top-8 md:right-10 z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white shadow-lg border border-white/20 overflow-hidden flex items-center justify-center">
          <img src={logoUrl} alt={`${name} logo`} className="w-full h-full object-contain p-1.5" />
        </div>
      )}

      {/* Content — left-aligned, anchored to bottom */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-12 pb-8 md:pb-12 max-w-7xl mx-auto">
        {ranking !== null && (
          <span className="inline-flex items-center gap-1.5 bg-white text-brand-purple text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 w-fit shadow-sm">
            🏆 {rankedLabel}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
          {name}
        </h1>

        {shortDescription && (
          <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-2 mb-3">
            {shortDescription}
          </p>
        )}

        {location && (
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit mt-1">
            <MapPin className="w-3 h-3 text-white flex-shrink-0" />
            <span className="text-white text-xs font-semibold">{location}</span>
          </div>
        )}
      </div>
    </div>
  )
}
