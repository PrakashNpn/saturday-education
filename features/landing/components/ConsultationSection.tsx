'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Globe, ChevronDown } from 'lucide-react'

// ── Field variants ─────────────────────────────────────────────────────────────

const fieldVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

// ── Shared input class ─────────────────────────────────────────────────────────

const inputCls =
  'w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#590D82]/30 focus:border-[#590D82] transition-colors'

const labelCls = 'text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block'

// ── Select wrapper with chevron ────────────────────────────────────────────────

function SelectField({
  label,
  defaultValue,
  children,
}: {
  label: string
  defaultValue?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <select
          defaultValue={defaultValue}
          className={`${inputCls} appearance-none cursor-pointer pr-9`}
        >
          {children}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ConsultationSection() {
  const t = useTranslations('Landing.consultation')

  return (
    <section id="consultation" className="bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 grid md:grid-cols-2"
        >

          {/* ── Left: Form ─────────────────────────────────────────────────── */}
          <div className="bg-white p-8 md:p-10 lg:p-12 relative overflow-hidden">
            {/* Purple gradient top border */}
            {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#590D82] via-[#7B2AB5] to-[#590D82]" /> */}
            <h2
              className="font-extrabold text-brand-purple leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 1.1rem + 2vw, 2.25rem)' }}
            >
              {t('heading')}
            </h2>
            <div className="w-14 h-1 bg-[#590D82] mt-3 mb-8 rounded-full" />

            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              onSubmit={(e) => e.preventDefault()}
              noValidate
            >
              {/* Full Name */}
              <motion.div variants={fieldVariant} className="mb-5">
                <label className={labelCls}>{t('form.fullName.label')}</label>
                <input
                  type="text"
                  placeholder={t('form.fullName.placeholder')}
                  className={inputCls}
                />
              </motion.div>

              {/* Email + Phone */}
              <motion.div variants={fieldVariant} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className={labelCls}>{t('form.email.label')}</label>
                  <input
                    type="email"
                    placeholder={t('form.email.placeholder')}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>{t('form.phone.label')}</label>
                  <input
                    type="tel"
                    placeholder={t('form.phone.placeholder')}
                    className={inputCls}
                  />
                </div>
              </motion.div>

              {/* Country + Consultation Type */}
              <motion.div variants={fieldVariant} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <SelectField label={t('form.country.label')} defaultValue="uk">
                  <option value="uk">{t('form.country.options.uk')}</option>
                  <option value="usa">{t('form.country.options.usa')}</option>
                  <option value="australia">{t('form.country.options.australia')}</option>
                  <option value="canada">{t('form.country.options.canada')}</option>
                  <option value="newZealand">{t('form.country.options.newZealand')}</option>
                  <option value="singapore">{t('form.country.options.singapore')}</option>
                  <option value="switzerland">{t('form.country.options.switzerland')}</option>
                  <option value="ireland">{t('form.country.options.ireland')}</option>
                  <option value="thailand">{t('form.country.options.thailand')}</option>
                  <option value="other">{t('form.country.options.other')}</option>
                </SelectField>
                <SelectField label={t('form.consultationType.label')} defaultValue="online">
                  <option value="online">{t('form.consultationType.options.online')}</option>
                  <option value="inPerson">{t('form.consultationType.options.inPerson')}</option>
                  <option value="phoneCall">{t('form.consultationType.options.phoneCall')}</option>
                </SelectField>
              </motion.div>

              {/* Textarea */}
              <motion.div variants={fieldVariant} className="mb-6">
                <label className={labelCls}>{t('form.inquiry.label')}</label>
                <textarea
                  placeholder={t('form.inquiry.placeholder')}
                  className={`${inputCls} min-h-[120px] resize-none`}
                />
              </motion.div>

              {/* Submit */}
              <motion.div variants={fieldVariant}>
                <button
                  type="submit"
                  className="w-full bg-[#590D82] hover:bg-[#4A0A6E] text-white font-bold py-4 rounded-full text-base transition-colors duration-300"
                >
                  {t('form.submit')}
                </button>
              </motion.div>
            </motion.form>

            {/* Direct contact */}
            <div className="mt-6 text-center">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                {t('directContact.label')}
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <a
                  href="https://wa.me/9591234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="whitespace-nowrap">{t('directContact.whatsapp')}</span>
                </a>
                <a
                  href="https://m.me/saturdayeducation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#A855F7">
                    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.26 5.886-3.26-6.558 6.763z" />
                  </svg>
                  <span className="whitespace-nowrap">{t('directContact.messenger')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: Motivational panel ───────────────────────────────────── */}
          <div className="bg-gradient-to-br from-[#590D82] via-[#6B1FA0] to-[#4A0A6E] p-8 md:p-10 lg:pt-10 lg:pb-14 lg:px-10 flex flex-col items-center justify-start text-center">
            <h3
              className="font-bold text-white leading-tight max-w-sm mb-10 self-center text-center"
              style={{ fontSize: 'clamp(1.4rem, 1rem + 2vw, 2rem)' }}
            >
              {t('rightPanel.heading')}
            </h3>

            {/* Floating image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-w-[400px] w-full mx-auto mb-6"
            >
              {/* Globe badge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 z-30 w-15 h-15 rounded-full bg-white shadow-md flex items-center justify-center"
              >
                <Globe size={30} className="text-[#590D82]" />
              </motion.div>

              {/* Sparkle dots */}
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute -top-5 left-1 w-2 h-2 rounded-full bg-white/60"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -bottom-3 right-1 w-1.5 h-1.5 rounded-full bg-white/50"
              />

              {/* White frame — continuous float */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="relative z-10 rotate-2 bg-white rounded-2xl p-4 md:p-5 shadow-xl"
              >
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <Image
                    src="/images/landing/global-edu-hero.png"
                    alt="Global education destinations"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Badge — floats in sync with the image card */}
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute bottom-[3%] left-0 -translate-x-1/3 translate-y-1/2 z-20 rotate-[-3deg] inline-block bg-white border border-gray-100 text-[#590D82] text-xs font-bold px-4 py-2 rounded-full shadow-sm whitespace-nowrap"
              >
                {t('rightPanel.badge')}
              </motion.span>
            </motion.div>

            {/* Subtitle */}
            <p className="text-white font-bold text-lg md:text-xl mb-1">
              {t('rightPanel.subtitle')}
            </p>

            {/* Subtext */}
            <p className="text-white/70 text-sm">{t('rightPanel.subtext')}</p>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
