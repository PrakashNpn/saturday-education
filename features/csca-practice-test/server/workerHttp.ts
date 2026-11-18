import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { processResultEmails } from './email-worker';


export async function handlePost(request: Request) {
  const headers = { 'Cache-Control': 'private, no-store' };
  const secret = process.env.SATURDAY_CSCA_EMAIL_WORKER_SECRET;
  const supplied = request.headers.get('authorization') ?? '';
  const digest = (value: string) => createHash('sha256').update(value).digest();
  if (!secret || secret.length < 32 || !timingSafeEqual(digest(supplied), digest(`Bearer ${secret}`))) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401, headers });
  try {
    const result = await processResultEmails(null, 3);
    return NextResponse.json(result, { status: result.configured ? 200 : 503, headers });
  } catch { return NextResponse.json({ message: 'Email queue is temporarily unavailable.' }, { status: 503, headers }); }
}
