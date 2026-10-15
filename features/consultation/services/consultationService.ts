'use server'

import { saveConsultationLead } from './leadStorage'

interface ConsultationInput {
  fullName: string
  email: string
  phone?: string
  targetCountry?: string
  consultationType?: string
  message?: string
}

// The website's consultation form. Sends the counsellor notification email as
// well as storing the lead and syncing it to the CRM.
export async function submitConsultation(data: ConsultationInput) {
  return saveConsultationLead(data, { notify: true })
}
