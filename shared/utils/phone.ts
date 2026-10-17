/**
 * Whether an international number (as the phone field produces it, "+66...") is
 * valid. The phone library is large, so it is loaded when first needed: by the
 * time someone submits a form, it is already in the browser with the phone field.
 * It is the same check the server runs (libphonenumber-js/min).
 */
export async function isValidPhone(value: string | undefined): Promise<boolean> {
  if (!value) return false
  const { isValidPhoneNumber } = await import('libphonenumber-js/min')
  return isValidPhoneNumber(value)
}
