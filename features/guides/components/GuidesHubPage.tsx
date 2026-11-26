import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPublishedGuides } from '../services/guideService'
import { guideTopicLabel } from '../utils/topic'

export async function GuidesHubPage({ locale }: { locale: string }) {
  const [t, guides] = await Promise.all([
    getTranslations({ locale, namespace: 'guides' }),
    getPublishedGuides().catch(() => []),
  ])

  return (
    <main className="bg-canvas">
      <header className="mx-auto max-w-wrap px-6 pt-10 pb-8 max-tablet:pt-8 max-tablet:pb-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-stroke pb-5">
          <h1 className="text-title leading-none font-medium text-primary-text">{t('hubTitle')}</h1>
          {guides.length > 0 ? (
            <p className="text-label text-muted-text">
              {t('articleCount', { count: guides.length })}
            </p>
          ) : null}
        </div>
      </header>

      <section className="mx-auto max-w-wrap px-6 pb-14 max-tablet:pb-10">
        {guides.length === 0 ? (
          <div className="mx-auto max-w-xl py-10 text-center">
            <p className="text-card font-medium text-primary-text">{t('emptyTitle')}</p>
            <p className="mt-2 text-label leading-relaxed text-secondary-text">{t('emptyBody')}</p>
            <Link
              href="/#consultation"
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-full bg-action px-6 text-label font-medium text-white transition-colors hover:bg-action-hover"
            >
              {t('emptyCta')}
            </Link>
          </div>
        ) : (
          <ul className="grid gap-5 tablet:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => {
              const topic = guideTopicLabel(guide, t)
              return (
                <li key={guide.id}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-stroke bg-surface transition-shadow duration-300 hover:shadow-[0_20px_40px_-28px_rgba(23,126,141,0.45)]"
                  >
                    <div className="relative aspect-[16/10] bg-surface-0">
                      {guide.heroImageUrl ? (
                        <Image
                          src={guide.heroImageUrl}
                          alt={guide.heroImageAlt || guide.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(max-width: 860px) 100vw, 33vw"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-min font-medium tracking-[0.06em] text-action uppercase">
                        {topic}
                      </p>
                      <h2 className="mt-1.5 line-clamp-3 text-card leading-snug font-medium text-primary-text transition-colors group-hover:text-action">
                        {guide.title}
                      </h2>
                      <span className="mt-4 text-min font-medium text-action">
                        {t('readGuide')} →
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}
