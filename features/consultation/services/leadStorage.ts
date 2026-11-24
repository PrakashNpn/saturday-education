import { prisma } from '@/shared/lib/db/prisma'
import { resend } from '@/shared/lib/email'
import { createFirmliLead } from '@/shared/lib/crm/firmli'
import { countryLabel } from '@/shared/constants/destinationCountries'
import { syncLeadToCrm, type CrmChannel, type CrmOutcome } from './crmSync'

const NOTIFICATION_EMAIL = process.env.CONSULTATION_NOTIFICATION_EMAIL ?? 'saturdayeducationconsulting@gmail.com'
// Where "this lead did not reach Firmli" alerts go. Kept apart from the consultation
// notification address on purpose.
const CRM_ALERT_EMAIL = process.env.CRM_ALERT_EMAIL ?? 'marketing@saturdayeducation.com'

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
  /** Stored on the lead row. Defaults to "website". Use "grade-converter" for the tool. */
  source?: string
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
    const saved = await prisma.consultation.create({
      // Only the id is read back, so saving still works if the CRM tracking columns
      // (prisma/migrations/20261017090000_add_consultation_crm_status) are not in the database yet.
      select: { id: true },
      data: {
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || null,
        targetCountry: data.targetCountry || null,
        consultationType: data.consultationType
          ? (CONSULTATION_TYPE_MAP[data.consultationType] ?? null)
          : null,
        message: data.message?.trim() || null,
        source: data.source?.trim() || 'website',
      },
    })

    // Both are best-effort side effects of a successful booking — neither
    // should ever fail the submission itself, so each catches its own
    // errors internally. Run together rather than one after the other so a
    // slow CRM call doesn't add to how long the user waits.
    const channel = options.channel ?? 'consultation'
    const [, crm] = await Promise.all([
      options.notify ? sendNotificationEmail(data) : Promise.resolve(),
      syncToFirmliCRM(data, channel),
    ])
    await recordCrmOutcome(saved.id, crm)
    if (crm.status === 'failed') await sendCrmFailureAlert(data, channel, crm.error)

    return { success: true }
  } catch (error) {
    console.error('Consultation submission error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

async function syncToFirmliCRM(data: ConsultationInput, channel: CrmChannel): Promise<CrmOutcome> {
  return syncLeadToCrm(
    {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      targetCountry: data.targetCountry || null,
      message: data.message?.trim() || null,
    },
    channel,
    (lead, ch) => createFirmliLead(lead, { channel: ch }),
  )
}

/** Notes on the lead's row whether it reached Firmli. Never fails the submission. */
async function recordCrmOutcome(id: string, outcome: CrmOutcome) {
  try {
    await prisma.consultation.update({
      where: { id },
      data: {
        crmStatus: outcome.status,
        crmError: outcome.status === 'failed' ? outcome.error : null,
        crmSyncedAt: new Date(),
      },
    })
  } catch (error) {
    // Most likely the crm_* columns have not been added to the database yet.
    console.error('Could not record the Firmli sync result:', error)
  }
}

/** The lead is saved and (for the website form) emailed, but is not in the CRM:
 *  tell the team, with everything needed to add it by hand. */
async function sendCrmFailureAlert(data: ConsultationInput, channel: CrmChannel, error: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set, so the Firmli failure alert was not sent.')
    return
  }
  const country = data.targetCountry ? countryLabel(data.targetCountry) : '—'
  const via = leadSourceLabel(data.source, channel)
  const row = (label: string, value: string) =>
    `<tr><td style="padding: 8px 0; color: #6b7280;">${label}</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(value)}</td></tr>`
  try {
    await resend.emails.send({
      from: 'Saturday Education <consultations@saturdayeducation.com>',
      to: CRM_ALERT_EMAIL,
      replyTo: data.email.trim(),
      subject: `Lead NOT in Firmli, add manually: ${data.fullName.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #b45309;">This lead did not reach Firmli</h2>
          <p style="font-size: 14px;">It is saved in the database${channel === 'chat' ? '' : ' and the counsellor notification was sent'}, but the Firmli sync failed after two tries. Please add it in Firmli by hand.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${row('Came from', via)}
            ${row('Full Name', data.fullName.trim())}
            ${row('Email', data.email.trim())}
            ${row('Phone', data.phone?.trim() || '—')}
            ${row('Target Country', country)}
          </table>
          ${
            data.message?.trim()
              ? `<p style="color: #6b7280; margin-top: 16px; margin-bottom: 4px;">Message</p>
                 <p style="white-space: pre-wrap; background: #f9fafb; border-radius: 8px; padding: 12px; font-size: 14px;">${escapeHtml(data.message.trim())}</p>`
              : ''
          }
          <p style="color: #6b7280; margin-top: 16px; margin-bottom: 4px;">Error</p>
          <p style="white-space: pre-wrap; background: #fef3c7; border-radius: 8px; padding: 12px; font-size: 13px;">${escapeHtml(error)}</p>
        </div>
      `,
    })
  } catch (alertError) {
    console.error('Firmli failure alert email error:', alertError)
  }
}

function leadSourceLabel(source: string | undefined, channel: CrmChannel): string {
  if (source === 'grade-converter') return 'Grade Converter'
  if (channel === 'chat') return 'AI chatbot'
  if (channel === 'event') return 'Education event'
  return 'Consultation form'
}

async function sendNotificationEmail(data: ConsultationInput) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set — skipping consultation notification email.')
    return
  }

  const country = data.targetCountry ? countryLabel(data.targetCountry) : '—'
  const type = data.consultationType
    ? CONSULTATION_TYPE_LABELS[data.consultationType] ?? data.consultationType
    : '—'
  const fromGradeConverter = data.source === 'grade-converter'
  const subjectName = data.fullName.trim()
  const subject = fromGradeConverter
    ? `New Grade Converter Lead - ${subjectName}`
    : `New Consultation Request - ${subjectName}`
  const heading = fromGradeConverter ? 'New Grade Converter Lead' : 'New Consultation Request'

  try {
    await resend.emails.send({
      from: 'Saturday Education <consultations@saturdayeducation.com>',
      to: NOTIFICATION_EMAIL,
      replyTo: data.email.trim(),
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #177E8D;">${heading}</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Came from</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(leadSourceLabel(data.source, 'consultation'))}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Full Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.fullName.trim())}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.email.trim())}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${data.phone ? escapeHtml(data.phone.trim()) : '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Target Country</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(country)}</td></tr>
            ${fromGradeConverter ? '' : `<tr><td style="padding: 8px 0; color: #6b7280;">Consultation Type</td><td style="padding: 8px 0; font-weight: 600;">${type}</td></tr>`}
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
