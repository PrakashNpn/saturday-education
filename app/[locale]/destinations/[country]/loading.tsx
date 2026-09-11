import { Skeleton } from '@/shared/components/ui/skeleton'

/** Matches DestinationDetailPage's SECTION constant, so nothing jumps when the
 *  real content swaps in under the same scroll position. */
const SECTION = 'scroll-mt-36'

function Eyebrow() {
  return <Skeleton className="mb-3 h-3 w-28" />
}

function Heading({ wide = false }: { wide?: boolean }) {
  return <Skeleton className={`mb-6 h-6 ${wide ? 'w-80' : 'w-56'}`} />
}

/** Mirrors CountryOverview's six-stat grid. */
function StatsGridSkeleton() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-stroke bg-stroke sm:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-surface p-5">
          <Skeleton className="mb-2 h-3 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
      ))}
    </div>
  )
}

/** Mirrors CountryAdvantages: a photo panel plus two stacked cards. */
function AdvantagesSkeleton() {
  return (
    <div className="grid divide-y divide-stroke overflow-hidden rounded-sm border border-stroke bg-surface max-tablet:grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      <Skeleton className="min-h-[300px] rounded-none max-tablet:min-h-[240px]" />
      <div className="flex flex-col divide-y divide-stroke">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-1 flex-col justify-center gap-2 p-6">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Mirrors PartnerUniversities' logo wall. */
function UniversitiesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-3 rounded-sm border border-stroke bg-surface p-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  )
}

/** Mirrors AcademicSpecialties' wrapped chip list, varied widths so the row
 *  doesn't read as a uniform grid. */
function SpecialtiesSkeleton() {
  const widths = ['w-24', 'w-32', 'w-20', 'w-28', 'w-36', 'w-24', 'w-28', 'w-20']
  return (
    <ul className="flex flex-wrap gap-2.5">
      {widths.map((w, i) => (
        <li key={i}>
          <Skeleton className={`h-9 ${w} rounded-sm`} />
        </li>
      ))}
    </ul>
  )
}

/** Mirrors StudentJourney's dashed rail with numbered steps. */
function ProcessSkeleton() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute top-4 bottom-4 left-4 border-l-2 border-dashed border-stroke-strong"
      />
      <ol className="relative flex flex-col gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="relative flex gap-4">
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2 pt-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3.5 w-full max-w-md" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Mirrors CountryFAQs' divided accordion rows. */
function FaqsSkeleton() {
  return (
    <div className="flex flex-col divide-y divide-stroke border-t border-b border-stroke">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex min-h-[54px] items-center justify-between gap-4 py-4">
          <Skeleton className="h-4.5 w-2/3" />
          <Skeleton className="size-7 shrink-0 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export default function Loading() {
  return (
    <div>
      {/* Hero — mirrors DetailHero: breadcrumb, region pill, flag + name, tagline */}
      <section className="bg-black py-12 max-tablet:py-9">
        <div className="mx-auto max-w-wrap px-6">
          <Skeleton tone="dark" className="mb-3 h-4 w-40" />
          <Skeleton tone="dark" className="mb-3 h-6 w-24 rounded-full" />
          <Skeleton tone="dark" className="mb-2 h-9 w-64" />
          <Skeleton tone="dark" className="h-5 w-full max-w-[52ch]" />
        </div>
      </section>

      <section className="py-14 max-tablet:py-10">
        <div className="mx-auto grid max-w-wrap gap-10 px-6 lg:grid-cols-[200px_1fr]">
          {/* Nav rail — mirrors DetailNav's six section links */}
          <nav className="flex gap-4 overflow-x-auto pb-2 max-tablet:-mx-6 max-tablet:px-6 lg:sticky lg:top-36 lg:flex-col lg:gap-3 lg:self-start lg:overflow-visible lg:pb-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-24 shrink-0" />
            ))}
          </nav>

          <div className="flex flex-col gap-16">
            <section className={SECTION}>
              <Eyebrow />
              <Heading wide />
              <div className="mb-8 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <StatsGridSkeleton />
            </section>

            <section className={SECTION}>
              <Eyebrow />
              <Heading wide />
              <AdvantagesSkeleton />
            </section>

            <section className={SECTION}>
              <Eyebrow />
              <Heading />
              <UniversitiesSkeleton />
            </section>

            <section className={SECTION}>
              <Eyebrow />
              <Heading />
              <SpecialtiesSkeleton />
            </section>

            <section className={SECTION}>
              <Eyebrow />
              <Heading />
              <ProcessSkeleton />
            </section>

            <section className={SECTION}>
              <Eyebrow />
              <Heading />
              <FaqsSkeleton />
            </section>
          </div>
        </div>
      </section>

      {/* CTA band — mirrors DetailCta */}
      <section className="bg-black py-16 text-center max-tablet:py-12">
        <div className="mx-auto max-w-wrap px-6">
          <Skeleton tone="dark" className="mx-auto mb-6 h-6 w-72 max-w-full" />
          <Skeleton tone="dark" className="mx-auto h-10 w-40 rounded-full" />
        </div>
      </section>
    </div>
  )
}
