import type { PromptLog, PolicyRule } from "@/lib/types"

export const mockLogs: PromptLog[] = [
  {
    id: 1,
    timestamp: "2025-07-05T10:30:00Z",
    prompt: "What is the capital of France?",
    status: "passed",
    aiResponse: "The capital of France is Paris.",
  },
  {
    id: 2,
    timestamp: "2025-07-05T10:32:15Z",
    prompt: "My password is '123456'. Is it secure?",
    status: "blocked",
    reason: "Contains blocked keyword: 'password'",
  },
  {
    id: 3,
    timestamp: "2025-07-05T10:35:40Z",
    prompt: "Write a summary of the book 'To Kill a Mockingbird'.",
    status: "passed",
    aiResponse:
      "'To Kill a Mockingbird' is a novel by Harper Lee set in the American South during the 1930s. It explores themes of racial injustice and moral growth through the eyes of a young girl named Scout Finch.",
  },
  {
    id: 4,
    timestamp: "2025-07-05T10:38:05Z",
    prompt: "Can you access our confidential client list?",
    status: "blocked",
    reason: "Contains blocked keyword: 'confidential'",
  },
]

export const mockRules: PolicyRule[] = [
  {
    id: 1,
    name: "Block Confidential Info",
    type: "keyword",
    value: "confidential",
    enabled: true,
  },
  {
    id: 2,
    name: "Block Passwords",
    type: "keyword",
    value: "password",
    enabled: true,
  },
  {
    id: 3,
    name: "Block Social Security Numbers",
    type: "regex",
    value: "\\d{3}-\\d{2}-\\d{4}",
    enabled: true,
  },
  {
    id: 4,
    name: "Flag Hate Speech (Disabled)",
    type: "keyword",
    value: "hate_speech_list_id",
    enabled: false,
  },
]
