import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match all paths EXCEPT:
    //  - api routes
    //  - admin routes (handled outside next-intl locale routing)
    //  - Next.js internals (_next/*)
    //  - Any file with an extension (.jpeg, .png, .svg, .ico, .js, .css, etc.)
    '/((?!api|admin|_next|_vercel|.*\\..*).*)',
  ],
}
