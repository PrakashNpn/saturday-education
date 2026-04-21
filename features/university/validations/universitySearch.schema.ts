import * as z from 'zod'

export const universitySearchSchema = z.object({
  studyLevel: z.string().optional(),
  course: z.string().optional(),
  country: z.string().optional(),
})

export type UniversitySearchInput = z.infer<typeof universitySearchSchema>
