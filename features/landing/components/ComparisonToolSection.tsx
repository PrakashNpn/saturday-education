export default function ComparisonToolSection() {
  return (
    <section className="py-16 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Comparison Tool</h2>
          <p className="text-neutral-600">Compare universities side-by-side to make the right choice</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-neutral-100">
            {["University A", "University B", "University C"].map((uni) => (
              <div key={uni} className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4" />
                <h3 className="font-semibold text-neutral-800">{uni}</h3>
                <p className="text-sm text-neutral-500 mt-1">Select a university to compare</p>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-100 p-6 text-center">
            <p className="text-neutral-500 text-sm">Comparison details will appear here</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <a href="/universities" className="px-8 py-3 bg-[#590D82] text-white font-semibold rounded-full hover:bg-[#3D0A5A] transition-colors">
            Browse Universities to Compare
          </a>
        </div>
      </div>
    </section>
  )
}
