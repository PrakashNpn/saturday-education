export default function ChatTypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-neutral-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-2 h-2 bg-[#590D82] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
