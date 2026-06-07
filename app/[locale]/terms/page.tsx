import type { Metadata } from 'next'
import TermsContent from '@/shared/components/legal/TermsContent'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Saturday Education',
  description: 'Read the terms and conditions for using Saturday Education Consulting’s website and services.',
}

export default function TermsPage() {
  return <TermsContent />
}
