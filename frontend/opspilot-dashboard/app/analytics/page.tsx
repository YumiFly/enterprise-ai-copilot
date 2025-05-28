"use client"

import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { PerformanceMetrics } from "@/components/analytics/performance-metrics"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { useI18n } from "@/lib/i18n/client"

export default function AnalyticsPage() {
  const { t } = useI18n()

  return (
    <div className="p-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("analytics.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("analytics.description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>

      <div className="grid gap-6">
        <PerformanceMetrics />
        <AnalyticsDashboard />
      </div>
    </div>
  )
}
