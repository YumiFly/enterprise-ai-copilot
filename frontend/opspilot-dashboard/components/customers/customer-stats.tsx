"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, MessageSquare, AlertCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n/client"
// Import customerStats directly from the specific file
import { customerStats } from "@/lib/data/customers"

export function CustomerStats() {
  const { t } = useI18n()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("customers.totalCustomers")}</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customerStats.totalCustomers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{customerStats.totalGrowth} from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("customers.satisfactionRate")}</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customerStats.satisfactionRate}%</div>
          <p className="text-xs text-muted-foreground">{customerStats.satisfactionGrowth} from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("customers.feedbackReceived")}</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customerStats.feedbackReceived.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{customerStats.feedbackGrowth} from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("customers.openIssues")}</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customerStats.openIssues}</div>
          <p className="text-xs text-muted-foreground">{customerStats.openIssuesGrowth} from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
