"use client"
import { useState, useRef, useEffect } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, AlertTriangle, Phone, Video } from "lucide-react"
import type { Message } from "@/lib/types"

export function ChatScreen() {
  const { setScreen, sessions, selectedSessionId, messages, addMessage, user } = useApp()
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const session = sessions.find((s) => s.id === selectedSessionId)
  const sessionMessages = messages.filter((m) => m.sessionId === selectedSessionId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [sessionMessages])

  const handleSend = () => {
    if (!inputValue.trim() || !session || !user) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sessionId: session.id,
      senderId: user.id,
      senderName: user.name,
      content: inputValue.trim(),
      timestamp: new Date(),
      read: false,
    }

    addMessage(newMessage)
    setInputValue("")

    // Simulate buddy response
    setTimeout(() => {
      const buddyResponse: Message = {
        id: (Date.now() + 1).toString(),
        sessionId: session.id,
        senderId: session.buddyId,
        senderName: session.buddyName,
        content:
          "Thanks for your message! Looking forward to our session. Is there anything specific you'd like to discuss?",
        timestamp: new Date(),
        read: false,
      }
      addMessage(buddyResponse)
    }, 2000)
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Session not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setScreen("messages")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <img
          src={session.buddyAvatar || "/placeholder.svg"}
          alt={session.buddyName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">{session.buddyName}</h2>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Video className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sessionMessages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">Start a conversation with {session.buddyName}</p>
          </div>
        )}
        {sessionMessages.map((message) => {
          const isOwn = message.senderId === user?.id
          return (
            <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  isOwn
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-secondary-foreground rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-[10px] mt-1 ${isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Escalate Banner */}
      <div className="px-4 py-2 bg-destructive/10 border-t border-destructive/20">
        <button className="flex items-center justify-center gap-2 w-full text-sm text-destructive font-medium">
          <AlertTriangle className="w-4 h-4" />
          Escalate to Safety Team
        </button>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 h-12 px-4 rounded-full bg-secondary text-foreground border-0 focus:ring-2 focus:ring-primary outline-none"
          />
          <Button size="icon" className="w-12 h-12 rounded-full" onClick={handleSend} disabled={!inputValue.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
