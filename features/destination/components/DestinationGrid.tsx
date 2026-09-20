'use client'

import { DestinationCard } from './DestinationCard'
import type { CountryCardData } from '../types'

interface Props {
  countries: CountryCardData[]
  viewDetailsLabel: string
}

/**
 * Cards only. Sorting, the result count and the region tabs all live in
 * DestinationsToolbar now, and the design shows every result rather than
 * paginating, so the load-more step is gone.
 */
export function DestinationGrid({ countries, viewDetailsLabel }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {countries.map((country, index) => (
        <DestinationCard
          key={country.id}
          country={country}
          viewDetailsLabel={viewDetailsLabel}
          index={index}
        />
      ))}
    </div>
  )
}
