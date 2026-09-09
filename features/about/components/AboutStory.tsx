import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function AboutStory() {
  const t = useTranslations('about')

  return (
    <section className="relative overflow-hidden border-t border-[#31144F] bg-[#0E0317] py-16 text-white max-tablet:py-12">
      {/* The same photograph twice: blurred and dimmed here as an ambient
          backdrop, sharp in the frame on the right. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/about/counsellor-training.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="scale-125 object-cover object-center opacity-35 blur-2xl filter"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#140524]/90 via-[#140524]/75 to-[#140524]/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-wrap px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="mb-2 text-min font-medium tracking-[0.06em] text-purple-300 uppercase">
              {t('storyLabel')}
            </p>
            <h2 className="mb-4 text-section font-medium leading-[1.2] text-white">
              {t('storyTitle')}
            </h2>
            <div className="space-y-4 text-body font-light leading-[1.65] text-white/85">
              <p>{t('storyBody1')}</p>
              <p>{t('storyBody2')}</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] border border-white/20 bg-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/images/about/counsellor-training.webp"
                alt={t('storyImageAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
