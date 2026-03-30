import UniversityGrid from "@/features/university/components/UniversityGrid"
import UniversityFilters from "@/features/university/components/UniversityFilters"

export default function UniversitiesPage() {
  return (
    <main>
      <UniversityFilters />
      <UniversityGrid />
    </main>
  )
}
