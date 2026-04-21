import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getCountryBySlug } from '../services/destinationService'
import { DetailHero } from './DetailHero'
import { DetailSidebar } from './DetailSidebar'
import { CountryOverview } from './CountryOverview'
import { CountryAdvantages } from './CountryAdvantages'
import { PartnerUniversities } from './PartnerUniversities'
import { AcademicSpecialties } from './AcademicSpecialties'
import { CountryScholarships } from './CountryScholarships'
import { StudentJourney } from './StudentJourney'
import { CountryFAQs } from './CountryFAQs'

interface Props {
  slug: string
}

export async function DestinationDetailPage({ slug }: Props) {
  const country = await getCountryBySlug(slug)
  if (!country) notFound()

  const t = await getTranslations('destinations')

  const sections = [
    { id: 'overview', label: t('overview') },
    { id: 'advantages', label: t('whyStudyHere') },
    { id: 'universities', label: t('exploreUniversities') },
    { id: 'specialties', label: t('popularFields') },
    { id: 'scholarships', label: t('scholarships') },
    { id: 'journey', label: t('process') },
    { id: 'faqs', label: t('faqsLabel') },
  ]

  return (
    <>
      <DetailHero
        name={country.name}
        tagline={country.tagline}
        heroImageUrl={country.heroImageUrl}
        region={country.region}
        studyAbroadLabel={t('studyAbroad')}
      />

      <div className="bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 pt-12 pb-20">
          <DetailSidebar
            sections={sections}
            guideName={t('destinationGuide')}
            ctaEyebrow={t('sidebarEyebrow')}
            ctaTitle={t('readyToStudy', { country: country.name })}
            ctaLabel={t('ctaButton')}
          />

          <div className="space-y-16 lg:space-y-20">
            <section id="overview">
              <CountryOverview country={country} />
            </section>

            <section id="advantages">
              <CountryAdvantages
                countryName={country.name}
                advantages={country.advantages}
                heroImageUrl={country.heroImageUrl ?? country.coverImageUrl}
              />
            </section>

            <section id="universities">
              <PartnerUniversities
                universities={country.universities}
                eyebrow={t('exploreUniversities')}
                title={t('partnerUniversities')}
                subtitle={t('universitiesSubtitle')}
                exploreLabel={t('explore')}
              />
            </section>

            <section id="specialties">
              <AcademicSpecialties specialties={country.academicSpecialties} />
            </section>

            <section id="scholarships">
              <CountryScholarships scholarships={country.scholarships} />
            </section>

            <section id="journey">
              <StudentJourney steps={country.processSteps} />
            </section>

            <section id="faqs">
              <CountryFAQs
                faqs={country.faqs}
                eyebrow={t('faqsLabel')}
                title={t('commonQuestions')}
                subtitle={t('faqsSubtitle')}
              />
            </section>

          </div>
        </div>
      </div>
      </div>
    </>
  )
}
