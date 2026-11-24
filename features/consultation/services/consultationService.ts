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

export type GradeConverterLeadInput = {
  fullName: string
  email: string
  phone?: string
  targetCountry?: string
  /** Optional free-text notes from the student. */
  message?: string
  /** English summary of the converter result for counsellors (prepended to message). */
  gradeSummary: string
}

// The website's consultation form. Sends the counsellor notification email as
// well as storing the lead and syncing it to the CRM.
export async function submitConsultation(data: ConsultationInput) {
  return saveConsultationLead(data, { notify: true })
}

/** Grade Converter step 4: same DB + Firmli + email path, tagged as grade-converter. */
export async function submitGradeConverterLead(data: GradeConverterLeadInput) {
  const notes = data.message?.trim()
  const summary = data.gradeSummary.trim()
  const message = [summary, notes].filter(Boolean).join('\n\n')

  return saveConsultationLead(
    {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      targetCountry: data.targetCountry,
      consultationType: 'online',
      message,
      source: 'grade-converter',
    },
    { notify: true, channel: 'consultation' },
  )
}
