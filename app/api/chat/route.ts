import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/features/ai-advisor/prompts/system'
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
  const trimmed = messages.slice(-20).map(({ role, content }) => ({ role, content }))

  try {
    const stream = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      stream: true,
      system: buildSystemPrompt(locale),
      messages: trimmed,
    })

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        let sent = false
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
              sent = true
            }
          }
        } catch (err) {
          // Failure mid-stream: if nothing has streamed yet, leave a short apology
          // so the bubble isn't blank; otherwise keep what we have.
          console.error('Chat stream error:', err)
          if (!sent) {
            controller.enqueue(encoder.encode("Sorry, I couldn't finish that. Please try again."))
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
  } catch (err) {
    // Failure before streaming starts (overloaded, rate limited, connection). Return
    // a JSON status the client maps to a friendly message.
    const status = err instanceof Anthropic.APIError ? err.status : undefined
    const busy = status === 429 || status === 529
    console.error('Chat API error:', err)
    return NextResponse.json({ error: busy ? 'busy' : 'error' }, { status: busy ? 503 : 500 })
  }
}
