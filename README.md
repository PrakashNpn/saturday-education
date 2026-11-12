# Saturday Education

The website for Saturday Education Consulting, a study abroad consultancy for students from Myanmar, Thailand and the wider region. It has a landing page, country and destination guides, a course finder (embedded from Firmli), an AI advisor chat, and a career assessment that produces a PDF report for counsellors.

Languages: English, Thai, Burmese, Vietnamese, Filipino and Indonesian.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind v4, Prisma 7 on Supabase Postgres, next-intl, Anthropic API, Resend, Firmli CRM, hosted on Vercel.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Create `.env.local` with the variables below. `.env.local` is not committed.

| Variable | Used for |
|---|---|
| `DATABASE_URL`, `DIRECT_URL` | Supabase Postgres (pooled connection for the app, direct for Prisma) |
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Supabase storage (assessment share cards) |
| `ANTHROPIC_API_KEY` | AI advisor, comparison summary, career assessment |
| `RESEND_API_KEY`, `CONSULTATION_NOTIFICATION_EMAIL`, `CAREER_LEADS_EMAIL` | Notification emails |
| `CRM_ALERT_EMAIL` | Where "lead did not reach Firmli" alerts go (defaults to marketing@saturdayeducation.com) |
| `FIRMLI_CLIENT_NUMBER`, `FIRMLI_FORM_NUMBER`, `FIRMLI_UTM_NUMBER` | Firmli lead form for the consultation form |
| `FIRMLI_CHAT_FORM_NUMBER`, `FIRMLI_CHAT_UTM_NUMBER` | Firmli lead form for the AI chatbot (falls back to the consultation form if unset) |
| `NEXT_PUBLIC_SITE_URL` | The site's public address for the sitemap, robots, language tags and share links. Set it to `https://www.saturdayeducation.com` (no trailing slash) |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | Analytics, loaded only after cookie consent |

## Commands

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm test            # unit tests (Node test runner via tsx), no database or network
npm run build       # production build
```

Run `npm run typecheck`, `npm run lint` and `npm test` before committing.

## Database

The production database is live, so **migrations, seeds and data changes are never run from the codebase**. Schema changes are written as SQL in `prisma/migrations/` and run by hand in the Supabase SQL editor before the code that needs them is deployed. Translations and image URLs are also changed with SQL (`prisma/translations/`, `prisma/snippets/`). After a schema change, run `npx prisma generate` and commit the updated `generated/` folder (the deploy relies on it).

## Project layout

```
app/        routing only (thin pages)
features/   business areas: landing, destination, consultation, ai-advisor,
            career-assessment, course-finder, about, imat-practice-test
shared/     cross-cutting code: UI pieces, constants, hooks, lib (db, crm, ai, careers), utils
i18n/       languages, routing, navigation
messages/   UI text, one file per language
prisma/     schema, migrations, seeds, translation SQL
tests/      unit tests
```

`AGENTS.md` is the detailed guide to conventions, architecture rules, i18n, caching and performance rules. Read it before changing code.

IMAT practice is at `/imat-practice-test`, linked from the Practice Tests navigation dropdown and the footer. It offers random mocks and published historical papers for 2011–2026, saves attempts in the browser, and collects contact details before showing results. Leads and server-calculated summaries are stored in `imat_leads`, with a counsellor email after each new submission. See [features/imat-practice-test/README.md](features/imat-practice-test/README.md) for behaviour, configuration and verification.

The AI chatbot collects name, email and phone before chatting begins, without OTP. It reuses the consultation lead storage and Firmli chat sync, saving contact details without a conversation excerpt. See [chat contact registration](docs/chat-contact-registration.md).

Canada fair registration is at `/canada-education-event` (short QR link `/cev`). Before accepting registrations, the owner must create `event_registrations` using [the manual SQL](prisma/snippets/create-event-registrations.sql). See [event setup and recovery](docs/canada-education-event.md) for the separate Firmli campaign and verification steps.

## Deploying

Pushing to the main branch deploys on Vercel. Before a deploy that adds a database column, run its SQL in Supabase first. Pages are prebuilt and refresh at most once a day, so a content change made in the database shows within a day or at the next deploy.
