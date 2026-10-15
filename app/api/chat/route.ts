import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages'
import { buildSystemPrompt } from '@/features/ai-advisor/prompts/system'
import { planLeadTurn } from '@/features/ai-advisor/services/leadCapture'
import type { Message } from '@/features/ai-advisor/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const { messages, locale }: { messages: Message[]; locale?: string } = await req.json()

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
  }

  // Only send the last 20 messages to cap token usage
  const trimmed: MessageParam[] = messages.slice(-20).map(({ role, content }) => ({ role, content }))

  // Read from the full history rather than the trimmed copy sent to the model.
  const plan = planLeadTurn(messages)

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      let reply = ''
      try {
        const stream = client.messages.stream({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: buildSystemPrompt(locale) + plan.directive,
          messages: trimmed,
        })
        stream.on('text', (text) => {
          reply += text
          controller.enqueue(encoder.encode(text))
        })
        await stream.finalMessage()
      } catch (err) {
        // Failure before or during streaming. The request now lives inside the
        // stream, so an overloaded or rate-limited API surfaces here as text
        // rather than an HTTP status. If nothing has streamed yet, leave a short
        // message so the bubble isn't blank; otherwise keep what we have.
        console.error('Chat stream error:', err)
        if (!reply) {
          const status = err instanceof Anthropic.APIError ? err.status : undefined
          const busy = status === 429 || status === 529
          controller.enqueue(
            encoder.encode(
              busy
                ? "I'm getting a lot of questions right now. Please try again in a moment."
                : "Sorry, I couldn't finish that. Please try again.",
            ),
          )
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
