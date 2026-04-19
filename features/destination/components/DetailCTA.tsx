import { Link } from '@/i18n/navigation'

interface Props {
  countryName: string
  title: string
  subtitle: string
  buttonText: string
}

export function DetailCTA({ countryName: _countryName, title, subtitle, buttonText }: Props) {
  return (
    <div className="bg-gradient-to-r from-brand-purple to-purple-700 rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
      <p className="text-white/80 mb-6 max-w-xl mx-auto">{subtitle}</p>
      <Link
        href="/#consultation"
        className="inline-block bg-white text-brand-purple font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  )
}
