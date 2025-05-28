"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useI18n } from "@/lib/i18n/client"

type TimelineEvent = {
  id: number
  time: string
  description: string
  agent?: string
}

export function Timeline() {
  const { t } = useI18n()
  const [events, setEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    // Add initial event
    setEvents([
      {
        id: 1,
        time: formatTime(new Date()),
        description: t("dashboard.systemInitialized"),
      },
    ])

    // Listen for task submissions
    const handleTaskSubmitted = (event: Event) => {
      const customEvent = event as CustomEvent
      const task = customEvent.detail?.task

      if (!task) return

      // Add task submission event
      addEvent({
        description: t("dashboard.taskSubmitted", { task }),
      })

      // Simulate task decomposition
      setTimeout(() => {
        addEvent({
          description: t("dashboard.taskAnalyzed"),
        })

        // Simulate agent assignments
        setTimeout(() => {
          addEvent({
            description: t("dashboard.assignedCustomer"),
            agent: t("agents.customerAgent"),
          })

          setTimeout(() => {
            addEvent({
              description: t("dashboard.assignedMonitor"),
              agent: t("agents.monitorAgent"),
            })

            setTimeout(() => {
              addEvent({
                description: t("dashboard.assignedReport"),
                agent: t("agents.reportAgent"),
              })
            }, 500)
          }, 500)
        }, 1000)
      }, 1500)
    }

    window.addEventListener("task-submitted", handleTaskSubmitted)

    return () => {
      window.removeEventListener("task-submitted", handleTaskSubmitted)
    }
  }, [t])

  const addEvent = (event: Omit<TimelineEvent, "id" | "time">) => {
    setEvents((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        time: formatTime(new Date()),
        ...event,
      },
    ])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.taskTimeline")}</CardTitle>
        <CardDescription>{t("dashboard.timelineDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md">
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-start">
                <div className="mr-4 flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  {event.id !== events.length && <div className="h-full w-px bg-border"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{event.time}</p>
                    {event.agent && (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {event.agent}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
