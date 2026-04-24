import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
  imagePath?: string
}

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

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function AboutTeam({ translations: t }: Props) {
  const members: TeamMember[] = [
    { name: t.team1Name, role: t.team1Role, bio: t.team1Bio, initials: getInitials(t.team1Name) },
    { name: t.team2Name, role: t.team2Role, bio: t.team2Bio, initials: getInitials(t.team2Name) },
    { name: t.team3Name, role: t.team3Role, bio: t.team3Bio, initials: getInitials(t.team3Name) },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {t.teamLabel}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.teamTitle}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t.teamSubtitle}
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {members.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Photo area */}
              <div className="relative h-[300px] overflow-hidden bg-gradient-to-b from-brand-purple-light via-brand-purple to-brand-purple-dark">
                {member.imagePath ? (
                  <Image
                    src={member.imagePath}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <>
                    {/* Dot grid texture */}
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                      }}
                    />
                    {/* Decorative circles */}
                    <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-white/5" />
                    <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-white/5" />
                    {/* Initials placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <span className="text-white/60 text-4xl font-bold tracking-wide">{member.initials}</span>
                      </div>
                    </div>
                  </>
                )}
                {/* Brand accent bar at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-brand-purple-light to-brand-purple-dark" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-7">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                <p className="text-brand-purple text-sm font-semibold mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
