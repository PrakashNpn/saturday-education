import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroSection from "@/features/landing/components/HeroSection"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    // absolute, not a plain string: the root layout's title template would
    // otherwise append "| Saturday Education" a second time onto a title
    // that already opens with the brand name.
    title: { absolute: t('home.title') },
    description: t('home.description'),
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      type: 'website',
      locale,
      siteName: 'Saturday Education',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description'),
    },
    alternates: {
      languages: { en: '/', th: '/th', my: '/my' },
    },
  }
}
import PartnerLogosSection from "@/features/landing/components/PartnerLogosSection"
import WhySaturdaySection from "@/features/landing/components/WhySaturdaySection"
import CourseSearchSection from "@/features/landing/components/CourseSearchSection"
import { getCourseFinderOptions } from '@/features/course-finder'
import ComparisonToolSection from "@/features/landing/components/ComparisonToolSection"
import { getComparisonUniversities } from '@/features/landing/services/comparison-service'
import GlobalLeadersSection from "@/features/landing/components/GlobalLeadersSection"
import { getGlobalLeadersDestinations } from '@/features/landing/services/globalLeadersService'
import ServicesSection from "@/features/landing/components/ServicesSection"
import AdditionalServicesSection from "@/features/landing/components/AdditionalServicesSection"
import TestimonialsSection from "@/features/landing/components/TestimonialsSection"
import FaqSection from "@/features/landing/components/FaqSection"
import CtaSection from "@/features/landing/components/CtaSection"
import ConsultationSection from "@/features/landing/components/ConsultationSection"
import { submitConsultation } from '@/features/consultation'
import { Reveal } from '@/shared/components/motion/Reveal'

export default async function HomePage() {
  const [comparisonUniversities, courseFinderOptions, globalLeadersDestinations] = await Promise.all([
    getComparisonUniversities(),
    getCourseFinderOptions(),
    getGlobalLeadersDestinations(),
  ])

  return (
    <main>
      <HeroSection />
      <Reveal>
        <PartnerLogosSection />
      </Reveal>
      <WhySaturdaySection />
      <ServicesSection />
      <AdditionalServicesSection />
      {/* Dropped entirely when Firmli's option lists are unreachable, rather
          than rendered with empty selects that would look broken. Not wrapped
          in Reveal: its own dark textured band has to stay solid, so the fade
          lives on its inner content instead. */}
      {courseFinderOptions && <CourseSearchSection options={courseFinderOptions} />}
      <Reveal>
        <ComparisonToolSection universities={comparisonUniversities} />
      </Reveal>
      <GlobalLeadersSection destinations={globalLeadersDestinations} />
      {/* Not wrapped in Reveal, for the same reason as CourseSearchSection. */}
      <TestimonialsSection />
      <FaqSection />
      <Reveal>
        <ConsultationSection onSubmit={submitConsultation} />
      </Reveal>
      {/* Not wrapped in Reveal, for the same reason as CourseSearchSection. */}
      <CtaSection />
    </main>
  )
}
