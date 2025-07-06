export type PromptLog = {
    id: number
    timestamp: string
    prompt: string
    status: "passed" | "blocked"
    reason?: string
    aiResponse?: string
  }
  
  export type PolicyRule = {
    id: number
    name: string
    type: "keyword" | "regex"
    value: string
    enabled: boolean
  }
  