interface ChatMessageProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
        isUser
          ? "bg-[#590D82] text-white rounded-br-sm"
          : "bg-white text-neutral-800 border border-neutral-100 rounded-bl-sm shadow-sm"
      }`}>
        {message.content}
      </div>
    </div>
  )
}
