"use client"
import { useApp } from "@/lib/context"
import { MOCK_BUDDIES, type Buddy, type QuizAnswer } from "@/lib/types"
import { Star, Shield, ChevronRight, Search, Filter } from "lucide-react"
import { useState, useMemo } from "react"

interface BuddiesScreenProps {
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

export function BuddiesScreen({ onSelectBuddy }: BuddiesScreenProps) {
  const { setScreen, quizAnswers } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)

  const allBuddies = useMemo(() => {
    return MOCK_BUDDIES.filter((b) => b.status === "approved")
      .map((buddy) => ({
        ...buddy,
        matchScore: calculateMatchScore(quizAnswers, buddy.quizAnswers),
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
  }, [quizAnswers])

  const filteredBuddies = useMemo(() => {
    if (!searchQuery) return allBuddies
    return allBuddies.filter(
      (buddy) =>
        buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buddy.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [allBuddies, searchQuery])

  const handleBuddySelect = (buddy: Buddy) => {
    onSelectBuddy(buddy)
    setScreen("buddy-profile")
  }

  return (
    <div className="flex flex-col min-h-screen safe-area-top pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-4">All Buddies</h1>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-secondary text-foreground border-0 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Buddies List */}
      <div className="flex-1 px-6 overflow-y-auto">
        <p className="text-sm text-muted-foreground mb-4">{filteredBuddies.length} Buddies available</p>
        <div className="space-y-4">
          {filteredBuddies.map((buddy) => (
            <BuddyCard key={buddy.id} buddy={buddy} onClick={() => handleBuddySelect(buddy)} />
          ))}
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

          <div className="flex flex-wrap gap-1 mb-2">
            {buddy.specialties.slice(0, 2).map((s) => (
              <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {s}
              </span>
            ))}
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
