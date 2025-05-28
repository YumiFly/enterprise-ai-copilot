"use client"

import { usePathname } from "next/navigation"
import { Activity, BarChart, FileText, Home, Settings, Users, History, Bell, MessageSquare, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useI18n } from "@/lib/i18n/client"
import { apiClient } from "@/lib/api/client"
import { ConnectionStatus } from "@/components/connection-status"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { t } = useI18n()

  // Don't show sidebar on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  const handleLogout = () => {
    apiClient.logout()
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-semibold">OpsPilot</span>
        </div>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <a href="/">
                <Home className="h-4 w-4" />
                <span>{t("common.dashboard")}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/chat"}>
              <a href="/chat">
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/customers"}>
              <a href="/customers">
                <Users className="h-4 w-4" />
                <span>{t("common.customers")}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/monitoring"}>
              <a href="/monitoring">
                <Bell className="h-4 w-4" />
                <span>{t("common.monitoring")}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/reports"}>
              <a href="/reports">
                <FileText className="h-4 w-4" />
                <span>{t("common.reports")}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/analytics"}>
              <a href="/analytics">
                <BarChart className="h-4 w-4" />
                <span>{t("common.analytics")}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/task-history"}>
              <a href="/task-history">
                <History className="h-4 w-4" />
                <span>{t("common.taskHistory")}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="space-y-2">
          <ConnectionStatus />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                <a href="/settings">
                  <Settings className="h-4 w-4" />
                  <span>{t("common.settings")}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Button variant="ghost" onClick={handleLogout} className="w-full justify-start h-8 px-2">
                <LogOut className="h-4 w-4 mr-2" />
                <span>{t("common.signOut")}</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
