import { db } from "./db"
import type { Language } from "./translations"

export class NotificationManager {
  private static instance: NotificationManager
  private notificationPermission: NotificationPermission = "default"

  private constructor() {
    if (typeof window !== "undefined" && "Notification" in window) {
      this.notificationPermission = Notification.permission
    }
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager()
    }
    return NotificationManager.instance
  }

  async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.log("[Notifications] Not supported in this browser")
      return false
    }

    if (this.notificationPermission === "granted") {
      return true
    }

    try {
      const permission = await Notification.requestPermission()
      this.notificationPermission = permission
      return permission === "granted"
    } catch (error) {
      console.error("[Notifications] Error requesting permission:", error)
      return false
    }
  }

  async scheduleDaily(time: string, language: Language = "en"): Promise<void> {
    const hasPermission = await this.requestPermission()
    if (!hasPermission) {
      console.log("[Notifications] Permission not granted")
      return
    }

    // Clear existing scheduled notifications
    this.clearScheduled()

    // Calculate next notification time
    const [hours, minutes] = time.split(":").map(Number)
    const now = new Date()
    const scheduledTime = new Date()
    scheduledTime.setHours(hours, minutes, 0, 0)

    // If time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1)
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime()

    // Store timeout ID
    const timeoutId = window.setTimeout(() => {
      this.showNotification(language)
      // Reschedule for next day
      this.scheduleDaily(time, language)
    }, timeUntilNotification)

    // Store in localStorage for persistence
    localStorage.setItem("notification-timeout-id", String(timeoutId))
    localStorage.setItem("notification-time", time)
    localStorage.setItem("notification-language", language)

    console.log(`[Notifications] Scheduled for ${scheduledTime.toLocaleString()}`)
  }

  clearScheduled(): void {
    const timeoutId = localStorage.getItem("notification-timeout-id")
    if (timeoutId) {
      window.clearTimeout(Number(timeoutId))
      localStorage.removeItem("notification-timeout-id")
    }
  }

  async showNotification(language: Language = "en"): Promise<void> {
    if (this.notificationPermission !== "granted") {
      return
    }

    const title = language === "en" ? "Time for Your Exercises!" : "तपाईंको व्यायामको समय!"
    const body =
      language === "en"
        ? "Don't forget your daily spine recovery exercises. Your health is worth it!"
        : "आफ्नो दैनिक मेरुदण्ड रिकभरी व्यायाम नबिर्सनुहोस्। तपाईंको स्वास्थ्य यसको लायक छ!"

    try {
      // Check if service worker is available
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        // Use service worker notification
        const registration = await navigator.serviceWorker.ready
        await registration.showNotification(title, {
          body,
          icon: "/icon-192.png",
          badge: "/icon-192.png",
          tag: "daily-exercise-reminder",
          requireInteraction: false,
          vibrate: [200, 100, 200],
          data: {
            url: "/",
          },
        })
      } else {
        // Fallback to regular notification
        const notification = new Notification(title, {
          body,
          icon: "/icon-192.png",
          badge: "/icon-192.png",
          tag: "daily-exercise-reminder",
          requireInteraction: false,
        })

        notification.onclick = () => {
          window.focus()
          notification.close()
        }
      }

      console.log("[Notifications] Notification shown")
    } catch (error) {
      console.error("[Notifications] Error showing notification:", error)
    }
  }

  async initializeFromSettings(): Promise<void> {
    try {
      const settings = await db.getSettings()
      if (settings && settings.reminderEnabled && settings.reminderTime) {
        await this.scheduleDaily(settings.reminderTime, settings.language)
      }
    } catch (error) {
      console.error("[Notifications] Error initializing from settings:", error)
    }
  }

  getPermissionStatus(): NotificationPermission {
    return this.notificationPermission
  }
}

// Export singleton instance
export const notificationManager = NotificationManager.getInstance()
