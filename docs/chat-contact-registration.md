# Chatbot contact registration

Visitors now submit full name, email and international phone number before sending the first message. There is no OTP step. The welcome form explains counsellor follow-up, links the privacy policy and uses the existing validation and error/retry handling. The message input, suggestions and conversation appear after a successful submission. Form copy is available in all six locales.

The browser sends contact fields and the existing honeypot to `/api/chat/lead`. The existing `saveConsultationLead` flow stores them in `consultations` and attempts the Firmli chat-channel sync. No new table, migration or environment variable is required. Normal chat notification emails remain disabled; CRM failure alerts retain their existing behaviour.

The saved note is `[Via AI chatbot]`, with no conversation excerpt or detected destination. The endpoint ignores `said` and `targetCountry` supplied by older clients. Previous lead records are unchanged.

Successful registration uses the existing `saturday-chat-lead-sent` browser marker. Clearing chat history does not reset registration. Existing histories carrying `[[lead-saved]]` also remain compatible. The obsolete free-question counter is no longer read or written. Storage failures keep new visitors gated for that page view; an in-memory registration still unlocks the current chat after submission. A later visit may ask again if storage is unavailable.

This remains a browser UX gate, not authenticated access control. Contact fields are not passed to the model or written into chat history. Conversations still use the existing browser history storage and model API once chatting begins.

Regression coverage includes fresh/returning registration state, blocked storage, legacy question counters and histories, first-question gating, field validation, failed-save retries, duplicate submissions and exclusion of conversation/destination data. Storage, CRM and AI side effects in tests are mocked; no real lead submission is needed for verification.
