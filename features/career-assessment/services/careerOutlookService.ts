'use server'

import { randomUUID } from 'node:crypto'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/shared/lib/db/prisma'
import { findCareerByQuery } from '@/shared/lib/careers/catalog'
import { buildCareerOutlookPrompt } from '../prompts/careerOutlookPrompt'
import {
  catalogCareerToMaster,
  coerceMasterFromAI,
  normalizeQuery,
  slugify,
  type CareerOutlookMaster,
} from '@/shared/lib/careers/outlookMaster'

const MODEL = 'claude-sonnet-4-6'
const MAX_QUERY_LEN = 80

type OutlookResult =
  | { status: 'ok'; master: CareerOutlookMaster }
  | { status: 'not-a-career' }
  | { status: 'busy' }
  | { status: 'error' }

// Transient Anthropic conditions worth a "busy, try again" rather than a hard error.
function isTransient(error: unknown): boolean {
  if (error instanceof Anthropic.APIConnectionError) return true // includes timeouts
  if (error instanceof Anthropic.APIError) {
    return error.status === 429 || error.status === 503 || error.status === 529
  }
  return false
}

/**
 * Resolve a career's outlook for a typed/selected query.
 * Order: DB cache → AI (validate + generate one master) → cache write → return.
 * The cache is keyed per-career (canonical slug + aliases); horizon is derived
 * client-side from the single master, so there is one row per career.
 */
export async function getCareerOutlook(rawQuery: string): Promise<OutlookResult> {
  const query = normalizeQuery(String(rawQuery ?? '')).slice(0, MAX_QUERY_LEN)
  if (query.length < 2) return { status: 'not-a-career' }
  const slug = slugify(query)

  // 0. Catalog is the source of truth for the 43 known careers — serve the curated
  //    data instantly (no DB, no AI) so the explorer matches the results page exactly.
  //    AI runs only for free-text careers that aren't in the catalog.
  const catalogHit = findCareerByQuery(query)
  if (catalogHit) return { status: 'ok', master: catalogCareerToMaster(catalogHit) }

  // 1. Cache lookup (tolerates a missing table — just falls through to generate).
  const cached = await readCache(slug, query)
  if (cached) return { status: 'ok', master: cached }

  // 2. Generate via Claude (single call validates + produces the master).
  if (!process.env.ANTHROPIC_API_KEY) return { status: 'error' }
  let master: CareerOutlookMaster | null = null
  try {
    // Bound each attempt (the SDK's default timeout is 10 minutes). The SDK `timeout`
    // is per-attempt and retries multiply it, so cap retries at 1 to keep the worst-case
    // wait behind the "researching" animation reasonable (~60s), while still recovering a
    // single transient 429/5xx/connection blip.
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 30_000 })
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      messages: [{ role: 'user', content: buildCareerOutlookPrompt(query) }],
    })
    const text = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1) return { status: 'error' }
    const parsed = JSON.parse(text.slice(start, end + 1)) as unknown
    if (parsed && typeof parsed === 'object' && (parsed as { valid?: unknown }).valid === false) {
      return { status: 'not-a-career' }
    }
    master = coerceMasterFromAI(parsed, query)
  } catch (error) {
    console.error('Career outlook generation failed:', error)
    // Transient overload/rate-limit/timeout → "busy" (retryable); anything else is a hard error.
    return { status: isTransient(error) ? 'busy' : 'error' }
  }
  if (!master) return { status: 'not-a-career' }

  // 3. Cache write (best-effort; never blocks the response on a DB issue).
  await writeCache(master, query)
  return { status: 'ok', master }
}

/** Reads a cached master by canonical slug or a previously-seen alias. */
async function readCache(slug: string, alias: string): Promise<CareerOutlookMaster | null> {
  try {
    const rows = await prisma.$queryRaw<Array<{ payload: unknown }>>`
      SELECT payload FROM career_outlook_cache
      WHERE slug = ${slug} OR ${alias} = ANY(aliases)
      LIMIT 1
    `
    const payload = rows[0]?.payload
    if (!payload || typeof payload !== 'object') return null
    return coerceMasterFromAI(payload, slug)
  } catch {
    // Table missing or DB unreachable → behave as a cache miss.
    return null
  }
}

/** Upserts the generated master, appending the alias so synonyms dedupe over time. */
async function writeCache(master: CareerOutlookMaster, alias: string): Promise<void> {
  try {
    await prisma.$executeRaw`
      INSERT INTO career_outlook_cache (id, slug, title, field, payload, aliases, model)
      VALUES (
        ${randomUUID()}, ${master.slug}, ${master.title}, ${master.field},
        ${JSON.stringify(master)}::jsonb, ARRAY[${alias}]::text[], ${MODEL}
      )
      ON CONFLICT (slug) DO UPDATE SET
        payload = EXCLUDED.payload,
        aliases = array(SELECT DISTINCT unnest(career_outlook_cache.aliases || ARRAY[${alias}]::text[])),
        updated_at = now()
    `
  } catch (error) {
    // Non-fatal: a missing table or write error must not break the user's request.
    console.warn('Career outlook cache write skipped:', error instanceof Error ? error.message : error)
  }
}
