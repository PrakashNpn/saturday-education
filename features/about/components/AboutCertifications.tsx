interface Cert {
  name: string
  body: string
}

const CERTS: Cert[] = [
  { name: 'ICEF Certified Agency', body: 'ICEF GmbH' },
  { name: 'British Council Partner', body: 'British Council' },
  { name: 'QS Rankings Partner', body: 'QS World University Rankings' },
  { name: 'Google for Education', body: 'Google LLC' },
  { name: 'AIEA Member', body: 'Assoc. of Intl. Education Admins.' },
  { name: 'ISO 9001 Certified', body: 'International Organization for Standardization' },
]

const GRADIENTS = [
  'bg-gradient-to-br from-brand-purple to-purple-900',
  'bg-gradient-to-br from-purple-900 to-brand-purple-dark',
  'bg-gradient-to-tl from-brand-purple to-violet-900',
  'bg-gradient-to-br from-indigo-900 to-brand-purple',
  'bg-gradient-to-br from-brand-purple-dark to-purple-800',
  'bg-gradient-to-tl from-violet-900 to-brand-purple',
]

interface Props {
  translations: {
    certsLabel: string
    certsTitle: string
    certsSubtitle: string
  }
}

export function AboutCertifications({ translations: t }: Props) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {t.certsLabel}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.certsTitle}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t.certsSubtitle}
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {CERTS.map(({ name, body }, i) => (
            <div
              key={name}
              className={`relative h-48 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${GRADIENTS[i % GRADIENTS.length]}`}
            >
              {/* Dot grid texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              />

              {/* Decorative circle */}
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
              <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-white/5" />

              {/* Text — anchored to bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm leading-snug">{name}</p>
                <p className="text-white/60 text-[10px] mt-0.5 leading-snug">{body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
