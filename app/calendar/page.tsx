"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/db"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [progressData, setProgressData] = useState<Map<string, number>>(new Map())
  const [language, setLanguage] = useState<"en" | "ne">("en")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const settings = await db.getSettings()
        if (settings) {
          setLanguage(settings.language)
        }

        const allProgress = await db.getAllProgress()
        const progressMap = new Map<string, number>()

        allProgress.forEach((entry) => {
          if (entry.completed) {
            const count = progressMap.get(entry.date) || 0
            progressMap.set(entry.date, count + 1)
          }
        })

        setProgressData(progressMap)
      } catch (error) {
        console.error("[Calendar] Error loading:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            {language === "en" ? "Exercise Calendar" : "व्यायाम क्यालेन्डर"}
          </h1>

          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={previousMonth}
              className="w-10 h-10 rounded-full bg-[var(--color-surface-secondary)] hover:bg-[var(--color-surface-tertiary)] flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--color-text)]" />
            </button>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="w-10 h-10 rounded-full bg-[var(--color-surface-secondary)] hover:bg-[var(--color-surface-tertiary)] flex items-center justify-center transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-[var(--color-text)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-4">
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-[var(--color-text-secondary)] py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              const exercisesCompleted = progressData.get(dateStr) || 0
              const hasProgress = exercisesCompleted > 0
              const isToday = new Date().toISOString().split("T")[0] === dateStr

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-colors ${
                    isToday
                      ? "bg-[var(--color-primary)] text-white font-bold"
                      : hasProgress
                        ? "bg-[var(--color-success)]/10 text-[var(--color-success)] font-medium"
                        : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  <span>{day}</span>
                  {hasProgress && !isToday && <CheckCircle2 className="w-3 h-3 mt-0.5" />}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[var(--color-primary)]"></div>
              <span className="text-xs text-[var(--color-text-secondary)]">{language === "en" ? "Today" : "आज"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[var(--color-success)]/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
              </div>
              <span className="text-xs text-[var(--color-text-secondary)]">
                {language === "en" ? "Completed" : "पूरा भयो"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav language={language} />
    </div>
  )
}
