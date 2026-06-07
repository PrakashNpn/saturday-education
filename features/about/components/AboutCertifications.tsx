'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Cert {
  name: string
  image: string
}

const CERTS: Cert[] = [
  {
    name: 'US Agent Training Course Graduate',
    image: 'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/media/certificates/usatc.jpeg',
  },
  {
    name: 'Advising for Study in France (ASF)',
    image: 'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/media/certificates/icef.jpeg',
  },
  {
    name: 'Qualified Education Agent Counsellor',
    image: 'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/media/certificates/qeac.jpeg',
  },
  {
    name: 'Career Counsellor Certification (MCMF)',
    image: 'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/media/certificates/mcmf.jpeg',
  },
  {
    name: 'Canada Course for Education Agents (CCEA)',
    image: 'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/media/certificates/ccea.jpeg',
  },
  {
    name: 'Irish Education Agent Course (IEAC)',
    image: 'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/media/certificates/ieac.jpeg',
  },
]

interface Props {
  translations: {
    certsLabel: string
    certsTitle: string
    certsSubtitle: string
  }
}

export function AboutCertifications({ translations: t }: Props) {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Ambient liquid blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-purple-300/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {t.certsLabel}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-4">
            {t.certsTitle}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t.certsSubtitle}
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {CERTS.map(({ name, image }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/70 via-brand-purple/15 to-white/40 hover:from-brand-purple/40 hover:to-purple-300/40 transition-all duration-500 shadow-[0_8px_32px_rgba(89,13,130,0.08)] hover:shadow-[0_20px_50px_rgba(89,13,130,0.18)] hover:-translate-y-1.5"
            >
              <div className="relative rounded-[calc(1.5rem-1px)] overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/60">
                {/* Glass sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none z-10" />

                {/* Certificate image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Bottom glow line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-purple/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
