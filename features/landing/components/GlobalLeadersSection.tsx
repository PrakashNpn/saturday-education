const DESTINATIONS = [
  { country: "United Kingdom", flag: "🇬🇧", universities: 130, slug: "united-kingdom" },
  { country: "Australia", flag: "🇦🇺", universities: 43, slug: "australia" },
  { country: "USA", flag: "🇺🇸", universities: 200, slug: "usa" },
  { country: "Canada", flag: "🇨🇦", universities: 96, slug: "canada" },
  { country: "New Zealand", flag: "🇳🇿", universities: 8, slug: "new-zealand" },
  { country: "Switzerland", flag: "🇨🇭", universities: 12, slug: "switzerland" },
]

export default function GlobalLeadersSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Global Leaders in Education</h2>
          <p className="text-neutral-600">Study in the world&apos;s most prestigious education destinations</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <a key={dest.slug} href={`/destinations/${dest.slug}`}
              className="group relative bg-gradient-to-br from-[#590D82] to-[#3D0A5A] text-white rounded-2xl p-8 hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">{dest.flag}</div>
              <h3 className="text-xl font-bold mb-1">{dest.country}</h3>
              <p className="text-purple-200 text-sm">{dest.universities}+ Universities</p>
              <div className="absolute top-4 right-4 text-purple-300 group-hover:text-white transition-colors">→</div>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="/destinations" className="text-[#590D82] font-semibold hover:underline">View All Destinations →</a>
        </div>
      </div>
    </section>
  )
}
