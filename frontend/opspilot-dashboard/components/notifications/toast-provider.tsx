"use client"

import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

export function ToastProvider() {
  const { toast } = useToast()

  // Listen for custom events to show notifications
  useEffect(() => {
    const handleNotification = (event: CustomEvent) => {
      const { title, description, variant } = event.detail

      toast({
        title,
        description,
        variant: variant || "default",
      })
    }

    // Add event listener for custom notification events
    window.addEventListener("show-notification" as any, handleNotification as EventListener)

    // Clean up
    return () => {
      window.removeEventListener("show-notification" as any, handleNotification as EventListener)
    }
  }, [toast])

  return <Toaster />
}
