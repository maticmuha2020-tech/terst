"use client"

import { AppProvider, useApp } from "@/lib/context"
import { WelcomeScreen } from "./screens/welcome-screen"
import { AuthScreen } from "./screens/phone-auth-screen"
import { QuizScreen } from "./screens/quiz-screen"
import { HomeScreen } from "./screens/home-screen"
import { BuddiesScreen } from "./screens/buddies-screen"
import { BuddyProfileScreen } from "./screens/buddy-profile-screen"
import { BookingScreen } from "./screens/booking-screen"
import { SessionScreen } from "./screens/session-screen"
import { SessionsScreen } from "./screens/sessions-screen"
import { MessagesScreen } from "./screens/messages-screen"
import { ChatScreen } from "./screens/chat-screen"
import { ProfileScreen } from "./screens/profile-screen"
import { BuddyApplicationScreen } from "./screens/buddy-application-screen"
import { SafetyScreen } from "./screens/safety-screen"
import { AdminScreen } from "./screens/admin-screen"
import { BottomNav } from "./bottom-nav"
// @ts-ignore
import { useState } from "react"
import type { Buddy } from "@/lib/types"

function AppContent() {
  const { currentScreen } = useApp()
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy | null>(null)

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen />
      case "phone-auth":
        return <AuthScreen />
      case "quiz":
        return <QuizScreen />
      case "home":
        return <HomeScreen onSelectBuddy={setSelectedBuddy} />
      case "buddies":
        return <BuddiesScreen onSelectBuddy={setSelectedBuddy} />
      case "buddy-profile":
        return selectedBuddy ? (
          <BuddyProfileScreen buddy={selectedBuddy} />
        ) : (
          <HomeScreen onSelectBuddy={setSelectedBuddy} />
        )
      case "booking":
        return selectedBuddy ? <BookingScreen buddy={selectedBuddy} /> : <HomeScreen onSelectBuddy={setSelectedBuddy} />
      case "session":
        return <SessionScreen />
      case "sessions":
        return <SessionsScreen />
      case "messages":
        return <MessagesScreen />
      case "chat":
        return <ChatScreen />
      case "profile":
        return <ProfileScreen />
      case "buddy-application":
        return <BuddyApplicationScreen />
      case "safety":
        return <SafetyScreen />
      case "admin":
        return <AdminScreen />
      default:
        return <WelcomeScreen />
    }
  }

  return (
    <div className="mobile-container bg-background min-h-screen">
      {renderScreen()}
      <BottomNav />
    </div>
  )
}

export function MobileApp() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
