import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { CONTACT_LINKS, SOCIAL_LINKS } from '@/shared/constants/social'
import { SITE_URL } from '@/shared/constants/site'
import { JsonLd } from '@/shared/lib/seo/jsonLd'
import { CONTACT_EMAIL, OFFICES } from '../data/offices'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 shrink-0">
      <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.5 5.5 3.8 7.2V22l3.5-1.9c.9.2 1.8.4 2.7.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1 12.5-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.4 5.8z" />
    </svg>
  )
}

function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Saturday Education Consulting',
    url: `${SITE_URL}/contact`,
    email: CONTACT_EMAIL,
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.tiktok,
      SOCIAL_LINKS.linkedin,
    ],
    location: [
      {
        '@type': 'Place',
        name: 'Saturday Education Consulting - Yangon',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'No. 20/22, 5th Floor, Shine Office Tower, Alan Pya Pagoda St',
          addressLocality: 'Yangon',
          postalCode: '11221',
          addressCountry: 'MM',
        },
        telephone: '+959794933044',
      },
      {
        '@type': 'Place',
        name: 'Saturday Education Consulting - Bangkok',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '170/72, Ocean Tower 1, 23rd Floor, Ratchadaphisek Rd, Khlong Toei',
          addressLocality: 'Bangkok',
          postalCode: '10110',
          addressCountry: 'TH',
        },
        telephone: '+66823288445',
      },
    ],
  }
}

export async function ContactPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  const tFooter = await getTranslations({ locale, namespace: 'footer.contactUs' })

  return (
    <main className="bg-canvas">
      <JsonLd data={localBusinessJsonLd()} />

      <header className="mx-auto max-w-wrap px-6 pt-10 pb-10 max-tablet:pt-8 max-tablet:pb-8">
        <div className="max-w-2xl border-b border-stroke pb-8">
          <h1 className="text-title leading-none font-medium text-primary-text">{t('title')}</h1>
          <p className="mt-3 text-body leading-relaxed text-secondary-text">{t('subtitle')}</p>

          <div className="mt-6 flex flex-nowrap items-center gap-2.5 max-tablet:flex-wrap">
            <Link
              href="/#consultation"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
            >
              {t('bookConsultation')}
            </Link>
            <a
              href={CONTACT_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#25D366]/45 bg-[#25D366]/5 px-5 text-label font-medium whitespace-nowrap text-[#128C7E] transition-colors hover:border-[#25D366]/70 hover:bg-[#25D366]/10"
            >
              <WhatsAppIcon />
              {t('whatsapp')}
            </a>
            <a
              href={CONTACT_LINKS.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#0084FF]/40 bg-[#0084FF]/5 px-5 text-label font-medium whitespace-nowrap text-[#006AFF] transition-colors hover:border-[#0084FF]/65 hover:bg-[#0084FF]/10"
            >
              <MessengerIcon />
              {t('messenger')}
            </a>
          </div>

          <p className="mt-4 text-label text-secondary-text">
            {t('emailLabel')}{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-action transition-colors hover:text-action-hover"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-wrap px-6 pb-16 max-tablet:pb-12">
        <p className="mb-5 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          {t('officesLabel')}
        </p>

        <ul className="grid gap-5 tablet:grid-cols-2">
          {OFFICES.map((office) => (
            <li
              key={office.id}
              className="flex flex-col overflow-hidden rounded-[24px] border border-stroke bg-surface shadow-[0_1px_2px_rgba(0,51,58,0.04)]"
            >
              <div className="relative aspect-[16/9] bg-surface-0">
                <iframe
                  title={t(office.mapTitleKey)}
                  src={office.mapEmbedUrl}
                  className="pointer-events-none absolute inset-0 h-full w-full border-0 grayscale-[15%]"
                  loading="lazy"
                  tabIndex={-1}
                  aria-hidden="true"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00333A]/35 to-transparent" />
                <a
                  href={office.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-4 bottom-4 inline-flex min-h-9 items-center rounded-full bg-white px-4 text-min font-medium text-action shadow-[0_8px_24px_-12px_rgba(0,51,58,0.45)] transition-colors hover:bg-tint"
                >
                  {t('getDirections')}
                </a>
              </div>

              <div className="flex flex-1 flex-col p-6 max-tablet:p-5">
                <p className="text-min font-medium tracking-[0.06em] text-action uppercase">
                  {t(office.cityKey)}
                </p>
                <h2 className="mt-1.5 text-card font-medium text-primary-text">
                  {tFooter(office.nameKey)}
                </h2>
                <p className="mt-3 text-label leading-relaxed text-secondary-text">
                  {tFooter(office.addressKey)}
                </p>
                <p className="mt-3 text-min leading-relaxed text-muted-text">{t('visitNote')}</p>

                <ul className="mt-5 flex flex-col gap-1.5 border-t border-stroke pt-4">
                  {office.phones.map((phone) => (
                    <li key={phone.href}>
                      <a
                        href={phone.href}
                        className="text-label font-medium text-primary-text transition-colors hover:text-action"
                      >
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
