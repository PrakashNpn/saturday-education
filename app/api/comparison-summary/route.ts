import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { ComparisonUniversity } from '@/features/landing/services/comparison-service'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function buildPrompt(uni1: ComparisonUniversity, uni2: ComparisonUniversity): string {
  function describe(u: ComparisonUniversity) {
    const tuition = u.tuition
      ? `${u.tuition.currency}${u.tuition.min.toLocaleString()}–${u.tuition.currency}${u.tuition.max.toLocaleString()}/year`
      : 'Not available'
    const ranking = u.globalRanking != null ? `#${u.globalRanking} globally` : 'Unranked'
    const acceptance = u.acceptanceRate != null ? `${u.acceptanceRate}%` : 'N/A'
    const fields = u.popularCourses.length > 0 ? u.popularCourses.join(', ') : 'N/A'
    return [
      `Name: ${u.name} (${u.country})`,
      `Tuition: ${tuition}`,
      `Visa Processing: ${u.visaProcessing}`,
      `Work Rights: ${u.workRights}`,
      `Scholarships: ${u.scholarships}`,
      `Ranking: ${ranking}`,
      `Acceptance Rate: ${acceptance}`,
      `Popular Fields: ${fields}`,
    ].join('\n')
  }

  return `You are a straight-talking study abroad advisor helping Asian students pick between two universities.

UNIVERSITY 1:
${describe(uni1)}

UNIVERSITY 2:
${describe(uni2)}

The student already sees tuition, visa time, work rights, scholarships, ranking, and acceptance rate. Do NOT repeat those numbers.

Add what they can't see: real cost of living in each city, what graduates actually do after, how employers see each degree, what student life is really like.

Write like a real person talking to a friend — short sentences, plain words, direct opinions. No AI phrases like "it's worth noting", "both have their merits", "it's important to consider". No corporate language. Just honest, simple advice.

Return ONLY valid JSON, no extra text:
{
  "verdict": "One sentence. Direct opinion or clear trade-off. Under 20 words. Plain language.",
  "questions": [
    {
      "q": "Which is more affordable to actually live in?",
      "a": "1–2 short sentences. Talk about the city, rent, food, daily life — not tuition. Simple words."
    },
    {
      "q": "Which opens more doors after graduation?",
      "a": "1–2 short sentences. What jobs do graduates get? Which industries hire from there? Be specific."
    },
    {
      "q": "Which suits your lifestyle better?",
      "a": "1–2 short sentences. City vibe, safety, social life, language, weather — whatever matters most for this pair."
    }
  ]
}`
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const { uni1, uni2 }: { uni1: ComparisonUniversity; uni2: ComparisonUniversity } = await req.json()

  if (!uni1 || !uni2) {
    return NextResponse.json({ error: 'Missing university data' }, { status: 400 })
  }

  const stream = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    stream: true,
    messages: [{ role: 'user', content: buildPrompt(uni1, uni2) }],
  })

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  })
}
