import { Skeleton } from '@/shared/components/ui/skeleton'

function CountryCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-8 w-28 rounded-full mt-2" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div>
      {/* Hero skeleton — mirrors gradient + padding hero */}
      <Skeleton className="w-full h-64 md:h-80 rounded-none" />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16">
        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <Skeleton className="h-12 w-full max-w-2xl rounded-full" />
        </div>

        {/* Region filter tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>

        {/* Country card grid — mirrors DestinationGrid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CountryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
