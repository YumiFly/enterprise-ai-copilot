"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Search, Calendar, Filter } from "lucide-react"
import { useI18n } from "@/lib/i18n/client"
import { tasks } from "@/lib/data/tasks"

export function TaskHistoryList() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>("all")

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.instruction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" ? true : task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("taskHistory.title")}</CardTitle>
        <CardDescription>{t("taskHistory.description")}</CardDescription>
        <div className="flex flex-col gap-4 mt-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("taskHistory.searchTasks")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>
                    {statusFilter === "all"
                      ? t("taskHistory.allStatuses")
                      : `${t("common.status")}: ${t(`common.${statusFilter}`)}`}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("taskHistory.allStatuses")}</SelectItem>
                <SelectItem value="completed">{t("common.completed")}</SelectItem>
                <SelectItem value="failed">{t("common.failed")}</SelectItem>
                <SelectItem value="in_progress">{t("common.processing")}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              {t("common.dateRange")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("common.id")}</TableHead>
              <TableHead className="w-[300px]">{t("taskHistory.instruction")}</TableHead>
              <TableHead>{t("common.date")}</TableHead>
              <TableHead>{t("common.status")}</TableHead>
              <TableHead>{t("taskHistory.agents")}</TableHead>
              <TableHead>{t("taskHistory.duration")}</TableHead>
              <TableHead className="text-right">{t("common.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell className="max-w-[300px] truncate">{task.instruction}</TableCell>
                <TableCell>{task.date}</TableCell>
                <TableCell>
                  <Badge variant={task.status === "completed" ? "default" : "destructive"}>
                    {t(`common.${task.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {task.agents.map((agent) => (
                      <Badge key={agent} variant="outline" className="text-xs">
                        {agent}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{task.duration}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    {t("taskHistory.viewDetails")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
