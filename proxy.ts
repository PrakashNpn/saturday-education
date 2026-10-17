import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match all paths EXCEPT:
    //  - api routes
    //  - Next.js internals (_next/*)
    //  - Any file with an extension (.jpeg, .png, .svg, .ico, .js, .css, etc.)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
