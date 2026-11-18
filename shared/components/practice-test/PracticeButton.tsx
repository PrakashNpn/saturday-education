import type { ButtonHTMLAttributes } from 'react'
import s from './practiceTest.module.css'

export const PRACTICE_PRIMARY_BUTTON = `${s.button} ${s.primary}`
export const PRACTICE_SECONDARY_BUTTON = `${s.button} ${s.secondary}`

export function PracticeButton({ secondary, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { secondary?: boolean }) {
  return <button type="button" className={`${secondary ? PRACTICE_SECONDARY_BUTTON : PRACTICE_PRIMARY_BUTTON} ${className}`} {...props} />
}
