import { Skeleton } from '@/shared/components/ui/skeleton'

export default function Loading() {
  return (
    <div>
      {/* Hero skeleton — mirrors DetailHero h-[320px] md:h-[440px] */}
      <Skeleton className="w-full h-[320px] md:h-[440px] rounded-none" />

      {/* Body — mirrors max-w-7xl mx-auto px-4 md:px-8 */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 pt-12 pb-20">

          {/* Sidebar skeleton */}
          <aside className="hidden lg:block">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full rounded-full" />
              ))}
            </div>
            <Skeleton className="h-28 w-full rounded-2xl mt-6" />
          </aside>

          {/* Main content skeleton */}
          <main className="space-y-14">
            {/* Overview */}
            <section>
              <Skeleton className="h-7 w-40 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </section>

            {/* Stats grid */}
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-xl" />
                ))}
              </div>
            </section>

            {/* Partner universities */}
            <section>
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-xl" />
                ))}
              </div>
            </section>

            {/* Cost of living / additional sections */}
            <section>
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            </section>
          </main>

        </div>
      </div>
    </div>
  )
}
