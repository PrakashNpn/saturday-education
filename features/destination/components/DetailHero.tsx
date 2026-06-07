import { ChevronRight, MapPin } from 'lucide-react'
import { Link } from '@/i18n/navigation'

interface Props {
  name: string
  tagline: string | null
  heroImageUrl: string | null
  region: string
  studyAbroadLabel: string
  breadcrumb: {
    home: string
    destinations: string
  }
}

export function DetailHero({ name, tagline, heroImageUrl, region, studyAbroadLabel, breadcrumb }: Props) {
  return (
    <div className="bg-neutral-50 pt-2 md:pt-2 pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-2 md:mb-3">
          <Link href="/" className="hover:text-brand-purple transition-colors">
            {breadcrumb.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
          <Link href="/destinations" className="hover:text-brand-purple transition-colors">
            {breadcrumb.destinations}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
          <span className="text-gray-700 font-semibold truncate">{name}</span>
        </nav>

        {/* Framed gallery image — fixed ratio so the photo is never stretched/cropped oddly */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-brand-purple to-purple-900 shadow-[0_8px_32px_rgba(89,13,130,0.16)]">
          {heroImageUrl && (
            <img
              src={heroImageUrl}
              alt={name}
              className="absolute inset-0 w-full h-full"
            />
          )}

          {/* Bottom-weighted overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Study Abroad badge — floats top-left like a "Hot Listing" tag */}
          <span className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center bg-white text-brand-purple text-[11px] md:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
            {studyAbroadLabel}
          </span>

          {/* Title block — overlaid bottom-left on the image */}
          <div className="absolute bottom-0 left-0 right-0 px-5 md:px-8 pb-5 md:pb-8">
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {region}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 drop-shadow-sm">
              {name}
            </h1>

            {tagline && (
              <p className="text-white/85 text-sm md:text-base max-w-2xl line-clamp-2">
                {tagline}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
