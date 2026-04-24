'use server'

import { prisma } from '@/shared/lib/db/prisma'

interface ConsultationInput {
  fullName: string
  email: string
  phone?: string
  targetCountry?: string
  consultationType?: string
  message?: string
}

const CONSULTATION_TYPE_MAP: Record<string, 'ONLINE' | 'IN_PERSON'> = {
  online: 'ONLINE',
  inPerson: 'IN_PERSON',
}

export async function submitConsultation(data: ConsultationInput) {
  if (!data.fullName?.trim() || !data.email?.trim()) {
    return { success: false, error: 'Name and email are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  try {
    await prisma.consultation.create({
      data: {
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || null,
        targetCountry: data.targetCountry || null,
        consultationType: data.consultationType
          ? (CONSULTATION_TYPE_MAP[data.consultationType] ?? null)
          : null,
        message: data.message?.trim() || null,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Consultation submission error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
