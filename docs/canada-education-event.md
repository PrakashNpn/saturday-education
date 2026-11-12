# Canada Education Fair registration

## Owner setup before testing a real registration

1. Run `prisma/snippets/create-event-registrations.sql` once in Supabase SQL Editor as the database owner. It creates **one empty table, `event_registrations`, with 16 columns**, RLS enabled and no anonymous/authenticated browser grants. The final query should return the table with `rowsecurity = true`. No existing table or data is updated. Do not rerun after success; do not use Prisma migrate/db push.
2. Restart the local app and open `/cev`. It redirects to `/canada-education-event`, preserving a locale prefix if supplied. The QR encodes `https://www.saturdayeducation.com/cev`; deploying these routes activates that address without replacing printed QR codes.
3. Submit an owner-approved test registration. Confirm the success screen, the database row and its eventual `crm_status = 'synced'`. Then check the actual Firmli source/medium labels. The embed only supplies an opaque UTM identifier; labels cannot be confirmed from code alone.
4. Test the same email again for this event: it should return the same generic confirmation, preserving the existing contact record and not scheduling another CRM send. One registration per normalized email per event is intentional. A family sharing one email should use separate email addresses for separate registrations.
5. Before printing a full batch, scan a physical proof with a phone. Preserve the QR's outer white margin. The route/page must be deployed before the fair.

The agent did not execute the Supabase script or submit a live registration, email or Firmli lead. Updating the generated Prisma client locally does not change the database.

## Event and Firmli configuration

`features/education-event/config.ts` is the single event configuration:

- Myanmar First Canada Education Fair 2026; 15 November 2026, Sunday.
- 1:00 PM to 4:00 PM in `Asia/Yangon` (UTC+06:30), not Bangkok time.
- Pan-Pacific Hotel Yangon, Junction City; address retained as supplied by the owner.
- Immutable event key: `canada-education-fair-2026-11-15`.
- Canada is selected by default in the destination dropdown. Visitors can choose another country from the shared translated country list, including Other. The selection is validated server-side and stored with the registration; source remains `event_qr`.
- Owner-supplied Firmli client `c191z26royal58`, existing consultation-shaped form `FRM1790061849437W26JWECS31`, dedicated event UTM `UTM1794472545383G26KHOYW04`.

The event sends `first_name`, `email`, `mobile`, the selected country's `destination_country_id` (Canada is `'38'`), and an event note containing the destination name. Other and countries without a Firmli ID are retained in the note and database with no CRM country ID, rather than being sent as Canada. The source/medium attribution is resolved by Firmli from the dedicated UTM. The event campaign never falls back to the consultation or chatbot source. No new Firmli environment variables are required; update the event config if the owner supplies different identifiers. Existing consultation/chat configuration remains in use for those channels.

The page supports all six locales and is statically prerendered. Desktop spacing is compact; on mobile the form follows the short event heading and full event details are expandable underneath. Inputs remain at least 44 pixels high, with natural scrolling on smaller screens or when the keyboard is open. Event messages are scoped to its layout. The canonical event page is in the sitemap; the short redirect is not. The chat launcher is hidden on this page so it cannot cover the form. The address/title remain as supplied; form labels and notices are translated. Registration is not automatically closed at the event end; closing/archiving and future events require an explicit product decision. Retain this event's identity and historical rows.

## Submission behaviour

Required fields are full name, email and international phone, with Canada preselected in the editable destination dropdown. A short privacy/follow-up notice appears before the submit button; there is no checkbox. Pressing submit acknowledges that notice. The client sends its notice version and the server records `event-registration-submit-v2` in the existing consent-version column, distinguishing this from the earlier checkbox flow. The current notice version is required, so stale forms must refresh before submitting. No SQL/table change is needed. No account, OTP, consultation appointment or marketing opt-in is added. Phone validation shares the site's number library. Values remain in component memory on a failed submission, and no contact fields are stored in localStorage.

The server verifies same-origin JSON requests, caps streamed bodies at 8 KB and validates all contact fields, locale, consent and honeypot. Event identity, campaign and consent version are assigned server-side, ignoring supplied replacements. Destination is validated against the shared country list; older clients omitting it default to Canada. A per-instance limit of 600 requests/hour/client IP is intentionally generous for shared venue Wi-Fi; it is not distributed abuse protection. The UI prevents overlapping requests and uses a 20-second request timeout, with safe duplicate handling if a previous request saved before its response was lost.

The lead is saved in a transaction before a background Firmli job is scheduled. Duplicate event/email submissions do not update existing contact information or send again. Success means the registration was received, not that physical attendance was independently verified or that Firmli has already acknowledged it.

Firmli delivery retries once using the shared bounded request helper. Its status is recorded as `pending`, `synced`, `failed` or `skipped`. CRM failures never discard a saved registration. Status/scheduling failures trigger a best-effort alert to `CRM_ALERT_EMAIL` (default `marketing@saturdayeducation.com`) through the existing `RESEND_API_KEY`; normal per-attendee notification emails are not sent. Alerts contain the registration ID for operator review.

This is best-effort background delivery, not a durable queue. If the process stops after saving but before finishing the job, a row can remain pending and no alert is guaranteed. Retry/timeouts can also occur after Firmli accepts a lead; its public widget protocol has no verified idempotency facility. Avoid replaying failed rows blindly. Database duplicate protection does not prove exactly-once external CRM delivery.

## Manual recovery

Use this **read-only** SQL to find registrations needing investigation (run after allowing background delivery time):

```sql
SELECT id, event_key, full_name, email, phone, crm_status, crm_error, created_at
FROM public.event_registrations
WHERE event_key = 'canada-education-fair-2026-11-15'
  AND crm_status <> 'synced'
  AND created_at < now() - interval '5 minutes'
ORDER BY created_at;
```

Check Firmli for the contact before adding it manually. A pending status can mean interrupted delivery, a failed status update or a CRM timeout after acceptance. Do not delete registrations to force a replay. There is no public admin/retry endpoint.

## Verification

- All 28 test files passed with mocked persistence, email and Firmli; includes event attribution, normalized contacts, spoofed campaign rejection, consent/phone validation, concurrent duplicates and failure recovery.
- Manual SQL executed only in disposable local PostgreSQL (PGlite): 16 columns, RLS, unique event/email, email/phone constraints, anonymous/authenticated denial and service-role access.
- Local browser verified the English and Burmese short redirects, required-name/email feedback, retained entered values and no horizontal overflow at phone widths of 390 and 320 pixels. No valid live submission was attempted.
- Full production build passed with read-only database sessions: event page and alias statically prerendered for six locales, registration endpoint dynamic. Real CRM delivery and source/medium labels remain for the owner to confirm after creating the table.
