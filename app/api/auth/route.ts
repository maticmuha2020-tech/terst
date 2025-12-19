import { NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, name, action } = await request.json()

    if (action === "signup") {
      const user = await createUser(email, name)
      return NextResponse.json({ user, success: true })
    }

    if (action === "login") {
      const user = await getUserByEmail(email)
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      return NextResponse.json({ user, success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}
