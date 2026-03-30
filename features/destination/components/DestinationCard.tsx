import type { Destination } from "../types/destination.types"

const FLAGS: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  "Australia": "🇦🇺",
  "USA": "🇺🇸",
  "Canada": "🇨🇦",
  "New Zealand": "🇳🇿",
  "Switzerland": "🇨🇭",
}

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <a href={`/destinations/${destination.slug}`}
      className="group block bg-gradient-to-br from-[#590D82] to-[#3D0A5A] text-white rounded-2xl p-8 hover:shadow-lg transition-all">
      <div className="text-5xl mb-4">{FLAGS[destination.country] ?? "🌍"}</div>
      <h3 className="text-xl font-bold mb-1">{destination.country}</h3>
      {destination.universityCount && (
        <p className="text-purple-200 text-sm">{destination.universityCount}+ Universities</p>
      )}
    </a>
  )
}
