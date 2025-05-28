"use client"

import { TaskHistoryList } from "@/components/task-history/task-history-list"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { useI18n } from "@/lib/i18n/client"

export default function TaskHistoryPage() {
  const { t } = useI18n()

  return (
    <div className="p-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("taskHistory.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("taskHistory.description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>

      <div className="grid gap-6">
        <TaskHistoryList />
      </div>
    </div>
  )
}
