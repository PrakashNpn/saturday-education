import type { University } from "../types/university.types"

interface UniversityCardProps { university: University }

export default function UniversityCard({ university }: UniversityCardProps) {
  return (
    <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-purple-50 rounded-xl mb-4 flex items-center justify-center text-2xl">🎓</div>
      <h3 className="font-semibold text-neutral-900 mb-1">{university.name}</h3>
      <p className="text-sm text-neutral-500">{university.city}, {university.country}</p>
      {university.ranking && (
        <div className="mt-3 inline-flex items-center gap-1 text-xs bg-purple-50 text-[#590D82] px-2 py-1 rounded-full">
          Rank #{university.ranking}
        </div>
      )}
    </div>
  )
}
