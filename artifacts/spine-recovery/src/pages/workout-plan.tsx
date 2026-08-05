import { useState } from "react"
import { Link } from "wouter"
import { BottomNav } from "@/components/bottom-nav"
import {
  trainingDays,
  weeklySchedule,
  warmUpRoutine,
  bestMachines,
  avoidExercises,
  coreWork,
  nutritionTargets,
  progressionRule,
  stretchingMobility,
  type Exercise,
} from "@/lib/workout-data"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  AlertTriangle,
  Star,
  Dumbbell,
  Salad,
  Timer,
  Flame,
  Play,
  Search,
  XCircle,
  CheckCircle,
} from "lucide-react"

// ──────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────

function ExercisePoster({ exercise, onOpen }: { exercise: Exercise; onOpen: () => void }) {
  if (exercise.posterUrl) {
    return (
      <button
        onClick={onOpen}
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-[var(--color-surface-secondary)] group"
        aria-label={`View demo for ${exercise.name}`}
      >
        <img
          src={exercise.posterUrl}
          alt={exercise.name}
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <Play className="w-10 h-10 text-white" />
        </div>
      </button>
    )
  }

  return (
    <div className="w-full aspect-video rounded-xl bg-[var(--color-surface-secondary)] flex items-center justify-center">
      <Dumbbell className="w-12 h-12 text-[var(--color-text-muted)]" />
    </div>
  )
}

function ExerciseVideoDialog({
  exercise,
  open,
  onClose,
}: {
  exercise: Exercise | null
  open: boolean
  onClose: () => void
}) {
  if (!exercise) return null

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg w-full p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="p-5 pb-0">
          <DialogTitle className="text-base font-semibold text-[var(--color-text)]">
            {exercise.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-5 pt-3 space-y-4">
          {exercise.videoId ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${exercise.videoId}?autoplay=1&rel=0`}
                title={`${exercise.name} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="rounded-xl bg-[var(--color-surface-secondary)] p-6 text-center">
              <Play className="w-10 h-10 text-[var(--color-text-muted)] mx-auto mb-3" />
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                No video curated yet for this exercise.
              </p>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " proper form")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                <Search className="w-4 h-4" />
                Search demo video
              </a>
            </div>
          )}
          <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
            <span className="font-medium text-[var(--color-text)]">Form cue: </span>
            {exercise.cue}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ExerciseRow({ exercise, onSelectVideo }: { exercise: Exercise; onSelectVideo: () => void }) {
  return (
    <div className="flex flex-col gap-3 py-4 border-b border-[var(--color-border)] last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-medium text-[var(--color-text)]">{exercise.name}</span>
            {exercise.topPick && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Top pick
              </Badge>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {exercise.sets} sets × {exercise.reps} reps
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">{exercise.cue}</p>
        </div>
        <button
          onClick={onSelectVideo}
          className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-[var(--color-surface-secondary)] hover:bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)] transition-colors"
          aria-label={`View demo for ${exercise.name}`}
        >
          <Play className="w-3.5 h-3.5" />
          Demo
        </button>
      </div>
      {exercise.posterUrl && (
        <button
          onClick={onSelectVideo}
          className="w-full aspect-video rounded-xl overflow-hidden bg-[var(--color-surface-secondary)] group relative"
          aria-label={`View poster for ${exercise.name}`}
        >
          <img
            src={exercise.posterUrl}
            alt={exercise.name}
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
            <Play className="w-8 h-8 text-white" />
          </div>
        </button>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────────────────

export default function WorkoutPlanPage() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openVideo = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setDialogOpen(true)
  }

  const closeVideo = () => {
    setDialogOpen(false)
    setTimeout(() => setSelectedExercise(null), 300)
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-28">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-[var(--color-border)] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text)]">Workout Plan</h1>
              <p className="text-xs text-[var(--color-text-muted)]">3-day/week · spine-safe · gym</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">

        {/* A. Health Context Banner */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
          <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300">Spine-Aware Training</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400 space-y-2">
            <p>
              This plan is designed around a few spine-related conditions: <strong>congenital C4–C5 partial fusion</strong>,{" "}
              <strong>mild cervical scoliosis</strong>, and <strong>mild L5-S1 disc desiccation / bulge</strong>. The program favors
              machine-supported, controlled movements over heavy free-weight or spine-loading lifts.
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-500">
              Not medical advice — cleared and guided by a physiotherapist consultation.
            </p>
          </AlertDescription>
        </Alert>

        {/* B. Weekly Split */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Timer className="w-5 h-5 text-[var(--color-primary)]" />
              Weekly Split
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border)]">
              {weeklySchedule.map(({ day, plan, type }) => (
                <div
                  key={day}
                  className={`flex items-center justify-between px-6 py-3 ${
                    type === "training" ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                  }`}
                >
                  <span className="font-medium text-sm text-[var(--color-text)] w-28">{day}</span>
                  <span
                    className={`text-sm flex-1 ${
                      type === "training"
                        ? "text-[var(--color-primary)] font-medium"
                        : "text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {plan}
                  </span>
                  {type === "training" && (
                    <Badge variant="outline" className="text-xs border-[var(--color-primary)] text-[var(--color-primary)]">
                      Train
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* C. Warm-up */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Flame className="w-5 h-5 text-orange-500" />
              Warm-Up Routine
              <span className="text-sm font-normal text-[var(--color-text-muted)]">— before every session (~10 min)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {warmUpRoutine.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* D. Training Days */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-[var(--color-primary)]" />
            Training Days
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {trainingDays.map((day) => (
              <AccordionItem
                key={day.id}
                value={day.id}
                className="bg-white dark:bg-gray-900 border border-[var(--color-border)] rounded-2xl overflow-hidden px-0"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[var(--color-primary)]">{day.label}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--color-text)]">{day.focus}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{day.day} · {day.exercises.length} exercises</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 pt-0">
                  <div>
                    {day.exercises.map((ex) => (
                      <ExerciseRow key={ex.id} exercise={ex} onSelectVideo={() => openVideo(ex)} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* E. Best Machines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
              Best Machines to Prioritize
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {bestMachines.map((m) => (
                <Badge
                  key={m}
                  variant="outline"
                  className="border-green-200 text-green-700 bg-green-50 dark:border-green-800 dark:text-green-400 dark:bg-green-950/30"
                >
                  {m}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* F. Exercises to Avoid */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-red-700 dark:text-red-400">
              <XCircle className="w-5 h-5" />
              Exercises to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-red-100 dark:divide-red-900/30">
              {avoidExercises.map(({ name, reason }) => (
                <div key={name} className="flex items-start gap-3 px-6 py-3 bg-red-50/50 dark:bg-red-950/10">
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-red-700 dark:text-red-400">{name}</span>
                    <p className="text-xs text-red-500 dark:text-red-500 mt-0.5">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* G. Core Work */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="text-lg">🧘</span>
              Core Work
              <span className="text-sm font-normal text-[var(--color-text-muted)]">— 2–3×/week</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {coreWork.map(({ name, cue }) => (
              <div key={name} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] flex-shrink-0 mt-2" />
                <div>
                  <span className="text-sm font-medium text-[var(--color-text)]">{name}</span>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{cue}</p>
                </div>
              </div>
            ))}
            <p className="text-xs text-[var(--color-text-muted)] mt-2 italic">
              Avoid high-rep sit-ups or twisting crunches.
            </p>
          </CardContent>
        </Card>

        {/* H. Progression Rule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="text-lg">📈</span>
              Progression Rule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{progressionRule}</p>
          </CardContent>
        </Card>

        {/* I. Nutrition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Salad className="w-5 h-5 text-green-500" />
              Nutrition Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-[var(--color-text-muted)] italic mb-4">{nutritionTargets.context}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Protein", value: nutritionTargets.protein },
                { label: "Caloric surplus", value: nutritionTargets.caloricSurplus },
                { label: "Carbs", value: nutritionTargets.carbs },
                { label: "Healthy fats", value: nutritionTargets.fats },
                { label: "Sleep", value: nutritionTargets.sleep },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[var(--color-surface-secondary)] rounded-xl p-3">
                  <div className="text-xs text-[var(--color-text-muted)] mb-1">{label}</div>
                  <div className="text-sm font-medium text-[var(--color-text)]">{value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* J. Stretching / Mobility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="text-lg">🌿</span>
              Stretching / Mobility
              <span className="text-sm font-normal text-[var(--color-text-muted)]">— rest days & Saturday</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {stretchingMobility.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

      </div>

      {/* Video Dialog */}
      <ExerciseVideoDialog exercise={selectedExercise} open={dialogOpen} onClose={closeVideo} />

      <BottomNav language="en" />
    </div>
  )
}
