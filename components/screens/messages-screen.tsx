"use client"
import { useApp } from "@/lib/context"
import { MessageCircle } from "lucide-react"
import { format } from "date-fns"

export function MessagesScreen() {
  const { sessions, setScreen, setSelectedSessionId } = useApp()

  const activeSessions = sessions.filter((s) => s.status === "confirmed" || s.status === "pending")

  const handleOpenChat = (sessionId: string) => {
    setSelectedSessionId(sessionId)
    setScreen("chat")
  }

  return (
    <div className="flex flex-col min-h-screen safe-area-top pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        {activeSessions.length > 0 ? (
          <div className="space-y-2">
            {activeSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => handleOpenChat(session.id)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:bg-secondary transition-colors text-left"
              >
                <img
                  src={session.buddyAvatar || "/placeholder.svg"}
                  alt={session.buddyName}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{session.buddyName}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    Session on {format(new Date(session.scheduledAt), "MMM d")}
                  </p>
                </div>
                <div className="w-3 h-3 bg-primary rounded-full" />
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">No messages yet</h2>
            <p className="text-muted-foreground">Book a session to start chatting with your Buddy</p>
          </div>
        )}
      </div>
    </div>
  )
}
