"use client"

import type React from "react"

import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function SessionScreen() {
  const { setScreen } = useApp()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [showEscalate, setShowEscalate] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-foreground">
      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video */}
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <img src="/video-call-with-friendly-person.jpg" alt="Video call" className="w-full h-full object-cover" />
        </div>

        {/* Local Video Preview */}
        <div className="absolute top-6 right-4 w-28 h-40 rounded-2xl overflow-hidden bg-card border-2 border-background shadow-lg">
          {isVideoOff ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <VideoOff className="w-8 h-8 text-muted-foreground" />
            </div>
          ) : (
            <img src="/person-selfie-camera.jpg" alt="Your video" className="w-full h-full object-cover" />
          )}
        </div>

        {/* Timer */}
        <div className="absolute top-6 left-4 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm">
          <span className="text-sm font-medium text-foreground">23:45</span>
        </div>

        {/* Escalate Button */}
        <button
          onClick={() => setShowEscalate(true)}
          className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-destructive text-destructive-foreground flex items-center gap-2"
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">Escalate</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-background safe-area-bottom py-6 px-4">
        <div className="flex items-center justify-center gap-4">
          <ControlButton
            icon={isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            active={!isMuted}
            onClick={() => setIsMuted(!isMuted)}
          />
          <ControlButton
            icon={isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            active={!isVideoOff}
            onClick={() => setIsVideoOff(!isVideoOff)}
          />
          <ControlButton icon={<MessageSquare className="w-6 h-6" />} active />
          <button
            onClick={() => setScreen("home")}
            className="w-16 h-16 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
          >
            <Phone className="w-6 h-6 rotate-[135deg]" />
          </button>
        </div>
      </div>

      {/* Escalate Modal */}
      {showEscalate && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-end justify-center z-50">
          <div className="w-full max-w-lg bg-card rounded-t-3xl p-6 safe-area-bottom">
            <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Escalate This Session?</h2>
              <p className="text-muted-foreground">
                If someone is in danger or you need professional help, our support team will be notified immediately.
              </p>
            </div>
            <div className="space-y-3">
              <Button className="w-full h-14 rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Yes, Get Help Now
              </Button>
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl bg-transparent"
                onClick={() => setShowEscalate(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ControlButton({
  icon,
  active,
  onClick,
}: {
  icon: React.ReactNode
  active: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
        active ? "bg-secondary text-foreground" : "bg-muted text-muted-foreground"
      }`}
    >
      {icon}
    </button>
  )
}
