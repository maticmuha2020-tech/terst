"use client"
import { useApp } from "@/lib/context"
import { Home, Users, MessageCircle, Shield, User } from "lucide-react"

export function BottomNav() {
  const { currentScreen, setScreen, sessions } = useApp()

  // Don't show nav on onboarding screens
  const hideOnScreens = ["welcome", "phone-auth", "quiz"]
  if (hideOnScreens.includes(currentScreen)) return null

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "buddies", icon: Users, label: "Buddies" },
    {
      id: "messages",
      icon: MessageCircle,
      label: "Messages",
      badge: sessions.filter((s) => s.status === "confirmed").length,
    },
    { id: "safety", icon: Shield, label: "Safety" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom z-50">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors relative ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
