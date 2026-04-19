import { Link } from '@/i18n/navigation'

interface Props {
  translations: {
    ctaTitle: string
    ctaSubtitle: string
    ctaButton: string
  }
}

export function DestinationsCTA({ translations: t }: Props) {
  return (
    <div className="bg-gradient-to-r from-brand-purple via-purple-800 to-brand-purple-dark rounded-2xl px-8 py-14 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
      <p className="text-white/75 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
        {t.ctaSubtitle}
      </p>
      <Link
        href="/#consultation"
        className="inline-block bg-white text-brand-purple font-semibold px-8 py-3.5 rounded-full hover:bg-gray-50 transition-colors text-sm md:text-base"
      >
        {t.ctaButton}
      </Link>
    </div>
  )
}
