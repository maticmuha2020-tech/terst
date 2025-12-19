"use client"

import { useState } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QUIZ_QUESTIONS } from "@/lib/types"
import { ArrowLeft, Sparkles } from "lucide-react"

export function QuizScreen() {
  const { setScreen, addQuizAnswer, quizAnswers, setUser, user } = useApp()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | null>(null)
  const [name, setName] = useState("")
  const [showNameInput, setShowNameInput] = useState(true)

  const question = QUIZ_QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100

  const handleNameSubmit = () => {
    if (name.trim()) {
      setUser(user ? { ...user, name: name.trim() } : null)
      setShowNameInput(false)
    }
  }

  const handleNext = () => {
    if (!selectedAnswer) return

    addQuizAnswer({ questionId: question.id, answer: selectedAnswer })

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
    } else {
      setScreen("home")
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      const prevAnswer = quizAnswers.find((a) => a.questionId === QUIZ_QUESTIONS[currentQuestion - 1].id)
      setSelectedAnswer(prevAnswer?.answer || null)
    } else if (!showNameInput) {
      setShowNameInput(true)
    } else {
      setScreen("phone-auth")
    }
  }

  if (showNameInput) {
    return (
      <div className="flex flex-col min-h-screen safe-area-top safe-area-bottom">
        <div className="flex items-center gap-4 px-4 py-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setScreen("phone-auth")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">{"What's your name?"}</h1>
          <p className="text-muted-foreground mb-8">{"This is how Buddies will greet you."}</p>

          <input
            type="text"
            placeholder="Enter your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 px-4 rounded-xl bg-secondary text-foreground text-lg border-0 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div className="px-6 pb-8">
          <Button
            className="w-full h-14 text-lg font-semibold rounded-2xl"
            onClick={handleNameSubmit}
            disabled={!name.trim()}
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <Progress value={progress} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground w-12 text-right">
          {currentQuestion + 1}/{QUIZ_QUESTIONS.length}
        </span>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 py-8">
        <p className="text-sm text-primary font-medium mb-2">Common Ground Quiz</p>
        <h1 className="text-2xl font-bold text-foreground mb-8">{question.question}</h1>

        <div className="space-y-4">
          <AnswerOption
            label="A"
            text={question.optionA}
            selected={selectedAnswer === "A"}
            onClick={() => setSelectedAnswer("A")}
          />
          <AnswerOption
            label="B"
            text={question.optionB}
            selected={selectedAnswer === "B"}
            onClick={() => setSelectedAnswer("B")}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-8">
        <Button
          className="w-full h-14 text-lg font-semibold rounded-2xl"
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestion === QUIZ_QUESTIONS.length - 1 ? "Find My Buddies" : "Next"}
        </Button>
      </div>
    </div>
  )
}

function AnswerOption({
  label,
  text,
  selected,
  onClick,
}: {
  label: string
  text: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
        selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
            selected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
          }`}
        >
          {label}
        </div>
        <span className="text-lg font-medium text-foreground">{text}</span>
      </div>
    </button>
  )
}
