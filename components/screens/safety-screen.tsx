"use client"

import type React from "react"

import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Phone, MessageCircle, Heart, AlertTriangle, ExternalLink } from "lucide-react"

export function SafetyScreen() {
  const { setScreen } = useApp()

  return (
    <div className="flex flex-col min-h-screen safe-area-top pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setScreen("home")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Safety Resources</h1>
      </div>

      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
        {/* Important Notice */}
        <div className="bg-destructive/10 rounded-2xl p-4 border border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">In Crisis?</h3>
              <p className="text-sm text-muted-foreground">
                {
                  "If you're in immediate danger or having thoughts of self-harm, please contact emergency services or a crisis hotline."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Crisis Resources - Updated for Slovenia */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Crisis Hotlines</h2>
          <div className="space-y-3">
            <ResourceCard
              icon={<Phone className="w-5 h-5" />}
              title="Zaupni telefon Samarijan"
              subtitle="116 123 (Slovenia)"
              action="Call Now"
              urgent
            />
            <ResourceCard
              icon={<Phone className="w-5 h-5" />}
              title="TOM Telefon"
              subtitle="116 111 (Youth)"
              action="Call Now"
              urgent
            />
            <ResourceCard
              icon={<MessageCircle className="w-5 h-5" />}
              title="Emergency Services"
              subtitle="112"
              action="Call Now"
              urgent
            />
          </div>
        </div>

        {/* Safety Features */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Safety Features</h2>
          <div className="space-y-3">
            <FeatureCard
              icon={<Shield className="w-5 h-5" />}
              title="Verified Buddies"
              description="All Buddies pass our safety screening and boundary quiz"
            />
            <FeatureCard
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Escalate Button"
              description="Instantly alert our support team during any session"
            />
            <FeatureCard
              icon={<Heart className="w-5 h-5" />}
              title="Peer Support Only"
              description="Buddies are trained listeners, not therapists"
            />
          </div>
        </div>

        {/* Additional Resources */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Additional Support</h2>
          <div className="bg-card rounded-2xl border border-border p-4 space-y-4">
            <LinkItem title="Find a Therapist" />
            <LinkItem title="Mental Health Resources" />
            <LinkItem title="Community Guidelines" />
            <LinkItem title="Report a Concern" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ResourceCard({
  icon,
  title,
  subtitle,
  action,
  urgent,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  action: string
  urgent?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl ${urgent ? "bg-destructive/5 border border-destructive/20" : "bg-card border border-border"}`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${urgent ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Button size="sm" variant={urgent ? "destructive" : "outline"} className="rounded-xl">
        {action}
      </Button>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
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

function LinkItem({ title }: { title: string }) {
  return (
    <button className="w-full flex items-center justify-between py-2 text-left">
      <span className="text-foreground">{title}</span>
      <ExternalLink className="w-4 h-4 text-muted-foreground" />
    </button>
  )
}
