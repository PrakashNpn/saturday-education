import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  // @react-pdf/renderer must be loaded from node_modules at runtime, not bundled
  // by the server compiler — otherwise production builds can break PDF generation.
  serverExternalPackages: ['@react-pdf/renderer'],
  images: {
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
