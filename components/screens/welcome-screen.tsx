"use client"

import type React from "react"

import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Heart, Users, Shield, Sparkles } from "lucide-react"

export function WelcomeScreen() {
  const { setScreen } = useApp()

  return (
    <div className="flex flex-col min-h-screen safe-area-top safe-area-bottom">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8">
          <Heart className="w-12 h-12 text-primary" />
        </div>

        <h1 className="text-4xl font-bold text-foreground text-center mb-4 text-balance">TerraBuddy</h1>

        <p className="text-lg text-muted-foreground text-center mb-12 max-w-xs text-pretty">
          Find your companion. Connect with caring Buddies who truly listen.
        </p>

        {/* Features */}
        <div className="w-full space-y-4 mb-12">
          <FeatureItem
            icon={<Users className="w-5 h-5" />}
            title="Real Connections"
            description="Match with Buddies who share your vibe"
          />
          <FeatureItem
            icon={<Sparkles className="w-5 h-5" />}
            title="Personalized Matches"
            description="Our quiz finds your perfect companion"
          />
          <FeatureItem
            icon={<Shield className="w-5 h-5" />}
            title="Safe & Verified"
            description="All Buddies pass our safety screening"
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="px-6 pb-8 space-y-3">
        <Button className="w-full h-14 text-lg font-semibold rounded-2xl" onClick={() => setScreen("phone-auth")}>
          Get Started
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-transparent"
          onClick={() => setScreen("buddy-application")}
        >
          Become a Buddy
        </Button>
      </div>
    </div>
  )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
