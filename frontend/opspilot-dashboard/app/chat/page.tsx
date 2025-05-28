"use client"

import { ChatInterface } from "@/components/chat/chat-interface"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"

export default function ChatPage() {
  return (
    <div className="p-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat with OpsPilot</h1>
          <p className="text-muted-foreground mt-2">Interactive conversation with your AI assistant</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <ChatInterface />
      </div>
    </div>
  )
}
