import { Link } from '@/i18n/navigation'

interface Props {
  translations: {
    ctaTitle: string
    ctaSubtitle: string
    ctaButton: string
  }
}

export function AboutCTA({ translations: t }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative bg-gradient-to-b from-brand-purple to-purple-900 rounded-2xl px-8 py-14 md:py-20 text-center overflow-hidden">

          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />

          {/* Decorative rings */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10" />
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/10" />
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10" />
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/10" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {t.ctaTitle}
            </h2>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
              {t.ctaSubtitle}
            </p>
            <Link
              href="/#consultation"
              className="inline-flex items-center gap-2 bg-white text-brand-purple font-bold text-sm px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              ✦ {t.ctaButton}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
