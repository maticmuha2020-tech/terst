"use client"

import { useState } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User } from "lucide-react"

export function AuthScreen() {
  const { setScreen, setIsAuthenticated, setUser } = useApp()
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async () => {
    setError("")

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (mode === "signup" && name.trim().length < 2) {
      setError("Please enter your name")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const isAdmin = email.toLowerCase() === "admin@terrabuddy.si"

    setIsAuthenticated(true)
    setUser({
      id: "1",
      email,
      name: mode === "signup" ? name : email.split("@")[0],
      quizAnswers: [],
      createdAt: new Date(),
      isAdmin,
    })
    setIsLoading(false)
    setScreen("quiz")
  }

  const isFormValid =
    mode === "login"
      ? isValidEmail(email) && password.length >= 6
      : isValidEmail(email) && password.length >= 6 && confirmPassword === password && name.trim().length >= 2

  return (
    <div className="flex flex-col min-h-screen safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setScreen("welcome")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm text-muted-foreground">{mode === "login" ? "Welcome back" : "Create account"}</span>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          {mode === "login" ? "Sign in to TerraBuddy" : "Join TerraBuddy"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {mode === "login"
            ? "Enter your email and password to continue"
            : "Create an account to find your perfect Buddy"}
        </p>

        <div className="space-y-4">
          {/* Name Input (Signup only) */}
          {mode === "signup" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Your Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 rounded-xl text-base pl-12"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-xl text-base pl-12"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-xl text-base pl-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Signup only) */}
          {mode === "signup" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-14 rounded-xl text-base pl-12"
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-sm text-destructive">{error}</p>}

          {/* Forgot Password (Login only) */}
          {mode === "login" && <button className="text-primary text-sm font-medium">Forgot password?</button>}
        </div>
      </div>

      <div className="px-6 pb-8 space-y-4">
        <Button
          className="w-full h-14 text-lg font-semibold rounded-2xl"
          onClick={handleSubmit}
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </Button>

        <p className="text-center text-muted-foreground">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login")
              setError("")
            }}
            className="text-primary font-medium"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  )
}
