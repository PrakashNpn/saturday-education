import HeroSection from "@/features/landing/components/HeroSection"
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
