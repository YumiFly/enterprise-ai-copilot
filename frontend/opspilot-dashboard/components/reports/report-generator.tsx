"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { FileSpreadsheet } from "lucide-react"
import { useI18n } from "@/lib/i18n/client"

export function ReportGenerator() {
  const { t } = useI18n()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("reports.generateNew")}</CardTitle>
        <CardDescription>{t("reports.generateNewDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="report-type">{t("reports.reportType")}</Label>
          <Select defaultValue="customer-feedback">
            <SelectTrigger id="report-type">
              <SelectValue placeholder={t("reports.reportType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer-feedback">{t("reports.customerFeedback")}</SelectItem>
              <SelectItem value="social-media">{t("reports.socialMedia")}</SelectItem>
              <SelectItem value="performance">{t("reports.performance")}</SelectItem>
              <SelectItem value="sentiment">{t("reports.sentiment")}</SelectItem>
              <SelectItem value="competitive">{t("reports.competitive")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time-period">{t("reports.timePeriod")}</Label>
          <RadioGroup defaultValue="weekly" className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">{t("reports.daily")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">{t("reports.weekly")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">{t("reports.monthly")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quarterly" id="quarterly" />
              <Label htmlFor="quarterly">{t("reports.quarterly")}</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>{t("reports.includeSections")}</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="summary" defaultChecked />
              <Label htmlFor="summary">{t("reports.executiveSummary")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="metrics" defaultChecked />
              <Label htmlFor="metrics">{t("reports.keyMetrics")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="trends" defaultChecked />
              <Label htmlFor="trends">{t("reports.trendsAnalysis")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="recommendations" defaultChecked />
              <Label htmlFor="recommendations">{t("reports.recommendations")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="raw-data" />
              <Label htmlFor="raw-data">{t("reports.rawData")}</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleGenerate} disabled={isGenerating}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          {isGenerating ? t("common.generating") : t("reports.generateReport")}
        </Button>
      </CardFooter>
    </Card>
  )
}
