import 'server-only';
import { createHash } from 'node:crypto';
import * as z from 'zod';
import { getSupabaseAdmin } from './db';
import { MAX_PAPER_QUESTIONS, PAPER_FORMATS } from '../config';
import { SUBJECT_IDS, type SessionView } from '../types';
import type { ResultContact } from '../contact';
import { teamRecipients } from './result-email';
import { previewSet } from './bank';


export class SessionError extends Error {
  constructor(public code: 'unavailable' | 'denied' | 'expired' | 'conflict' | 'contact_conflict' | 'invalid') {
    super({ unavailable: 'CSCA practice is temporarily unavailable. Please try again later.', denied: 'This practice session could not be accessed. Please start again.', expired: 'This practice session has expired. Please start again.', contact_conflict: 'Details were already saved for this test. Reload to view your results.', conflict: 'This paper changed in another tab. Load saved progress before continuing.', invalid: 'Please check your practice choices and try again.' }[code]);
  }
  get status() { return { unavailable: 503, denied: 403, expired: 410, conflict: 409, contact_conflict: 409, invalid: 400 }[this.code]; }
}
const uuid = z.string().uuid();
export function context(token: string): [string, string] {
  const parts = token.split('.');
  if (parts.length !== 2 || parts.some(p => !uuid.safeParse(p).success)) throw new SessionError('invalid');
  return parts as [string, string];
}
export function accessHash(owner: string, attempt: string): string {
  return createHash('sha256').update(`saturday-csca-attempt-v1:${owner}:${attempt}`).digest('hex');
}
const question = z.object({ id: z.string(), text: z.string(), topic: z.string(), options: z.array(z.object({ key: z.enum(['A','B','C','D']), text: z.string() })).length(4), passage: z.string().optional(),
  diagram: z.object({ sha256: z.string().regex(/^[a-f0-9]{64}$/), alt: z.string().min(1).max(2000) }).optional() });
const snapshot = z.object({
  token: z.string(), revision: z.number().int().nonnegative(), answers: z.array(z.enum(['A','B','C','D']).nullable()), flags: z.array(z.number().int().nonnegative()),
  kind: z.enum(['subject','combined']), mode: z.enum(['timed','practice']), subjects: z.array(z.enum(SUBJECT_IDS)).min(1).max(4), paper: z.number().int().min(0).max(3),
  contactSaved: z.boolean().default(false), emailStatus: z.enum(['pending','processing','retry','accepted','delivered','failed','bounced','cancelled']).optional(), phase: z.enum(['test','break','contact','results']), deadline: z.number().nullable(), serverNow: z.number(), questions: z.array(question), expired: z.boolean(),
  papers: z.array(z.object({ subject: z.enum(SUBJECT_IDS), questionCount: z.number().int().min(1).max(MAX_PAPER_QUESTIONS), timeLimitSeconds: z.number().int().positive().nullable() })).min(1).max(4).optional(),
  results: z.array(z.object({ subject: z.enum(SUBJECT_IDS), correct: z.number(), answered: z.number(), total: z.number(), score: z.number(), expired: z.boolean(), questions: z.array(question.extend({ answer: z.enum(['A','B','C','D']), selected: z.enum(['A','B','C','D']).nullable(), explanation: z.string(), correct: z.boolean() })) })).optional(),
});
type Rpc = (name: string, args: Record<string, unknown>) => Promise<{ data: unknown; error: { message?: string } | null }>;
/** Injectable transport keeps offline tests away from the live database. */
export function sessionService(rpc: Rpc) {
  async function call(name: string, args: Record<string, unknown>): Promise<SessionView> {
    let reply;
    try { reply = await rpc(name, args); } catch { throw new SessionError('unavailable'); }
    if (reply.error) {
      const match = /^CSCA_(DENIED|EXPIRED|CONFLICT|CONTACT_CONFLICT|INVALID)$/.exec(reply.error.message ?? '');
      throw new SessionError(match ? match[1].toLowerCase() as 'denied' | 'expired' | 'conflict' | 'contact_conflict' | 'invalid' : 'unavailable');
    }
    const parsed = snapshot.safeParse(reply.data);
    if (!parsed.success) throw new SessionError('unavailable');
    const view = parsed.data;
    let attempt: string;
    try { [attempt] = context(view.token); } catch { throw new SessionError('unavailable'); }
    if (attempt !== args.p_attempt_id || view.paper >= view.subjects.length || view.answers.length < 1 || view.answers.length > MAX_PAPER_QUESTIONS
      || view.flags.some(index => index >= view.answers.length)
      || (view.phase === 'test' && view.questions.length !== view.answers.length)
      || (view.phase === 'results' && view.results?.length !== view.subjects.length)) throw new SessionError('unavailable');
    if (view.papers && (view.papers.length !== view.subjects.length || view.papers.some((paper, index) => paper.subject !== view.subjects[index]) || view.papers[view.paper].questionCount !== view.answers.length)) throw new SessionError('unavailable');
    if (name === 'saturday_csca_start_full_attempt' && view.phase === 'test' && (view.mode !== 'timed' || view.answers.length !== PAPER_FORMATS[view.subjects[view.paper]].questions)) throw new SessionError('unavailable');
    // Fail closed during the manual SQL rollout, including replies from old functions.
    if (view.phase === 'results' && !view.contactSaved) view.phase = 'contact';
    // Even a malformed backend reply must not reveal keys before completion.
    if (view.phase !== 'results') delete view.results;
    // New releases use an owner-scoped image endpoint. Raw SVG/URLs are never projected.
    // Saturday's imported release stores diagrams in the database; no public fallback registry.
    function diagram<T extends { id: string; diagram?: { sha256: string; alt: string } }>(q: T) {
      const { diagram: metadata, ...safe } = q;
      if (metadata) return { ...safe, image: `/api/csca/diagrams/${encodeURIComponent(q.id)}?v=${metadata.sha256}`, imageAlt: metadata.alt };
      return safe;
    }
    view.questions = view.questions.map(diagram);
    if (view.results) view.results = view.results.map(paper => ({ ...paper, questions: paper.questions.map(diagram) }));
    return view;
  }
  return {
    contact: (owner: string, attempt: string, contact: ResultContact) => call('saturday_csca_capture_contact_with_team', { p_team_emails: teamRecipients((process.env.CSCA_NOTIFICATION_EMAIL || process.env.CONSULTATION_NOTIFICATION_EMAIL || 'saturdayeducationconsulting@gmail.com')), p_attempt_id: attempt, p_access_hash: accessHash(owner, attempt), p_name: contact.name, p_email: contact.email, p_phone: contact.phone }),
    start: (owner: string, attempt: string, subjects: string[], _mode: string, kind: string) => call('saturday_csca_start_full_attempt', { p_attempt_id: attempt, p_access_hash: accessHash(owner, attempt), p_subjects: subjects, p_kind: kind, p_preview_set_id: previewSet() }),
    update: (owner: string, attempt: string, action: string, paper: string | null = null, revision: number | null = null, answers: (string | null)[] | null = null, flags: number[] | null = null) => call('saturday_csca_update_attempt', { p_attempt_id: attempt, p_access_hash: accessHash(owner, attempt), p_action: action, p_paper_id: paper, p_expected_revision: revision, p_answers: answers, p_flags: flags }),
  };
}
export const sessions = sessionService(async (name, args) => {
  const { data, error } = await getSupabaseAdmin().rpc(name, args);
  return { data, error };
});
