// app/layout.tsx — minimal root layout, NO html/body tags here
// html/body lives in app/[locale]/layout.tsx with full providers and fonts
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Saturday Education',
  description: 'Your Global Education Journey Begins with Saturday Education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // No <html> or <body> here — delegated to [locale]/layout.tsx
  return children as React.ReactElement
}
