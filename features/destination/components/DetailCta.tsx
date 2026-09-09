import { Link } from '@/i18n/navigation'
import { CountryBackdrop } from './CountryBackdrop'

interface Props {
  backdropUrl: string | null
  title: string
  ctaLabel: string
}

export function DetailCta({ backdropUrl, title, ctaLabel }: Props) {
  return (
    <section className="relative overflow-hidden bg-black py-16 text-center text-white max-tablet:py-12">
      <CountryBackdrop url={backdropUrl} />

      <div className="relative z-10 mx-auto max-w-wrap px-6">
        <p className="mb-6 text-section font-medium text-white">{title}</p>
        <Link
          href="/#consultation"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}
