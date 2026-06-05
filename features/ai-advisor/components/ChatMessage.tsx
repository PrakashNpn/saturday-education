import Image from 'next/image'

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="
            max-w-[78%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm text-white leading-relaxed
            bg-gradient-to-br from-[#590D82] to-[#7B2AB5]
            shadow-[0_4px_18px_rgba(89,13,130,0.38)]
          "
        >
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2.5">
      {/* Bot avatar */}
      <div className="shrink-0 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(89,13,130,0.2)] mt-0.5 overflow-hidden">
        <Image src="/images/logo/logo-symbol.png" alt="Saturday Education" width={28} height={28} className="object-contain" />
      </div>

      {/* Glass bubble */}
      <div
        className="
          flex-1 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-gray-700 leading-relaxed
          bg-white/70 backdrop-blur-sm
          border border-purple-100/80
          shadow-[0_2px_16px_rgba(89,13,130,0.07),inset_0_1px_0_rgba(255,255,255,0.8)]
        "
      >
        {message.content}
      </div>
    </div>
  )
}
