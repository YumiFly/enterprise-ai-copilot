"use client"

import { AgentPanel } from "@/components/agent-panel"
import { InputSection } from "@/components/input-section"
import { Timeline } from "@/components/timeline"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/lib/i18n/client"
// Import agents directly from the specific file instead of the index
import { agents } from "@/lib/data/agents"

export default function Dashboard() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <main className="flex-1 p-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.title")}</h1>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </div>

          <InputSection />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {Object.values(agents).map((agent) => (
              <AgentPanel key={agent.name} name={agent.name} icon={agent.icon} description={agent.description} />
            ))}
          </div>

          <div className="mt-6">
            <Timeline />
          </div>
        </main>
      </div>
    </div>
  )
}
