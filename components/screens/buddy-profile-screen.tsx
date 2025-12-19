"use client"

import type React from "react"

import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Buddy } from "@/lib/types"
import { ArrowLeft, Star, Shield, Play, Calendar, MapPin, Video } from "lucide-react"

interface BuddyProfileScreenProps {
  buddy: Buddy
}

export function BuddyProfileScreen({ buddy }: BuddyProfileScreenProps) {
  const { setScreen } = useApp()

  return (
    <div className="flex flex-col min-h-screen safe-area-top safe-area-bottom">
      {/* Header Image */}
      <div className="relative h-72">
        <img src={buddy.avatar || "/placeholder.svg"} alt={buddy.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => setScreen("home")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Audio Intro Button */}
        <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground">
          <Play className="w-4 h-4" />
          <span className="text-sm font-medium">Hear intro</span>
        </button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 px-6 -mt-8 relative z-10">
        <div className="bg-card rounded-3xl border border-border p-6 shadow-lg">
          {/* Name & Stats */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-foreground">{buddy.name}</h1>
                {buddy.verified && <Shield className="w-5 h-5 text-primary" />}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span>{buddy.rating}</span>
                </div>
                <span>•</span>
                <span>{buddy.totalSessions} sessions</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary">{buddy.matchScore}%</span>
              <p className="text-xs text-muted-foreground">match</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-foreground mb-6 leading-relaxed">{buddy.bio}</p>

          {/* Specialties */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {buddy.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="rounded-full">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Available</h3>
            <div className="flex flex-wrap gap-2">
              {buddy.availability.map((day) => (
                <Badge key={day} variant="outline" className="rounded-full">
                  {day}
                </Badge>
              ))}
            </div>
          </div>

          {/* Session Options - Using EUR */}
          <div className="space-y-3">
            <SessionOption
              icon={<Video className="w-5 h-5" />}
              title="Video Call"
              description="Connect from anywhere"
              price={buddy.hourlyRate}
            />
            <SessionOption
              icon={<MapPin className="w-5 h-5" />}
              title="Meet In-Person"
              description="Coffee, walk, or activity"
              price={buddy.hourlyRate + 10}
            />
          </div>
        </div>
      </div>

      {/* Book Button - Using EUR */}
      <div className="px-6 py-4">
        <Button className="w-full h-14 text-lg font-semibold rounded-2xl" onClick={() => setScreen("booking")}>
          <Calendar className="w-5 h-5 mr-2" />
          Book Session - €{buddy.hourlyRate}/hr
        </Button>
      </div>
    </div>
  )
}

function SessionOption({
  icon,
  title,
  description,
  price,
}: {
  icon: React.ReactNode
  title: string
  description: string
  price: number
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <div className="flex-1">
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-right">
        <span className="font-bold text-foreground">€{price}</span>
        <p className="text-xs text-muted-foreground">/hr</p>
      </div>
    </div>
  )
}
