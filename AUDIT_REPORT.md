# Saturday Education — Code Audit Report

Generated: 2026-04-04

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 6 |
| Warning | 5 |
| Info / Pass | 19 |

---

## Critical Issues

### C1 — `app/page.tsx` violates architecture layer rules
- **File:** `app/page.tsx` (65 lines)
- **Rule:** `app/` files must be thin routing-only files (10–30 lines), no UI logic.
- **Problem:** Contains full UI implementation — `<Image>`, paragraph text, inline styles, and hardcoded strings. Should be a redirect-only file or deleted entirely (the locale layout at `app/[locale]/page.tsx` is the correct entry point).

### C2 — Missing translation keys in `th.json` and `my.json`
- **Files:** `messages/th.json`, `messages/my.json`
- **Missing keys:** `hero` and `consultation` (both exist in `en.json`)
- **Impact:** `HeroSection` calls `useTranslations('hero')` and `ConsultationSection` calls `useTranslations('Landing.consultation')` — these will throw a runtime error when locale is `th` or `my`.

### C3 — Switzerland country image is 34 MB
- **File:** `public/images/landing/countries/switzerland.jpg`
- **Size:** ~34 MB (guideline: <500 KB)
- **Impact:** Catastrophic page load time for users who scroll to GlobalLeadersSection. Must be optimised and converted to WebP/AVIF before production.

### C4 — Prisma schema validation fails
- **File:** `prisma/schema.prisma`
- **Error (Prisma v7):** `The datasource property url is no longer supported in schema files.`
- **Problem:** Schema still has `url = env("DATABASE_URL")` in the `datasource db` block. Prisma v7 requires the connection URL to be moved to `prisma.config.ts` and passed via the adapter to `PrismaClient`.
- **Impact:** `prisma generate`, `prisma migrate`, and all database operations are broken until fixed.

### C5 — `ChatInput` send button has no accessible name
- **File:** `features/ai-advisor/components/ChatInput.tsx` (lines 28–34)
- **Problem:** `<button type="submit">→</button>` — contains only an arrow symbol with no `aria-label`. Screen readers cannot identify the button's purpose.
- **Fix:** Add `aria-label="Send message"`.

### C6 — `ChatWidget` lives in `features/` but renders on every page
- **File:** `features/ai-advisor/components/ChatWidget.tsx`
- **Problem:** Widget is imported directly in `app/[locale]/layout.tsx`, meaning it appears on every page — which is a shared cross-cutting concern. By architecture rules it should live in `shared/components/` (e.g., `shared/components/chat/`), not inside a feature folder.

---

## Warnings

### W1 — Testimonials carousel missing ARIA attributes
- **File:** `features/landing/components/TestimonialsSection.tsx` (line 184)
- **Problem:** The scroll container has no `role="region"`, `aria-label`, or `aria-live` attribute. Arrow buttons correctly have `aria-label` but auto-slide content changes are invisible to screen readers.
- **Fix:** Add `role="region" aria-label="Customer testimonials" aria-live="polite"` to the scroll container.

### W2 — No page-specific metadata on any route
- **Files:** All `app/[locale]/**/page.tsx`
- **Problem:** Only root-level metadata exists (`app/layout.tsx`). Dynamic routes (`/blog/[slug]`, `/destinations/[country]`) have no `generateMetadata` export, meaning all pages share the same generic title and description.
- **Impact:** Poor SEO for all pages beyond the homepage.

### W3 — Missing `robots.txt` and `sitemap.xml`
- **Problem:** Neither file exists in `public/` nor is configured as `app/robots.ts` / `app/sitemap.ts`.
- **Impact:** Search engine crawlers have no crawl guidance; no sitemap for indexing blog posts, destinations, or university pages.

### W4 — Inconsistent component export pattern
- **Problem:** All section components use `export default function`, but `ChatWidget` uses `export function ChatWidget()` (named export). The barrel file at `features/ai-advisor/index.ts` re-exports it as a named export. This is inconsistent with the rest of the codebase.
- **Fix:** Standardise on `export default function` for all components.

### W5 — Several images exceed 500 KB
- **Files:**
  - `public/images/landing/global-edu-hero.png` — ~940 KB
  - `public/images/landing/herosection.png` — ~590 KB
  - `public/images/landing/additionalservice.png` — ~422 KB
- **Fix:** Convert to WebP/AVIF and compress before production deploy.

---

## Info / Suggestions

### I1 — No barrel file for `features/landing/components/`
- `features/landing/components/index.ts` does not exist. Imports in `app/[locale]/page.tsx` use direct file paths (e.g., `@/features/landing/components/HeroSection`). A barrel file would make imports cleaner but is a low-priority style preference.

### I2 — `any` type in `shared/lib/db/prisma.ts`
- Line 6: `let prismaInstance: any = null` — justified by a comment (Prisma client not yet generated) and suppressed with `eslint-disable`. Low risk, document and revisit once Prisma is fixed.

### I3 — `app/page.tsx` also contains hardcoded English strings
- Beyond the architecture violation (C1), the file has hardcoded strings that bypass next-intl entirely. When fixed (redirect or delete), this is resolved automatically.

---

## Architecture Alignment Score

| Check | Status | Notes |
|-------|--------|-------|
| `app/` layer thinness | FAIL | `app/page.tsx` has 65 lines with UI logic |
| Feature isolation (no cross-feature imports) | PASS | Zero inter-feature imports found |
| Shared layer purity (no feature imports) | PASS | Zero violations |
| Component location correctness | PARTIAL | All sections correct; ChatWidget misplaced |
| Barrel exports | PARTIAL | `shared/components/layout/index.ts` exists; `features/landing/components/index.ts` missing |

---

## Detailed Findings by Part

### Part 1 — Architecture

| # | File | Finding | Severity |
|---|------|---------|----------|
| 1.1 | `app/page.tsx` | 65-line file with Image, styled UI, hardcoded text — violates routing-only rule | Critical |
| 1.2 | `app/[locale]/page.tsx` | Correctly imports and renders feature components only (27 lines) | Pass |
| 1.3 | `app/[locale]/layout.tsx` | Correctly imports Navbar/Footer from `shared/components/layout/` | Pass |
| 1.4 | All `features/` | Zero inter-feature imports | Pass |
| 1.5 | All `shared/` | Zero imports from `features/` or `app/` | Pass |
| 1.6 | ChatWidget | Lives in `features/ai-advisor/` but used in layout (every page) | Critical |
| 1.7 | `features/landing/components/index.ts` | Missing barrel file | Info |
| 1.8 | `shared/components/layout/index.ts` | Exists, exports Navbar and Footer | Pass |

### Part 2 — Code Quality

| # | File | Finding | Severity |
|---|------|---------|----------|
| 2.1 | All components | `"use client"` correctly placed on all interactive components | Pass |
| 2.2 | All `page.tsx` | No `"use client"` on page files | Pass |
| 2.3 | All files | Zero `import Link from 'next/link'` — all use `@/i18n/navigation` | Pass |
| 2.4 | All files | Zero `useRouter` / `redirect` from `next/navigation` | Pass |
| 2.5 | — | `npx tsc --noEmit` exits clean — zero TypeScript errors | Pass |
| 2.6 | `shared/lib/db/prisma.ts:6` | `any` type — justified and documented | Info |
| 2.7 | — | Zero `@ts-ignore` in source files | Pass |
| 2.8 | `messages/th.json`, `messages/my.json` | Missing `hero` and `consultation` keys | Critical |
| 2.9 | — | Zero raw `<img>` tags | Pass |
| 2.10 | — | Zero `console.log` statements in source | Pass |
| 2.11 | `ChatWidget.tsx` | Named export vs default export everywhere else | Warning |

### Part 3 — Performance

| # | File | Finding | Severity |
|---|------|---------|----------|
| 3.1 | All images | All use `<Image>` with `width`, `height`, `alt` | Pass |
| 3.2 | `HeroSection.tsx`, `Navbar.tsx` | `priority` prop on above-the-fold images | Pass |
| 3.3 | `public/images/landing/countries/switzerland.jpg` | **34 MB** — must optimise | Critical |
| 3.4 | `global-edu-hero.png`, `herosection.png` | >500 KB — should optimise | Warning |
| 3.5 | All components | Framer-motion uses named imports (correct) | Pass |
| 3.6 | All components | Lucide uses named imports — tree-shakeable | Pass |
| 3.7 | `app/[locale]/layout.tsx` | Noto Sans loaded via `next/font/google` with `display: 'swap'` | Pass |
| 3.8 | `app/[locale]/layout.tsx` | `<html lang={locale}>` dynamically set | Pass |
| 3.9 | `app/layout.tsx` | Global metadata defined | Pass |
| 3.10 | All `page.tsx` | No `generateMetadata` on any route | Warning |
| 3.11 | `public/` | No `robots.txt` or `sitemap.xml` | Warning |
| 3.12 | `TestimonialsSection.tsx:184` | Carousel scroll container missing `aria-live` | Warning |
| 3.13 | `Navbar.tsx:195–196` | Mobile menu uses `aria-expanded` correctly | Pass |
| 3.14 | `ChatInput.tsx:28–34` | Send button (`→`) has no `aria-label` | Critical |

### Part 4 — Dependencies & Config

| # | File | Finding | Severity |
|---|------|---------|----------|
| 4.1 | `package.json` | All dependencies correctly categorised | Pass |
| 4.2 | `next.config.ts` | `createNextIntlPlugin` correctly wraps config | Pass |
| 4.3 | `tsconfig.json` | `@/` alias and all sub-aliases correctly configured | Pass |
| 4.4 | `app/globals.css` | `brand-purple: #590D82` and all tokens defined via `@theme` | Pass |
| 4.5 | `.env.local` | `DATABASE_URL` and all required keys present | Pass |
| 4.6 | `proxy.ts` | next-intl middleware correct; locales `['en','th','my']`; `localePrefix: 'as-needed'` | Pass |
| 4.7 | `prisma/schema.prisma` | `npx prisma validate` **FAILS** — datasource URL format invalid for Prisma v7 | Critical |
| 4.8 | `prisma/schema.prisma` | Models (University, Program) and generator block defined | Info |
