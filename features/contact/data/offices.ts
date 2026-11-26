/** NAP + map embeds for the public contact page (local SEO). */

export type Office = {
  id: 'yangon' | 'bangkok'
  cityKey: 'cityYangon' | 'cityBangkok'
  nameKey: 'myanmarOffice' | 'thailandOffice'
  addressKey: 'addressMyanmar' | 'addressThailand'
  phones: { href: string; display: string }[]
  /** Non-interactive preview embed (pointer-events disabled in UI). */
  mapEmbedUrl: string
  /** Opens Google Maps directions in a new tab. */
  directionsUrl: string
  mapTitleKey: 'mapYangon' | 'mapBangkok'
}

export const OFFICES: readonly Office[] = [
  {
    id: 'yangon',
    cityKey: 'cityYangon',
    nameKey: 'myanmarOffice',
    addressKey: 'addressMyanmar',
    phones: [
      { href: 'tel:+959794933044', display: '+95 9 794 933 044' },
      { href: 'tel:+959765929492', display: '+95 9 765 929 492' },
      { href: 'tel:+959790839290', display: '+95 9 790 839 290' },
    ],
    mapEmbedUrl:
      'https://www.google.com/maps?q=Shine+Office+Tower+20%2F22+Alan+Pya+Pagoda+St+Yangon&z=16&output=embed',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Shine+Office+Tower+20%2F22+Alan+Pya+Pagoda+St+Yangon',
    mapTitleKey: 'mapYangon',
  },
  {
    id: 'bangkok',
    cityKey: 'cityBangkok',
    nameKey: 'thailandOffice',
    addressKey: 'addressThailand',
    phones: [{ href: 'tel:+66823288445', display: '+66 82 328 8445' }],
    mapEmbedUrl:
      'https://www.google.com/maps?q=Ocean+Tower+1+Ratchadaphisek+Road+Khlong+Toei+Bangkok&z=16&output=embed',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Ocean+Tower+1+Ratchadaphisek+Road+Khlong+Toei+Bangkok',
    mapTitleKey: 'mapBangkok',
  },
] as const

export const CONTACT_EMAIL = 'info@saturdayeducation.com'
