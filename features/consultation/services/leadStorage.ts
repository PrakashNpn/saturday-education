import { prisma } from '@/shared/lib/db/prisma'
import { resend } from '@/shared/lib/email'
import { createFirmliLead } from '@/shared/lib/crm/firmli'

const NOTIFICATION_EMAIL = process.env.CONSULTATION_NOTIFICATION_EMAIL ?? 'saturdayeducationconsulting@gmail.com'

const COUNTRY_LABELS: Record<string, string> = {
  uk: 'UK',
  usa: 'USA',
  australia: 'Australia',
  canada: 'Canada',
  newZealand: 'New Zealand',
  singapore: 'Singapore',
  switzerland: 'Switzerland',
  ireland: 'Ireland',
  thailand: 'Thailand',
  germany: 'Germany',
  malaysia: 'Malaysia',
  netherlands: 'Netherlands',
  spain: 'Spain',
  uae: 'UAE',
  other: 'Other',
}

// Name, email and message can arrive from the chat advisor's lead tool as well
// as the form, so they are escaped before going into the notification email.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const CONSULTATION_TYPE_LABELS: Record<string, string> = {
  online: 'Online',
  inPerson: 'In Person',
  phoneCall: 'Phone Call',
}

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

/**
 * Validates, stores and syncs one lead. Deliberately not a server action (no
 * 'use server' in this file): a server action is callable from any browser, so
 * the `notify` switch below must not be reachable that way. The form goes
 * through submitConsultation, which always notifies; the chat advisor calls this
 * directly with notify off, so its leads do not spend email quota.
 */
export async function saveConsultationLead(
  data: ConsultationInput,
  options: { notify: boolean; channel?: 'consultation' | 'chat' },
) {
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

    // Both are best-effort side effects of a successful booking — neither
    // should ever fail the submission itself, so each catches its own
    // errors internally. Run together rather than one after the other so a
    // slow CRM call doesn't add to how long the user waits.
    await Promise.all([
      options.notify ? sendNotificationEmail(data) : Promise.resolve(),
      syncToFirmliCRM(data, options.channel),
    ])

    return { success: true }
  } catch (error) {
    console.error('Consultation submission error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

async function syncToFirmliCRM(data: ConsultationInput, channel: 'consultation' | 'chat' = 'consultation') {
  try {
    await createFirmliLead({
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      targetCountry: data.targetCountry || null,
      message: data.message?.trim() || null,
    }, { channel })
  } catch (error) {
    console.error('Firmli CRM sync error:', error)
  }
}

async function sendNotificationEmail(data: ConsultationInput) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set — skipping consultation notification email.')
    return
  }

  const country = data.targetCountry ? COUNTRY_LABELS[data.targetCountry] ?? data.targetCountry : '—'
  const type = data.consultationType
    ? CONSULTATION_TYPE_LABELS[data.consultationType] ?? data.consultationType
    : '—'

  try {
    await resend.emails.send({
      from: 'Saturday Education <consultations@saturdayeducation.com>',
      to: NOTIFICATION_EMAIL,
      replyTo: data.email.trim(),
      subject: `New Consultation Request — ${data.fullName.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #177E8D;">New Consultation Request</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Full Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.fullName.trim())}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.email.trim())}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${data.phone ? escapeHtml(data.phone.trim()) : '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Target Country</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(country)}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Consultation Type</td><td style="padding: 8px 0; font-weight: 600;">${type}</td></tr>
          </table>
          ${
            data.message?.trim()
              ? `<p style="color: #6b7280; margin-top: 16px; margin-bottom: 4px;">Message</p>
                 <p style="white-space: pre-wrap; background: #f9fafb; border-radius: 8px; padding: 12px; font-size: 14px;">${escapeHtml(data.message.trim())}</p>`
              : ''
          }
        </div>
      `,
    })
  } catch (error) {
    console.error('Consultation notification email error:', error)
  }
}
