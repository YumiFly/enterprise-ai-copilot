"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, TrendingDown, MessageSquare } from "lucide-react"
import { useI18n } from "@/lib/i18n/client"
import { alerts } from "@/lib/data/monitoring"

export function AlertsPanel() {
  const { t } = useI18n()

  // Map icon strings to components
  const iconMap = {
    TrendingDown: TrendingDown,
    MessageSquare: MessageSquare,
    AlertTriangle: AlertTriangle,
  }

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t("monitoring.alerts")}</CardTitle>
            <CardDescription>{t("monitoring.alertsDescription")}</CardDescription>
          </div>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[380px]">
          <div className="space-y-4">
            {alerts.map((alert) => {
              const IconComponent = iconMap[alert.icon as keyof typeof iconMap] || AlertTriangle

              return (
                <div key={alert.id} className="flex gap-3 rounded-lg border p-3">
                  <div
                    className={`
                    flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                    ${
                      alert.priority === "high"
                        ? "bg-red-100 text-red-600"
                        : alert.priority === "medium"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-blue-100 text-blue-600"
                    }
                  `}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{t(`monitoring.${alert.title.replace(/\s+/g, "")}`)}</h4>
                      <Badge
                        variant="outline"
                        className={
                          alert.priority === "high"
                            ? "border-red-500 text-red-500"
                            : alert.priority === "medium"
                              ? "border-amber-500 text-amber-500"
                              : "border-blue-500 text-blue-500"
                        }
                      >
                        {t(`monitoring.${alert.priority}Priority`)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t(`monitoring.${alert.title.replace(/\s+/g, "")}Desc`)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.timestamp}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
