import { NextResponse } from "next/server"
import { getAllBuddies, getBuddyById } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const buddy = await getBuddyById(id)
      return NextResponse.json({ buddy })
    }

    const buddies = await getAllBuddies()
    return NextResponse.json({ buddies })
  } catch (error) {
    console.error("Error fetching buddies:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}
