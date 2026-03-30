import type { Destination } from "../types/destination.types"

export const STATIC_DESTINATIONS: Destination[] = [
  { id: "1", slug: "united-kingdom", country: "United Kingdom", universityCount: 130 },
  { id: "2", slug: "australia", country: "Australia", universityCount: 43 },
  { id: "3", slug: "usa", country: "USA", universityCount: 200 },
  { id: "4", slug: "canada", country: "Canada", universityCount: 96 },
  { id: "5", slug: "new-zealand", country: "New Zealand", universityCount: 8 },
  { id: "6", slug: "switzerland", country: "Switzerland", universityCount: 12 },
]

export async function getDestinations(): Promise<Destination[]> {
  return STATIC_DESTINATIONS
}

export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  return STATIC_DESTINATIONS.find((d) => d.slug === slug)
}
