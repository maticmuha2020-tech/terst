"use client"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Calendar, Video, MapPin, MessageCircle, Clock } from "lucide-react"
import { format } from "date-fns"

export function SessionsScreen() {
  const { sessions, setScreen, setSelectedSessionId } = useApp()

  const upcomingSessions = sessions.filter((s) => s.status === "confirmed" || s.status === "pending")
  const pastSessions = sessions.filter((s) => s.status === "completed" || s.status === "cancelled")

  const handleOpenChat = (sessionId: string) => {
    setSelectedSessionId(sessionId)
    setScreen("chat")
  }

  return (
    <div className="flex flex-col min-h-screen safe-area-top pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">My Sessions</h1>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        {/* Upcoming Sessions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming</h2>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <SessionCard key={session.id} session={session} onChat={() => handleOpenChat(session.id)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-card rounded-2xl border border-border">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No upcoming sessions</p>
              <Button variant="link" className="mt-2 text-primary" onClick={() => setScreen("buddies")}>
                Find a Buddy
              </Button>
            </div>
          )}
        </div>

        {/* Past Sessions */}
        {pastSessions.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Past</h2>
            <div className="space-y-4">
              {pastSessions.map((session) => (
                <SessionCard key={session.id} session={session} past />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SessionCard({
  session,
  onChat,
  past,
}: {
  session: any
  onChat?: () => void
  past?: boolean
}) {
  return (
    <div className={`p-4 rounded-2xl bg-card border border-border ${past ? "opacity-60" : ""}`}>
      <div className="flex gap-4">
        <img
          src={session.buddyAvatar || "/placeholder.svg"}
          alt={session.buddyName}
          className="w-14 h-14 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{session.buddyName}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            {session.type === "video" ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
            <span>{session.type === "video" ? "Video Call" : "In-Person"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="w-4 h-4" />
            <span>{format(new Date(session.scheduledAt), "MMM d, yyyy 'at' h:mm a")}</span>
          </div>
          {session.location && <p className="text-sm text-muted-foreground mt-1">{session.location}</p>}
        </div>
        <div className="text-right">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              session.status === "confirmed"
                ? "bg-primary/10 text-primary"
                : session.status === "pending"
                  ? "bg-accent/10 text-accent"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {session.status}
          </span>
          <p className="text-sm font-semibold text-foreground mt-2">€{session.price}</p>
        </div>
      </div>
      {!past && onChat && (
        <Button variant="outline" className="w-full mt-4 rounded-xl bg-transparent" onClick={onChat}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Message Buddy
        </Button>
      )}
    </div>
  )
}
