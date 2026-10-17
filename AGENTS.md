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
- Burmese = /my prefix (hidden from the language switcher)
- Vietnamese = /vi, Filipino = /fil, Indonesian = /id (code `id`, but DB columns use
  the suffix `_idn`; Prisma fields `*Vi`, `*Fil`, `*Idn`)
- i18n/request.ts deep-merges the locale file over `messages/en.json`, so a missing
  or empty key falls back to English instead of showing a raw key
- DB translations: nullable `*_th/_my/_vi/_fil/_idn` columns, `localize()` in
  destinationService falls back to English. New columns must be created by running
  prisma/migrations/20261016090000_add_vi_fil_idn_translations/migration.sql in
  Supabase BEFORE deploying code that selects them (never run it from the agent)
- Numbers: shared/utils/formatNumber.ts (vi-VN, id-ID, fil-PH; others en-US)
- Config in: i18n/routing.ts (defineRouting), i18n/navigation.ts (createNavigation)
- i18n/request.ts (getRequestConfig) — REQUIRED, next.config.ts plugin points here directly
- app/layout.tsx = minimal pass-through (NO html/body) — html/body is in [locale]/layout.tsx
- Fonts: Noto Sans (Latin) plus a second Noto Sans Vietnamese-subset instance
  (`font-vietnamese`, preload off) for `vi`; Thai and Myanmar use their own Noto fonts

## Zod v4 Import
import * as z from "zod"   ← NOT import { z } from "zod"

## Prisma v7
Uses prisma.config.ts (not .env) for datasource config.
Client import: import { PrismaClient } from '../generated'

## ChatWidget
Lives in app/[locale]/layout.tsx — NOT in page.tsx.
Fixed floating position, renders on EVERY page.

## Features Map
landing/     → 12 rendered sections, in page order: Hero, PartnerLogos, WhySaturday,
               Services, AdditionalServices, CourseSearch, ComparisonTool,
               GlobalLeaders, Testimonials, Faq, Consultation, Cta.
               UniversityFinderSection also lives here but is commented out —
               see UNIVERSITIES_HIDDEN_RESTORE.md.
               The home hero (HeroSection) is a counsellor photo with the
               headline over it and the course finder (CourseFinderBar, a
               frosted card of popular-destination chips plus Destination,
               Study level and Field of study) overlapping its bottom edge.
               Its overlay strength is the single CLARITY number at the top of
               HeroSection.tsx. Its extra copy lives in the `heroLiquid`
               message namespace; the headline, lede and stats reuse `hero`.
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

The brand palette is the 2026 teal rebrand: **Teal `#177E8D`** is the primary
(buttons, links, identity), **Dark Teal `#00333A`** is the secondary (dark
surfaces, the footer and top bar, gradient ends, scrims) and **Light Sky Blue
`#C5F8FF`** is the light colour (fills, rules, glows; never body text). The
logo files are `public/images/logo/logo.webp` (wordmark, 846x311) and
`logo-symbol.webp` (298x298). Raw-hex surfaces (the counsellor PDF, the
share card, emails) cannot read CSS variables, so they carry the same values
and must be updated by hand when the palette changes. The embedded Firmli
course finder is the exception in the other direction: its colours come from
the Firmli portal's own branding settings and ignore the `theme` URL
parameter, so it is changed in Firmli, not here.

| Role | Token | Value |
|---|---|---|
| Primary action, links | `--color-action` / `--color-brand` | `#177E8D` |
| Action hover | `--color-action-hover` | `#115F6B` |
| Lightest wash (text-safe) | `--color-tint` | `#F0FBFD` |
| Brand light | `--color-light` | `#C5F8FF` |
| Brand dark | `--color-deep` | `#00333A` |
| Dark surface | `--color-structure` | `#00333A` |
| Page background | `--color-canvas` | `#FAFAFA` |
| Card background | `--color-surface` | `#FFFFFF` |
| Raised greys | `--color-surface-0/1/2` | `#F5F5F5` / `#F0F0F0` / `#E3E3E3` |
| Heading | `--color-primary-text` | `#141414` |
| Body | `--color-secondary-text` | `#404040` |
| Muted | `--color-muted-text` | `#737373` |
| Hairline | `--color-stroke` | `#E5E5E5` |
| Stronger rule | `--color-stroke-strong` | `#C4C4C4` |
| Amber accent | `--color-accent` / `--color-accent-ink` | `#F59E0B` / `#B45309` |

Contrast: Teal on white is 4.77:1 and on `--color-tint` 4.52:1, both AA for
body text. Teal on `--color-light` is 4.14:1, so text on a Light Sky Blue
fill uses Dark Teal (11.9:1).

Type is a clamp-based scale, not Tailwind's default sizes: `text-display`,
`text-title`, `text-section`, `text-lede`, `text-card`, `text-body` (17px),
`text-label` (14px), `text-min` (12px). Layout uses `max-w-wrap` (1080px) and the
custom `tablet` breakpoint at 860px, which gives `tablet:` and `max-tablet:`.

`--color-brand-purple*` and `--color-neutral-*` still exist so unredesigned areas
keep compiling. The `brand-purple` names are legacy: their values are the teal
palette. Do not use them in new work.

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
  country detail, career assessment (intro, the full in-depth flow past it,
  and the Career Market Outlook instant mode), the destinations loading
  skeletons, the error page, and cookie consent. Pending: chat widget, legal
  pages
- Phase 5 🔄 Admin dashboard — countries and universities CRUD, plus login
- Phase 6 🔄 Internationalization — UI messages are complete in all five non-English
  locales (`th`, `my`, `vi`, `fil`, `id`), all 22 country pages are translated, and the
  career outlook catalog is translated for th/vi/fil/id, and for my as summaries and market notes only (career names, skills and labels stay English in the Burmese code-switch register); typed careers for all five via
  an AI call cached in the cache JSON). Still English by design: legal pages, the PDF
  report, archetype/chart labels, the 150 assessment questions, the root 404. Not done: country stats strings
  (tuition range; work rights is done), university/program content (not planned),
  native-speaker review
- Phase 7 ⬜ Hardening and launch

A blog, a student portal and a public Universities section were previously
planned. All three were dropped in September 2026 and their code, routes,
messages and dependencies removed. The `University` and `Program` Prisma models
remain in active use — by the homepage comparison tool, the partner logos on
country pages, the career assessment's PDF recommendations, and the admin
dashboard that maintains them.