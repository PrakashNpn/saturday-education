const TESTIMONIALS = [
  { name: "Aung Kyaw", country: "Myanmar → Australia", text: "Saturday Education made my dream of studying in Melbourne a reality. Their visa support was exceptional!", rating: 5 },
  { name: "Siriporn T.", country: "Thailand → UK", text: "I got into my first choice university at Bristol. The team guided me through every step with patience and expertise.", rating: 5 },
  { name: "Zaw Lin", country: "Myanmar → Canada", text: "Thanks to Saturday Education, I secured a scholarship worth CAD 15,000. Highly recommend their services!", rating: 5 },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-[#590D82]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Voices of Success</h2>
          <p className="text-purple-200">Real stories from students we have helped</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white/10 backdrop-blur rounded-2xl p-8 text-white">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#F59E0B]">★</span>
                ))}
              </div>
              <p className="text-purple-100 mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-purple-300 text-sm">{t.country}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
