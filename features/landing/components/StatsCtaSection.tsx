const STATS = [
  { value: "10,000+", label: "Students Placed" },
  { value: "98%", label: "Success Rate" },
  { value: "$12M+", label: "Scholarships Won" },
  { value: "500+", label: "Partner Universities" },
]

export default function StatsCtaSection() {
  return (
    <section className="py-16 px-4 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-[#590D82]">{stat.value}</div>
              <div className="text-neutral-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#590D82] rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Write Your Own Success Story?</h2>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">Join thousands of Asian students who have achieved their study abroad dreams with Saturday Education.</p>
          <a href="#consultation" className="inline-block px-10 py-4 bg-[#F59E0B] text-white font-bold rounded-full hover:bg-amber-600 transition-colors text-lg">
            Book Free Consultation Today
          </a>
        </div>
      </div>
    </section>
  )
}
