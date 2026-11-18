import 'server-only';
import * as z from 'zod';
import { SITE_URL } from '@/shared/constants/site';
const site = { url: SITE_URL, contact: { email: process.env.CSCA_REPLY_TO_EMAIL || 'marketing@saturdayeducation.com' } };
import { SUBJECTS } from '../config';
import { SUBJECT_IDS } from '../types';

export const messageSchema = z.object({ from: z.string().min(1), to: z.string().email(), bcc: z.array(z.string().email()).min(1).max(50).optional(), reply_to: z.string().email(), subject: z.string(), html: z.string(), text: z.string() }).strict();
export type ResultMessage = z.infer<typeof messageSchema>;
export const summarySchema = z.object({ name: z.string(), email: z.string().email(), phone: z.string().nullable().optional(), completedAt: z.string().datetime({ offset: true }), papers: z.array(z.object({ subject: z.enum(SUBJECT_IDS), correct: z.number().int().nonnegative(), incorrect: z.number().int().nonnegative(), skipped: z.number().int().nonnegative(), total: z.number().int().positive(), score: z.number().min(0).max(100) })).min(1).max(4) });
type Summary = z.infer<typeof summarySchema>;
const escape = (v: string) => v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
/** Only server configuration supplies notification recipients. Invalid configuration disables team copies. */
export function teamRecipients(value?: string): string[] {
  const recipients = [...new Set((value ?? '').split(',').map(email => email.trim().toLowerCase()).filter(Boolean))];
  const parsed = z.array(z.string().email()).max(10).safeParse(recipients);
  return parsed.success ? parsed.data : [];
}
export function renderResultEmail(summary: Summary, from: string): ResultMessage {
  const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(summary.completedAt)) + ' UTC';
  const rows = summary.papers.map(p => `<tr><td style="padding:16px 10px;border-bottom:1px solid #e3e8f1"><strong>${escape(SUBJECTS[p.subject].shortName)}</strong><br><span style="color:#64718a;font-size:13px">${p.correct} correct · ${p.incorrect} incorrect · ${p.skipped} skipped</span></td><td style="padding:16px 10px;border-bottom:1px solid #e3e8f1;text-align:right;color:#177E8D;font-size:25px">${p.score}<span style="font-size:13px;color:#64718a"> / 100</span></td></tr>`).join('');
  const text = `Hi ${summary.name},\n\nHere are your CSCA practice results from ${date}.\n\n` + summary.papers.map(p => `${SUBJECTS[p.subject].shortName}: ${p.score}/100 (${p.correct} correct, ${p.incorrect} incorrect, ${p.skipped} skipped, ${p.total} questions)`).join('\n') + `\n\nEach paper is scored separately. These are practice results, not official CSCA scores.\n\nReview the explanations in your open test tab.\nPractise again: ${site.url}/csca\n\nSaturday Education`;
  const html = `<!doctype html><html><body style="margin:0;background:#FAFAFA;font-family:Arial,sans-serif;color:#404040"><div style="max-width:580px;margin:24px auto;background:white;border:1px solid #e1e7f0;border-radius:20px;overflow:hidden"><div style="background:#00333A;color:white;padding:30px"><p style="font-size:12px;letter-spacing:2px;margin:0 0 20px">SATURDAY EDUCATION</p><h1 style="font-family:Georgia,serif;font-size:30px;font-weight:400;margin:0">Your practice results</h1><p style="font-size:13px;color:#C5F8FF">${escape(date)}</p></div><div style="padding:28px"><p>Hi ${escape(summary.name)},</p><p>Your practice session is complete. Here is your subject breakdown.</p><table style="width:100%;border-collapse:collapse">${rows}</table><p style="font-size:13px;line-height:1.6;color:#64718a">Each paper is scored separately. These are practice results, not official CSCA scores. Review the question explanations in your open test tab.</p><p style="margin-top:28px"><a href="${site.url}/csca" style="display:inline-block;background:#177E8D;color:white;text-decoration:none;border-radius:10px;padding:14px 22px">Practise again</a></p></div></div></body></html>`;
  return { from, to: summary.email, reply_to: site.contact.email, subject: 'Your CSCA practice results from Saturday Education', html, text };
}

/** A separate internal message; contact details never enter the student's result email. */
export function renderTeamResultEmail(summary: Summary, from: string, recipient: string): ResultMessage {
  const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(summary.completedAt)) + ' UTC';
  const phone = summary.phone || 'Not provided';
  const rows = summary.papers.map(p => `<tr><td style="padding:14px 0;border-bottom:1px solid #e3e8f1"><strong>${escape(SUBJECTS[p.subject].shortName)}</strong><br><span style="font-size:13px;color:#64718a">${p.correct} correct · ${p.incorrect} incorrect · ${p.skipped} skipped · ${p.total} questions</span></td><td style="padding:14px 0;text-align:right;border-bottom:1px solid #e3e8f1;color:#177E8D;font-size:24px">${p.score}<span style="font-size:13px"> / 100</span></td></tr>`).join('');
  const text = `${summary.name} completed a CSCA practice session.\n\nStudent details\nName: ${summary.name}\nEmail: ${summary.email}\nPhone: ${phone}\nCompleted: ${date}\n\nSubjects and results\n` + summary.papers.map(p => `${SUBJECTS[p.subject].shortName}: ${p.score}/100 (${p.correct} correct, ${p.incorrect} incorrect, ${p.skipped} skipped, ${p.total} questions)`).join('\n') + '\n\nThese are practice results, not official CSCA scores. Reply to this email to contact the student.';
  const html = `<!doctype html><html><body style="margin:0;background:#FAFAFA;font-family:Arial,sans-serif;color:#404040"><div style="max-width:580px;margin:24px auto;background:white;border:1px solid #e1e7f0;border-radius:20px;overflow:hidden"><div style="background:#00333A;color:white;padding:28px"><p style="font-size:12px;letter-spacing:2px">SATURDAY EDUCATION · TEAM NOTIFICATION</p><h1 style="font-family:Georgia,serif;font-size:28px;font-weight:400">CSCA practice completed</h1></div><div style="padding:28px"><p><strong>${escape(summary.name)}</strong> completed a CSCA practice session.</p><h2 style="font-size:17px;margin-top:24px">Student details</h2><p style="line-height:1.8">Name: ${escape(summary.name)}<br>Email: ${escape(summary.email)}<br>Phone: ${escape(phone)}<br>Completed: ${escape(date)}</p><h2 style="font-size:17px;margin-top:24px">Subjects and results</h2><table style="width:100%;border-collapse:collapse">${rows}</table><p style="font-size:13px;line-height:1.6;color:#64718a">These are practice results, not official CSCA scores. Reply to this email to contact the student.</p></div></div></body></html>`;
  return { from, to: recipient, reply_to: summary.email, subject: `CSCA practice completed: ${summary.name.replace(/[\r\n]/g, ' ')}`, html, text };
}
