import { ChevronRight, MapPin } from 'lucide-react'
import { Link } from '@/i18n/navigation'

interface Props {
  name: string
  shortDescription: string | null
  ranking: number | null
  coverImageUrl: string | null
  logoUrl: string | null
  city: string | null
  countryName: string
  rankedLabel: string
  breadcrumb: {
    home: string
    universities: string
  }
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
  breadcrumb,
}: Props) {
  const location = [city, countryName].filter(Boolean).join(', ')
  const initial = name.charAt(0).toUpperCase()

  return (
    <div className="bg-neutral-50 pt-2 md:pt-3 pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-2 md:mb-3">
          <Link href="/" className="hover:text-brand-purple transition-colors">
            {breadcrumb.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
          <Link href="/universities" className="hover:text-brand-purple transition-colors">
            {breadcrumb.universities}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
          <span className="text-gray-700 font-semibold truncate">{name}</span>
        </nav>

        {/* Framed gallery image — fixed ratio so the photo is never stretched/cropped oddly */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-brand-purple to-purple-900 shadow-[0_8px_32px_rgba(89,13,130,0.16)]">
          {coverImageUrl && (
            <img
              src={coverImageUrl}
              alt={name}
              className="absolute inset-0 w-full h-full"
            />
          )}

          {/* Bottom-weighted overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Rank badge — floats top-left */}
          {ranking !== null && (
            <div className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-2 bg-black/35 backdrop-blur-md border border-white/15 text-white text-[11px] md:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              {rankedLabel}
            </div>
          )}

          {/* Content — overlaid bottom-left on the image */}
          <div className="absolute bottom-0 left-0 right-0 px-5 md:px-8 pb-5 md:pb-8">
            {location && (
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  {location}
                </span>
              </div>
            )}

            <div className="flex items-start gap-3 mb-2">
              <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white
                shadow-[0_8px_24px_rgba(0,0,0,0.3)]
                border border-white/80 overflow-hidden flex items-center justify-center">
                {logoUrl ? (
                  <img src={logoUrl} alt={`${name} logo`} className="w-full h-full object-contain p-1.5" />
                ) : (
                  <span className="text-brand-purple font-black text-xl select-none">{initial}</span>
                )}
              </div>

              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug drop-shadow-sm line-clamp-2">
                {name}
              </h1>
            </div>

            {shortDescription && (
              <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-2xl line-clamp-2">
                {shortDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
