import 'server-only';
import * as z from 'zod';
import { getSupabaseAdmin } from './db';
import { messageSchema, renderResultEmail, renderTeamResultEmail, summarySchema, type ResultMessage } from './result-email';

type Rpc = (name: string, args: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>;
const jobSchema = z.object({ id: z.string().uuid(), generation: z.number().int().positive(), idempotencyKey: z.string().min(1).max(256), kind: z.enum(['student', 'team']).default('student'), recipient: z.string().email().optional(), summary: summarySchema, payload: messageSchema.nullable() });
type SendResult = { id: string } | { retry: boolean; code: string };
/** All I/O is injected so tests cannot reach Supabase or Resend. No recipient comes from a browser request. */
export function emailWorker(rpc: Rpc, send: (message: ResultMessage, key: string) => Promise<SendResult>, from: () => string | undefined) {
  return async (attemptId: string | null = null, limit = 1) => {
    let processed = 0;
    for (let i = 0; i < Math.min(limit, 3); i++) {
      const sender = from();
      if (!sender) return { processed, configured: false };
      const claimed = await rpc('saturday_csca_claim_notification_email', { p_attempt_id: attemptId });
      if (claimed.error) throw new Error('EMAIL_QUEUE_UNAVAILABLE');
      if (claimed.data === null) break;
      const job = jobSchema.parse(claimed.data);
      const recipient = job.kind === 'team' ? job.recipient : job.summary.email;
      if (!recipient) throw new Error('EMAIL_RECIPIENT_MISMATCH');
      // Freeze the exact message before the first send; retries reuse it even if settings change.
      const prepared = await rpc('saturday_csca_prepare_result_email', { p_delivery_id: job.id, p_generation: job.generation, p_payload: job.payload ?? (job.kind === 'team' ? renderTeamResultEmail(job.summary, sender, recipient) : renderResultEmail(job.summary, sender)) });
      if (prepared.error) throw new Error('EMAIL_PREPARATION_FAILED');
      if (!prepared.data) continue; // Lease expired or another worker owns the job.
      const message = messageSchema.parse(prepared.data);
      if (message.to !== recipient) throw new Error('EMAIL_RECIPIENT_MISMATCH');
      if (job.kind === 'team' && (message.bcc || message.reply_to !== job.summary.email)) throw new Error('EMAIL_RECIPIENT_MISMATCH');
      let sent: SendResult;
      try { sent = await send(message, job.idempotencyKey); }
      catch { sent = { retry: true, code: 'PROVIDER_NETWORK' }; }
      const finished = await rpc('saturday_csca_finish_result_email', { p_delivery_id: job.id, p_generation: job.generation, p_provider_id: 'id' in sent ? sent.id : null, p_retry: 'retry' in sent ? sent.retry : false, p_error_code: 'code' in sent ? sent.code : null });
      if (finished.error) throw new Error('EMAIL_STATUS_UNAVAILABLE');
      processed++;
    }
    return { processed, configured: true };
  };
}
export async function sendWithResend(message: ResultMessage, key: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { retry: true, code: 'PROVIDER_CONFIG' };
  // Bounded REST call; the installed SDK does not expose a request timeout.
  const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify(message), signal: AbortSignal.timeout(10000) });
  const data = await response.json().catch(() => null);
  if (response.ok && typeof data?.id === 'string' && data.id.length > 0) return { id: data.id };
  const retry = response.ok || response.status === 429 || response.status >= 500 || (response.status === 409 && data?.name === 'concurrent_idempotent_requests');
  return { retry, code: retry ? 'PROVIDER_RETRY' : 'PROVIDER_REJECTED' };
}
export const processResultEmails = emailWorker(async (name, args) => {
  const { data, error } = await getSupabaseAdmin().rpc(name, args); return { data, error };
}, sendWithResend, () => process.env.RESEND_API_KEY ? (process.env.CSCA_FROM_EMAIL || 'Saturday Education <consultations@saturdayeducation.com>') : undefined);
