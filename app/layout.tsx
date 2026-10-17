// app/layout.tsx — minimal root layout, NO html/body tags here
// html/body lives in app/[locale]/layout.tsx with full providers and fonts
import type { Metadata } from 'next'
import './globals.css'
import { SITE_URL } from '@/shared/constants/site'

export const metadata: Metadata = {
  // Makes every relative URL in the metadata (language alternates, social images)
  // absolute, which search engines and link previews require.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Saturday Education — Study Abroad Consulting',
    template: '%s | Saturday Education',
  },
  description: 'Your trusted partner for international education.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // No <html> or <body> here — delegated to [locale]/layout.tsx
  return children as React.ReactElement
}
