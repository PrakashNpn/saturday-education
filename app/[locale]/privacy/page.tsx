import type { Metadata } from 'next'
import PrivacyPolicyContent from '@/shared/components/legal/PrivacyPolicyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy | Saturday Education',
  description: 'Learn how Saturday Education Consulting collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
