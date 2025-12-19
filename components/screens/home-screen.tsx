"use client"

import { useApp } from "@/lib/context"
import { MOCK_BUDDIES, type Buddy, type QuizAnswer } from "@/lib/types"
import { Shield, Star, ChevronRight, Search, Calendar, Video } from "lucide-react"
import { useState, useMemo } from "react"
import { format } from "date-fns"

interface HomeScreenProps {
  onSelectBuddy: (buddy: Buddy) => void
}

function calculateMatchScore(userAnswers: QuizAnswer[], buddyAnswers: QuizAnswer[]): number {
  if (userAnswers.length === 0) return 0
  let matches = 0
  userAnswers.forEach((userAnswer) => {
    const buddyAnswer = buddyAnswers.find((b) => b.questionId === userAnswer.questionId)
    if (buddyAnswer && buddyAnswer.answer === userAnswer.answer) {
      matches++
    }
  })
  return Math.round((matches / userAnswers.length) * 100)
}

export function HomeScreen({ onSelectBuddy }: HomeScreenProps) {
  const { setScreen, user, quizAnswers, sessions } = useApp()
  const [searchQuery, setSearchQuery] = useState("")

  const sortedBuddies = useMemo(() => {
    return MOCK_BUDDIES.filter((b) => b.status === "approved")
      .map((buddy) => ({
        ...buddy,
        matchScore: calculateMatchScore(quizAnswers, buddy.quizAnswers),
      }))
      .filter((buddy) => buddy.matchScore > 60)
      .sort((a, b) => b.matchScore - a.matchScore)
  }, [quizAnswers])

  const filteredBuddies = useMemo(() => {
    if (!searchQuery) return sortedBuddies.slice(0, 5)
    return sortedBuddies.filter((buddy) => buddy.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [sortedBuddies, searchQuery])

  const upcomingSession = sessions.find((s) => s.status === "confirmed" && new Date(s.scheduledAt) > new Date())

  const handleBuddySelect = (buddy: Buddy) => {
    onSelectBuddy(buddy)
    setScreen("buddy-profile")
  }

  return (
    <div className="flex flex-col min-h-screen safe-area-top pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold text-foreground">{user?.name || "Friend"}</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Buddies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-secondary text-foreground border-0 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto">
        {/* Upcoming Session Card */}
        {upcomingSession && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">UPCOMING SESSION</h2>
            <button
              onClick={() => setScreen("messages")}
              className="w-full p-4 rounded-2xl bg-primary/10 border border-primary/20 text-left"
            >
              <div className="flex items-center gap-4">
                <img
                  src={upcomingSession.buddyAvatar || "/placeholder.svg"}
                  alt={upcomingSession.buddyName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{upcomingSession.buddyName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(upcomingSession.scheduledAt), "MMM d 'at' h:mm a")}</span>
                  </div>
                </div>
                <Video className="w-5 h-5 text-primary" />
              </div>
            </button>
          </div>
        )}

        {/* Top Matches */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground">YOUR TOP MATCHES</h2>
            <button onClick={() => setScreen("buddies")} className="text-sm text-primary font-medium">
              See all
            </button>
          </div>

          <div className="space-y-4">
            {filteredBuddies.map((buddy) => (
              <BuddyCard key={buddy.id} buddy={buddy} onClick={() => handleBuddySelect(buddy)} />
            ))}
            {filteredBuddies.length === 0 && (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <p className="text-muted-foreground">No matches found yet.</p>
                <p className="text-sm text-muted-foreground mt-2">Complete the quiz to find your Buddies!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function BuddyCard({ buddy, onClick }: { buddy: Buddy; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all text-left"
    >
      <div className="flex gap-4">
        <img src={buddy.avatar || "/placeholder.svg"} alt={buddy.name} className="w-20 h-20 rounded-2xl object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{buddy.name}</h3>
            {buddy.verified && <Shield className="w-4 h-4 text-primary shrink-0" />}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span>{buddy.rating}</span>
            <span>•</span>
            <span>{buddy.totalSessions} sessions</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-primary">{buddy.matchScore}%</span>
              <span className="text-xs text-muted-foreground">match</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-foreground">
              <span className="font-medium">€{buddy.hourlyRate}</span>
              <span className="text-muted-foreground">/hr</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
