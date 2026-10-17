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
- shared/    → CROSS-CUTTING (UI components, constants, lib/db, lib/crm, lib/ai, lib/careers, lib/courseFinder, hooks, utils)

## The 4 Rules — NEVER Break
1. app/ imports ONLY from features/ and shared/
2. features/ NEVER imports from other features/
3. shared/ NEVER imports from features/ or app/
4. API routes contain NO business logic — delegate to feature services

## Critical Navigation Rule
NEVER use next/navigation or next/link directly.
ALWAYS use: import { Link, useRouter, redirect, usePathname } from "@/i18n/navigation"

## i18n Routing (localePrefix: 'as-needed')
- English = / (no prefix) — /en auto-redirects to /. The plain address never redirects by
  browser language (`localeDetection: false` in i18n/routing.ts): visitors pick a language
  with the switcher or a link that contains it
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
- i18n/languages.ts is the single registry of languages (routing, switcher names and
  flags, number formats, default phone country, script font, AI language name, which
  languages need the stronger AI model). To add a language: add it there, add
  messages/<code>.json, then fix the compile errors in the per-language text maps
  (`Record<LocaleCode, ...>` / `Record<TranslationLocale, ...>`: chat fallback text,
  comparison and career translation prompts, assessment brief) and the DB columns
- Config in: i18n/routing.ts (defineRouting), i18n/navigation.ts (createNavigation)
- i18n/request.ts (getRequestConfig) — REQUIRED, next.config.ts plugin points here directly
- app/layout.tsx = minimal pass-through (NO html/body) — html/body is in [locale]/layout.tsx
- Fonts: Noto Sans (Latin) plus a second Noto Sans Vietnamese-subset instance
  (`font-vietnamese`, preload off) for `vi`; Thai and Myanmar use their own Noto fonts

## Zod v4 Import
Zod is installed but nothing uses it yet. If you add validation, import it as:
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
               The public Universities section was dropped (see the note at the end of
               this file); features/destination/components/PartnerUniversities.tsx is
               kept, unused, in case partner universities are shown again on country pages.
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

## Destination countries
`shared/constants/destinationCountries.ts` is the one list of countries a student can pick in
the consultation form, the assessment contact form and the chat lead form (24 countries plus
"Other"). Firmli ids and names, notification email labels and chat country detection all derive
from it. To add a country: add an entry there, add its name under
`Landing.consultation.form.country.options.<key>` in all six message files, and look up its id in
Firmli's destination-countries-dropdown (leave the id out if Firmli has none; the test lists the
known gaps). `tests/destinationCountries.test.ts` fails if any of that is missing. The older
`shared/constants/countries.ts` (a world country list) is unrelated and currently unused.

## Lead sync to Firmli
`saveConsultationLead` (website form and chat) saves the lead, then syncs it to Firmli through
`crmSync.ts` (two tries, 8 second limit per request). The result is written to the lead's row
(`crm_status` synced / failed / skipped, `crm_error`, `crm_synced_at`) and a failure emails
`CRM_ALERT_EMAIL` (default marketing@saturdayeducation.com) with the lead's details. The columns
come from prisma/migrations/20261017090000_add_consultation_crm_status, which must be run in
Supabase before deploying. The assessment form does not go to Firmli (by decision): its leads
live in `assessment_leads` and the email only.

## Rendering and caching
Pages are prebuilt and served from Vercel's cache: the `[locale]` layout lists the locales
(`generateStaticParams`) and every page calls `setRequestLocale(locale)`; without both, a page
silently becomes server-rendered per visitor (slow, and it counts against function limits).
Home, destinations and country pages refresh in the background at most once a day
(`revalidate = 86400`), so a database edit shows within a day or at the next deploy. Still
dynamic by design: course-finder (reads the URL's filters), assessment results, API routes. When
adding a page, call `setRequestLocale` and check `next build`'s route table shows `●`, not `ƒ`.
The root layout does not send `careerAssessment` or `careerCatalog` messages to the browser (large,
assessment-only); `career-assessment/layout.tsx` provides them. `tests/messageScoping.test.ts` guards this.

## Page weight
Keep the JavaScript every page downloads small. The phone field (`react-phone-number-input`, about 190 KB
with its phone-number data) is only imported by `PhoneField`, which forms reach through `LazyPhoneField`
(consultation form: loads as the visitor nears it) or inside the lazily loaded chat `LeadCard`. Do not
import `PhoneField` from a component every page loads, and do not import `country-flag-icons` (flags are
SVG files in `public/images/flags-svg`). Validate phone numbers with `isValidPhone` from
`shared/utils/phone.ts`. Next still lists lazily imported chunks in the page's HTML (async, so they do not
block), so lazy loading helps rendering and parse cost but not the download; removing code (as with the
flags) is what shrinks the download.

## SEO and absolute URLs
`shared/constants/site.ts` holds `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, default https://www.saturdayeducation.com,
because the bare domain redirects to www). Use it for anything that needs an absolute URL; the root layout
sets `metadataBase` from it, so relative alternates in page metadata become absolute. The sitemap
(`app/sitemap.ts`, built by `shared/lib/seo/sitemap.ts`) lists the fixed pages in `STATIC_PAGES` plus every
published country, each with all six language versions. When you add a public page, add it to `STATIC_PAGES`.
Every public page builds its metadata with `pageMetadata({ locale, path, title, description })` from
`shared/lib/seo/metadata.ts`: it sets the canonical address, the language alternates (with x-default) and
the link preview (Open Graph and Twitter, picture `public/images/og/default.jpg`, 1200 by 630 JPEG). Pass a
plain `title`; the root layout adds " | Saturday Education", so a title that already says the brand shows it
twice (use `{ absolute }` for the home page). Message titles must not end with the brand
(`tests/seoMetadata.test.ts` checks).

## Tests
`npm test` runs the Node test runner through tsx (no extra dependencies) over `tests/*.test.ts`:
message files (every key in all six languages, placeholders, no dashes), career catalog
translation completeness, work rights SQL bullet parity, scoring, lead capture, the Firmli
payloads (fetch mocked) and the chat system prompt. They read files and call pure functions
only: no database, no network. `tests/setup/stub-server-only.cjs` is preloaded to stub
`server-only` and to work around a tsx/libphonenumber-js JSON interop problem. Run
`npm test` after changing messages, the catalog, scoring or the lead flow.

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
- Phase 5 ⬜ Admin dashboard — the first simple admin (country and university text and
  images) was removed in October 2026 for security and because it only covered a few
  fields; a proper one is planned. Until then, edit content and image URLs with SQL
  in Supabase (templates in prisma/snippets/update-images.sql). An English text edit
  also needs the matching translations re-done (the translation SQL matches on the
  exact English text)
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
country pages and the career assessment's PDF recommendations.