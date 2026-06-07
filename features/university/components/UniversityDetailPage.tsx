import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getUniversityBySlug, getSimilarUniversities } from '../services/universityService'
import { UniDetailHero } from './UniDetailHero'
import { UniDetailSidebar } from './UniDetailSidebar'
import { UniOverview } from './UniOverview'
import { InstitutionalMetrics } from './InstitutionalMetrics'
import { AcademicPrograms } from './AcademicPrograms'
import { UniScholarships } from './UniScholarships'
import { UniAdmissionProcess } from './UniAdmissionProcess'
import { SimilarUniversities } from './SimilarUniversities'

interface Props {
  slug: string
}

export async function UniversityDetailPage({ slug }: Props) {
  const [university, t] = await Promise.all([
    getUniversityBySlug(slug),
    getTranslations('universities'),
  ])

  if (!university) notFound()

  const similarUnis = await getSimilarUniversities(university.id, university.countryId)

  const sections = [
    { id: 'overview', label: t('detailOverview') },
    { id: 'metrics', label: t('detailMetrics') },
    { id: 'programs', label: t('detailPrograms') },
    { id: 'scholarships', label: t('detailScholarships') },
    { id: 'admission', label: t('detailAdmission') },
    { id: 'similar', label: t('detailSimilar') },
  ]

  const metricLabels = {
    sectionLabel: t('detailMetrics'),
    globalRank: t('metricGlobalRank'),
    totalStudents: t('metricTotalStudents'),
    tuitionFees: t('metricTuitionFees'),
    programs: t('metricPrograms'),
    employability: t('metricEmployability'),
    intlStudents: t('metricIntlStudents'),
    intake: t('metricIntake'),
    campus: t('metricCampus'),
    workRights: t('metricWorkRights'),
  }

  const programTranslations = {
    title: t('detailPrograms'),
    degreeBachelors: t('degreeBachelors'),
    degreeMasters: t('degreeMasters'),
    degreePhd: t('degreePhd'),
    degreeDiploma: t('degreeDiploma'),
    degreeCertificate: t('degreeCertificate'),
    degreeFoundation: t('degreeFoundation'),
    year: t('year'),
    years: t('years'),
  }

  const scholarshipTranslations = {
    title: t('detailScholarships'),
    subtitle: t('detailScholarshipsSubtitle', { name: university.name }),
    fullyFunded: t('detailFullyFunded'),
    partial: t('detailPartial'),
    meritBased: t('detailMeritBased'),
  }

  const similarTranslations = {
    title: t('detailSimilarTitle'),
    card: {
      avgCost: t('avgCost'),
      tuitionLabel: t('tuitionLabel'),
      acceptance: t('acceptance'),
      courses: t('courses'),
      intake: t('intake'),
      programs: t('programs'),
      viewDetails: t('viewDetails'),
      rankLabel: t('rank', { rank: 0 }).replace('0', '{rank}'),
      perYear: t('perYear'),
    },
  }

  return (
    <>
      <UniDetailHero
        name={university.name}
        shortDescription={university.shortDescription}
        ranking={university.ranking}
        coverImageUrl={university.coverImageUrl}
        logoUrl={university.logoUrl}
        city={university.city}
        countryName={university.country.name}
        rankedLabel={university.ranking !== null ? t('rankedWorldwide', { rank: university.ranking }) : ''}
        breadcrumb={{
          home: t('breadcrumbHome'),
          universities: t('breadcrumbUniversities'),
        }}
      />

      <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 pt-10 pb-16">
          <UniDetailSidebar
            sections={sections}
            sidebarTitle={t('detailSidebarTitle')}
            ctaLabel={t('detailCtaLabel')}
            ctaName={university.name}
            ctaButton={t('detailCtaButton')}
          />

          <div className="space-y-12 lg:space-y-16">
            <section id="overview">
              <UniOverview overview={university.overview} title={t('detailOverview')} />
            </section>

            <section id="metrics">
              <InstitutionalMetrics
                university={{
                  ranking: university.ranking,
                  totalStudents: university.totalStudents,
                  tuitionFeeMin: university.tuitionFeeMin,
                  tuitionFeeMax: university.tuitionFeeMax,
                  tuitionCurrency: university.tuitionCurrency,
                  numberOfCampuses: university.numberOfCampuses,
                  graduateEmployability: university.graduateEmployability,
                  internationalStudents: university.internationalStudents,
                  intakeMonths: university.intakeMonths,
                  workRights: university.country.workRights ?? null,
                  programs: university.programs,
                }}
                labels={metricLabels}
              />
            </section>

            <section id="programs">
              <AcademicPrograms
                programs={university.programs.map((p) => ({
                  id: p.id,
                  name: p.name,
                  degreeLevel: p.degreeLevel as string,
                  field: p.field,
                  durationYears: p.durationYears ?? null,
                }))}
                translations={programTranslations}
              />
            </section>

            <section id="scholarships">
              <UniScholarships
                scholarships={university.scholarships.map((s) => ({
                  id: s.id,
                  name: s.name,
                  type: s.type as string,
                  description: s.description,
                  value: s.value,
                }))}
                translations={scholarshipTranslations}
              />
            </section>

            <section id="admission">
              <UniAdmissionProcess
                steps={university.admissionSteps.map((s) => ({
                  id: s.id,
                  stepNumber: s.stepNumber,
                  title: s.title,
                  description: s.description,
                }))}
                title={t('detailAdmissionTitle')}
              />
            </section>

            <section id="similar">
              <SimilarUniversities
                universities={similarUnis}
                translations={similarTranslations}
              />
            </section>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
