"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { useI18n } from "@/lib/i18n/client"
import { taskDistributionData, taskCompletionData, responseTimeData } from "@/lib/data/analytics"

export function AnalyticsDashboard() {
  const { t } = useI18n()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("analytics.performanceAnalytics")}</CardTitle>
        <CardDescription>{t("analytics.performanceDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribution">
          <TabsList className="mb-4">
            <TabsTrigger value="distribution">{t("analytics.taskDistribution")}</TabsTrigger>
            <TabsTrigger value="completion">{t("analytics.taskCompletion")}</TabsTrigger>
            <TabsTrigger value="response">{t("analytics.responseTime")}</TabsTrigger>
          </TabsList>
          <TabsContent value="distribution" className="h-[350px]">
            <div className="flex items-center justify-center h-full">
              <div className="w-[500px] h-[350px]">
                <PieChart
                  data={taskDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="completion" className="h-[350px]">
            <BarChart
              data={taskCompletionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Tasks Completed",
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
          <TabsContent value="response" className="h-[350px]">
            <LineChart
              data={responseTimeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Response Time (seconds)",
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
