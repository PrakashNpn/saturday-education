import { NextRequest } from 'next/server';
import * as z from 'zod';
import { loadDiagram } from './diagrams';


const headers = {
  'Cache-Control': 'private, no-store', Vary: 'Cookie',
  'X-Content-Type-Options': 'nosniff', 'Cross-Origin-Resource-Policy': 'same-origin',
  'Content-Security-Policy': "sandbox; default-src 'none'; script-src 'none'; style-src 'none'; img-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};
const notFound = () => new Response('Diagram unavailable.', { status: 404, headers });
export async function handleGet(request: NextRequest, context: { params: Promise<{ questionId: string }> }) {
  if (request.headers.get('sec-fetch-site') === 'cross-site') return new Response('Access denied.', { status: 403, headers });
  const owner = request.cookies.get('saturday-csca-owner-v1')?.value;
  const attempt = request.cookies.get('saturday-csca-attempt-v1')?.value;
  const { questionId } = await context.params;
  const version = request.nextUrl.searchParams.get('v') ?? '';
  if (!owner || !/^[a-f0-9]{64}$/.test(owner) || !attempt || !z.string().uuid().safeParse(attempt).success
    || !/^[a-z0-9][a-z0-9-]{0,159}$/i.test(questionId) || !/^[a-f0-9]{64}$/.test(version)) return notFound();
  try {
    const svg = await loadDiagram({ owner, attempt, question: questionId, version });
    return svg ? new Response(svg, { headers: { ...headers, 'Content-Type': 'image/svg+xml; charset=utf-8', 'Content-Disposition': 'inline; filename="diagram.svg"' } }) : notFound();
  } catch {
    return new Response('Diagram temporarily unavailable.', { status: 503, headers });
  }
}
