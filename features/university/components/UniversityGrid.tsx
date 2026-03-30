import { getUniversities } from "../services/universityService"
import UniversityCard from "./UniversityCard"

export default async function UniversityGrid() {
  const universities = await getUniversities()
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Universities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni) => <UniversityCard key={uni.id} university={uni} />)}
      </div>
    </div>
  )
}
