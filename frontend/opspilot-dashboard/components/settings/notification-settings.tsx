"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useI18n } from "@/lib/i18n/client"

export function NotificationSettings() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("settings.notificationSettings")}</h3>
        <p className="text-sm text-muted-foreground">{t("settings.notificationDescription")}</p>
      </div>

      <Separator />

      <Tabs defaultValue="app">
        <TabsList>
          <TabsTrigger value="app">{t("settings.inApp")}</TabsTrigger>
          <TabsTrigger value="email">{t("settings.email")}</TabsTrigger>
          <TabsTrigger value="slack">{t("settings.slack")}</TabsTrigger>
        </TabsList>

        <TabsContent value="app" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="task-completion">{t("settings.taskCompletionNotif")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.taskCompletionDesc")}</p>
              </div>
              <Switch id="task-completion" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="agent-status">{t("settings.agentStatusChanges")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.agentStatusDesc")}</p>
              </div>
              <Switch id="agent-status" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-priority-alerts">{t("settings.highPriorityAlerts")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.highPriorityDesc")}</p>
              </div>
              <Switch id="high-priority-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="report-generation">{t("settings.reportGeneration")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.reportGenerationDesc")}</p>
              </div>
              <Switch id="report-generation" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system-updates">{t("settings.systemUpdates")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.systemUpdatesDesc")}</p>
              </div>
              <Switch id="system-updates" defaultChecked />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-task-completion">{t("settings.emailTaskCompletion")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.emailTaskCompletionDesc")}</p>
              </div>
              <Switch id="email-task-completion" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-high-priority">{t("settings.emailHighPriority")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.emailHighPriorityDesc")}</p>
              </div>
              <Switch id="email-high-priority" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-daily-summary">{t("settings.dailySummary")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.dailySummaryDesc")}</p>
              </div>
              <Switch id="email-daily-summary" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-frequency">{t("settings.emailFrequency")}</Label>
              <Select defaultValue="realtime">
                <SelectTrigger id="email-frequency">
                  <SelectValue placeholder={t("settings.emailFrequency")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">{t("settings.realtime")}</SelectItem>
                  <SelectItem value="hourly">{t("settings.hourlyDigest")}</SelectItem>
                  <SelectItem value="daily">{t("settings.dailyDigest")}</SelectItem>
                  <SelectItem value="weekly">{t("settings.weeklyDigest")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="slack" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="slack-integration">{t("settings.slackIntegration")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.slackIntegrationDesc")}</p>
              </div>
              <Switch id="slack-integration" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slack-channel">{t("settings.slackChannel")}</Label>
              <Select defaultValue="opspilot-alerts">
                <SelectTrigger id="slack-channel">
                  <SelectValue placeholder={t("settings.slackChannel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opspilot-alerts">#opspilot-alerts</SelectItem>
                  <SelectItem value="opspilot-general">#opspilot-general</SelectItem>
                  <SelectItem value="customer-feedback">#customer-feedback</SelectItem>
                  <SelectItem value="monitoring">#monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="slack-high-priority">{t("settings.slackHighPriority")}</Label>
                <p className="text-sm text-muted-foreground">{t("settings.slackHighPriorityDesc")}</p>
              </div>
              <Switch id="slack-high-priority" defaultChecked />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex justify-end">
        <Button>{t("settings.saveNotificationSettings")}</Button>
      </div>
    </div>
  )
}
