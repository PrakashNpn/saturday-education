'use client'

// Catches a rendering error anywhere inside the locale segment, so it keeps
// the header and footer and can use the locale-aware Link, the same reasoning
// as the sibling not-found.tsx.
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: Props) {
  const t = useTranslations('errors')
  return (
    <section className="bg-canvas py-24 max-tablet:py-16">
      <div className="mx-auto flex max-w-wrap flex-col items-center px-6 text-center">
        <p className="text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          {t('errorEyebrow')}
        </p>
        <h1 className="mt-2 text-title font-medium tracking-tight text-primary-text">
          {t('errorTitle')}
        </h1>
        <p className="mt-3 max-w-[46ch] text-body leading-relaxed font-normal text-secondary-text">
          {t('errorBody')}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-13 cursor-pointer items-center justify-center rounded-full bg-action px-10 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
          >
            {t('retry')}
          </button>
          <Link
            href="/"
            className="inline-flex min-h-13 items-center justify-center rounded-full border border-action px-10 text-body font-medium whitespace-nowrap text-action transition-colors hover:bg-tint"
          >
            {t('home')}
          </Link>
        </div>
      </div>
    </section>
  )
}
