import { SITE_URL } from '@/shared/constants/site'
import { SOCIAL_LINKS } from '@/shared/constants/social'

/** Renders one JSON-LD block for search / answer engines. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Sitewide EducationalOrganization entity for the root layout. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Saturday Education Consulting',
    alternateName: 'Saturday Education',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/logo.webp`,
    image: `${SITE_URL}/images/og/default.jpg`,
    description:
      'Myanmar study-abroad consultancy with offices in Yangon and Bangkok. Free counselling, university selection, applications and visa support for Myanmar students and parents.',
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#david-dhakal`,
      name: 'David Dhakal',
      jobTitle: 'Founder & CEO',
    },
    foundingDate: '2019',
    email: 'info@saturdayeducation.com',
    telephone: '+959794933044',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 20/22, 5th Floor, Shine Office Tower, Alan Pya Pagoda St',
      addressLocality: 'Yangon',
      postalCode: '11221',
      addressCountry: 'MM',
    },
    areaServed: [
      { '@type': 'Country', name: 'Myanmar' },
      { '@type': 'Country', name: 'Thailand' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+959765929492',
        contactType: 'customer service',
        areaServed: 'MM',
        availableLanguage: ['en', 'my'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+66823288445',
        contactType: 'customer service',
        areaServed: 'TH',
        availableLanguage: ['en', 'my'],
      },
    ],
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.tiktok,
      SOCIAL_LINKS.linkedin,
    ],
    knowsAbout: [
      'Study in Malaysia',
      'Study in Thailand',
      'Study in Germany',
      'Study in Hungary',
      'Study in Ireland',
      'Study in New Zealand',
      'Study in Canada',
      'Study in the Netherlands',
      'Study in Italy',
      'Student visas',
    ],
  } as const
}

export type FaqItem = { question: string; answer: string }

/** FAQPage schema — question/answer text must match the visible FAQ. */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
