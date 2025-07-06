"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockLogs } from "@/lib/mock-data"
import type { PromptLog } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function ReviewLogsPage() {
  const [logs, setLogs] = useState<PromptLog[]>(mockLogs)
  const [filterKeyword, setFilterKeyword] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredLogs = logs
    .filter((log) => log.prompt.toLowerCase().includes(filterKeyword.toLowerCase()))
    .filter((log) => (filterStatus === "all" ? true : log.status === filterStatus))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Prompt Logs</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Filter by keyword..."
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="passed">Passed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Prompt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="max-w-xs truncate">{log.prompt}</TableCell>
                  <TableCell>
                    <Badge
                      variant={log.status === "passed" ? "default" : "destructive"}
                      className={cn(log.status === "passed" && "bg-green-600 hover:bg-green-700")}
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.reason || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Full
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Log Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="font-mono text-sm text-gray-500">{new Date(log.timestamp).toISOString()}</div>
                          <div>
                            <h3 className="font-semibold mb-2">Prompt</h3>
                            <p className="p-3 bg-gray-100 rounded-md">{log.prompt}</p>
                          </div>
                          {log.aiResponse && (
                            <div>
                              <h3 className="font-semibold mb-2">AI Response</h3>
                              <pre className="p-3 bg-gray-900 text-white rounded-md whitespace-pre-wrap">
                                {log.aiResponse}
                              </pre>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
