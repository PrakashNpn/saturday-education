import 'server-only'
import { after } from 'next/server'
import { prisma } from '@/shared/lib/db/prisma'
import { createFirmliLead } from '@/shared/lib/crm/firmli'
import { syncLeadToCrm } from '@/shared/lib/crm/syncLead'
import { countryNameFor } from '@/shared/constants/destinationCountries'
import { CANADA_EVENT, EVENT_CAMPAIGN } from '../config'
import { processRegistrationRequest } from './registration'

export function handleEventRegistration(request: Request) {
  return processRegistrationRequest(request, {
    insert: attendee => prisma.$transaction(async transaction => {
      const inserted = await transaction.eventRegistration.createMany({ data: [attendee], skipDuplicates: true })
      if (!inserted.count) return null
      const saved = await transaction.eventRegistration.findUniqueOrThrow({ where: { eventKey_email: { eventKey: attendee.eventKey, email: attendee.email } }, select: { id: true } })
      return saved.id
    }),
    exists: async (eventKey, email) => !!await prisma.eventRegistration.findUnique({ where: { eventKey_email: { eventKey, email } }, select: { id: true } }),
    schedule: job => after(job),
    sync: attendee => syncLeadToCrm({
      fullName: attendee.fullName, email: attendee.email, phone: attendee.phone,
      targetCountry: attendee.destination,
      message: `${CANADA_EVENT.title} | ${CANADA_EVENT.date} | ${CANADA_EVENT.venue} | Event QR registration | Destination of interest: ${countryNameFor(attendee.destination)}`,
    }, 'event', (lead, channel) => createFirmliLead(lead, { channel, campaign: EVENT_CAMPAIGN })),
    record: async (id, outcome) => {
      await prisma.eventRegistration.update({ where: { id }, data: {
        crmStatus: outcome.status, crmError: outcome.status === 'failed' ? outcome.error : null,
        crmSyncedAt: outcome.status === 'synced' ? new Date() : null,
      } })
    },
    alert: async id => {
      if (!process.env.RESEND_API_KEY) {
        console.warn(`Event registration ${id}: CRM needs attention; alert email is not configured.`)
        return
      }
      const { resend } = await import('@/shared/lib/email')
      const result = await resend.emails.send({
        from: 'Saturday Education <consultations@saturdayeducation.com>',
        to: process.env.CRM_ALERT_EMAIL ?? 'marketing@saturdayeducation.com',
        subject: 'Canada Education Fair: registration CRM sync needs attention',
        text: `A registration is saved in event_registrations but its Firmli delivery or status needs attention.\nRegistration ID: ${id}\nEvent: ${CANADA_EVENT.title}\nCheck this row and add it to Firmli manually if missing. Do not resubmit blindly: a timeout can occur after Firmli accepts a lead.`,
      })
      if (result.error) throw new Error('Event CRM alert delivery failed')
    },
    warn: code => console.warn(code),
  })
}
