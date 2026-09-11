'use client'

// Catches a rendering error anywhere inside the locale segment, so it keeps
// the header and footer and can use the locale-aware Link, the same reasoning
// as the sibling not-found.tsx.
import { Link } from '@/i18n/navigation'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <section className="bg-canvas py-24 max-tablet:py-16">
      <div className="mx-auto flex max-w-wrap flex-col items-center px-6 text-center">
        <p className="text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          Something went wrong
        </p>
        <h1 className="mt-2 text-title font-medium tracking-tight text-primary-text">
          An unexpected error occurred
        </h1>
        <p className="mt-3 max-w-[46ch] text-body leading-relaxed font-normal text-secondary-text">
          Please try again, or head back to the homepage while we look into it.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-13 cursor-pointer items-center justify-center rounded-full bg-action px-10 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-13 items-center justify-center rounded-full border border-action px-10 text-body font-medium whitespace-nowrap text-action transition-colors hover:bg-tint"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
