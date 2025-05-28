"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { apiClient } from "@/lib/api/client"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const publicRoutes = ["/login", "/register"]
      const isPublicRoute = publicRoutes.includes(pathname)

      if (isPublicRoute) {
        setIsLoading(false)
        setIsAuthenticated(true)
        return
      }

      const authenticated = apiClient.isAuthenticated()

      if (!authenticated) {
        setIsLoading(false)
        router.push("/login")
        return
      }

      // For demo purposes, skip server health check to avoid network issues
      // In production, you would verify the token with the server
      try {
        // Optional: Only check health if API_URL is available
        if (process.env.NEXT_PUBLIC_API_URL) {
          const isHealthy = await Promise.race([
            apiClient.healthCheck(),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000)),
          ])

          if (!isHealthy) {
            console.warn("API server is not responding, continuing in offline mode")
          }
        }
        setIsAuthenticated(true)
      } catch (error) {
        console.warn("Auth check failed, continuing in demo mode:", error)
        // For demo purposes, allow access even if health check fails
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
