// Social and direct-contact links.
// Single source of truth: these are rendered in the site footer and in the
// consultation section, so keep them here rather than hardcoding per component.

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/saturdayeducationconsultingmyanmar/',
  instagram: 'https://www.instagram.com/saturdayeduconsulting/',
  tiktok: 'https://www.tiktok.com/@saturdayeducationmm',
  // TODO: points at "nexa-education-consulting", which is a different company.
  // Kept live at the client's request until the correct Saturday Education
  // company page URL is available.
  linkedin: 'https://www.linkedin.com/company/nexa-education-consulting/',
} as const

// Direct contact channels shown alongside the consultation form.
export const CONTACT_LINKS = {
  whatsapp: 'https://wa.me/66823288445',
  // Derived from the Facebook page username above. Messenger resolves either a
  // numeric page id or the page username; the username form is used so this
  // stays correct if the underlying id ever changes.
  messenger: 'https://m.me/saturdayeducationconsultingmyanmar',
} as const
