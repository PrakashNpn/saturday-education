<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Saturday Education — AI Agent Context

## Project
Study abroad consulting platform for Asian students. Production-grade, internationally scalable.
Tech: Next.js 16.2 + TypeScript + Tailwind v4 + Prisma v7 + next-intl v4 + Auth.js v5 + Zod v4

## Architecture: Hybrid Feature-Based (3 Layers)
- app/       → ROUTING ONLY (thin pages, 10-30 lines, imports from features/ and shared/)
- features/  → BUSINESS DOMAINS (self-contained: components, services, hooks, types)
- shared/    → CROSS-CUTTING (UI primitives, lib/db, lib/ai, lib/cms, lib/auth, hooks, utils)

## The 4 Rules — NEVER Break
1. app/ imports ONLY from features/ and shared/
2. features/ NEVER imports from other features/
3. shared/ NEVER imports from features/ or app/
4. API routes contain NO business logic — delegate to feature services

## Critical Navigation Rule
NEVER use next/navigation or next/link directly.
ALWAYS use: import { Link, useRouter, redirect, usePathname } from "@/i18n/navigation"

## i18n Routing (localePrefix: 'as-needed')
- English = / (no prefix) — /en auto-redirects to /
- Thai = /th prefix
- Burmese = /my prefix
- Config in: i18n/routing.ts (defineRouting), i18n/navigation.ts (createNavigation)
- i18n/request.ts (getRequestConfig) — REQUIRED, next.config.ts plugin points here directly
- app/layout.tsx = minimal pass-through (NO html/body) — html/body is in [locale]/layout.tsx
- Fonts: Noto Sans (all scripts — covers Latin, Thai, Myanmar, Arabic)

## Zod v4 Import
import * as z from "zod"   ← NOT import { z } from "zod"

## Prisma v7
Uses prisma.config.ts (not .env) for datasource config.
Client import: import { PrismaClient } from '../generated'

## ChatWidget
Lives in app/[locale]/layout.tsx — NOT in page.tsx.
Fixed floating position, renders on EVERY page.

## Phase 1 Scope
Landing page (10 sections) + Navbar + Footer + ChatWidget UI shell +
Static placeholder pages: /universities, /destinations, /destinations/[country], /blog, /blog/[slug]
Static service stubs return hardcoded data — no real DB/CMS queries in Phase 1.

## Features Map
landing/     → 10 sections: Hero, UniversityFinder, ComparisonTool, GlobalLeaders,
               CountryGuide, Services, AdditionalServices, Testimonials, StatsCta, Consultation
university/  → UniversityCard, UniversityGrid, UniversityFilters (Phase 1 static)
destination/ → DestinationCard, DestinationGrid, DestinationDetail (Phase 1 static)
blog/        → BlogCard, BlogGrid, BlogPost (Phase 1 static | Phase 3: Sanity GROQ)
consultation/→ ConsultationForm, ConsultationSuccess
ai-advisor/  → ChatWidget, ChatWindow, ChatMessage, ChatInput, ChatTypingIndicator
program/     → ProgramCard, ComparisonTable (Phase 4)
auth/        → LoginForm, RegisterForm (Phase 7)

## Breaking Changes (2026 Stack — Read Before Writing Any Code)
- `proxy.ts` NOT `middleware.ts` — Next.js 16 renamed it. Edge runtime NOT supported in proxy.
- Tailwind v4: NO `tailwind.config.js` — ALL config lives in `app/globals.css` via `@theme`
- Turbopack: Default bundler in Next.js 16 — no `--turbopack` flag needed
- Auth.js v5: installed as `next-auth` but maintained by Better Auth Inc. — same import API
- Dynamic params: All `params` in dynamic pages are Promises — must be awaited
```ts
  // ✅ CORRECT — Next.js 15+
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
  }
```

## Brand Design Tokens
All tokens are CSS variables defined in `app/globals.css` via `@theme`.
Tailwind v4 auto-generates utility classes from them.

| Token | Value | Tailwind Class |
|---|---|---|
| `--color-brand-purple` | `#590D82` | `bg-brand-purple`, `text-brand-purple` |
| `--color-brand-purple-light` | `#7B1FA2` | `bg-brand-purple-light` |
| `--color-brand-purple-dark` | `#3D0A5A` | `bg-brand-purple-dark` |
| `--color-brand-purple-50` | `#F5E6FF` | `bg-brand-purple-50` |
| `--color-brand-purple-100` | `#E8CCFF` | `bg-brand-purple-100` |
| `--color-accent-gold` | `#F59E0B` | `bg-accent-gold` |
| `--color-neutral-900` | `#18181B` | `bg-neutral-900` |

Font: Noto Sans (all text — loaded in `[locale]/layout.tsx` via `next/font`)

## shadcn/ui Components
Location: `shared/components/ui/` — NOT the default `@/components/ui/`
```ts
// ✅ CORRECT import path
import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
```
Installed: button, card, input, textarea, badge, dialog, select

## Phase Roadmap
- Phase 0 ✅ Scaffold — complete
- Phase 1 🔄 Landing page UI + Navbar + Footer + ChatWidget shell + 3 static pages — **CURRENT**
- Phase 2 — AI Advisor chatbot (live Anthropic API via Vercel AI SDK)
- Phase 3 — Blog (connect Sanity CMS, replace static stubs with GROQ queries)
- Phase 4 — University / Program / Destination (real Prisma queries, replace stubs)
- Phase 5 — Internationalization (Thai + Burmese translations)
- Phase 6 — Hardening & Launch
- Phase 7 — Student Portal (Auth.js v5 login/register)
- Phase 8 — Admin Dashboard