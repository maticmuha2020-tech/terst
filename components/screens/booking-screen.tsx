"use client"

import type React from "react"

import { useState } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import type { Buddy } from "@/lib/types"
import { ArrowLeft, Video, MapPin, Calendar, Clock, CreditCard, Check } from "lucide-react"

interface BookingScreenProps {
  buddy: Buddy
}

export function BookingScreen({ buddy }: BookingScreenProps) {
  const { setScreen, addSession } = useApp()
  const [step, setStep] = useState(1)
  const [sessionType, setSessionType] = useState<"video" | "in-person">("video")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [duration, setDuration] = useState(60)
  const [isBooking, setIsBooking] = useState(false)

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      full: date.toISOString().split("T")[0],
    }
  })

  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

  const totalPrice =
    sessionType === "video" ? buddy.hourlyRate * (duration / 60) : (buddy.hourlyRate + 10) * (duration / 60)

  const handleBook = async () => {
    setIsBooking(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    addSession({
      id: Date.now().toString(),
      buddyId: buddy.id,
      buddyName: buddy.name,
      buddyAvatar: buddy.avatar,
      userId: "1",
      type: sessionType,
      status: "confirmed",
      scheduledAt: new Date(`${selectedDate}T${selectedTime}`),
      duration,
      price: totalPrice,
      location: sessionType === "in-person" ? "Kavarna Rog, Ljubljana" : undefined,
    })

    setStep(4)
    setIsBooking(false)
  }

  return (
    <div className="flex flex-col min-h-screen safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => (step > 1 && step < 4 ? setStep(step - 1) : setScreen("buddy-profile"))}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">Book with {buddy.name}</h1>
          {step < 4 && <p className="text-sm text-muted-foreground">Step {step} of 3</p>}
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Choose session type</h2>

            <div className="space-y-3">
              <TypeOption
                icon={<Video className="w-6 h-6" />}
                title="Video Call"
                description="Connect from the comfort of home"
                price={buddy.hourlyRate}
                selected={sessionType === "video"}
                onClick={() => setSessionType("video")}
              />
              <TypeOption
                icon={<MapPin className="w-6 h-6" />}
                title="Meet In-Person"
                description="Coffee shop, park, or public space in Slovenia"
                price={buddy.hourlyRate + 10}
                selected={sessionType === "in-person"}
                onClick={() => setSessionType("in-person")}
              />
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Duration</h3>
              <div className="flex gap-3">
                {[30, 60, 90].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDuration(mins)}
                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                      duration === mins
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Pick a date & time</h2>

            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Date
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((d) => (
                  <button
                    key={d.full}
                    onClick={() => setSelectedDate(d.full)}
                    className={`flex flex-col items-center p-3 rounded-xl min-w-[60px] transition-colors ${
                      selectedDate === d.full
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <span className="text-xs">{d.day}</span>
                    <span className="text-lg font-bold">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Time
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl text-sm font-medium transition-colors ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Confirm & Pay</h2>

            <div className="bg-secondary rounded-2xl p-4 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={buddy.avatar || "/placeholder.svg"}
                  alt={buddy.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{buddy.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{sessionType} Session</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground">{selectedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time</span>
                  <span className="text-foreground">{selectedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-foreground">{duration} minutes</span>
                </div>
                {sessionType === "in-person" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="text-foreground">TBD in Ljubljana</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">€{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Payment Method</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <div className="w-10 h-6 rounded bg-gradient-to-r from-blue-600 to-blue-400" />
                <span className="text-foreground">•••• 4242</span>
                <span className="text-sm text-muted-foreground ml-auto">Change</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-8">{"You'll receive a confirmation with details shortly."}</p>
            <div className="bg-secondary rounded-2xl p-6 w-full">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={buddy.avatar || "/placeholder.svg"}
                  alt={buddy.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{buddy.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDate} at {selectedTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA - Updated to EUR */}
      <div className="px-6 py-4 border-t border-border">
        {step < 4 ? (
          <Button
            className="w-full h-14 text-lg font-semibold rounded-2xl"
            onClick={() => (step < 3 ? setStep(step + 1) : handleBook())}
            disabled={(step === 2 && (!selectedDate || !selectedTime)) || isBooking}
          >
            {isBooking ? "Processing..." : step === 3 ? `Pay €${totalPrice.toFixed(2)}` : "Continue"}
          </Button>
        ) : (
          <Button className="w-full h-14 text-lg font-semibold rounded-2xl" onClick={() => setScreen("home")}>
            Back to Home
          </Button>
        )}
      </div>
    </div>
  )
}

function TypeOption({
  icon,
  title,
  description,
  price,
  selected,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  price: number
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
        selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${
            selected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="text-right">
          <span className="font-bold text-foreground">€{price}</span>
          <p className="text-xs text-muted-foreground">/hr</p>
        </div>
      </div>
    </button>
  )
}
