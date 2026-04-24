import { Skeleton } from '@/shared/components/ui/skeleton'

export default function Loading() {
  return (
    <div>
      {/* Hero skeleton — mirrors h-[320px] md:h-[440px] */}
      <Skeleton className="w-full h-[320px] md:h-[440px] rounded-none" />

      {/* Body — mirrors max-w-7xl mx-auto px-4 md:px-8 */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 pt-12 pb-16">

          {/* Sidebar skeleton */}
          <aside className="hidden lg:block">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full rounded-full" />
              ))}
            </div>
            <Skeleton className="h-32 w-full rounded-2xl mt-6" />
          </aside>

          {/* Main content skeleton */}
          <main className="space-y-16">
            {/* Overview */}
            <section>
              <Skeleton className="h-7 w-48 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </section>

            {/* Metrics grid */}
            <section>
              <Skeleton className="h-5 w-40 mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-xl" />
                ))}
              </div>
            </section>

            {/* Programs */}
            <section>
              <div className="flex gap-4 mb-6">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 rounded-xl" />
                ))}
              </div>
            </section>

            {/* Scholarships */}
            <section>
              <div className="bg-purple-50 rounded-2xl p-8">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-44 rounded-xl" />
                  <Skeleton className="h-44 rounded-xl" />
                </div>
              </div>
            </section>

            {/* Admission steps */}
            <section>
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Similar universities */}
            <section>
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-xl" />
                ))}
              </div>
            </section>
          </main>

        </div>
      </div>
    </div>
  )
}
