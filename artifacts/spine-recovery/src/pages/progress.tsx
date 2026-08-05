import { useState, useEffect } from "react"
import { db } from "@/lib/db"
import { BottomNav } from "@/components/bottom-nav"
import { TrendingUp, Calendar, Award, Target } from "lucide-react"

export default function ProgressPage() {
  const [stats, setStats] = useState({
    totalDays: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalExercises: 0,
  })
  const [language, setLanguage] = useState<"en" | "ne">("en")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProgress() {
      try {
        const settings = await db.getSettings()
        if (settings) {
          setLanguage(settings.language)
        }

        const allProgress = await db.getAllProgress()
        const completedProgress = allProgress.filter((p) => p.completed)

        const uniqueDates = new Set(completedProgress.map((p) => p.date))
        const totalDays = uniqueDates.size
        const totalExercises = completedProgress.length

        const sortedDates = Array.from(uniqueDates).sort()
        let currentStreak = 0
        let longestStreak = 0
        let tempStreak = 0

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        for (let i = sortedDates.length - 1; i >= 0; i--) {
          const date = new Date(sortedDates[i])
          date.setHours(0, 0, 0, 0)

          if (i === sortedDates.length - 1) {
            const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
            if (daysDiff <= 1) {
              currentStreak = 1
              tempStreak = 1
            }
          } else {
            const prevDate = new Date(sortedDates[i + 1])
            prevDate.setHours(0, 0, 0, 0)
            const daysDiff = Math.floor((prevDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

            if (daysDiff === 1) {
              tempStreak++
              if (i === sortedDates.length - 2 || currentStreak > 0) {
                currentStreak = tempStreak
              }
            } else {
              longestStreak = Math.max(longestStreak, tempStreak)
              tempStreak = 1
            }
          }
        }

        longestStreak = Math.max(longestStreak, tempStreak, currentStreak)

        setStats({ totalDays, currentStreak, longestStreak, totalExercises })
      } catch (error) {
        console.error("[Progress] Error loading:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      icon: Calendar,
      label: language === "en" ? "Active Days" : "सक्रिय दिनहरू",
      value: stats.totalDays,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      label: language === "en" ? "Current Streak" : "हालको स्ट्रीक",
      value: stats.currentStreak,
      suffix: language === "en" ? "days" : "दिन",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: Award,
      label: language === "en" ? "Longest Streak" : "सबैभन्दा लामो स्ट्रीक",
      value: stats.longestStreak,
      suffix: language === "en" ? "days" : "दिन",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      icon: Target,
      label: language === "en" ? "Total Exercises" : "कुल व्यायाम",
      value: stats.totalExercises,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">{language === "en" ? "Your Progress" : "तपाईंको प्रगति"}</h1>
          <p className="text-white/80">
            {language === "en" ? "Track your recovery journey" : "आफ्नो रिकभरी यात्रा ट्र्याक गर्नुहोस्"}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {statCards.map(({ icon: Icon, label, value, suffix, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                {value}
                {suffix && <span className="text-lg text-[var(--color-text-secondary)] ml-1">{suffix}</span>}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">{label}</div>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-2xl p-6 border border-[var(--color-primary)]/20">
          <h3 className="font-semibold text-[var(--color-text)] mb-2">
            {language === "en" ? "Keep Going!" : "जारी राख्नुहोस्!"}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {language === "en"
              ? "Consistency is key to recovery. Every exercise brings you closer to a healthier spine."
              : "निरन्तरता रिकभरीको कुञ्जी हो। प्रत्येक व्यायामले तपाईंलाई स्वस्थ मेरुदण्डको नजिक पुर्‍याउँछ।"}
          </p>
        </div>
      </div>

      <BottomNav language={language} />
    </div>
  )
}
