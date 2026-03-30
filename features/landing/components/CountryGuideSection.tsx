const TIPS = [
  "Consider your career goals and which countries have strong industries",
  "Research visa requirements and post-study work rights",
  "Compare tuition fees and cost of living",
  "Look into scholarship opportunities for your nationality",
  "Check language requirements and English proficiency tests accepted",
]

export default function CountryGuideSection() {
  return (
    <section className="py-16 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Not Sure Which Country is Right for You?
            </h2>
            <p className="text-neutral-600 mb-8">Our expert advisors help you navigate your options. Here are key factors to consider:</p>
            <ol className="space-y-4">
              {TIPS.map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#590D82] text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <p className="text-neutral-700 pt-1">{tip}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-[#590D82] rounded-2xl p-8 text-white text-center">
            <div className="text-6xl mb-6">🌍</div>
            <h3 className="text-2xl font-bold mb-4">Get Personalized Guidance</h3>
            <p className="text-purple-200 mb-6">Talk to our expert advisors who have helped thousands of students find their perfect destination.</p>
            <a href="#consultation" className="inline-block px-8 py-3 bg-[#F59E0B] text-white font-semibold rounded-full hover:bg-amber-600 transition-colors">
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
