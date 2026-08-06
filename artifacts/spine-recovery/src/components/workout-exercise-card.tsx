import { useState } from "react"
import { Repeat, Clock, Star, ExternalLink } from "lucide-react"
import type { Exercise } from "@/lib/workout-data"

interface WorkoutExerciseCardProps {
  exercise: Exercise
}

export function WorkoutExerciseCard({ exercise }: WorkoutExerciseCardProps) {
  const [videoError, setVideoError] = useState(false)

  const youtubeEmbedUrl = exercise.videoId
    ? `https://www.youtube.com/embed/${exercise.videoId}`
    : null

  const youtubeWatchUrl = exercise.videoId
    ? `https://www.youtube.com/watch?v=${exercise.videoId}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " proper form tutorial")}`

  const hasVideo = youtubeEmbedUrl && !videoError

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border)] hover:shadow-md transition-all ${
        exercise.topPick ? "ring-2 ring-amber-300 ring-offset-1" : ""
      }`}
    >
      {/* Video / Placeholder */}
      {hasVideo ? (
        <div className="relative w-full aspect-video bg-[var(--color-surface-secondary)]">
          <iframe
            src={youtubeEmbedUrl!}
            title={`${exercise.name} form tutorial`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onError={() => setVideoError(true)}
          />
        </div>
      ) : (
        /* Fallback: thumbnail placeholder with YouTube search link */
        <a
          href={youtubeWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full aspect-video bg-[var(--color-surface-secondary)] group"
          aria-label={`Search ${exercise.name} tutorial on YouTube`}
        >
          {/* Red YouTube-style play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-red-500 transition-colors shadow-lg">
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
              Watch on YouTube →
            </span>
          </div>
        </a>
      )}

      {/* Card Body */}
      <div className="p-5">
        {/* Name + Top Pick badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-[var(--color-text)] leading-snug flex-1">
            {exercise.name}
          </h3>
          {exercise.topPick && (
            <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium whitespace-nowrap flex-shrink-0">
              <Star className="w-3 h-3 fill-current" />
              Top pick
            </span>
          )}
        </div>

        {/* Form cue */}
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
          {exercise.cue}
        </p>

        {/* Sets × Reps */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
            <Repeat className="w-4 h-4 text-[var(--color-primary)]" />
            <span>{exercise.sets} sets</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
            <Clock className="w-4 h-4 text-[var(--color-primary)]" />
            <span>{exercise.reps} reps</span>
          </div>
        </div>

        {/* Watch on YouTube button */}
        <a
          href={youtubeWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Watch on YouTube
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
