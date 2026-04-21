type AdmissionStep = {
  id: string
  stepNumber: number
  title: string
  description: string | null
}

interface Props {
  steps: AdmissionStep[]
  title: string
}

export function UniAdmissionProcess({ steps, title }: Props) {
  if (steps.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-8">{title}</h2>

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-5 top-10 bottom-10 w-px bg-gradient-to-b from-brand-purple via-purple-200 to-transparent" />

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex gap-5">
              {/* Circle — sits on top of the line */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold text-sm z-10 relative shadow-md shadow-purple-200">
                  {step.stepNumber}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 md:p-5 mb-1 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-base text-brand-purple">{step.title}</h3>
                {step.description && (
                  <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{step.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
