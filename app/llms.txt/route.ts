import { SITE_URL } from '@/shared/constants/site'

/**
 * Machine-readable site summary for AI crawlers. Served at /llms.txt (outside
 * the [locale] segment so dotted paths are not treated as a locale code).
 */
export function GET() {
  const body = `# Saturday Education Consulting
> Myanmar-founded study-abroad consultancy (Yangon & Bangkok), founded by David Dhakal. Free counselling for Myanmar students and parents; 3,000+ students placed since 2019.

## Main pages
- [Home](${SITE_URL}/)
- [Study destinations](${SITE_URL}/destinations)
- [Articles](${SITE_URL}/guides)
- [Course finder](${SITE_URL}/course-finder)
- [Career assessment](${SITE_URL}/career-assessment)
- [Grade converter](${SITE_URL}/grade-converter)
- [About](${SITE_URL}/about)
- [Contact](${SITE_URL}/contact)

## Contact
- info@saturdayeducation.com
- +95 9 794 933 044 (Yangon)
- +66 82 328 8445 (Bangkok)
- No. 20/22, 5th Floor, Shine Office Tower, Alan Pya Pagoda St, Yangon 11221
- 170/72, Ocean Tower 1, 23rd Floor, Ratchadaphisek Rd, Khlong Toei, Bangkok 10110
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
