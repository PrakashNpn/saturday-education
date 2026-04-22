interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
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
        <div className="text-center mb-12">
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
              className="bg-white border border-gray-100 rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-brand-purple to-purple-900 flex items-center justify-center mx-auto mb-5 shadow-md">
                <span className="text-white font-bold text-xl tracking-wide">{member.initials}</span>
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
              <p className="text-brand-purple text-sm font-semibold mb-3">{member.role}</p>
              <div className="w-10 h-0.5 bg-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
