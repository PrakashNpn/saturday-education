import { handleEventRegistration } from '@/features/education-event/services/registrationService'

export const maxDuration = 60
export async function POST(request: Request) {
  return handleEventRegistration(request)
}
