# Universities Feature — Temporarily Hidden (Restore Guide)

The public-facing "Universities" feature (University Finder listing, university detail
pages, and every nav/CTA/section that links into them) was temporarily disabled on
2026-06-07 while waiting on confirmed partnership data from universities.

Nothing was deleted — `features/university/**` and the admin dashboard routes
(`app/admin/(dashboard)/universities/**`) are untouched. Every change below is
marked with a `HIDDEN:` comment in the code, so you can also just search the repo
for `HIDDEN:` to find every spot.

To restore: open each file/section listed below and reverse the described edit
(uncomment the original code, remove the added `notFound()` line, etc.), then run
`npx tsc --noEmit -p tsconfig.json` to confirm there are no type errors, and
`npm run dev` to manually verify the feature is back.

---

## 1. `app/[locale]/universities/page.tsx`
- Added `import { notFound } from 'next/navigation'`.
- Added `notFound()` as the first line inside `Page()`, right before
  `const params = await searchParams`.

**To restore:** remove the `notFound()` line (and its `HIDDEN:` comment), and
remove the `notFound` import if it's not used elsewhere in the file.

---

## 2. `app/[locale]/universities/[slug]/page.tsx`
- `generateStaticParams()`: the original body
  ```ts
  const slugs = await getAllUniversitySlugs()
  return slugs.map((s) => ({ slug: s.slug }))
  ```
  was commented out and replaced with `return []`.
- `Page()`: added `notFound()` right after `setRequestLocale(locale)`, before
  `return <UniversityDetailPage slug={slug} />`.
- The import line was changed from
  ```ts
  import { UniversityDetailPage, getAllUniversitySlugs, getUniversityBySlug } from '@/features/university'
  ```
  to
  ```ts
  import { UniversityDetailPage, /* getAllUniversitySlugs, */ getUniversityBySlug } from '@/features/university'
  ```

**To restore:** uncomment `getAllUniversitySlugs` in the import, restore
`generateStaticParams` to call `getAllUniversitySlugs()` and map over the slugs,
and remove the `notFound()` line in `Page()`.

---

## 3. `shared/components/layout/Navbar.tsx`
- In the `NAV_LINKS` array, commented out:
  ```ts
  // { labelKey: 'universityFinder', href: '/universities' },
  ```

**To restore:** uncomment that array entry (placing it back where you want it in
the nav order — it originally sat right after the `home` entry).

---

## 4. `features/landing/components/HeroSection.tsx`
- Commented out the "Explore Universities" CTA `<Link href="/universities">`
  button (the `{t('exploreUniversities')}` button) inside the CTA Buttons block.
  The "Book Free Consultation" `<Link href="/#consultation">` button remains as-is
  (its className/style were NOT changed).

**To restore:** uncomment the "Explore Universities" `<Link>` block so it appears
again before the "Book Free Consultation" button.

---

## 5. `app/[locale]/page.tsx`
- Commented out two imports:
  ```ts
  // import UniversityFinderSection from "@/features/landing/components/UniversityFinderSection"
  // import { getFinderDropdownOptions } from '@/features/university'
  ```
- Changed the data-fetching `Promise.all` from
  ```ts
  const [finderOptions, comparisonUniversities] = await Promise.all([
    getFinderDropdownOptions(),
    getComparisonUniversities(),
  ])
  ```
  to
  ```ts
  const [comparisonUniversities] = await Promise.all([
    getComparisonUniversities(),
  ])
  ```
- Commented out the section render:
  ```tsx
  {/* <UniversityFinderSection dropdownOptions={finderOptions} /> */}
  ```
  (it sits right after `<HeroSection />`).

**To restore:** uncomment both imports, change the `Promise.all` destructure back
to `const [finderOptions, comparisonUniversities] = await Promise.all([getFinderDropdownOptions(), getComparisonUniversities()])`,
and uncomment `<UniversityFinderSection dropdownOptions={finderOptions} />` so it
renders between `<HeroSection />` and `<ComparisonToolSection />`.

---

## 6. `features/landing/components/ConsultationSection.tsx`
- In the post-submission success card's "Actions" row, commented out the
  "Browse Universities" `<Link href="/universities">` button
  (`{t('success.browseUniversities')}`). The remaining "Back to top" `<button>`
  was NOT restyled — its className is unchanged from the original outline style.

**To restore:** uncomment the "Browse Universities" `<Link>` so it appears again
before the "Back to top" button.

---

## 7. `features/destination/components/DestinationDetailPage.tsx`
- Commented out the import:
  ```ts
  // import { PartnerUniversities } from './PartnerUniversities'
  ```
- Commented out the entire `<section id="universities">...</section>` block that
  rendered `<PartnerUniversities universities={country.universities} eyebrow={t('exploreUniversities')} title={t('partnerUniversities')} subtitle={t('universitiesSubtitle')} exploreLabel={t('explore')} />`.
  It originally sat right after the "Why Study Here" / `CountryAdvantages` section.

**To restore:** uncomment the import and the `<section id="universities">` block.

---

## 8. `app/[locale]/not-found.tsx`
- Commented out the "Browse Universities" `<Link href="/universities">` button in
  the 404 page's action row (the "Go Home" `<Link>` remains untouched and is now
  the only action shown).

**To restore:** uncomment the "Browse Universities" `<Link>` so both buttons show
side by side again.

---

## 9. `app/sitemap.ts`
- In the `staticPages` array, commented out:
  ```ts
  // { path: '/universities', priority: 0.8, changeFrequency: 'weekly' as const },
  ```

**To restore:** uncomment that entry (it originally sat between the `''` (home)
and `/destinations` entries).

---

## What was NOT touched (left fully intact)
- All `features/university/**` components/services/types
  (`UniversityCard`, `UniDetailHero`, `UniversityFinderPage`,
  `UniversityFinderSection`, `getFinderDropdownOptions`,
  `getAllUniversitySlugs`, `getUniversityBySlug`, etc.)
- Admin dashboard routes: `app/admin/(dashboard)/universities/**`
- Translation message keys (`universities.*`, `nav.universityFinder`,
  `landing.hero.exploreUniversities`, `consultation.success.browseUniversities`,
  etc.) in `messages/en.json`, `messages/th.json`, `messages/my.json`

## Verification after restoring
1. `npx tsc --noEmit -p tsconfig.json` — should pass with no errors.
2. `npm run dev` and confirm:
   - Navbar shows "University Finder" again
   - Homepage shows the Hero "Explore Universities" button and the University
     Finder search section
   - `/universities` and `/universities/<slug>` load normally (no 404)
   - Destination detail pages show the "Partner Universities" section
   - Consultation success card and the 404 page show "Browse Universities" again
3. Delete this file (`UNIVERSITIES_HIDDEN_RESTORE.md`) once restoration is
   confirmed working.
