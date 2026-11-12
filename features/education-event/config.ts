/** Event time is in Yangon (UTC+06:30), independent of browser/server timezone. */
export const CANADA_EVENT = {
  key: 'canada-education-fair-2026-11-15',
  path: '/canada-education-event',
  title: 'Myanmar First Canada Education Fair 2026',
  date: '15 November 2026',
  time: '1:00 PM – 4:00 PM',
  startsAt: '2026-11-15T06:30:00Z',
  endsAt: '2026-11-15T09:30:00Z',
  timeZone: 'Asia/Yangon',
  venue: 'Pan-Pacific Hotel Yangon',
  location: 'Junction City',
  address: 'Corner of Bogyoke Aung San Road and ဘုရားလမ်း, Yangon, Myanmar (Burma)',
  destination: 'canada',
  source: 'event_qr',
  consentVersion: 'event-registration-submit-v2',
} as const

/** Supplied by the owner; keep separate from consultation/chat attribution. */
export const EVENT_CAMPAIGN = {
  clientNumber: 'c191z26royal58',
  formNumber: 'FRM1790061849437W26JWECS31',
  utmNumber: 'UTM1794472545383G26KHOYW04',
} as const
