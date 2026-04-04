---
name: Saturday Education Project
description: Current phase, completed sections, and key decisions for the Saturday Education landing page project
type: project
---

Phase 1 is in progress. The following are complete and working:

**Landing page sections (all in `features/landing/components/`):**
- HeroSection — viewport-filling hero with count-up stats. Final working state uses `md:pt-0 md:pb-12 md:flex md:flex-col md:justify-between md:h-[min(calc(100dvh-72px),900px)]` on inner div, `md:pt-10 lg:pt-4` on content wrapper, `Icon size={24}` on stat cards, `lg:py-5` on stat card padding.
- UniversityFinderSection
- ComparisonToolSection
- GlobalLeadersSection
- CountryGuideSection
- ServicesSection
- AdditionalServicesSection
- TestimonialsSection
- StatsCtaSection
- ConsultationSection

**Shared layout (`shared/components/layout/`):**
- Navbar — sticky, `lg` breakpoint for desktop nav, language dropdown with locale switching (`en`/`th`/`my`), Globe icon, brand purple nav links
- Footer — 5-column desktop layout, social icons as inline SVGs (lucide-react has no Facebook/Instagram/Linkedin in this version)

**AI Advisor (`features/ai-advisor/`):**
- ChatWidget — Phase 1 UI shell, fixed bottom-right, framer-motion bubble + panel, disabled input

**Why:** lucide-react installed version does not export Facebook, Instagram, or Linkedin — use inline SVGs for social icons.

**How to apply:** When adding social media icons anywhere in the project, always use inline SVGs instead of lucide-react imports.
