"use client"

import type React from "react"

import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { User, Settings, HelpCircle, Shield, LogOut, ChevronRight, Star, Users } from "lucide-react"

export function ProfileScreen() {
  const { setScreen, user, logout } = useApp()

  const handleLogout = () => {
    logout()
    setScreen("welcome")
  }

  return (
    <div className="flex flex-col min-h-screen safe-area-top pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{user?.name || "User"}</h2>
              <p className="text-muted-foreground">{user?.email || "No email"}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <MenuItem icon={<Settings className="w-5 h-5" />} label="Account Settings" />
          <MenuItem icon={<Star className="w-5 h-5" />} label="Retake Quiz" onClick={() => setScreen("quiz")} />
          <MenuItem
            icon={<Shield className="w-5 h-5" />}
            label="Safety Resources"
            onClick={() => setScreen("safety")}
          />
          <MenuItem icon={<HelpCircle className="w-5 h-5" />} label="Help & Support" />
          {user?.isAdmin && (
            <MenuItem
              icon={<Users className="w-5 h-5" />}
              label="Admin: Buddy Applications"
              onClick={() => setScreen("admin")}
            />
          )}
        </div>

        {/* Become a Buddy CTA */}
        <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <h3 className="font-semibold text-foreground mb-2">Want to help others?</h3>
          <p className="text-sm text-muted-foreground mb-4">Become a Buddy and earn money while making a difference.</p>
          <Button
            variant="outline"
            className="rounded-xl bg-transparent"
            onClick={() => setScreen("buddy-application")}
          >
            Apply to be a Buddy
          </Button>
        </div>
      </div>

      {/* Logout */}
      <div className="px-6 pb-8">
        <Button
          variant="ghost"
          className="w-full h-14 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-2xl"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  )
}

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:bg-secondary transition-colors"
    >
      <div className="text-muted-foreground">{icon}</div>
      <span className="flex-1 text-left font-medium text-foreground">{label}</span>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  )
}
