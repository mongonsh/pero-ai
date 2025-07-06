"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2, PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockRules } from "@/lib/mock-data"
import type { PolicyRule } from "@/lib/types"

export default function PolicyConfigPage() {
  const [rules, setRules] = useState<PolicyRule[]>(mockRules)
  const [newRuleName, setNewRuleName] = useState("")
  const [newRuleValue, setNewRuleValue] = useState("")

  const handleToggleRule = (id: number) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleDeleteRule = (id: number) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  const handleAddRule = () => {
    if (!newRuleName.trim() || !newRuleValue.trim()) return
    const newRule: PolicyRule = {
      id: Date.now(),
      name: newRuleName,
      type: "keyword",
      value: newRuleValue,
      enabled: true,
    }
    setRules([...rules, newRule])
    setNewRuleName("")
    setNewRuleValue("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Prompt Policy Rules</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Rule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Policy Rule</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rule-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="rule-name"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., Block PII"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rule-value" className="text-right">
                  Keyword
                </Label>
                <Input
                  id="rule-value"
                  value={newRuleValue}
                  onChange={(e) => setNewRuleValue(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., ssn"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" onClick={handleAddRule}>
                  Add Rule
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule) => (
          <Card key={rule.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{rule.name}</span>
                <Switch checked={rule.enabled} onCheckedChange={() => handleToggleRule(rule.id)} />
              </CardTitle>
              <CardDescription>Type: {rule.type}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <code className="bg-muted px-2 py-1 rounded-md text-sm">{rule.value}</code>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleDeleteRule(rule.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button size="lg">Save Policies</Button>
      </div>
    </div>
  )
}
