import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ToastProvider } from "@/components/notifications/toast-provider"
import { I18nProvider } from "@/lib/i18n/client"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { defaultLocale } from "@/lib/i18n/config"
import { AuthGuard } from "@/components/auth/auth-guard"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "OpsPilot Dashboard",
  description: "AI-powered multi-agent enterprise assistant system",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get the dictionary for the default locale
  const dictionary = await getDictionary(defaultLocale)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <I18nProvider initialDictionary={dictionary}>
              <AuthGuard>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <DashboardSidebar />
                    <div className="flex-1">{children}</div>
                  </div>
                  <ToastProvider />
                </SidebarProvider>
              </AuthGuard>
            </I18nProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
