import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { Reveal } from '@/shared/components/motion/Reveal'
import { getCountryBySlug } from '../services/destinationService'
import { REGION_DISPLAY } from '../utils/constants'
import { DetailHero } from './DetailHero'
import { DetailNav } from './DetailNav'
import { DetailCta } from './DetailCta'
import { CountryOverview } from './CountryOverview'
import { CountryAdvantages } from './CountryAdvantages'
import { AcademicSpecialties } from './AcademicSpecialties'
import { StudentJourney } from './StudentJourney'
import { CountryFAQs } from './CountryFAQs'

interface Props {
  slug: string
}

/** Matches the nav's lg:top-36, so an anchor jump parks the heading level with
 *  where the rail sits rather than under the sticky header. */
const SECTION = 'scroll-mt-36'

export async function DestinationDetailPage({ slug }: Props) {
  const locale = await getLocale()
  const country = await getCountryBySlug(slug, locale)
  if (!country) notFound()

  const t = await getTranslations('destinations')

  // Partner Universities section is hidden for now — most countries have too
  // few published partners to show as a section (several have zero). The
  // component (PartnerUniversities.tsx) and its data are left intact so this
  // is a straightforward restore once there are more per country.
  const sections = [
    { id: 'overview', label: t('overview') },
    { id: 'why-study-here', label: t('whyStudyHere') },
    { id: 'popular-fields', label: t('popularFields') },
    { id: 'process', label: t('process') },
    { id: 'faqs', label: t('faqsLabel') },
  ]

  return (
    <>
      <DetailHero
        slug={country.slug}
        name={country.name}
        tagline={country.tagline}
        // The design blurs the country's card photo behind the band, not the
        // dedicated hero image.
        backdropUrl={country.cardImageUrl ?? country.heroImageUrl}
        region={country.region}
        destinationsLabel={t('breadcrumbDestinations')}
        regionLabel={REGION_DISPLAY[country.region] ?? country.region}
      />

      <section className="py-14 max-tablet:py-10">
        <div className="mx-auto grid max-w-wrap gap-10 px-6 lg:grid-cols-[200px_1fr]">
          <DetailNav sections={sections} />

          <div className="flex flex-col gap-16">
            <section id="overview" className={SECTION}>
              <Reveal>
                <CountryOverview country={country} />
              </Reveal>
            </section>

            <section id="why-study-here" className={SECTION}>
              <Reveal>
                <CountryAdvantages
                  countryName={country.name}
                  advantages={country.advantages}
                  heroImageUrl={country.heroImageUrl ?? country.coverImageUrl}
                />
              </Reveal>
            </section>

            <section id="popular-fields" className={SECTION}>
              <Reveal>
                <AcademicSpecialties specialties={country.academicSpecialties} />
              </Reveal>
            </section>

            <section id="process" className={SECTION}>
              <Reveal>
                <StudentJourney steps={country.processSteps} />
              </Reveal>
            </section>

            <section id="faqs" className={SECTION}>
              <Reveal>
                <CountryFAQs
                  faqs={country.faqs}
                  eyebrow={t('faqsLabel')}
                  title={t('commonQuestions')}
                />
              </Reveal>
            </section>
          </div>
        </div>
      </section>

      {/* Not wrapped in Reveal: DetailCta animates its own inner content, so
          the black band + backdrop photo stay solid rather than fading in
          along with the text. */}
      <DetailCta
        backdropUrl={country.cardImageUrl ?? country.heroImageUrl}
        title={t('readyToStudy', { country: country.name })}
        ctaLabel={t('ctaButton')}
      />
    </>
  )
}
