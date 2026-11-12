import 'server-only'
import { after } from 'next/server'
import { prisma } from '@/shared/lib/db/prisma'
import { loadImatCatalog } from './catalogService'
import { processImatLeadRequest } from './leadSubmission'
import { counsellorNotificationEmail, deliverImatNotification } from './leadNotification'
import { saveImatLeadAndNotify } from './leadPersistence'

export function handleImatLeadRequest(request: Request) {
  return processImatLeadRequest(request, {
    loadCatalog: loadImatCatalog,
    saveLead: (data, sections) => saveImatLeadAndNotify(data, sections, {
      insert: async record => (await prisma.imatLead.createMany({ data: [record], skipDuplicates: true })).count === 1,
      exists: async attemptId => !!await prisma.imatLead.findUnique({ where: { attempt_id: attemptId }, select: { id: true } }),
      schedule: job => after(job),
      notify: notification => deliverImatNotification(notification, {
        recipient: counsellorNotificationEmail({ CONSULTATION_NOTIFICATION_EMAIL: process.env.CONSULTATION_NOTIFICATION_EMAIL }), apiKeyAvailable: !!process.env.RESEND_API_KEY,
        send: async (message, options) => {
          // The shared client throws if its key is absent, so construct/import it
          // only after the background delivery helper has checked configuration.
          const { resend } = await import('@/shared/lib/email')
          return resend.emails.send(message, options)
        },
        warn: code => console.warn(`IMAT counsellor notification: ${code}. Lead remains saved.`),
      }),
      warn: () => console.warn('IMAT counsellor notification could not be scheduled or delivered. Lead remains saved.'),
    }),
  })
}
