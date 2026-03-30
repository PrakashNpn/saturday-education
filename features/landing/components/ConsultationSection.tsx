export default function ConsultationSection() {
  return (
    <section id="consultation" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Book a Free Consultation</h2>
            <p className="text-neutral-600 mb-8">Our advisors will contact you within 24 hours.</p>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#590D82]" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#590D82]" />
              </div>
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#590D82]" />
              <select className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#590D82] bg-white text-neutral-600">
                <option>Nationality</option>
                <option>Myanmar</option>
                <option>Thailand</option>
                <option>Other</option>
              </select>
              <select className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#590D82] bg-white text-neutral-600">
                <option>Interested In</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>USA</option>
                <option>Canada</option>
                <option>New Zealand</option>
                <option>Switzerland</option>
              </select>
              <textarea placeholder="Your message or questions..." rows={4} className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#590D82] resize-none" />
              <button type="submit" className="w-full py-4 bg-[#590D82] text-white font-bold rounded-xl hover:bg-[#3D0A5A] transition-colors text-lg">
                Book Free Consultation
              </button>
            </form>
          </div>
          <div className="bg-gradient-to-br from-[#590D82] to-[#3D0A5A] rounded-3xl p-10 text-white text-center">
            <div className="text-7xl mb-6">🎓</div>
            <h3 className="text-2xl font-bold mb-4">Let&apos;s Make Your Study Abroad Dream Come True</h3>
            <p className="text-purple-200 mb-8">Talk to an expert advisor who understands Asian students&apos; unique challenges and opportunities.</p>
            <div className="space-y-3">
              {["Free consultation — no obligation", "Response within 24 hours", "Expert advisors with lived experience", "Support in English, Thai & Myanmar"].map((point) => (
                <div key={point} className="flex items-center gap-3 text-purple-100">
                  <span className="text-[#F59E0B]">✓</span>
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
