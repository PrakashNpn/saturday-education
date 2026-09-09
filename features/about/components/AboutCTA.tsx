import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function AboutCTA() {
  const t = useTranslations('about')

  return (
    <section className="border-t border-stroke py-16 max-tablet:py-12">
      <div className="mx-auto max-w-wrap px-6 text-center">
        <h2 className="text-section font-medium">{t('ctaTitle')}</h2>
        <p className="mx-auto mt-2 max-w-[50ch] text-lede font-light text-secondary-text">
          {t('ctaSubtitle')}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center">
          <Link
            href="/#consultation"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-action px-16 text-body font-medium text-white transition-colors hover:bg-action-hover"
          >
            {t('ctaButton')}
          </Link>
          {/* The way out for someone not ready to talk to anyone yet. */}
          <Link
            href="/course-finder"
            className="mt-4 text-label font-medium text-action underline transition-opacity hover:opacity-80"
          >
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>
    </section>
  )
}
