import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  // @react-pdf/renderer must be loaded from node_modules at runtime, not bundled
  // by the server compiler — otherwise production builds can break PDF generation.
  serverExternalPackages: ['@react-pdf/renderer'],
  images: {
    // 85 is used for the photographic images that need to look crisp (see WhySaturdaySection);
    // every width and quality combination is a separate optimised copy, so keep this list short.
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yucleuhlcrbqzcrweozy.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
