import type { Exercise } from "@/lib/db"
import { Clock, Repeat } from "lucide-react"
import { useState } from "react"
import { ExerciseSVG } from "./exercise-svg"

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
            </video>
          )}
        </div>
      ) : (
        <div className="w-full aspect-video bg-[var(--color-surface-secondary)] flex items-center justify-center">
          <ExerciseSVG
            exerciseId={exercise.svgPath}
            className="w-48 h-48 text-[var(--color-primary)]/60"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-[var(--color-text)] flex-1 pr-2">{name}</h3>
          {isCompleted && (
            <span className="text-xs bg-[var(--color-success)]/10 text-[var(--color-success)] px-2 py-1 rounded-full font-medium whitespace-nowrap">
              ✓ {language === "en" ? "Done" : "पूरा"}
            </span>
          )}
        </div>

        <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">{description}</p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
            <Repeat className="w-4 h-4 text-[var(--color-primary)]" />
            <span>{exercise.reps}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
            <Clock className="w-4 h-4 text-[var(--color-primary)]" />
            <span>{exercise.duration}</span>
          </div>
        </div>

        {onComplete && (
          <button
            onClick={onComplete}
            className={`w-full py-3 rounded-xl font-medium transition-all ${
              isCompleted
                ? "bg-[var(--color-success)] text-white"
                : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
            }`}
          >
            {isCompleted
              ? language === "en" ? "✓ Completed" : "✓ पूरा भयो"
              : language === "en" ? "Mark Complete" : "पूरा भएको चिन्ह लगाउनुहोस्"}
          </button>
        )}
      </div>
    </div>
  )
}
