"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { QuizAnswer, User, Session, BuddyApplication, Message } from "./types"
import { MOCK_USER_SESSIONS, MOCK_APPLICATIONS } from "./types"

interface AppState {
  currentScreen: string
  user: User | null
  quizAnswers: QuizAnswer[]
  sessions: Session[]
  buddyApplication: BuddyApplication | null
  isAuthenticated: boolean
  messages: Message[]
  pendingApplications: BuddyApplication[]
  selectedSessionId: string | null
}

interface AppContextType extends AppState {
  setScreen: (screen: string) => void
  setUser: (user: User | null) => void
  setQuizAnswers: (answers: QuizAnswer[]) => void
  addQuizAnswer: (answer: QuizAnswer) => void
  setSessions: (sessions: Session[]) => void
  addSession: (session: Session) => void
  setBuddyApplication: (app: BuddyApplication | null) => void
  setIsAuthenticated: (auth: boolean) => void
  logout: () => void
  addMessage: (message: Message) => void
  setSelectedSessionId: (id: string | null) => void
  approveApplication: (id: string) => void
  rejectApplication: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentScreen: "welcome",
    user: null,
    quizAnswers: [],
    sessions: MOCK_USER_SESSIONS,
    buddyApplication: null,
    isAuthenticated: false,
    messages: [],
    pendingApplications: MOCK_APPLICATIONS,
    selectedSessionId: null,
  })

  const setScreen = (screen: string) => {
    setState((prev) => ({ ...prev, currentScreen: screen }))
  }

  const setUser = (user: User | null) => {
    setState((prev) => ({ ...prev, user }))
  }

  const setQuizAnswers = (answers: QuizAnswer[]) => {
    setState((prev) => ({ ...prev, quizAnswers: answers }))
  }

  const addQuizAnswer = (answer: QuizAnswer) => {
    setState((prev) => ({
      ...prev,
      quizAnswers: [...prev.quizAnswers.filter((a) => a.questionId !== answer.questionId), answer],
    }))
  }

  const setSessions = (sessions: Session[]) => {
    setState((prev) => ({ ...prev, sessions }))
  }

  const addSession = (session: Session) => {
    setState((prev) => ({ ...prev, sessions: [...prev.sessions, session] }))
  }

  const setBuddyApplication = (app: BuddyApplication | null) => {
    setState((prev) => ({ ...prev, buddyApplication: app }))
  }

  const setIsAuthenticated = (auth: boolean) => {
    setState((prev) => ({ ...prev, isAuthenticated: auth }))
  }

  const addMessage = (message: Message) => {
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }))
  }

  const setSelectedSessionId = (id: string | null) => {
    setState((prev) => ({ ...prev, selectedSessionId: id }))
  }

  const approveApplication = (id: string) => {
    setState((prev) => ({
      ...prev,
      pendingApplications: prev.pendingApplications.map((app) =>
        app.id === id ? { ...app, status: "approved" as const } : app,
      ),
    }))
  }

  const rejectApplication = (id: string) => {
    setState((prev) => ({
      ...prev,
      pendingApplications: prev.pendingApplications.map((app) =>
        app.id === id ? { ...app, status: "rejected" as const } : app,
      ),
    }))
  }

  const logout = () => {
    setState({
      currentScreen: "welcome",
      user: null,
      quizAnswers: [],
      sessions: MOCK_USER_SESSIONS,
      buddyApplication: null,
      isAuthenticated: false,
      messages: [],
      pendingApplications: MOCK_APPLICATIONS,
      selectedSessionId: null,
    })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        setScreen,
        setUser,
        setQuizAnswers,
        addQuizAnswer,
        setSessions,
        addSession,
        setBuddyApplication,
        setIsAuthenticated,
        logout,
        addMessage,
        setSelectedSessionId,
        approveApplication,
        rejectApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
