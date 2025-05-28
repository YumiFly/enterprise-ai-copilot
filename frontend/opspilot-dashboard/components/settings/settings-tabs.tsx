"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { AgentSettings } from "@/components/settings/agent-settings"
import { UserSettings } from "@/components/settings/user-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { ApiSettings } from "@/components/settings/api-settings"
import { useI18n } from "@/lib/i18n/client"

export function SettingsTabs() {
  const { t } = useI18n()

  return (
    <Tabs defaultValue="agents" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="agents">{t("settings.agents")}</TabsTrigger>
        <TabsTrigger value="user">{t("settings.userProfile")}</TabsTrigger>
        <TabsTrigger value="notifications">{t("settings.notifications")}</TabsTrigger>
        <TabsTrigger value="api">{t("settings.api")}</TabsTrigger>
      </TabsList>
      <TabsContent value="agents">
        <Card className="p-6">
          <AgentSettings />
        </Card>
      </TabsContent>
      <TabsContent value="user">
        <Card className="p-6">
          <UserSettings />
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card className="p-6">
          <NotificationSettings />
        </Card>
      </TabsContent>
      <TabsContent value="api">
        <Card className="p-6">
          <ApiSettings />
        </Card>
      </TabsContent>
    </Tabs>
  )
}
