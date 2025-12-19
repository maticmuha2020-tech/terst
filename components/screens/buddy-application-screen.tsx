"use client"

import { useState } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { BUDDY_QUIZ_QUESTIONS } from "@/lib/types"
import { ArrowLeft, FileCheck, Check, X, User } from "lucide-react"

export function BuddyApplicationScreen() {
  const { setScreen, user } = useApp()
  const [step, setStep] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Profile info for application
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [bio, setBio] = useState("")

  const totalQuestions = BUDDY_QUIZ_QUESTIONS.length
  const progress = step === 1 ? 25 : step === 2 ? 25 + (currentQuestion / totalQuestions) * 50 : step === 3 ? 90 : 100

  const handleQuizAnswer = (answer: string) => {
    const currentQ = BUDDY_QUIZ_QUESTIONS[currentQuestion]
    const isCorrect = answer === currentQ.correctAnswer

    if (!isCorrect) {
      setWrongAnswer(true)
      setTimeout(() => {
        setWrongAnswer(false)
        // Reset to beginning of quiz
        setCurrentQuestion(0)
        setQuizAnswers({})
        setScore(0)
      }, 1500)
      return
    }

    const newAnswers = { ...quizAnswers, [currentQuestion]: answer }
    setQuizAnswers(newAnswers)
    setScore((prev) => prev + 1)

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // All correct! Move to submit step
      setStep(3)
    }
  }

  const handleSubmitApplication = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "anonymous",
          name,
          email,
          bio,
          quizScore: 20,
          quizAnswers: Object.entries(quizAnswers).map(([qId, answer]) => ({
            questionId: Number.parseInt(qId),
            answer,
          })),
        }),
      })

      if (response.ok) {
        setStep(4)
      }
    } catch (error) {
      console.error("Failed to submit application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen safe-area-top safe-area-bottom bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => {
            if (step > 1 && step < 4) {
              setStep(step - 1)
              if (step === 2) setCurrentQuestion(0)
            } else {
              setScreen("welcome")
            }
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <Progress value={progress} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground w-16 text-right">
          {step === 2 ? `${currentQuestion + 1}/${totalQuestions}` : `${step}/4`}
        </span>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Step 1: Profile Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Your Profile</h1>
              <p className="text-muted-foreground">
                Tell us a bit about yourself. This info will be shown on your Buddy profile if approved.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Ana Kovač"
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ana@email.com"
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell potential users about yourself, your background, and why you want to be a Buddy..."
                  className="min-h-[120px] rounded-xl resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Quiz */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FileCheck className="w-8 h-8 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Boundary Knowledge Quiz</h1>
              <p className="text-muted-foreground mb-2">
                Answer all 20 questions correctly to proceed. If you get one wrong, you start over.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">Score: {score}/20</span>
              </div>
            </div>

            {wrongAnswer ? (
              <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 text-center">
                <X className="w-12 h-12 text-destructive mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Incorrect Answer</h3>
                <p className="text-sm text-muted-foreground">
                  {"Don't worry! Take your time and try again from the beginning."}
                </p>
              </div>
            ) : (
              <div className="bg-card rounded-2xl p-6 border border-border">
                <p className="text-lg font-medium text-foreground mb-6">
                  {BUDDY_QUIZ_QUESTIONS[currentQuestion].question}
                </p>

                <div className="space-y-3">
                  <QuizOption
                    label="A"
                    text={BUDDY_QUIZ_QUESTIONS[currentQuestion].optionA}
                    onClick={() => handleQuizAnswer("A")}
                  />
                  <QuizOption
                    label="B"
                    text={BUDDY_QUIZ_QUESTIONS[currentQuestion].optionB}
                    onClick={() => handleQuizAnswer("B")}
                  />
                  <QuizOption
                    label="C"
                    text={BUDDY_QUIZ_QUESTIONS[currentQuestion].optionC}
                    onClick={() => handleQuizAnswer("C")}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Perfect Score!</h1>
              <p className="text-muted-foreground">
                You answered all 20 questions correctly. Review your info and submit your application.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-5 border border-border space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Name</span>
                <p className="font-medium text-foreground">{name}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Email</span>
                <p className="font-medium text-foreground">{email}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Bio</span>
                <p className="text-foreground">{bio}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Quiz Score</span>
                <p className="font-medium text-primary">20/20 - Passed!</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h1>
            <p className="text-muted-foreground mb-8">
              {"Your application has been saved to our database. We'll review it and get back to you within 48 hours."}
            </p>

            <div className="w-full bg-secondary rounded-2xl p-6 text-left">
              <h3 className="font-semibold text-foreground mb-4">{"What's next?"}</h3>
              <div className="space-y-3">
                <StepItem number={1} text="We review your application" />
                <StepItem number={2} text="Background verification" />
                <StepItem number={3} text="Welcome to TerraBuddy!" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      {step === 1 && (
        <div className="px-6 pb-8">
          <Button
            className="w-full h-14 text-lg font-semibold rounded-2xl"
            onClick={() => setStep(2)}
            disabled={!name || !email || !bio}
          >
            Continue to Quiz
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="px-6 pb-8">
          <Button
            className="w-full h-14 text-lg font-semibold rounded-2xl"
            onClick={handleSubmitApplication}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      )}

      {step === 4 && (
        <div className="px-6 pb-8">
          <Button className="w-full h-14 text-lg font-semibold rounded-2xl" onClick={() => setScreen("welcome")}>
            Back to Home
          </Button>
        </div>
      )}
    </div>
  )
}

function QuizOption({ label, text, onClick }: { label: string; text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 transition-all text-left"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground shrink-0">
          {label}
        </div>
        <span className="text-foreground text-sm">{text}</span>
      </div>
    </button>
  )
}

function StepItem({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
        {number}
      </div>
      <span className="text-foreground">{text}</span>
    </div>
  )
}
