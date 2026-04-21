import { Link } from '@/i18n/navigation'

interface Props {
  title: string
  subtitle: string
  buttonLabel: string
}

export function UniversityCTA({ title, subtitle, buttonLabel }: Props) {
  return (
    <section className="bg-neutral-50">
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="bg-brand-purple-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-2">{title}</h2>
          <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>
        </div>
        <Link
          href="/#consultation"
          className="flex-shrink-0 inline-block bg-brand-purple text-white font-semibold px-8 py-3.5 rounded-full hover:bg-brand-purple-dark transition-colors text-sm md:text-base text-center whitespace-nowrap"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
    </section>
  )
}
