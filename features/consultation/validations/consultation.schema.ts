import * as z from 'zod'

export const consultationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  targetCountry: z.string().optional(),
  consultationType: z.string().optional(),
  message: z.string().optional(),
})

export type ConsultationFormData = z.infer<typeof consultationSchema>
