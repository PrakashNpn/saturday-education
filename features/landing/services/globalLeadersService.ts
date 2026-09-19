import { getFirmliInstitutionCountsByName } from '@/shared/lib/courseFinder/firmliClient'

// The nine destinations shown in GlobalLeadersSection. Names, slugs and image
// files stay hand-picked here (as agreed) rather than pulled from the
// database — only the institution count is live, sourced from Firmli so it
// matches the same number the destinations page itself now shows.
const DESTINATIONS = [
  { key: 'canada', slug: 'canada', file: 'canada.webp', firmliName: 'Canada' },
  { key: 'germany', slug: 'germany', file: 'germany.webp', firmliName: 'Germany' },
  { key: 'australia', slug: 'australia', file: 'australia.webp', firmliName: 'Australia' },
  { key: 'malaysia', slug: 'malaysia', file: 'malaysia.webp', firmliName: 'Malaysia' },
  { key: 'newzealand', slug: 'new-zealand', file: 'new-zealand.webp', firmliName: 'New Zealand' },
  { key: 'ireland', slug: 'ireland', file: 'ireland.webp', firmliName: 'Ireland' },
  { key: 'singapore', slug: 'singapore', file: 'singapore.webp', firmliName: 'Singapore' },
  { key: 'uae', slug: 'uae', file: 'uae.webp', firmliName: 'United Arab Emirates' },
  { key: 'thailand', slug: 'thailand', file: 'thailand.webp', firmliName: 'Thailand' },
] as const

export type GlobalLeaderDestination = {
  key: string
  slug: string
  file: string
  count: number | null
}

export async function getGlobalLeadersDestinations(): Promise<GlobalLeaderDestination[]> {
  const counts = await getFirmliInstitutionCountsByName(DESTINATIONS.map((d) => d.firmliName))
  return DESTINATIONS.map((d) => ({
    key: d.key,
    slug: d.slug,
    file: d.file,
    count: counts.get(d.firmliName) ?? null,
  }))
}
