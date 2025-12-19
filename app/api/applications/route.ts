import { NextResponse } from "next/server"
import { createBuddyApplication, getPendingApplications, approveApplication, rejectApplication } from "@/lib/db"

export async function GET() {
  try {
    const applications = await getPendingApplications()
    return NextResponse.json({ applications })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId, name, email, bio, quizScore, quizAnswers } = await request.json()

    // Only accept perfect scores (20/20)
    if (quizScore !== 20) {
      return NextResponse.json({ error: "Quiz score must be 20/20" }, { status: 400 })
    }

    const application = await createBuddyApplication(userId, name, email, bio, quizScore, quizAnswers)
    return NextResponse.json({ application, success: true })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, action } = await request.json()

    if (action === "approve") {
      const application = await approveApplication(id)
      return NextResponse.json({ application, success: true })
    }

    if (action === "reject") {
      const application = await rejectApplication(id)
      return NextResponse.json({ application, success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}
