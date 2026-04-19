import { getCountryBySlug } from '../services/destinationService'
import { Link } from '@/i18n/navigation'

export default async function DestinationDetail({ slug }: { slug: string }) {
  const country = await getCountryBySlug(slug)

  if (!country) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Destination not found</h1>
        <Link href="/destinations" className="text-brand-purple mt-4 inline-block hover:underline">
          ← Back to Destinations
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/destinations" className="text-brand-purple text-sm hover:underline mb-6 inline-block">
        ← Back to Destinations
      </Link>
      <h1 className="text-3xl font-bold text-neutral-900 mb-4">Study in {country.name}</h1>
      <p className="text-neutral-600 mb-8">
        {country.universities.length} universities available. Detailed destination guide coming soon.
      </p>
      <div className="bg-brand-purple text-white rounded-2xl p-8 text-center max-w-lg">
        <h2 className="text-xl font-bold mb-4">Interested in {country.name}?</h2>
        <p className="text-purple-200 mb-6">Book a free consultation to get personalized guidance.</p>
        <Link
          href="/#consultation"
          className="inline-block px-8 py-3 bg-accent-gold text-white font-semibold rounded-full hover:bg-amber-600 transition-colors"
        >
          Book Free Consultation
        </Link>
      </div>
    </div>
  )
}
