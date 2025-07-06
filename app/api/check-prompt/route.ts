import type { NextRequest } from "next/server"
import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// Dummy list of blocked keywords for demonstration
const BLOCKED_KEYWORDS = ["confidential", "secret", "password", "social security", "credit card"]

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const lower = prompt.toLowerCase()
    const reasons: string[] = BLOCKED_KEYWORDS.filter((k) => lower.includes(k)).map(
      (k) => `Prompt contains a blocked keyword: "${k}"`,
    )

    // If any keyword matched, block immediately.
    if (reasons.length) {
      return Response.json({ status: "blocked", reasons })
    }

    // ──────────────────────────────────────────────────────────────
    // Fallback for local / demo preview when no OPENAI_API_KEY found
    // ──────────────────────────────────────────────────────────────
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        status: "passed",
        aiResponse: "✅ Demo mode: no API key found, returning mock response.",
      })
    }

    // Call OpenAI via AI SDK
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: "You are a helpful assistant. Provide concise, compliant answers.",
      prompt
    })

    return Response.json({ status: "passed", aiResponse: text })
  } catch (err) {
    console.error("Error in check-prompt API:", err)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function GET() {
  return new Response("This endpoint only supports POST.", { status: 405 })
}