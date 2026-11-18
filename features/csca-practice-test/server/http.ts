import { after, NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import * as z from 'zod';
import { MAX_PAPER_QUESTIONS } from '../config';
import { contactInput } from '../contact';
import { processResultEmails } from './email-worker';
import { SUBJECT_IDS } from '../types';
import { context, SessionError, sessions } from './session';
import { clientKey, tooManyRequests } from './rateLimit';

const OWNER = 'saturday-csca-owner-v1', ATTEMPT = 'saturday-csca-attempt-v1';
const headers = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' };
const cookie = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/api/csca', maxAge: 86400 };
const answer = z.enum(['A','B','C','D']).nullable();
const draft = { token: z.string().max(80), revision: z.number().int().nonnegative(), answers: z.array(answer).min(1).max(MAX_PAPER_QUESTIONS), flags: z.array(z.number().int().min(0).max(MAX_PAPER_QUESTIONS - 1)).max(MAX_PAPER_QUESTIONS) };
const input = z.discriminatedUnion('action', [
  z.object({ action: z.literal('start'), startId: z.string().uuid(), subjects: z.array(z.enum(SUBJECT_IDS)).min(1).max(4), mode: z.literal('timed'), kind: z.enum(['subject','combined']) }),
  z.object({ action: z.enum(['save','submit']), ...draft }),
  z.object({ action: z.enum(['next','resume']), token: z.string().max(80) }),
  z.object({ action: z.literal('contact'), token: z.string().max(80), contact: contactInput }),
  z.object({ action: z.literal('forget') }),
]);
function ownerOf(request: NextRequest) {
  const value = request.cookies.get(OWNER)?.value;
  return value && /^[a-f0-9]{64}$/.test(value) ? value : null;
}
function attemptOf(request: NextRequest) {
  const value = request.cookies.get(ATTEMPT)?.value;
  return value && z.string().uuid().safeParse(value).success ? value : null;
}
function failure(error: unknown) {
  const safe = error instanceof SessionError ? error : new SessionError('unavailable');
  return NextResponse.json({ code: safe.code }, { status: safe.status, headers });
}
async function readJson(request: Request) {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new SessionError('invalid');
  const reader = request.body?.getReader();
  if (!reader) throw new SessionError('invalid');
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > 12000) { await reader.cancel(); throw new SessionError('invalid'); }
      chunks.push(part.value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } finally { reader.releaseLock(); }
}
type Dependencies = { service: typeof sessions; schedule: typeof after; deliver: typeof processResultEmails }
/** Injectable dependencies keep HTTP tests away from Supabase and email. */
export function createHandlers({ service, schedule, deliver }: Dependencies) {
async function handleGet(request: NextRequest) {
  // Cross-site requests cannot bootstrap or replace a browser's owner cookie.
  if (request.headers.get('sec-fetch-site') === 'cross-site') return failure(new SessionError('denied'));
  const owner = ownerOf(request) ?? randomBytes(32).toString('hex'), attempt = attemptOf(request);
  try {
    const session = attempt && ownerOf(request) ? await service.update(owner, attempt, 'resume') : null;
    const response = NextResponse.json({ session }, { headers });
    response.cookies.set(OWNER, owner, cookie);
    if (!session) response.cookies.set(ATTEMPT, '', { ...cookie, maxAge: 0 });
    return response;
  } catch (error) {
    const response = failure(error);
    if (error instanceof SessionError && ['denied','expired'].includes(error.code)) response.cookies.set(ATTEMPT, '', { ...cookie, maxAge: 0 });
    return response;
  }
}
async function handlePost(request: NextRequest) {
  let sameHost = false;
  try { sameHost = new URL(request.headers.get('origin') ?? '').host === (request.headers.get('host') ?? new URL(request.url).host); } catch { /* Fail closed. */ }
  if (!sameHost || request.headers.get('sec-fetch-site') === 'cross-site') return failure(new SessionError('denied'));
  if (Number(request.headers.get('content-length') ?? 0) > 12000) return NextResponse.json({ code: 'invalid' }, { status: 413, headers });
  let body;
  try { body = await input.parseAsync(await readJson(request)); }
  catch { return failure(new SessionError('invalid')); }
  try {
    const owner = ownerOf(request);
    if (!owner) throw new SessionError('denied');
    if (body.action === 'forget') {
      const response = NextResponse.json({ forgotten: true }, { headers });
      response.cookies.set(ATTEMPT, '', { ...cookie, maxAge: 0 });
      return response;
    }
    if (body.action === 'start' && tooManyRequests(`csca:${clientKey(request)}`)) return NextResponse.json({ code: 'rateLimit' }, { status: 429, headers });
    let session;
    if (body.action === 'start') session = await service.start(owner, body.startId, body.subjects, body.mode, body.kind);
    else {
      const [attempt, paper] = context(body.token);
      if (attempt !== attemptOf(request)) throw new SessionError('denied');
      session = body.action === 'contact' ? await service.contact(owner, attempt, body.contact) : await service.update(owner, attempt, body.action, paper, 'revision' in body ? body.revision : null, 'answers' in body ? body.answers : null, 'flags' in body ? body.flags : null);
      if (body.action === 'contact' && session.contactSaved) {
        try { schedule(async () => { try { await deliver(attempt, 3); } catch { /* Durable queue remains available for the protected retry worker. */ } }); }
        catch { /* Scheduling failure must not block saved results. */ }
      }
    }
    const response = NextResponse.json(session, { headers });
    response.cookies.set(OWNER, owner, cookie);
    if (body.action === 'start') response.cookies.set(ATTEMPT, body.startId, cookie);
    return response;
  } catch (error) { return failure(error); }
}

return { handleGet, handlePost }
}
export const { handleGet, handlePost } = createHandlers({ service: sessions, schedule: after, deliver: processResultEmails })
