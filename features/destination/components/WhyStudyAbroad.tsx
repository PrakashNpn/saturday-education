import { Globe, TrendingUp, Compass, Camera } from 'lucide-react'

interface Props {
  translations: {
    whyStudyAbroadLabel: string
    whyStudyAbroadTitle: string
    whyStudyAbroadSubtitle: string
    globalExposure: string
    globalExposureDesc: string
    careerEdge: string
    careerEdgeDesc: string
    personalGrowth: string
    personalGrowthDesc: string
    lifetimeMemories: string
    lifetimeMemoriesDesc: string
  }
}

export function WhyStudyAbroad({ translations: t }: Props) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-purple text-xs tracking-widest font-semibold uppercase mb-3">
            {t.whyStudyAbroadLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.whyStudyAbroadTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.whyStudyAbroadSubtitle}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {/* Global Exposure — wider top-left */}
          <div className="md:col-span-3 bg-white rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-sm">
            <div className="absolute top-6 right-6 text-gray-100">
              <Globe className="w-16 h-16" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.globalExposure}</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm">{t.globalExposureDesc}</p>
            </div>
          </div>

          {/* Career Edge — narrower top-right, purple */}
          <div className="md:col-span-2 bg-brand-purple rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute top-6 right-6 text-white/20">
              <TrendingUp className="w-14 h-14" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">{t.careerEdge}</h3>
              <p className="text-white/80 leading-relaxed">{t.careerEdgeDesc}</p>
            </div>
          </div>

          {/* Personal Growth — narrower bottom-left */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[200px] shadow-sm">
            <div className="absolute top-6 right-6 text-brand-purple/10">
              <Compass className="w-14 h-14" />
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-purple-50 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5 text-brand-purple" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.personalGrowth}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.personalGrowthDesc}</p>
            </div>
          </div>

          {/* A Lifetime of Memories — wider bottom-right, dark gradient */}
          <div className="md:col-span-3 relative rounded-2xl overflow-hidden flex flex-col justify-end min-h-[200px] bg-gradient-to-br from-brand-purple-dark via-purple-900 to-purple-800">
            {/* Decorative circles */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full" />
            <div className="absolute top-12 right-14 w-20 h-20 bg-white/5 rounded-full" />
            <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-6 -translate-y-6" />

            <div className="relative z-10 p-8">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.lifetimeMemories}</h3>
              <p className="text-white/75 text-sm leading-relaxed max-w-xs">{t.lifetimeMemoriesDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
