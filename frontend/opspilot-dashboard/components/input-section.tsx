"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useI18n } from "@/lib/i18n/client"
import { apiClient } from "@/lib/api/client"
import { useToast } from "@/components/ui/use-toast"
import { FileUpload } from "@/components/file-upload"

export function InputSection() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsProcessing(true)

    try {
      // First parse the task
      const parseResponse = await apiClient.parseTasks(input)
      console.log("Task parsed:", parseResponse)

      // Then run the agents
      const agentResponse = await apiClient.runAgents(input, uploadedFile || undefined)
      console.log("Agents executed:", agentResponse)

      toast({
        title: "Success",
        description: "Task submitted and agents are processing",
      })

      // Trigger agent status changes
      const event = new CustomEvent("task-submitted", { detail: { task: input } })
      window.dispatchEvent(event)

      setInput("")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process task",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFileUploaded = (data: any) => {
    console.log("File uploaded:", data)
    toast({
      title: "Success",
      description: "Customer data uploaded successfully",
    })
  }

  return (
    <div className="space-y-6">
      <FileUpload onFileUploaded={handleFileUploaded} />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("dashboard.taskInstructions")}</CardTitle>
          <CardDescription>{t("dashboard.taskInstructionsDescription")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Textarea
              placeholder={t("dashboard.taskPlaceholder")}
              className="min-h-[100px] resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">{t("dashboard.agentDecompose")}</p>
            <Button type="submit" disabled={isProcessing || !input.trim()}>
              {isProcessing ? t("common.processing") : t("common.submit")}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
