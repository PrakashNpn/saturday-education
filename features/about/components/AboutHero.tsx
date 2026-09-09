import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function AboutHero() {
  const t = useTranslations('about')

  return (
    // A white centre fading out to a pale purple at the edges, so the page
    // opens lighter than it ends. Values are the design's own rather than
    // tokens: this wash appears nowhere else.
    <section className="relative overflow-hidden bg-[#F2E8F8] bg-[radial-gradient(ellipse_110%_85%_at_50%_35%,#FFFFFF_0%,#FFFFFF_30%,#F8F3FC_62%,#EFE3F6_100%)] pt-16 pb-16 max-tablet:pt-12 max-tablet:pb-12">
      <div className="mx-auto max-w-wrap px-6 text-center">
        <p className="mx-auto mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          {t('heroLabel')}
        </p>
        <h1 className="mx-auto max-w-[32ch] text-title font-medium leading-[1.16] tracking-[-0.022em]">
          {t('heroTitle')}
        </h1>

        {/* Aspect ratio is the source file's own, so the frame never crops the
            people at the ends of the row. */}
        <div className="relative mx-auto mt-8 aspect-[1577/779] w-full overflow-hidden rounded-[18px] border border-stroke bg-surface">
          <Image
            src="/images/about/team-group.webp"
            alt={t('heroImageAlt')}
            fill
            priority
            sizes="(max-width: 1080px) 100vw, 1080px"
            className="object-cover object-center"
          />
        </div>

        <p className="mt-3 text-min font-light text-muted-text">{t('heroCaption')}</p>
      </div>
    </section>
  )
}
