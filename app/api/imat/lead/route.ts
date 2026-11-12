import { handleImatLeadRequest } from '@/features/imat-practice-test/services/leadService'

export const maxDuration = 60

export async function POST(request: Request) {
  return handleImatLeadRequest(request)
}
