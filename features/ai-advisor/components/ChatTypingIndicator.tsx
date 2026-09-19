import Image from 'next/image'

export default function ChatTypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      {/* Bot avatar — matches ChatMessage */}
      <div className="relative shrink-0 w-7 h-7 rounded-full bg-white shadow-[0_2px_10px_rgba(99,45,139,0.2)] mt-0.5 overflow-hidden">
        <Image src="/images/logo/logo-symbol.webp" alt="Saturday Education" fill unoptimized sizes="28px" className="object-contain p-0.5" />
      </div>

      {/* Glass bubble */}
      <div
        className="
          px-4 py-3.5 rounded-2xl rounded-tl-sm
          bg-white/70 backdrop-blur-sm
          border border-action/15
          shadow-[0_2px_16px_rgba(99,45,139,0.07),inset_0_1px_0_rgba(255,255,255,0.8)]
        "
      >
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-action-hover to-action animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
