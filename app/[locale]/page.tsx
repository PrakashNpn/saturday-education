import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroSection from "@/features/landing/components/HeroSection"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('home.title'),
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
// HIDDEN: universities feature temporarily disabled — uncomment to restore
// import UniversityFinderSection from "@/features/landing/components/UniversityFinderSection"
// import { getFinderDropdownOptions } from '@/features/university'
import ComparisonToolSection from "@/features/landing/components/ComparisonToolSection"
import { getComparisonUniversities } from '@/features/landing/services/comparison-service'
import GlobalLeadersSection from "@/features/landing/components/GlobalLeadersSection"
import CountryGuideSection from "@/features/landing/components/CountryGuideSection"
import ServicesSection from "@/features/landing/components/ServicesSection"
import AdditionalServicesSection from "@/features/landing/components/AdditionalServicesSection"
import TestimonialsSection from "@/features/landing/components/TestimonialsSection"
import CtaSection from "@/features/landing/components/CtaSection"
import ConsultationSection from "@/features/landing/components/ConsultationSection"
import { submitConsultation } from '@/features/consultation'
import { CareerDiscoveryCTA } from '@/features/career-assessment'

export default async function HomePage() {
  // HIDDEN: universities feature temporarily disabled — restore the Promise.all([getFinderDropdownOptions(), getComparisonUniversities()]) pairing to bring back finderOptions
  const [comparisonUniversities] = await Promise.all([
    getComparisonUniversities(),
  ])

  return (
    <main>
      <HeroSection />
      {/* <CareerDiscoveryCTA /> */}
      {/* HIDDEN: universities feature temporarily disabled — uncomment to restore
      <UniversityFinderSection dropdownOptions={finderOptions} />
      */}
      <ComparisonToolSection universities={comparisonUniversities} />
      <GlobalLeadersSection />
      {/* <CountryGuideSection /> */}
      <ServicesSection />
      <AdditionalServicesSection />
      <TestimonialsSection />
      <CtaSection />
      <ConsultationSection onSubmit={submitConsultation} />
    </main>
  )
}
