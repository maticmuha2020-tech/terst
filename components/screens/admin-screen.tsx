"use client"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, X, Play, FileText, User } from "lucide-react"
import { format } from "date-fns"

export function AdminScreen() {
  const { setScreen, pendingApplications, approveApplication, rejectApplication } = useApp()

  const pending = pendingApplications.filter((a) => a.status === "pending")
  const processed = pendingApplications.filter((a) => a.status !== "pending")

  return (
    <div className="flex flex-col min-h-screen safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setScreen("profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Buddy Applications</h1>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {/* Pending Applications */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Pending Review ({pending.length})</h2>
          {pending.length > 0 ? (
            <div className="space-y-4">
              {pending.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onApprove={() => approveApplication(app.id)}
                  onReject={() => rejectApplication(app.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-card rounded-2xl border border-border">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No pending applications</p>
            </div>
          )}
        </div>

        {/* Processed Applications */}
        {processed.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Processed</h2>
            <div className="space-y-4">
              {processed.map((app) => (
                <ApplicationCard key={app.id} application={app} processed />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ApplicationCard({
  application,
  onApprove,
  onReject,
  processed,
}: {
  application: any
  onApprove?: () => void
  onReject?: () => void
  processed?: boolean
}) {
  return (
    <div className="p-4 rounded-2xl bg-card border border-border">
      <div className="flex gap-4 mb-4">
        <img
          src={application.avatar || "/placeholder.svg"}
          alt={application.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{application.name}</h3>
          <p className="text-sm text-muted-foreground">{application.email}</p>
          {application.submittedAt && (
            <p className="text-xs text-muted-foreground mt-1">
              Applied {format(new Date(application.submittedAt), "MMM d, yyyy")}
            </p>
          )}
        </div>
        {processed && (
          <span
            className={`text-xs px-2 py-1 rounded-full h-fit ${
              application.status === "approved" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
            }`}
          >
            {application.status}
          </span>
        )}
      </div>

      <p className="text-sm text-foreground mb-4">{application.bio}</p>

      {/* Media Preview */}
      <div className="flex gap-2 mb-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary text-sm text-foreground">
          <Play className="w-4 h-4" />
          Video Intro
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary text-sm text-foreground">
          <Play className="w-4 h-4" />
          Audio Intro
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary text-sm text-foreground">
          <FileText className="w-4 h-4" />
          Quiz Results
        </button>
      </div>

      {/* Quiz Summary */}
      <div className="p-3 rounded-xl bg-secondary mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-1">Boundary Quiz</p>
        <p className="text-sm text-foreground">
          {
            application.quizAnswers.filter(
              (a: any) =>
                a.answer === "B" ||
                (a.questionId === 2 && a.answer === "A") ||
                (a.questionId === 5 && a.answer === "A"),
            ).length
          }
          /5 correct answers
        </p>
      </div>

      {/* Actions */}
      {!processed && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 rounded-xl text-destructive border-destructive/20 hover:bg-destructive/10 bg-transparent"
            onClick={onReject}
          >
            <X className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button className="flex-1 rounded-xl" onClick={onApprove}>
            <Check className="w-4 h-4 mr-2" />
            Approve
          </Button>
        </div>
      )}
    </div>
  )
}
