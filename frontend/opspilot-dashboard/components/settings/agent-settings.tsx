"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useI18n } from "@/lib/i18n/client"

export function AgentSettings() {
  const { t } = useI18n()
  const [customerAgentEnabled, setCustomerAgentEnabled] = useState(true)
  const [monitorAgentEnabled, setMonitorAgentEnabled] = useState(true)
  const [reportAgentEnabled, setReportAgentEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("settings.agentConfiguration")}</h3>
        <p className="text-sm text-muted-foreground">{t("settings.agentConfigDescription")}</p>
      </div>

      <Separator />

      <Tabs defaultValue="customer">
        <TabsList>
          <TabsTrigger value="customer">{t("agents.customerAgent")}</TabsTrigger>
          <TabsTrigger value="monitor">{t("agents.monitorAgent")}</TabsTrigger>
          <TabsTrigger value="report">{t("agents.reportAgent")}</TabsTrigger>
        </TabsList>

        <TabsContent value="customer" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="customer-agent-status">{t("settings.agentStatus")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.enableDisableAgent", { agent: t("agents.customerAgent") })}
              </p>
            </div>
            <Switch
              id="customer-agent-status"
              checked={customerAgentEnabled}
              onCheckedChange={setCustomerAgentEnabled}
            />
          </div>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="customer-agent-model">{t("settings.aiModel")}</Label>
              <Select defaultValue="gpt-4">
                <SelectTrigger id="customer-agent-model">
                  <SelectValue placeholder={t("settings.aiModel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="claude-2">Claude 2</SelectItem>
                  <SelectItem value="custom">Custom Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="customer-agent-prompt">{t("settings.systemPrompt")}</Label>
              <Textarea
                id="customer-agent-prompt"
                placeholder={t("settings.systemPrompt")}
                defaultValue={t("agents.customerAgentPrompt")}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="customer-agent-temperature">{t("settings.temperature")}</Label>
                <span className="text-sm text-muted-foreground">0.7</span>
              </div>
              <Slider id="customer-agent-temperature" defaultValue={[0.7]} max={1} step={0.1} className="w-full" />
              <p className="text-xs text-muted-foreground">{t("settings.temperatureDescription")}</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="customer-agent-data-sources">{t("settings.dataSources")}</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  Customer Feedback
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Support Tickets
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Survey Results
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  {t("settings.addSource")}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitor" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="monitor-agent-status">{t("settings.agentStatus")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.enableDisableAgent", { agent: t("agents.monitorAgent") })}
              </p>
            </div>
            <Switch id="monitor-agent-status" checked={monitorAgentEnabled} onCheckedChange={setMonitorAgentEnabled} />
          </div>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="monitor-agent-model">{t("settings.aiModel")}</Label>
              <Select defaultValue="gpt-4">
                <SelectTrigger id="monitor-agent-model">
                  <SelectValue placeholder={t("settings.aiModel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="claude-2">Claude 2</SelectItem>
                  <SelectItem value="custom">Custom Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="monitor-agent-prompt">{t("settings.systemPrompt")}</Label>
              <Textarea
                id="monitor-agent-prompt"
                placeholder={t("settings.systemPrompt")}
                defaultValue={t("agents.monitorAgentPrompt")}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="monitor-agent-platforms">{t("settings.monitoredPlatforms")}</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Instagram
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  {t("settings.addPlatform")}
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="monitor-agent-frequency">{t("settings.monitoringFrequency")}</Label>
              <Select defaultValue="15min">
                <SelectTrigger id="monitor-agent-frequency">
                  <SelectValue placeholder={t("settings.monitoringFrequency")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5min">Every 5 minutes</SelectItem>
                  <SelectItem value="15min">Every 15 minutes</SelectItem>
                  <SelectItem value="30min">Every 30 minutes</SelectItem>
                  <SelectItem value="1hour">Every hour</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="report" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="report-agent-status">{t("settings.agentStatus")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.enableDisableAgent", { agent: t("agents.reportAgent") })}
              </p>
            </div>
            <Switch id="report-agent-status" checked={reportAgentEnabled} onCheckedChange={setReportAgentEnabled} />
          </div>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="report-agent-model">{t("settings.aiModel")}</Label>
              <Select defaultValue="gpt-4">
                <SelectTrigger id="report-agent-model">
                  <SelectValue placeholder={t("settings.aiModel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="claude-2">Claude 2</SelectItem>
                  <SelectItem value="custom">Custom Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="report-agent-prompt">{t("settings.systemPrompt")}</Label>
              <Textarea
                id="report-agent-prompt"
                placeholder={t("settings.systemPrompt")}
                defaultValue={t("agents.reportAgentPrompt")}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="report-agent-format">{t("settings.defaultReportFormat")}</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="report-agent-format">
                  <SelectValue placeholder={t("settings.defaultReportFormat")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="docx">DOCX</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="csv">CSV (Data Only)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="report-agent-sections">{t("settings.defaultReportSections")}</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  {t("reports.executiveSummary")}
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  {t("reports.keyMetrics")}
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  {t("reports.trendsAnalysis")}
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  {t("reports.recommendations")}
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  {t("settings.addSection")}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex justify-end">
        <Button>{t("settings.saveAgentSettings")}</Button>
      </div>
    </div>
  )
}
