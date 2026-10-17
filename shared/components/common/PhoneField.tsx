'use client'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { PhoneCountrySelect } from './PhoneCountrySelect'

type DefaultCountry = 'MM' | 'TH' | 'VN' | 'PH' | 'ID'

export interface PhoneFieldProps {
  value: string | undefined
  onChange: (value: string | undefined) => void
  defaultCountry: DefaultCountry
  placeholder: string
  /** Classes for the number input itself, so it matches the form's other fields. */
  inputClassName: string
  autoComplete?: string
}

/**
 * The international phone field: country chip with flags, dial code and number.
 * It is heavy (about 400 KB: every country flag plus phone metadata), so forms use
 * it through LazyPhoneField, or import it from inside a component that is itself
 * loaded on demand. Never import it from a component every page loads.
 */
export default function PhoneField({
  value,
  onChange,
  defaultCountry,
  placeholder,
  inputClassName,
  autoComplete,
}: PhoneFieldProps) {
  return (
    <PhoneInput
      international
      withCountryCallingCode
      defaultCountry={defaultCountry}
      countryCallingCodeEditable={false}
      countrySelectComponent={PhoneCountrySelect}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      numberInputProps={{ className: inputClassName, ...(autoComplete ? { autoComplete } : {}) }}
      className="phone-field"
    />
  )
}
