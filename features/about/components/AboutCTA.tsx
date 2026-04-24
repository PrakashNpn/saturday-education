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
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative bg-gradient-to-b from-brand-purple to-purple-900 rounded-2xl px-8 py-10 md:py-12 text-center overflow-hidden">

          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              {t.ctaTitle}
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-7">
              {t.ctaSubtitle}
            </p>
            <Link
              href="/#consultation"
              className="inline-flex items-center gap-2 bg-white text-brand-purple font-bold text-sm px-7 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              ✦ {t.ctaButton}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
