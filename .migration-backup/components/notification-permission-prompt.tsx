"use client"

import { useState, useEffect } from "react"
import { notificationManager } from "@/lib/notifications"
import { Button } from "@/components/ui/button"
import { Bell, X } from "lucide-react"

interface NotificationPermissionPromptProps {
  language: "en" | "ne"
}

export function NotificationPermissionPrompt({ language }: NotificationPermissionPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    const checkPermission = () => {
      const currentPermission = notificationManager.getPermissionStatus()
      setPermission(currentPermission)

      // Show prompt if permission is default and user hasn't dismissed it
      const dismissed = localStorage.getItem("notification-prompt-dismissed")
      if (currentPermission === "default" && !dismissed) {
        // Show after 10 seconds
        setTimeout(() => {
          setShowPrompt(true)
        }, 10000)
      }
    }

    checkPermission()
  }, [])

  const handleEnable = async () => {
    const granted = await notificationManager.requestPermission()
    if (granted) {
      setPermission("granted")
      setShowPrompt(false)
      // Initialize notifications from settings
      await notificationManager.initializeFromSettings()
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("notification-prompt-dismissed", "true")
  }

  if (!showPrompt || permission !== "default") return null

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border)] p-4 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--color-text)] mb-1">
              {language === "en" ? "Enable Reminders?" : "रिमाइन्डर सक्षम गर्नुहोस्?"}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              {language === "en"
                ? "Get daily reminders to complete your exercises and stay on track with your recovery."
                : "आफ्नो व्यायाम पूरा गर्न र आफ्नो रिकभरीमा ट्र्याकमा रहन दैनिक रिमाइन्डर प्राप्त गर्नुहोस्।"}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleEnable}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
              >
                {language === "en" ? "Enable" : "सक्षम गर्नुहोस्"}
              </Button>
              <Button onClick={handleDismiss} variant="outline" className="border-[var(--color-border)] bg-transparent">
                {language === "en" ? "Not now" : "अहिले होइन"}
              </Button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
