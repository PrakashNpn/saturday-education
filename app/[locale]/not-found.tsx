// Rendered when notFound() is called inside the locale segment — an unpublished
// country slug, for example. A URL matching no route at all is handled by the
// root app/not-found.tsx instead. This one sits inside the locale layout, so it
// keeps the header and footer and can use the locale-aware Link.
import { Link } from '@/i18n/navigation'

const LINKS = [
  { href: '/destinations', label: 'Study destinations' },
  { href: '/course-finder', label: 'Course finder' },
  { href: '/career-assessment', label: 'Career assessment' },
  { href: '/about', label: 'About us' },
] as const

export default function NotFound() {
  return (
    <section className="bg-canvas py-24 max-tablet:py-16">
      <div className="mx-auto flex max-w-wrap flex-col items-center px-6 text-center">
        <p className="text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          Error 404
        </p>
        <h1 className="mt-2 text-title font-medium tracking-tight text-primary-text">
          This page does not exist
        </h1>
        <p className="mt-3 max-w-[46ch] text-body leading-relaxed font-normal text-secondary-text">
          The page you are looking for may have moved, or the link that brought you here may
          be out of date.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-13 items-center justify-center rounded-full bg-action px-10 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
        >
          Go to homepage
        </Link>

        <div className="mt-10 border-t border-stroke pt-6">
          <p className="mb-3 text-label font-normal text-muted-text">Or try one of these</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label font-medium text-action underline-offset-4 transition-colors hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
