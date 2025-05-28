"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@/components/ui/chart"
import { useI18n } from "@/lib/i18n/client"
import { mentionsChartData, engagementChartData } from "@/lib/data/monitoring"

export function MonitoringOverview() {
  const { t } = useI18n()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("monitoring.overview")}</CardTitle>
        <CardDescription>{t("monitoring.overviewDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mentions">
          <TabsList className="mb-4">
            <TabsTrigger value="mentions">{t("monitoring.socialMentions")}</TabsTrigger>
            <TabsTrigger value="engagement">{t("monitoring.engagement")}</TabsTrigger>
          </TabsList>
          <TabsContent value="mentions" className="h-[350px]">
            <LineChart
              data={mentionsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Number of Mentions",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                },
              }}
            />
          </TabsContent>
          <TabsContent value="engagement" className="h-[350px]">
            <LineChart
              data={engagementChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Engagement Rate (%)",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                },
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
