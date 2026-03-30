const STEPS = [
  { step: "01", icon: "📋", title: "Initial Consultation", description: "We assess your profile, goals, and preferences to create a personalized roadmap." },
  { step: "02", icon: "🎓", title: "University Selection", description: "Our experts recommend the best universities matching your profile and aspirations." },
  { step: "03", icon: "📝", title: "Application Support", description: "We guide you through every step of the application process for maximum success." },
  { step: "04", icon: "✈️", title: "Pre-Departure & Visa", description: "Complete visa guidance and pre-departure support to ensure a smooth transition." },
]

export default function ServicesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Our Services &amp; Application Process</h2>
          <p className="text-neutral-600">A proven 4-step process to your dream university</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {STEPS.map((step) => (
            <div key={step.step} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-2xl text-3xl mb-4">{step.icon}</div>
              <div className="text-sm font-bold text-[#590D82] mb-2">{step.step}</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-neutral-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
