"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Eye, EyeOff, Key, RefreshCw } from "lucide-react"
import { useI18n } from "@/lib/i18n/client"

export function ApiSettings() {
  const { t } = useI18n()
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState("sk_opspilot_28f7d92e6a1b4c3d5e6f7g8h9i0j1k2l3m")

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey)
  }

  const regenerateApiKey = () => {
    // In a real app, this would call an API to regenerate the key
    setApiKey("sk_opspilot_" + Math.random().toString(36).substring(2, 30))
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    // In a real app, you would show a toast notification here
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("settings.api")}</h3>
        <p className="text-sm text-muted-foreground">{t("settings.apiKeysDescription")}</p>
      </div>

      <Separator />

      <Tabs defaultValue="api">
        <TabsList>
          <TabsTrigger value="api">{t("settings.apiKeys")}</TabsTrigger>
          <TabsTrigger value="integrations">{t("settings.integrations")}</TabsTrigger>
          <TabsTrigger value="webhooks">{t("settings.webhooks")}</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.apiKeys")}</CardTitle>
              <CardDescription>{t("settings.apiKeysDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">{t("settings.apiKey")}</Label>
                <div className="flex">
                  <div className="relative flex-1">
                    <Input
                      id="api-key"
                      value={showApiKey ? apiKey : "•".repeat(apiKey.length)}
                      readOnly
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-8 top-0"
                      onClick={toggleApiKeyVisibility}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showApiKey ? t("common.hide") : t("common.view")}</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="absolute right-0 top-0" onClick={copyApiKey}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">{t("common.copy")}</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-access">{t("settings.apiAccess")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings.apiAccessDesc")}</p>
                </div>
                <Switch id="api-access" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={regenerateApiKey}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("settings.regenerateKey")}
              </Button>
              <Button>{t("common.saveChanges")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  OpenAI
                </CardTitle>
                <CardDescription>Connect to OpenAI for AI model access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="openai-api-key">{t("settings.apiKey")}</Label>
                  <Input id="openai-api-key" type="password" value="•••••••••••••••••••••••••••••" readOnly />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  <span className="text-sm">{t("common.connected")}</span>
                </div>
                <Button variant="outline" size="sm">
                  {t("common.disconnect")}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Slack
                </CardTitle>
                <CardDescription>Connect to Slack for notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="slack-webhook">{t("settings.webhookUrl")}</Label>
                  <Input id="slack-webhook" type="password" value="•••••••••••••••••••••••••••••" readOnly />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  <span className="text-sm">{t("common.connected")}</span>
                </div>
                <Button variant="outline" size="sm">
                  {t("common.disconnect")}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Twitter API
                </CardTitle>
                <CardDescription>Connect to Twitter for social monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="twitter-api-key">{t("settings.apiKey")}</Label>
                  <Input id="twitter-api-key" placeholder="Enter Twitter API key" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <span className="text-sm">{t("common.notConnected")}</span>
                </div>
                <Button size="sm">{t("common.connect")}</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Google Analytics
                </CardTitle>
                <CardDescription>Connect to Google Analytics for data insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="ga-api-key">{t("settings.apiKey")}</Label>
                  <Input id="ga-api-key" placeholder="Enter Google Analytics API key" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <span className="text-sm">{t("common.notConnected")}</span>
                </div>
                <Button size="sm">{t("common.connect")}</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.webhooks")}</CardTitle>
              <CardDescription>{t("settings.webhooksDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">{t("settings.webhookUrl")}</Label>
                <Input id="webhook-url" placeholder="https://your-server.com/webhook" />
              </div>

              <div className="space-y-2">
                <Label>{t("settings.webhookEvents")}</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="webhook-task-completed" />
                    <Label htmlFor="webhook-task-completed">{t("settings.webhookTaskCompleted")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="webhook-report-generated" />
                    <Label htmlFor="webhook-report-generated">{t("settings.webhookReportGenerated")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="webhook-alert-triggered" />
                    <Label htmlFor="webhook-alert-triggered">{t("settings.webhookAlertTriggered")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="webhook-agent-status" />
                    <Label htmlFor="webhook-agent-status">{t("settings.webhookAgentStatus")}</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>{t("settings.saveWebhook")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
