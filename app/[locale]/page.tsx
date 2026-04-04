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
import UniversityFinderSection from "@/features/landing/components/UniversityFinderSection"
import ComparisonToolSection from "@/features/landing/components/ComparisonToolSection"
import GlobalLeadersSection from "@/features/landing/components/GlobalLeadersSection"
import CountryGuideSection from "@/features/landing/components/CountryGuideSection"
import ServicesSection from "@/features/landing/components/ServicesSection"
import AdditionalServicesSection from "@/features/landing/components/AdditionalServicesSection"
import TestimonialsSection from "@/features/landing/components/TestimonialsSection"
import StatsCtaSection from "@/features/landing/components/StatsCtaSection"
import ConsultationSection from "@/features/landing/components/ConsultationSection"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <UniversityFinderSection />
      <ComparisonToolSection />
      <GlobalLeadersSection />
      <CountryGuideSection />
      <ServicesSection />
      <AdditionalServicesSection />
      <TestimonialsSection />
      <StatsCtaSection />
      <ConsultationSection />
    </main>
  )
}
