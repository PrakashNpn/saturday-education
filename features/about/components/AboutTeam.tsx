'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

const MEMBERS: TeamMember[] = [
  {
    name: 'David Dhakal',
    role: 'Founder & Managing Director',
    bio: '',
    image: 'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/media/teams/david.jpg',
  },
  {
    name: 'Raju Pokhrel',
    role: 'Operation Director',
    bio: '',
    image: 'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/media/teams/raju%20pokhrel.png',
  },
  {
    name: 'Raju Dhakal',
    role: 'Senior Admission Officer',
    bio: '',
    image: 'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/media/teams/raju%20dhakal.png',
  },
]

interface Props {
  translations: {
    teamLabel: string
    teamTitle: string
    teamSubtitle: string
    team1Name: string
    team1Role: string
    team1Bio: string
    team2Name: string
    team2Role: string
    team2Bio: string
    team3Name: string
    team3Role: string
    team3Bio: string
  }
}

export function AboutTeam({ translations: t }: Props) {
  const members: TeamMember[] = [
    { ...MEMBERS[0], name: t.team1Name, role: t.team1Role, bio: t.team1Bio },
    { ...MEMBERS[1], name: t.team2Name, role: t.team2Role, bio: t.team2Bio },
    { ...MEMBERS[2], name: t.team3Name, role: t.team3Role, bio: t.team3Bio },
  ]

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Ambient liquid blobs */}
      <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[26rem] h-[26rem] rounded-full bg-purple-300/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {t.teamLabel}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-4">
            {t.teamTitle}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t.teamSubtitle}
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/70 via-brand-purple/15 to-white/40 hover:from-brand-purple/40 hover:to-purple-300/40 transition-all duration-500 shadow-[0_8px_32px_rgba(89,13,130,0.08)] hover:shadow-[0_24px_60px_rgba(89,13,130,0.2)] hover:-translate-y-1.5"
            >
              <div className="relative rounded-[calc(1.5rem-1px)] overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/60">
                {/* Photo */}
                <div className="relative h-[320px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  {/* Glass sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Name, role & bio */}
                <div className="p-6 md:p-7">
                  <h3 className="font-bold text-lg text-brand-purple mb-1">{member.name}</h3>
                  <p className="text-gray-500 text-sm font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
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
