'use client'

import { Link } from '@/i18n/navigation'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24">
      <p className="text-[120px] font-black text-brand-purple/10 leading-none select-none">
        !
      </p>
      <h1 className="text-2xl font-bold text-gray-900 -mt-6">Something went wrong</h1>
      <p className="text-gray-500 mt-3 mb-8 max-w-sm text-sm">
        An unexpected error occurred. Please try again or return to the home page.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={reset}
          className="bg-brand-purple text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand-purple-dark transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-brand-purple text-brand-purple text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand-purple-50 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
