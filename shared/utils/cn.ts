import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge has to be told about the design system's named font sizes.
 * Left to itself it reads `text-label` as a colour, finds a second colour in
 * the same list (`text-primary-text`), and drops one of them — so a nav link
 * written as `text-label ... text-primary-text` silently rendered at the
 * inherited 16px instead of 14px. Registering them as font sizes makes the two
 * halves of `text-*` distinguishable again.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display', 'title', 'section', 'lede', 'card', 'body', 'label', 'min'] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
