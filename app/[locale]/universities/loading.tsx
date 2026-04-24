import { Skeleton } from '@/shared/components/ui/skeleton'

function UniversityCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-9 w-full rounded-full mt-2" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div>
      {/* Hero skeleton */}
      <Skeleton className="w-full h-72 md:h-80 rounded-none" />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-16">
        {/* Filter bar */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <UniversityCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
