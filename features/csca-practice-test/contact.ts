import * as z from 'zod'
import { isValidPhone } from '@/shared/utils/phone'

/** Match Saturday's IMAT contact gate: all three fields required, no OTP. */
export const contactInput = z.object({
  name: z.string().trim().min(2).max(120).refine(value => !/[\x00-\x1f\x7f]/.test(value)),
  email: z.string().trim().max(254).email().transform(value => value.toLowerCase()),
  phone: z.string().trim().refine(isValidPhone),
  consent: z.literal(true),
})
export type ResultContact = z.output<typeof contactInput>
export type EmailStatus = 'pending' | 'processing' | 'retry' | 'accepted' | 'delivered' | 'failed' | 'bounced' | 'cancelled'
