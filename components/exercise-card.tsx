"use client"

import type { Exercise } from "@/lib/db"
import { Clock, Repeat } from "lucide-react"
import { useState } from "react"

interface ExerciseCardProps {
  exercise: Exercise
  language: "en" | "ne"
  onComplete?: () => void
  isCompleted?: boolean
}

export function ExerciseCard({ exercise, language, onComplete, isCompleted }: ExerciseCardProps) {
  const name = language === "en" ? exercise.nameEn : exercise.nameNe
  const description = language === "en" ? exercise.descriptionEn : exercise.descriptionNe
  const [videoError, setVideoError] = useState(false)

  const isYouTubeEmbed = exercise.videoUrl?.includes("youtube.com/embed")

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all ${
        isCompleted
          ? "border-[var(--color-success)] bg-[var(--color-success)]/5"
          : "border-[var(--color-border)] hover:shadow-md"
      }`}
    >
      {exercise.videoUrl && !videoError ? (
        <div className="relative w-full aspect-video bg-[var(--color-surface-secondary)]">
          {isYouTubeEmbed ? (
            <iframe
              src={exercise.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setVideoError(true)}
            />
          ) : (
            <video
              src={exercise.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
            >
              <source src={exercise.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ) : (
        <div className="w-full aspect-video bg-[var(--color-surface-secondary)] flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🎥</div>
            <p className="text-sm text-[var(--color-text-muted)]">
              {language === "en" ? "Video demonstration" : "भिडियो प्रदर्शन"}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-[var(--color-text)] mb-1 text-balance">{name}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3 leading-relaxed">{description}</p>

        {/* Exercise Details */}
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
            <Repeat className="w-4 h-4" />
            <span>{exercise.reps}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
            <Clock className="w-4 h-4" />
            <span>{exercise.duration}</span>
          </div>
        </div>

        {/* Complete Button */}
        {onComplete && (
          <button
            onClick={onComplete}
            disabled={isCompleted}
            className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-colors ${
              isCompleted
                ? "bg-[var(--color-success)] text-white cursor-default"
                : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-95"
            }`}
          >
            {isCompleted ? "✓ Completed" : "Mark Complete"}
          </button>
        )}
      </div>
    </div>
  )
}
