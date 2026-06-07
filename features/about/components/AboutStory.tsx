interface Milestone {
  year: string
  label: string
}

interface Props {
  translations: {
    storyLabel: string
    storyTitle: string
    storyBody1: string
    storyBody2: string
    storyHighlight: string
    storyHighlightSub: string
    milestone1Year: string
    milestone1Label: string
    milestone2Year: string
    milestone2Label: string
    milestone3Year: string
    milestone3Label: string
  }
}

export function AboutStory({ translations: t }: Props) {
  const milestones: Milestone[] = [
    { year: t.milestone1Year, label: t.milestone1Label },
    { year: t.milestone2Year, label: t.milestone2Label },
    { year: t.milestone3Year, label: t.milestone3Label },
  ]

  const cardStats = [
    { value: '2', label: 'Target Countries' },
    { value: '10+', label: 'Advisors' },
    { value: 'Aug 2026', label: 'Launch Date' },
    { value: 'Asia', label: 'Expansion Vision' },
  ]

  return (
    <section className="pt-12 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: narrative + milestones */}
          <div>
            <div className="inline-flex items-center bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              {t.storyLabel}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-6 leading-tight">
              {t.storyTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t.storyBody1}
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              {t.storyBody2}
            </p>

            {/* Milestone timeline */}
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-purple mt-1 flex-shrink-0" />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-brand-purple-100 my-1.5" />
                    )}
                  </div>
                  <div className={`${i < milestones.length - 1 ? 'pb-6' : ''}`}>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-brand-purple">
                      {m.year}
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                      {m.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: decorative highlight card */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-brand-purple-50 rounded-full opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-100 rounded-full opacity-40" />

            <div className="relative bg-gradient-to-b from-brand-purple to-purple-900 rounded-2xl p-8 md:p-10 text-center overflow-hidden">
              {/* Decorative rings */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/10" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-white/10" />

              {/* Dot grid */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              />

              <div className="relative z-10">
                {/* Eyebrow */}
                <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
                  {t.storyHighlightSub}
                </p>

                {/* Hero year */}
                <div className="text-6xl md:text-7xl font-black text-white mb-4 leading-none">
                  2026
                </div>

                <div className="w-10 h-px bg-white/30 mx-auto mb-4" />

                {/* Tagline */}
                <p className="text-white/90 font-semibold text-base leading-snug max-w-xs mx-auto mb-8">
                  {t.storyHighlight}
                </p>

                {/* 2×2 stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {cardStats.map(({ value, label }) => (
                    <div
                      key={label}
                      className="bg-white/10 border border-white/15 rounded-xl py-4 px-3"
                    >
                      <p className="text-white font-bold text-2xl leading-none">{value}</p>
                      <p className="text-purple-200 text-[10px] uppercase tracking-wider mt-1.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom mission quote */}
                <div className="border-t border-white/15 pt-6">
                  <p className="text-white/70 text-sm leading-relaxed italic">
                    "Honest guidance from people who have been there."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
