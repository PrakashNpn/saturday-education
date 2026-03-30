'use client'

import { useState } from "react"
import ChatWindow from "./ChatWindow"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-[#590D82] text-white rounded-full shadow-lg hover:bg-[#3D0A5A] transition-colors flex items-center justify-center"
        aria-label="Open AI Advisor chat"
      >
        <span className="text-2xl">{isOpen ? "✕" : "💬"}</span>
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>
    </div>
  )
}
