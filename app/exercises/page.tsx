"use client"

import { useState, useEffect } from "react"
import { exercisesData } from "@/lib/exercises-data"
import { db, type Exercise } from "@/lib/db"
import { ExerciseCard } from "@/components/exercise-card"
import { ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [language, setLanguage] = useState<"en" | "ne">("en")
  const [filterWeek, setFilterWeek] = useState<number | "all">("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadExercises() {
      try {
        // Initialize database with exercises
        await db.addExercises(exercisesData)

        // Load exercises
        const allExercises = await db.getExercises()
        setExercises(allExercises)

        // Load user settings
        const settings = await db.getSettings()
        if (settings) {
          setLanguage(settings.language)
        }
      } catch (error) {
        console.error("[Exercises] Error loading:", error)
      } finally {
        setLoading(false)
      }
    }

    loadExercises()
  }, [])

  const filteredExercises =
    filterWeek === "all"
      ? exercises
      : exercises.filter((ex) => {
          const weekNum = typeof filterWeek === "number" ? filterWeek : 1
          return ex.week >= weekNum && ex.week < weekNum + 4
        })

  const weekRanges = [
    { label: "All Exercises", value: "all" },
    { label: "Week 1-4 (Gentle)", value: 1 },
    { label: "Week 5-8 (Strength)", value: 5 },
    { label: "Week 9-12 (Advanced)", value: 9 },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">Loading exercises...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-border)] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-[var(--color-text)] flex-1">
              {language === "en" ? "Exercise Library" : "व्यायाम पुस्तकालय"}
            </h1>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
            {weekRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setFilterWeek(range.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  filterWeek === range.value
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-tertiary)]"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} language={language} />
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-secondary)]">
              {language === "en" ? "No exercises found" : "कुनै व्यायाम फेला परेन"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
