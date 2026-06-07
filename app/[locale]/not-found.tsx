import { Link } from '@/i18n/navigation'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24">
      <p className="text-[120px] font-black text-brand-purple/10 leading-none select-none">
        404
      </p>
      <h1 className="text-2xl font-bold text-gray-900 -mt-6">Page not found</h1>
      <p className="text-gray-500 mt-3 mb-8 max-w-sm text-sm">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="bg-brand-purple text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand-purple-dark transition-colors"
        >
          Go Home
        </Link>
        {/* HIDDEN: universities feature temporarily disabled — uncomment to restore
        <Link
          href="/universities"
          className="border border-brand-purple text-brand-purple text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand-purple-50 transition-colors"
        >
          Browse Universities
        </Link>
        */}
      </div>
    </div>
  )
}
