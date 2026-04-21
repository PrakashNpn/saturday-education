import { MapPin } from 'lucide-react'

interface Props {
  name: string
  tagline: string | null
  heroImageUrl: string | null
  region: string
  studyAbroadLabel: string
}

export function DetailHero({ name, tagline, heroImageUrl, region, studyAbroadLabel }: Props) {
  return (
    <div className="relative h-[320px] md:h-[440px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-purple-900" />
      {heroImageUrl && (
        <img
          src={heroImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      )}

      {/* Bottom-weighted dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/75" />

      {/* Bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-neutral-50/30" />

      {/* Content — left-aligned, bottom-anchored */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-12 pb-8 md:pb-12 max-w-7xl mx-auto">
        <span className="inline-flex items-center bg-white text-brand-purple text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 w-fit shadow-sm">
          {studyAbroadLabel}
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
          {name}
        </h1>

        {tagline && (
          <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-2 mb-3">
            {tagline}
          </p>
        )}

        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit mt-1">
          <MapPin className="w-3 h-3 text-white flex-shrink-0" />
          <span className="text-white text-xs font-semibold">{region}</span>
        </div>
      </div>
    </div>
  )
}
