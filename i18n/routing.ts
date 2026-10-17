import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'th', 'my', 'vi', 'fil', 'id'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})
