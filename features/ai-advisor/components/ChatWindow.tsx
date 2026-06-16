'use client'

import { useState } from "react"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import ChatTypingIndicator from "./ChatTypingIndicator"
import { Link } from "@/i18n/navigation"

interface ChatWindowProps {
  onClose: () => void
}

type Message = { id: string; role: "user" | "assistant"; content: string }

const INITIAL_MESSAGE: Message = {
  id: "1",
  role: "assistant",
  content: "Hi! I'm your Saturday Education AI Advisor. How can I help you find your perfect study abroad destination today?",
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = (content: string) => {
    const userMessage: Message = { id: Date.now().toString(), role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Thank you for your message! Our AI advisor will be fully operational in Phase 2. For now, please book a free consultation with our human experts.",
      }])
    }, 1500)
  }

  return (
    <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: "480px" }}>
      <div className="bg-[#590D82] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">AI</div>
          <div>
            <div className="text-sm font-semibold">Saturday AI Advisor</div>
            <div className="text-xs text-purple-200">Always here to help</div>
          </div>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white text-lg">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
        {messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        {isTyping && <ChatTypingIndicator />}
      </div>
      <ChatInput onSend={handleSend} />
      <p className="px-3 pb-2 text-center text-[10px] leading-tight text-neutral-400">
        Your messages are handled per our{" "}
        <Link href="/privacy" className="underline hover:text-[#590D82]">Privacy Policy</Link>.
      </p>
    </div>
  )
}
