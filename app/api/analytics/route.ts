import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Here you would implement your own analytics tracking
    // This is a fallback for when Mixpanel is blocked
    console.log("Analytics event:", data)

    // You could send this to your own endpoint, database, etc.

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process analytics" }, { status: 500 })
  }
}
