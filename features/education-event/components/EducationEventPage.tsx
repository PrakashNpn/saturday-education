import Image from 'next/image'
import { CalendarDays, Clock3, MapPin, ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { COUNTRIES, OTHER_COUNTRY } from '@/shared/constants/destinationCountries'
import { CANADA_EVENT } from '../config'
import { EventRegistrationForm } from './EventRegistrationForm'

export async function EducationEventPage() {
  const t = await getTranslations('educationEvent')
  const countryText = await getTranslations('Landing.consultation.form.country.options')
  const destinationOptions = [...COUNTRIES.map(country => ({ value: country.key, label: countryText(country.key) })), { value: OTHER_COUNTRY, label: countryText(OTHER_COUNTRY) }]
  const detailsContent = (
    <dl className="space-y-3.5">
            <div className="flex gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5"><CalendarDays className="size-[18px] text-light" aria-hidden="true" /></span><div><dt className="text-min text-white/65">{t('dateLabel')}</dt><dd className="mt-0.5 text-label font-medium text-white"><time dateTime="2026-11-15">{t('date')}</time></dd></div></div>
            <div className="flex gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5"><Clock3 className="size-[18px] text-light" aria-hidden="true" /></span><div><dt className="text-min text-white/65">{t('timeLabel')}</dt><dd className="mt-0.5 flex flex-wrap items-baseline gap-x-2 text-label font-medium text-white">{CANADA_EVENT.time}<span className="text-min font-normal text-white/65">{t('yangonTime')}</span></dd></div></div>
            <div className="flex gap-3 border-t border-white/15 pt-3.5"><span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5"><MapPin className="size-[18px] text-light" aria-hidden="true" /></span><div><dt className="text-min text-white/65">{t('venueLabel')}</dt><dd className="mt-0.5 text-label font-medium text-white">{CANADA_EVENT.venue}<span className="mt-1 block text-min font-normal text-white/80">{CANADA_EVENT.location}</span><span className="mt-2 block text-min font-normal leading-relaxed text-white/65">{CANADA_EVENT.address}</span></dd></div></div>
          </dl>
  )
  return <main data-event-registration className="relative overflow-hidden bg-canvas">
    <div aria-hidden="true" className="pointer-events-none absolute -left-36 -top-40 size-[500px] rounded-full bg-light/20 blur-3xl" />
    <div className="relative mx-auto grid max-w-wrap gap-4 px-4 py-4 sm:px-6 tablet:grid-cols-2 tablet:items-start tablet:gap-9 tablet:py-5">
      <div className="contents tablet:block">
        <header className="order-1">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-action/20 bg-surface px-2.5 py-1 text-min font-semibold text-action">
            <Image src="/images/flags/ca.png" width={22} height={15} alt="" unoptimized className="h-3.5 w-5 rounded-sm object-cover" />{t('eyebrow')}
          </div>
          <h1 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-semibold leading-[1.15] tracking-tight text-deep">{CANADA_EVENT.title}</h1>
          <p className="mt-2 hidden max-w-[42ch] text-label text-secondary-text tablet:block">{t('intro')}</p>
          <p className="mt-2 text-min leading-relaxed text-secondary-text tablet:hidden"><time dateTime="2026-11-15">{t('date')}</time><span className="mx-1.5 text-action" aria-hidden="true">·</span>{CANADA_EVENT.time}<span className="block">{CANADA_EVENT.venue}</span></p>
        </header>
        <div className="order-3 tablet:mt-5">
          <section aria-labelledby="event-details-title" className="hidden rounded-2xl border border-deep/10 bg-deep p-5 shadow-[0_16px_35px_-24px_rgba(0,51,58,0.5)] tablet:block">
            <h2 id="event-details-title" className="mb-4 text-min font-medium uppercase tracking-[0.14em] text-light">{t('detailsTitle')}</h2>
            {detailsContent}
          </section>
          <details className="rounded-xl bg-deep px-4 py-3 text-white tablet:hidden">
            <summary className="cursor-pointer text-label font-medium">{t('detailsTitle')}</summary>
            <div className="pt-4">{detailsContent}</div>
          </details>
          <p className="mt-3 flex items-start gap-2 text-min text-secondary-text"><ArrowUpRight size={15} className="mt-0.5 shrink-0 text-action" aria-hidden="true" />{t('help')}</p>
        </div>
      </div>
      <div className="order-2 min-w-0"><EventRegistrationForm destinationOptions={destinationOptions} /></div>
    </div>
  </main>
}
