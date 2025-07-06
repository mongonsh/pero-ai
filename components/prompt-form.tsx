"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2, ShieldAlert, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckResult = {
  status: "passed" | "blocked"
  reasons?: string[]
  aiResponse?: string
}

export function PromptForm() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState<CheckResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/check-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to check prompt")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
      setResult({
        status: "blocked",
        reasons: ["An unexpected error occurred. Please try again."],
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] text-base rounded-xl focus-visible:ring-blue-500/50 p-4"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="w-full text-lg py-6 rounded-xl bg-blue-600 hover:bg-blue-700"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Prompt"
          )}
        </Button>
      </form>

      {result && (
        <Card
          className={cn(
            "rounded-2xl transition-all",
            result.status === "passed" ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50",
          )}
        >
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              {result.status === "passed" ? (
                <ShieldCheck className="h-7 w-7 text-green-600" />
              ) : (
                <ShieldAlert className="h-7 w-7 text-red-600" />
              )}
              <span className={cn(result.status === "passed" ? "text-green-800" : "text-red-800")}>
                Status: {result.status === "passed" ? "Passed" : "Blocked"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.status === "blocked" && result.reasons && (
              <div className="space-y-2">
                <p className="font-semibold text-red-900">Reasons for blocking:</p>
                <ul className="list-disc list-inside space-y-1 text-red-800">
                  {result.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.status === "passed" && result.aiResponse && (
              <div className="space-y-2">
                <p className="font-semibold text-green-900">AI Response:</p>
                <div className="p-4 bg-gray-900 rounded-lg text-white font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{result.aiResponse}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
