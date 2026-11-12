import type { ImatLeadRecord, ImatSectionResult } from './leadSubmission'

export type ImatNotification = { lead: ImatLeadRecord; sections: ImatSectionResult[] }
export type NotificationMessage = { from: string; to: string; replyTo: string; subject: string; html: string; text: string }
export type NotificationTransport = (message: NotificationMessage, options: { idempotencyKey: string }) => Promise<{
  data?: { id: string } | null; error: unknown
}>

export function counsellorNotificationEmail(env: { CONSULTATION_NOTIFICATION_EMAIL?: string }) {
  return env.CONSULTATION_NOTIFICATION_EMAIL?.trim() || 'saturdayeducationconsulting@gmail.com'
}

const escape = (value: string | number) => String(value).replace(/[&<>"']/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[character]!)
const number = (value: number) => new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value)
const sections: Record<ImatSectionResult['id'], string> = {
  reading: 'Reading and general knowledge', reasoning: 'Logical reasoning', biology: 'Biology', chemistry: 'Chemistry', physicsMath: 'Physics and mathematics',
}

export function buildImatNotification({ lead, sections: rows }: ImatNotification, recipient: string): NotificationMessage {
  const year = lead.paper_slug?.match(/^imat-(\d{4})-published$/)?.[1]
  const exam = lead.exam_mode === 'mock' ? 'Random mock exam' : year ? `IMAT ${year} past paper` : 'Past-paper exam'
  const completed = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Bangkok' }).format(lead.completed_at)
  const label = (row: ImatSectionResult) => row.id === 'reasoning' && year && Number(year) <= 2012 ? 'Logical reasoning and general knowledge' : sections[row.id]
  const details: [string, string][] = [
    ['Student', lead.full_name], ['Email', lead.email], ['Phone', lead.phone], ['Exam', exam],
    ['Completed (Bangkok time)', completed], ['Score', `${number(lead.score)} / ${number(lead.maximum_score)}`],
    ['Questions', String(lead.question_count)], ['Correct / incorrect / unanswered', `${lead.correct_count} / ${lead.incorrect_count} / ${lead.unanswered_count}`],
  ]
  return {
    from: 'Saturday Education <consultations@saturdayeducation.com>', to: recipient, replyTo: lead.email,
    subject: `IMAT result: ${lead.full_name.replace(/[\r\n]/g,' ').slice(0,120)} | ${number(lead.score)}/${number(lead.maximum_score)}`,
    text: ['A student has completed an IMAT practice test and shared their contact details.', ...details.map(([key,value]) => `${key}: ${value}`), '',
      'Section results (correct / incorrect / unanswered; score):', ...rows.map(row => `${label(row)}: ${row.correct} / ${row.incorrect} / ${row.unanswered}; ${number(row.score)}`), '',
      'Reply to this email to contact the student. Practice scores are not certified exam results.', `Attempt: ${lead.attempt_id}`].join('\n'),
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 12px;background:#FAFAFA;font-family:Arial,sans-serif;color:#404040">
<div style="max-width:640px;margin:auto;border:1px solid #E5E5E5;border-radius:16px;overflow:hidden;background:white">
<div style="background:#00333A;color:white;padding:28px"><p style="margin:0 0 10px;color:#C5F8FF;font-size:12px;letter-spacing:1px">SATURDAY EDUCATION</p><h1 style="margin:0;font-size:24px">New IMAT practice result</h1><p style="margin:12px 0 0;color:#C5F8FF">${escape(exam)}</p></div>
<div style="padding:24px"><p style="margin:0 0 20px">A student has completed a test and shared their details. You can reply directly to this email to contact them.</p>
<table style="width:100%;border-collapse:collapse;font-size:14px">${details.map(([key,value]) => `<tr><td style="padding:10px 8px 10px 0;border-bottom:1px solid #E5E5E5;color:#737373;vertical-align:top">${escape(key)}</td><td style="padding:10px 0;border-bottom:1px solid #E5E5E5;color:#141414;font-weight:600;word-break:break-word">${escape(value)}</td></tr>`).join('')}</table>
<h2 style="font-size:18px;color:#00333A;margin:28px 0 12px">Section breakdown</h2>
<table style="width:100%;border-collapse:collapse;font-size:13px"><thead><tr style="background:#F0FBFD;color:#00333A">${['Section','Correct','Incorrect','Blank','Score'].map(value=>`<th style="padding:10px 6px;text-align:left">${value}</th>`).join('')}</tr></thead>
<tbody>${rows.map(row=>`<tr>${[label(row),row.correct,row.incorrect,row.unanswered,number(row.score)].map(value=>`<td style="padding:10px 6px;border-bottom:1px solid #E5E5E5">${escape(value)}</td>`).join('')}</tr>`).join('')}</tbody></table>
<p style="font-size:12px;line-height:1.6;color:#737373;margin:24px 0 0">Practice scores are for preparation and are not certified exam results.<br>Attempt: ${escape(lead.attempt_id)}</p></div></div></body></html>`,
  }
}

async function bounded<T>(work: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([work, new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('Email timeout')), timeoutMs) })])
  } finally { if (timer) clearTimeout(timer) }
}

/** Background, best-effort delivery. Both retries use the exact same message/key. */
export async function deliverImatNotification(notification: ImatNotification, options: {
  recipient: string; apiKeyAvailable: boolean; send: NotificationTransport
  warn: (code: 'missing-email-key' | 'email-delivery-failed') => void; timeoutMs?: number
}): Promise<void> {
  if (!options.apiKeyAvailable) { options.warn('missing-email-key'); return }
  try {
    const message = buildImatNotification(notification, options.recipient)
    const key = `imat-result-${notification.lead.attempt_id}`
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await bounded(options.send(message, { idempotencyKey: key }), options.timeoutMs ?? 10_000)
        if (!response.error && response.data?.id) return
      } catch { /* Retry once; never reject the student's already-saved submission. */ }
    }
  } catch { /* Formatting/configuration errors are also non-blocking. */ }
  options.warn('email-delivery-failed')
}
