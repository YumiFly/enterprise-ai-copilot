"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Zap, Clock, Cpu } from "lucide-react"
import { useI18n } from "@/lib/i18n/client"
import { performanceMetrics } from "@/lib/data/analytics"

export function PerformanceMetrics() {
  const { t } = useI18n()

  // Map icon strings to components
  const iconMap = {
    Activity: Activity,
    Zap: Zap,
    Clock: Clock,
    Cpu: Cpu,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {performanceMetrics.map((metric, index) => {
        const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || Activity

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t(`analytics.${metric.name.replace(/\s+/g, "").toLowerCase()}`)}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change} from last month</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
