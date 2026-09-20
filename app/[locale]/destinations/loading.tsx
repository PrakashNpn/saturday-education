import { Skeleton } from '@/shared/components/ui/skeleton'

/** Mirrors DestinationCard: the whole card is a single 16:10 photo with
 *  everything else painted over it, so a plain image-shaped block is the
 *  entire skeleton. */
function CountryCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-stroke bg-surface-1">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
    </div>
  )
}

export default function Loading() {
  return (
    <div>
      {/* Hero — mirrors DestinationsHero's dark band + centered search pill */}
      <section className="bg-[oklch(20%_0.10_307.4)] py-11 max-tablet:py-8">
        <div className="mx-auto max-w-wrap px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center">
            <Skeleton tone="dark" className="h-9 w-full max-w-md" />
            <Skeleton tone="dark" className="mt-3 h-5 w-full max-w-lg" />
          </div>
          <Skeleton tone="dark" className="mx-auto mt-5 h-14 w-full max-w-2xl rounded-full" />
        </div>
      </section>

      {/* Toolbar — mirrors DestinationsToolbar's region tabs + sort control */}
      <section className="border-t border-stroke pt-4 pb-3">
        <div className="mx-auto max-w-wrap px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stroke pb-2.5">
            <div className="flex flex-wrap gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-16" />
              ))}
            </div>
            <Skeleton className="h-8 w-28 rounded-[6px]" />
          </div>
          <Skeleton className="mt-3 h-4 w-32" />
        </div>
      </section>

      {/* Card grid — mirrors DestinationGrid's grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 */}
      <section className="pt-2 pb-12 max-tablet:pt-2 max-tablet:pb-8">
        <div className="mx-auto max-w-wrap px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CountryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
