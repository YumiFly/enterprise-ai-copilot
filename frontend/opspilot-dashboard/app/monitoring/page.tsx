"use client"

import { MonitoringOverview } from "@/components/monitoring/monitoring-overview"
import { SocialMentions } from "@/components/monitoring/social-mentions"
import { AlertsPanel } from "@/components/monitoring/alerts-panel"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { useI18n } from "@/lib/i18n/client"

export default function MonitoringPage() {
  const { t } = useI18n()

  return (
    <div className="p-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("monitoring.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("monitoring.description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>

      <div className="grid gap-6">
        <MonitoringOverview />
        <div className="grid gap-6 md:grid-cols-2">
          <SocialMentions />
          <AlertsPanel />
        </div>
      </div>
    </div>
  )
}
