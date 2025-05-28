"use client"

import { useEffect, useState } from "react"
import { Activity, FileText, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useI18n } from "@/lib/i18n/client"

type AgentStatus = "idle" | "processing" | "completed" | "error"

type AgentPanelProps = {
  name: string
  icon: string
  description: string
}

export function AgentPanel({ name, icon, description }: AgentPanelProps) {
  const { t } = useI18n()
  const [status, setStatus] = useState<AgentStatus>("idle")
  const [output, setOutput] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  // Get the appropriate icon component
  const IconComponent = () => {
    switch (icon) {
      case "Users":
        return <Users className="h-5 w-5" />
      case "Activity":
        return <Activity className="h-5 w-5" />
      case "FileText":
        return <FileText className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  // Get status badge color
  const getStatusColor = () => {
    switch (status) {
      case "idle":
        return "bg-slate-500"
      case "processing":
        return "bg-amber-500"
      case "completed":
        return "bg-emerald-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-slate-500"
    }
  }

  // Translate agent name for display
  const getAgentDisplayName = () => {
    if (name === "CustomerAgent") return t("agents.customerAgent")
    if (name === "MonitorAgent") return t("agents.monitorAgent")
    if (name === "ReportAgent") return t("agents.reportAgent")
    return name
  }

  // Translate agent description
  const getAgentDescription = () => {
    if (name === "CustomerAgent") return t("agents.customerAgentDesc")
    if (name === "MonitorAgent") return t("agents.monitorAgentDesc")
    if (name === "ReportAgent") return t("agents.reportAgentDesc")
    return description
  }

  // Simulate agent behavior when a task is submitted
  useEffect(() => {
    const handleTaskSubmitted = (event: Event) => {
      const customEvent = event as CustomEvent
      const task = customEvent.detail?.task

      if (!task) return

      // Different behavior for each agent
      let processingTime = 0
      let agentOutput: string[] = []

      if (name === "CustomerAgent") {
        processingTime = 2000
        agentOutput = [
          "🔍 Analyzing customer feedback data...",
          "📊 Extracting sentiment patterns...",
          "🎯 Identifying key customer concerns...",
          "✅ Analysis complete: Overall sentiment is positive with concerns about new feature usability.",
        ]
      } else if (name === "MonitorAgent") {
        processingTime = 3500
        agentOutput = [
          "🌐 Monitoring social media channels...",
          "🔍 Scanning for brand mentions...",
          "📈 Analyzing trending topics related to product...",
          "✅ Monitoring complete: 237 mentions detected, 85% positive sentiment.",
        ]
      } else if (name === "ReportAgent") {
        processingTime = 5000
        agentOutput = [
          "📋 Gathering data from other agents...",
          "📝 Compiling report structure...",
          "💡 Generating insights and recommendations...",
          "✅ Report complete: Customer satisfaction increased 12% from previous week.",
        ]
      }

      // Simulate processing
      setStatus("processing")
      setOutput([])
      setProgress(0)

      // Add outputs with delays to simulate real-time updates
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < agentOutput.length) {
          setOutput((prev) => [...prev, agentOutput[currentIndex]])
          setProgress(((currentIndex + 1) / agentOutput.length) * 100)
          currentIndex++
        } else {
          clearInterval(interval)
          setStatus("completed")
          setProgress(100)
        }
      }, processingTime / agentOutput.length)
    }

    window.addEventListener("task-submitted", handleTaskSubmitted)

    return () => {
      window.removeEventListener("task-submitted", handleTaskSubmitted)
    }
  }, [name])

  // Get status text based on current status
  const getStatusText = () => {
    switch (status) {
      case "idle":
        return t("dashboard.agentIdle")
      case "processing":
        return t("common.processing")
      case "completed":
        return t("dashboard.agentCompleted")
      case "error":
        return "Error occurred"
    }
  }

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <IconComponent />
          </div>
          <div>
            <CardTitle className="text-xl">{getAgentDisplayName()}</CardTitle>
            <CardDescription>{getAgentDescription()}</CardDescription>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className={getStatusColor()}>
            {status === "idle"
              ? t("common.inactive")
              : status === "processing"
                ? t("common.processing")
                : status === "completed"
                  ? t("common.completed")
                  : "Error"}
          </Badge>
          {status === "processing" && <div className="text-xs text-muted-foreground">{Math.round(progress)}%</div>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-[260px] w-full rounded-md border p-4">
          {output.length > 0 ? (
            <div className="space-y-2">
              {output.map((line, index) => (
                <p key={index} className="text-sm">
                  {line}
                </p>
              ))}
              {status === "processing" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                  Processing...
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{getStatusText()}</p>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-3">
        <p className="text-xs text-muted-foreground">
          {status === "completed"
            ? t("dashboard.agentCompleted")
            : status === "processing"
              ? t("dashboard.agentWorking")
              : status === "error"
                ? "Agent encountered an error"
                : t("dashboard.agentReady")}
        </p>
      </CardFooter>
    </Card>
  )
}
