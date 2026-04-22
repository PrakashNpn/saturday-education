import { GraduationCap, CheckCircle, Layers } from 'lucide-react'

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
  const reasons = [
    { icon: GraduationCap, title: t.why1Title, desc: t.why1Desc },
    { icon: CheckCircle, title: t.why2Title, desc: t.why2Desc },
    { icon: Layers, title: t.why3Title, desc: t.why3Desc },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {t.whyLabel}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.whyTitle}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t.whySubtitle}
          </p>
        </div>

        {/* Differentiator cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border-l-4 border-brand-purple p-6 md:p-8 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-purple-100 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-brand-purple" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
