import type { University } from "../types/university.types"

export const STATIC_UNIVERSITIES: University[] = [
  { id: "1", slug: "university-of-oxford", name: "University of Oxford", country: "United Kingdom", city: "Oxford", ranking: 1 },
  { id: "2", slug: "university-of-melbourne", name: "University of Melbourne", country: "Australia", city: "Melbourne", ranking: 14 },
  { id: "3", slug: "mit", name: "MIT", country: "USA", city: "Cambridge", ranking: 2 },
  { id: "4", slug: "university-of-toronto", name: "University of Toronto", country: "Canada", city: "Toronto", ranking: 21 },
  { id: "5", slug: "auckland-university", name: "University of Auckland", country: "New Zealand", city: "Auckland", ranking: 87 },
  { id: "6", slug: "eth-zurich", name: "ETH Zurich", country: "Switzerland", city: "Zurich", ranking: 9 },
]

export async function getUniversities(): Promise<University[]> {
  return STATIC_UNIVERSITIES
}
