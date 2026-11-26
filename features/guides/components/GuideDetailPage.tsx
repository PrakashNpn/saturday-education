import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SITE_URL } from '@/shared/constants/site'
import { JsonLd, faqPageJsonLd } from '@/shared/lib/seo/jsonLd'
import { getPublishedGuideBySlug } from '../services/guideService'
import { guideShareImage, type GuideDetailData } from '../types'
import { guideTopicLabel } from '../utils/topic'
import { GuideFaqs } from './GuideFaqs'
import { GuideImage } from './GuideImage'
import { GuideMarkdown } from './GuideMarkdown'

/** Comfortable reading measure (~65–70ch) centred in the page wrap. */
const COLUMN = 'mx-auto w-full max-w-[42rem]'

function articleJsonLd(guide: GuideDetailData) {
  const url = `${SITE_URL}/guides/${guide.slug}`
  const share = guideShareImage(guide)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: guide.seoTitle,
    name: guide.title,
    description: guide.metaDescription,
    url,
    mainEntityOfPage: url,
    inLanguage: 'en',
    datePublished: (guide.publishedAt ?? guide.updatedAt).toISOString().slice(0, 10),
    dateModified: guide.updatedAt.toISOString().slice(0, 10),
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#david-dhakal`,
      name: guide.authorName,
      jobTitle: guide.authorTitle,
      url: `${SITE_URL}/about`,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    ...(share ? { image: [`${SITE_URL}${share.url}`] } : {}),
    ...(guide.keywords ? { keywords: guide.keywords } : {}),
  }
}

function breadcrumbJsonLd(guideTitle: string, slug: string, guidesLabel: string, homeLabel: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: guidesLabel, item: `${SITE_URL}/guides` },
      {
        '@type': 'ListItem',
        position: 3,
        name: guideTitle,
        item: `${SITE_URL}/guides/${slug}`,
      },
    ],
  }
}

export async function GuideDetailPage({ slug, locale }: { slug: string; locale: string }) {
  const [guide, t] = await Promise.all([
    getPublishedGuideBySlug(slug),
    getTranslations({ locale, namespace: 'guides' }),
  ])
  if (!guide) notFound()

  const topic = guideTopicLabel(guide, t)

  return (
    <main className="bg-canvas">
      <JsonLd data={articleJsonLd(guide)} />
      <JsonLd data={breadcrumbJsonLd(guide.title, guide.slug, t('navLabel'), t('homeLabel'))} />
      {guide.faqs.length > 0 ? <JsonLd data={faqPageJsonLd(guide.faqs)} /> : null}

      <article className="px-6 pt-8 pb-16 max-tablet:pt-6 max-tablet:pb-12">
        <nav className={`${COLUMN} mb-8 text-label text-muted-text`} aria-label="Breadcrumb">
          <ol className="flex min-w-0 flex-wrap items-center gap-2">
            <li className="shrink-0">
              <Link href="/guides" className="transition-colors hover:text-action">
                {t('navLabel')}
              </Link>
            </li>
            <li aria-hidden="true" className="shrink-0 text-stroke-strong">
              /
            </li>
            <li className="min-w-0 text-secondary-text">
              <span className="line-clamp-1">{guide.seoTitle || guide.title}</span>
            </li>
          </ol>
        </nav>

        <header className={COLUMN}>
          <p className="text-min font-medium tracking-[0.08em] text-action uppercase">{topic}</p>
          <h1 className="mt-3 text-[clamp(1.65rem,1.25rem+1.6vw,2.15rem)] leading-[1.2] font-medium text-primary-text">
            {guide.title}
          </h1>
        </header>

        {guide.heroImageUrl ? (
          <div className={`${COLUMN} mt-8`}>
            <GuideImage
              src={guide.heroImageUrl}
              alt={guide.heroImageAlt || guide.title}
              caption={guide.heroImageAlt}
              priority
            />
          </div>
        ) : null}

        {guide.answerBox ? (
          <aside className={`${COLUMN} mt-9 border-l-2 border-action/40 pl-5`}>
            <p className="text-min font-medium tracking-[0.08em] text-action uppercase">
              {t('quickAnswer')}
            </p>
            <p className="mt-2.5 text-[1.0625rem] leading-[1.7] text-primary-text">{guide.answerBox}</p>
          </aside>
        ) : null}

        <div className={`${COLUMN} mt-10`}>
          <GuideMarkdown markdown={guide.bodyMarkdown} />
        </div>

        {guide.inlineImageUrl ? (
          <div className={`${COLUMN} mt-10`}>
            <GuideImage
              src={guide.inlineImageUrl}
              alt={guide.inlineImageAlt || guide.title}
              caption={guide.inlineImageAlt}
            />
          </div>
        ) : null}

        <div className={COLUMN}>
          <GuideFaqs faqs={guide.faqs} eyebrow={t('faqEyebrow')} title={t('faqTitle')} />
        </div>

        {guide.sourcesMarkdown ? (
          <section className={`${COLUMN} mt-14 border-t border-stroke pt-10`}>
            <h2 className="mb-4 text-body font-medium text-primary-text">{t('sourcesTitle')}</h2>
            <div className="text-label [&_a]:text-action [&_li]:mb-1.5 [&_p]:mb-2 [&_p]:text-muted-text [&_ul]:list-disc [&_ul]:pl-5">
              <GuideMarkdown markdown={guide.sourcesMarkdown} />
            </div>
          </section>
        ) : null}

        <section className={`${COLUMN} mt-14 rounded-[24px] bg-tint px-7 py-8 max-tablet:px-5 max-tablet:py-7`}>
          <p className="text-[1.2rem] leading-snug font-medium text-primary-text">{t('ctaTitle')}</p>
          <p className="mt-2.5 max-w-[42ch] text-label leading-relaxed text-secondary-text">
            {t('ctaBody')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#consultation"
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-action px-6 text-label font-medium text-white transition-colors hover:bg-action-hover"
            >
              {t('ctaConsultation')}
            </Link>
            {guide.relatedDestinationSlug ? (
              <Link
                href={`/destinations/${guide.relatedDestinationSlug}`}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-stroke bg-surface px-6 text-label font-medium text-primary-text transition-colors hover:border-action/40 hover:text-action"
              >
                {t('ctaDestination')}
              </Link>
            ) : (
              <Link
                href="/course-finder"
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-stroke bg-surface px-6 text-label font-medium text-primary-text transition-colors hover:border-action/40 hover:text-action"
              >
                {t('ctaCourseFinder')}
              </Link>
            )}
          </div>
        </section>
      </article>
    </main>
  )
}
