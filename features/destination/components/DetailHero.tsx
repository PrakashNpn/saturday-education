interface Props {
  name: string
  tagline: string | null
  heroImageUrl: string | null
  studyAbroadLabel: string
}

export function DetailHero({ name, tagline, heroImageUrl, studyAbroadLabel }: Props) {
  return (
    <div className="relative h-[280px] md:h-[350px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-purple via-purple-800 to-purple-900" />
      {heroImageUrl && (
        <img
          src={heroImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          {studyAbroadLabel}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
          {name}
        </h1>
        {tagline && (
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">{tagline}</p>
        )}
      </div>
    </div>
  )
}
