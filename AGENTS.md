<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Saturday Education — AI Agent Context

## Project
Study abroad consulting platform for Asian students. Production-grade, internationally scalable.
Tech: Next.js 16.2 + TypeScript + Tailwind v4 + Prisma v7 + next-intl v4 + Zod v4

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

## Features Map
landing/     → 11 rendered sections, in page order: Hero, PartnerLogos, WhySaturday,
               Services, AdditionalServices, CourseSearch, ComparisonTool,
               GlobalLeaders, Testimonials, Consultation, Cta.
               UniversityFinderSection also lives here but is commented out —
               see UNIVERSITIES_HIDDEN_RESTORE.md.
destination/ → Listing + country detail pages. Real Prisma queries, redesigned.
consultation/→ ConsultationForm, ConsultationSuccess
ai-advisor/  → ChatWidget, ChatWindow, ChatMessage, ChatInput, ChatTypingIndicator

## Breaking Changes (2026 Stack — Read Before Writing Any Code)
- `proxy.ts` NOT `middleware.ts` — Next.js 16 renamed it. Edge runtime NOT supported in proxy.
- Tailwind v4: NO `tailwind.config.js` — ALL config lives in `app/globals.css` via `@theme`
- Turbopack: Default bundler in Next.js 16 — no `--turbopack` flag needed
- Dynamic params: All `params` in dynamic pages are Promises — must be awaited
```ts
  // ✅ CORRECT — Next.js 15+
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
  }
```

## Brand Design Tokens
All tokens are CSS variables in the `@theme` block of `app/globals.css`. There is
no `tailwind.config.js`. Read that block before writing any styles — it is the
source of truth and this table is only a summary.

The brand purple is **`#632D8B`**, sampled from the logo where it is the dominant
purple by a factor of nine. The older `#590D82` appeared nowhere in the mark and
is gone.

| Role | Token | Value |
|---|---|---|
| Primary action | `--color-action` | `#632D8B` |
| Action hover | `--color-action-hover` | `#4C236C` |
| Purple tint | `--color-tint` | `#F3EDFA` |
| Dark surface | `--color-structure` | `#171717` |
| Page background | `--color-canvas` | `#FAFAFA` |
| Card background | `--color-surface` | `#FFFFFF` |
| Raised greys | `--color-surface-0/1/2` | `#F5F5F5` / `#F0F0F0` / `#E3E3E3` |
| Heading | `--color-primary-text` | `#141414` |
| Body | `--color-secondary-text` | `#404040` |
| Muted | `--color-muted-text` | `#737373` |
| Hairline | `--color-stroke` | `#E5E5E5` |
| Stronger rule | `--color-stroke-strong` | `#C4C4C4` |
| Amber accent | `--color-accent` / `--color-accent-ink` | `#F59E0B` / `#B45309` |

Type is a clamp-based scale, not Tailwind's default sizes: `text-display`,
`text-title`, `text-section`, `text-lede`, `text-card`, `text-body` (17px),
`text-label` (14px), `text-min` (12px). Layout uses `max-w-wrap` (1080px) and the
custom `tablet` breakpoint at 860px, which gives `tablet:` and `max-tablet:`.

`--color-brand-purple*` and `--color-neutral-*` still exist so unredesigned areas
keep compiling. Do not use them in new work.

Font: Noto Sans (all text — loaded in `[locale]/layout.tsx` via `next/font`)

## UI primitives — there is no shadcn/ui here
Despite an earlier plan, shadcn/ui was never installed: there is no Radix or CVA
dependency, and `shared/components/ui/` holds a single file, `skeleton.tsx`.
There is no Button, Card, Input or Select component.

Buttons, cards, badges, inputs and eyebrow labels are written inline with the
design tokens above. Copy the classes from an existing redesigned section rather
than inventing new ones — `features/destination/components/DetailHero.tsx` and
`features/landing/components/CtaSection.tsx` are good references.

`shared/components/common/` holds the shared widgets: `SearchableDropdown` and
`CustomDropdown` (both take a `variant` prop — `'default'` is the pre-redesign
look, `'field'` matches the new form controls) and `FallbackImage`.

## Phase Roadmap
- Phase 0 ✅ Scaffold
- Phase 1 ✅ Landing page, navbar, footer, chat widget
- Phase 2 ✅ AI Advisor — live on the Anthropic API (`claude-haiku-4-5`)
- Phase 3 ✅ Real data — destinations run on Prisma; course discovery is handled
  by the embedded Firmli course finder
- Phase 4 🔄 Site-wide redesign — **CURRENT**. Done: home, about, destinations,
  country detail, career assessment intro (both modes), the destinations
  loading skeletons and the error page. Pending: the assessment flow past the
  intro, cookie consent, chat widget, legal pages
- Phase 5 🔄 Admin dashboard — countries and universities CRUD, plus login
- Phase 6 ⬜ Internationalization — routing and config are done, but roughly 73%
  of strings are still English in both `th` and `my`
- Phase 7 ⬜ Hardening and launch

A blog, a student portal and a public Universities section were previously
planned. All three were dropped in September 2026 and their code, routes,
messages and dependencies removed. The `University` and `Program` Prisma models
remain in active use — by the homepage comparison tool, the partner logos on
country pages, the career assessment's PDF recommendations, and the admin
dashboard that maintains them.