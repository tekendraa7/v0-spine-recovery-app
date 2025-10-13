"use client"

import { useState, useEffect } from "react"
import { db, type Exercise, type ProgressEntry, type UserSettings } from "@/lib/db"
import { exercisesData } from "@/lib/exercises-data"
import { ExerciseCard } from "@/components/exercise-card"
import { ProgressStats } from "@/components/progress-stats"
import { WeekSelector } from "@/components/week-selector"
import { BottomNav } from "@/components/bottom-nav"
import { NotificationPermissionPrompt } from "@/components/notification-permission-prompt"
import { MotivationalQuote } from "@/components/motivational-quote"
import { CelebrationModal } from "@/components/celebration-modal"
import { Onboarding } from "@/components/onboarding"
import { DosDontsCard } from "@/components/dos-donts-card"
import { Dumbbell, SettingsIcon } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [todayExercises, setTodayExercises] = useState<Exercise[]>([])
  const [completedToday, setCompletedToday] = useState<Set<string>>(new Set())
  const [language, setLanguage] = useState<"en" | "ne">("en")
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    async function initialize() {
      try {
        console.log("[v0] Initializing app...")

        if (typeof window === "undefined" || !window.indexedDB) {
          console.log("[v0] IndexedDB not available, using fallback")
          setError("IndexedDB not available")
          setLoading(false)
          return
        }

        // Initialize database
        console.log("[v0] Initializing database...")
        await db.addExercises(exercisesData)
        console.log("[v0] Database initialized with exercises")

        // Load or create settings
        let userSettings = await db.getSettings()
        console.log("[v0] User settings:", userSettings)

        if (!userSettings) {
          // First time user - show onboarding
          console.log("[v0] First time user, showing onboarding")
          setShowOnboarding(true)
          userSettings = {
            language: "en",
            reminderEnabled: false,
            weekStarted: 1,
          }
        }
        setSettings(userSettings)
        setLanguage(userSettings.language)
        setCurrentWeek(userSettings.weekStarted)

        // Load today's exercises
        const exercises = await db.getExercisesByWeek(userSettings.weekStarted)
        console.log("[v0] Loaded exercises for week", userSettings.weekStarted, ":", exercises.length)
        setTodayExercises(exercises)

        // Load today's progress
        const progress = await db.getProgressByDate(today)
        const completed = new Set(progress.filter((p) => p.completed).map((p) => p.exerciseId))
        console.log("[v0] Today's completed exercises:", completed.size)
        setCompletedToday(completed)
      } catch (error) {
        console.error("[v0] Error initializing:", error)
        setError(error instanceof Error ? error.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [today])

  const handleCompleteExercise = async (exerciseId: string) => {
    try {
      const isCompleted = completedToday.has(exerciseId)
      const newCompleted = new Set(completedToday)

      if (isCompleted) {
        newCompleted.delete(exerciseId)
      } else {
        newCompleted.add(exerciseId)
      }

      setCompletedToday(newCompleted)

      // Save to database
      const entry: ProgressEntry = {
        id: `${today}-${exerciseId}`,
        date: today,
        exerciseId,
        completed: !isCompleted,
      }
      await db.addProgress(entry)
      console.log("[v0] Progress saved for exercise:", exerciseId)

      // Check if all exercises are completed
      if (newCompleted.size === todayExercises.length && todayExercises.length > 0) {
        setShowCelebration(true)
      }
    } catch (error) {
      console.error("[v0] Error saving progress:", error)
    }
  }

  const handleWeekChange = async (week: number) => {
    setCurrentWeek(week)
    const exercises = await db.getExercisesByWeek(week)
    setTodayExercises(exercises)

    // Update settings
    if (settings) {
      const newSettings = { ...settings, weekStarted: week }
      await db.saveSettings(newSettings)
      setSettings(newSettings)
    }
  }

  const handleOnboardingComplete = async (weekStarted: number) => {
    const newSettings: UserSettings = {
      language: "en",
      reminderEnabled: false,
      weekStarted,
    }
    await db.saveSettings(newSettings)
    setSettings(newSettings)
    setCurrentWeek(weekStarted)
    setShowOnboarding(false)

    // Load exercises for selected week
    const exercises = await db.getExercisesByWeek(weekStarted)
    setTodayExercises(exercises)
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} language={language} />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Unable to Load App</h2>
          <p className="text-[var(--color-text-secondary)] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">
            {language === "en" ? "Loading your recovery plan..." : "तपाईंको रिकभरी योजना लोड गर्दै..."}
          </p>
        </div>
      </div>
    )
  }

  const completionPercentage =
    todayExercises.length > 0 ? Math.round((completedToday.size / todayExercises.length) * 100) : 0

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="max-w-2xl mx-auto px-4 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">{language === "en" ? "Spine Recovery" : "मेरुदण्ड रिकभरी"}</h1>
              <p className="text-white/80 text-sm">
                {language === "en" ? "Your daily exercises" : "तपाईंको दैनिक व्यायाम"}
              </p>
            </div>
            <Link
              href="/settings"
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <SettingsIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Progress Stats */}
          <ProgressStats
            completedToday={completedToday.size}
            totalToday={todayExercises.length}
            percentage={completionPercentage}
            language={language}
          />
        </div>
      </div>

      {/* Week Selector */}
      <div className="max-w-2xl mx-auto px-4 -mt-4">
        <WeekSelector currentWeek={currentWeek} onWeekChange={handleWeekChange} language={language} />
      </div>

      {/* Motivational Quote */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <MotivationalQuote language={language} />
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-4">
        <DosDontsCard language={language} />
      </div>

      {/* Today's Exercises */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">
            {language === "en" ? "Today's Exercises" : "आजको व्यायाम"}
          </h2>
          <span className="text-sm text-[var(--color-text-secondary)]">
            {completedToday.size}/{todayExercises.length} {language === "en" ? "completed" : "पूरा भयो"}
          </span>
        </div>

        <div className="space-y-4">
          {todayExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              language={language}
              onComplete={() => handleCompleteExercise(exercise.id)}
              isCompleted={completedToday.has(exercise.id)}
            />
          ))}
        </div>

        {todayExercises.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[var(--color-border)]">
            <Dumbbell className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-3" />
            <p className="text-[var(--color-text-secondary)]">
              {language === "en" ? "No exercises for this week yet" : "यस हप्ताको लागि कुनै व्यायाम छैन"}
            </p>
          </div>
        )}
      </div>

      {/* Celebration Modal */}
      <CelebrationModal show={showCelebration} onClose={() => setShowCelebration(false)} language={language} />

      {/* Notification Permission Prompt */}
      <NotificationPermissionPrompt language={language} />

      {/* Bottom Navigation */}
      <BottomNav language={language} />
    </div>
  )
}
