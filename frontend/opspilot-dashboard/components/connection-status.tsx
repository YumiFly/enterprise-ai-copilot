"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Globe } from "lucide-react"
import { apiClient } from "@/lib/api/client"

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(true)
  const [isChecking, setIsChecking] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    // Check if we're in demo mode (no API URL configured)
    if (!process.env.NEXT_PUBLIC_API_URL) {
      setIsDemoMode(true)
      setIsConnected(true)
      return
    }

    const checkConnection = async () => {
      setIsChecking(true)
      try {
        const healthy = await apiClient.healthCheck()
        setIsConnected(healthy)
      } catch {
        setIsConnected(false)
      } finally {
        setIsChecking(false)
      }
    }

    // Check immediately
    checkConnection()

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000)

    return () => clearInterval(interval)
  }, [])

  if (isChecking) {
    return (
      <Badge variant="outline" className="gap-1">
        <Wifi className="h-3 w-3 animate-pulse" />
        Checking...
      </Badge>
    )
  }

  if (isDemoMode) {
    return (
      <Badge variant="secondary" className="gap-1">
        <Globe className="h-3 w-3" />
        Demo Mode
      </Badge>
    )
  }

  return (
    <Badge variant={isConnected ? "default" : "destructive"} className="gap-1">
      {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
      {isConnected ? "Connected" : "Disconnected"}
    </Badge>
  )
}
