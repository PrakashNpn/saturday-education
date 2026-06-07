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
  const initial = name.charAt(0).toUpperCase()

  return (
    <div className="relative h-[360px] md:h-[480px] overflow-hidden">
      {/* Background image or fallback gradient */}
      {coverImageUrl ? (
        <img
          src={coverImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-purple-900" />
      )}

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
      {/* Subtle purple tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/12 to-transparent" />

      {/* Content — anchored to bottom */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-12 pb-10 md:pb-14 max-w-7xl mx-auto">

        {/* Rank badge */}
        {ranking !== null && (
          <div className="inline-flex items-center gap-2 bg-black/35 backdrop-blur-md border border-white/15 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            {rankedLabel}
          </div>
        )}

        {/* Text block — very subtle backdrop for readability */}
        <div className="relative -mx-3 px-3 py-3 rounded-2xl bg-black/10 mb-3
          [mask-image:linear-gradient(to_right,black_70%,transparent_100%)]">

          {/* Logo + Name row — items-end so logo grounds at name baseline */}
          <div className="flex items-end gap-4 mb-2.5">
            <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white
              shadow-[0_8px_32px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.2)]
              border border-white/80 overflow-hidden flex items-center justify-center">
              {logoUrl ? (
                <img src={logoUrl} alt={`${name} logo`} className="w-full h-full object-contain p-1.5" />
              ) : (
                <span className="text-brand-purple font-black text-xl select-none">{initial}</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-sm">
              {name}
            </h1>
          </div>

          {shortDescription && (
            <p className="text-white/90 text-sm md:text-base max-w-2xl line-clamp-2 leading-relaxed drop-shadow-sm">
              {shortDescription}
            </p>
          )}
        </div>

        {location && (
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full w-fit">
            <MapPin className="w-3 h-3 text-white/80 flex-shrink-0" />
            <span className="text-white/90 text-xs font-medium">{location}</span>
          </div>
        )}
      </div>
    </div>
  )
}
