const ADDITIONAL_SERVICES = [
  "Scholarship Application Assistance",
  "Student Visa Consultation",
  "IELTS/TOEFL Preparation Referral",
  "Accommodation Guidance",
  "Student Insurance Advisory",
  "Part-Time Work Guidance",
  "Airport Transfer Coordination",
  "Post-Arrival Support",
]

const WHY_US = [
  "10,000+ students successfully placed",
  "98% visa approval rate",
  "$12M+ in scholarships secured",
  "Expert advisors with lived experience",
  "End-to-end support from application to arrival",
]

export default function AdditionalServicesSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-lg">
          <div className="bg-white p-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Additional Services</h2>
            <ul className="space-y-3">
              {ADDITIONAL_SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-3 text-neutral-700">
                  <span className="text-[#590D82]">✓</span>{service}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#590D82] text-white p-10">
            <h2 className="text-2xl font-bold mb-6">Why Choose Saturday Education?</h2>
            <ul className="space-y-3 mb-8">
              {WHY_US.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-purple-100">
                  <span className="text-[#F59E0B] flex-shrink-0 mt-0.5">★</span>{reason}
                </li>
              ))}
            </ul>
            <a href="#consultation" className="inline-block px-8 py-3 bg-[#F59E0B] text-white font-semibold rounded-full hover:bg-amber-600 transition-colors">
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
