import { PromptForm } from "@/components/prompt-form"

export default function PromptCheckPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Prompt Check</h1>
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <PromptForm />
        </div>
      </div>
    </div>
  )
}
