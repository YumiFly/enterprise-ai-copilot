"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Download, MoreHorizontal, Eye } from "lucide-react"
import { useI18n } from "@/lib/i18n/client"
import { useToast } from "@/components/ui/use-toast"
import { apiClient } from "@/lib/api/client"
import { reports, reportTypes } from "@/lib/data/reports"

export function ReportsList() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredReports = selectedType ? reports.filter((report) => report.type === selectedType) : reports

  const handleDownload = async (reportId: string) => {
    try {
      const response = await apiClient.downloadReport(`${reportId}.docx`)

      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `report-${reportId}.docx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Success",
        description: "Report downloaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download report",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("reports.generatedReports")}</CardTitle>
        <CardDescription>{t("reports.generatedReportsDescription")}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant={selectedType === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(null)}
          >
            {t("common.all")}
          </Button>
          {reportTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("common.id")}</TableHead>
              <TableHead>{t("common.title")}</TableHead>
              <TableHead>{t("common.type")}</TableHead>
              <TableHead>{t("common.date")}</TableHead>
              <TableHead>{t("common.status")}</TableHead>
              <TableHead className="w-[100px]">{t("common.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {report.title}
                </TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                    {t(`common.${report.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" disabled={report.status !== "completed"}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">{t("common.view")}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={report.status !== "completed"}
                      onClick={() => handleDownload(report.id)}
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">{t("common.download")}</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">{t("common.actions")}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>{t("reports.shareReport")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("reports.scheduleRecurring")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("reports.deleteReport")}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
