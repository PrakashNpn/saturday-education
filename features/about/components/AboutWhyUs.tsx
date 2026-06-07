interface Reason {
  num: string
  title: string
  desc: string
  featured: boolean
}

interface Props {
  translations: {
    whyLabel: string
    whyTitle: string
    whySubtitle: string
    why1Title: string
    why1Desc: string
    why2Title: string
    why2Desc: string
    why3Title: string
    why3Desc: string
  }
}

export function AboutWhyUs({ translations: t }: Props) {
  const reasons: Reason[] = [
    { num: '01', title: t.why1Title, desc: t.why1Desc, featured: false },
    { num: '02', title: t.why2Title, desc: t.why2Desc, featured: true },
    { num: '03', title: t.why3Title, desc: t.why3Desc, featured: false },
  ]

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {t.whyLabel}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-4">
            {t.whyTitle}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t.whySubtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map(({ num, title, desc, featured }) => (
            <div
              key={num}
              className={`relative rounded-2xl p-8 md:p-10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                featured
                  ? 'bg-gradient-to-br from-brand-purple via-brand-purple to-brand-purple-dark shadow-md'
                  : 'bg-white shadow-sm'
              }`}
            >
              {/* Large background number */}
              <span
                className={`absolute -top-3 -right-1 text-[110px] font-black leading-none select-none pointer-events-none ${
                  featured ? 'text-white/10' : 'text-gray-100'
                }`}
              >
                {num}
              </span>

              {/* Content */}
              <div className="relative">
                <p
                  className={`text-xs font-bold uppercase tracking-widest mb-6 ${
                    featured ? 'text-white/50' : 'text-brand-purple/50'
                  }`}
                >
                  {num}
                </p>
                <h3
                  className={`font-bold text-xl leading-snug mb-4 ${
                    featured ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    featured ? 'text-white/70' : 'text-gray-500'
                  }`}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
