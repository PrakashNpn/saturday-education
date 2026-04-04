'use client'

import { useState } from "react"

interface ChatInputProps {
  onSend: (content: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    onSend(value.trim())
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-neutral-100 bg-white">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask me anything..."
        className="flex-1 px-4 py-2 text-sm border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#590D82]"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        aria-label="Send message"
        className="w-9 h-9 bg-[#590D82] text-white rounded-full flex items-center justify-center hover:bg-[#3D0A5A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        →
      </button>
    </form>
  )
}
