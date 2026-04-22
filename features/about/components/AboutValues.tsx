import { Heart, Eye, GraduationCap, Users } from 'lucide-react'

interface Props {
  translations: {
    valuesLabel: string
    valuesTitle: string
    valuesSubtitle: string
    value1Title: string
    value1Desc: string
    value2Title: string
    value2Desc: string
    value3Title: string
    value3Desc: string
    value4Title: string
    value4Desc: string
  }
}

export function AboutValues({ translations: t }: Props) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {t.valuesLabel}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.valuesTitle}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t.valuesSubtitle}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">

          {/* Card 1 — Student-First: wide top-left, white */}
          <div className="md:col-span-3 bg-white rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-sm">
            <div className="absolute top-6 right-6 text-gray-100">
              <Heart className="w-16 h-16" />
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-purple-50 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.value1Title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm">{t.value1Desc}</p>
            </div>
          </div>

          {/* Card 2 — Radical Transparency: narrow top-right, purple */}
          <div className="md:col-span-2 bg-brand-purple rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute top-6 right-6 text-white/20">
              <Eye className="w-14 h-14" />
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.value2Title}</h3>
              <p className="text-white/80 leading-relaxed">{t.value2Desc}</p>
            </div>
          </div>

          {/* Card 3 — Proven Expertise: narrow bottom-left, white */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[200px] shadow-sm">
            <div className="absolute top-6 right-6 text-brand-purple/10">
              <GraduationCap className="w-14 h-14" />
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-purple-50 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5 text-brand-purple" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.value3Title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.value3Desc}</p>
            </div>
          </div>

          {/* Card 4 — Long-term Partnership: wide bottom-right, dark gradient */}
          <div className="md:col-span-3 relative rounded-2xl overflow-hidden flex flex-col justify-end min-h-[200px] bg-gradient-to-br from-brand-purple-dark via-purple-900 to-purple-800">
            {/* Decorative circles */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full" />
            <div className="absolute top-12 right-14 w-20 h-20 bg-white/5 rounded-full" />
            <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-6 -translate-y-6" />

            <div className="relative z-10 p-8">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.value4Title}</h3>
              <p className="text-white/75 text-sm leading-relaxed max-w-xs">{t.value4Desc}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
