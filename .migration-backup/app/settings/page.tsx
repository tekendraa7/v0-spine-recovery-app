"use client"

import { useState, useEffect } from "react"
import { db, type UserSettings } from "@/lib/db"
import { BottomNav } from "@/components/bottom-nav"
import { t, type Language } from "@/lib/translations"
import { notificationManager } from "@/lib/notifications"
import { ArrowLeft, Globe, Bell, Calendar, Info, Check } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    language: "en",
    reminderEnabled: false,
    weekStarted: 1,
  })
  const [showSaved, setShowSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSettings() {
      try {
        const userSettings = await db.getSettings()
        if (userSettings) {
          setSettings(userSettings)
        }
      } catch (error) {
        console.error("[Settings] Error loading:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleSave = async () => {
    try {
      await db.saveSettings(settings)

      if (settings.reminderEnabled && settings.reminderTime) {
        await notificationManager.scheduleDaily(settings.reminderTime, settings.language)
      } else {
        notificationManager.clearScheduled()
      }

      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 3000)
    } catch (error) {
      console.error("[Settings] Error saving:", error)
    }
  }

  const handleLanguageChange = (lang: Language) => {
    setSettings({ ...settings, language: lang })
  }

  const handleWeekChange = (week: number) => {
    setSettings({ ...settings, weekStarted: week })
  }

  const handleReminderToggle = async () => {
    if (!settings.reminderEnabled) {
      const granted = await notificationManager.requestPermission()
      if (granted) {
        setSettings({ ...settings, reminderEnabled: true })
      }
    } else {
      setSettings({ ...settings, reminderEnabled: false })
    }
  }

  const handleReminderTimeChange = (time: string) => {
    setSettings({ ...settings, reminderTime: time })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  const lang = settings.language

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">{t("appSettings", lang)}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Language Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--color-text)]">{t("language", lang)}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">Choose your preferred language</p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                lang === "en"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-surface-secondary)] text-[var(--color-text)] hover:bg-[var(--color-surface-tertiary)]"
              }`}
            >
              <span className="font-medium">{t("english", lang)}</span>
              {lang === "en" && <Check className="w-5 h-5" />}
            </button>
            <button
              onClick={() => handleLanguageChange("ne")}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                lang === "ne"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-surface-secondary)] text-[var(--color-text)] hover:bg-[var(--color-surface-tertiary)]"
              }`}
            >
              <span className="font-medium">{t("nepali", lang)}</span>
              {lang === "ne" && <Check className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--color-text)]">{t("notifications", lang)}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">{t("dailyReminder", lang)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-[var(--color-text)]">{t("enableNotifications", lang)}</span>
              <div
                onClick={handleReminderToggle}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.reminderEnabled ? "bg-[var(--color-primary)]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.reminderEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </label>

            {settings.reminderEnabled && (
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  {t("reminderTime", lang)}
                </label>
                <input
                  type="time"
                  value={settings.reminderTime || "09:00"}
                  onChange={(e) => handleReminderTimeChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Recovery Phase Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--color-text)]">{t("recoveryPhase", lang)}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">{t("selectWeek", lang)}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { week: 1, label: t("week14Gentle", lang) },
              { week: 5, label: t("week58Strength", lang) },
              { week: 9, label: t("week912Advanced", lang) },
            ].map(({ week, label }) => (
              <button
                key={week}
                onClick={() => handleWeekChange(week)}
                className={`p-3 rounded-xl text-center text-sm transition-colors ${
                  settings.weekStarted === week
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface-secondary)] text-[var(--color-text)] hover:bg-[var(--color-surface-tertiary)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <Info className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--color-text)]">{t("about", lang)}</h2>
            </div>
          </div>
          <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <p>
              <span className="font-medium">{t("version", lang)}:</span> 1.0.0
            </p>
            <p className="leading-relaxed">{t("madeWith", lang)}</p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-xl transition-colors active:scale-95"
        >
          {t("saveSettings", lang)}
        </button>

        {/* Success Message */}
        {showSaved && (
          <div className="fixed top-4 left-4 right-4 z-50 animate-fade-in">
            <div className="max-w-2xl mx-auto bg-[var(--color-success)] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="font-medium">{t("settingsSaved", lang)}</span>
            </div>
          </div>
        )}
      </div>

      <BottomNav language={lang} />
    </div>
  )
}
