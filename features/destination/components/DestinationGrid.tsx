import { getDestinations } from "../services/destinationService"
import DestinationCard from "./DestinationCard"

export default async function DestinationGrid() {
  const destinations = await getDestinations()
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Study Destinations</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((dest) => <DestinationCard key={dest.id} destination={dest} />)}
      </div>
    </div>
  )
}
