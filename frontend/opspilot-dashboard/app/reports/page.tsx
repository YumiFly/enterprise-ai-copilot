"use client"

import { ReportsList } from "@/components/reports/reports-list"
import { ReportGenerator } from "@/components/reports/report-generator"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { useI18n } from "@/lib/i18n/client"

export default function ReportsPage() {
  const { t } = useI18n()

  return (
    <div className="p-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("reports.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("reports.description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ReportsList />
        </div>
        <div>
          <ReportGenerator />
        </div>
      </div>
    </div>
  )
}
