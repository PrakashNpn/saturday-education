import type { UniversityListItem } from '../types/university.types'
import { UniversityCard } from './UniversityCard'

interface Props {
  universities: UniversityListItem[]
  noResultsText: string
  cardTranslations: {
    avgCost: string
    acceptance: string
    courses: string
    intake: string
    programs: string
    viewDetails: string
    rankLabel: string
    perYear: string
  }
}

export function UniversityGrid({ universities, noResultsText, cardTranslations }: Props) {
  if (universities.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        <p>{noResultsText}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {universities.map((u, i) => (
        <UniversityCard key={u.id} university={u} translations={cardTranslations} index={i} />
      ))}
    </div>
  )
}
