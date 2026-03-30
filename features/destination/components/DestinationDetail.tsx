import { getDestinationBySlug } from "../services/destinationService"

export default async function DestinationDetail({ country }: { country: string }) {
  const destination = await getDestinationBySlug(country)

  if (!destination) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Destination not found</h1>
        <a href="/destinations" className="text-[#590D82] mt-4 inline-block hover:underline">← Back to Destinations</a>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <a href="/destinations" className="text-[#590D82] text-sm hover:underline mb-6 inline-block">← Back to Destinations</a>
      <h1 className="text-3xl font-bold text-neutral-900 mb-4">Study in {destination.country}</h1>
      <p className="text-neutral-600 mb-8">{destination.universityCount}+ universities available. Detailed destination guide coming soon.</p>
      <div className="bg-[#590D82] text-white rounded-2xl p-8 text-center max-w-lg">
        <h2 className="text-xl font-bold mb-4">Interested in {destination.country}?</h2>
        <p className="text-purple-200 mb-6">Book a free consultation to get personalized guidance.</p>
        <a href="/#consultation" className="inline-block px-8 py-3 bg-[#F59E0B] text-white font-semibold rounded-full hover:bg-amber-600 transition-colors">
          Book Free Consultation
        </a>
      </div>
    </div>
  )
}
