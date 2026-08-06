import { useState } from "react"
import { Link } from "wouter"
import { BottomNav } from "@/components/bottom-nav"
import { WorkoutExerciseCard } from "@/components/workout-exercise-card"
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
} from "@/lib/workout-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  ArrowLeft,
  AlertTriangle,
  Timer,
  Flame,
  Dumbbell,
  Salad,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function WorkoutPlanPage() {
  const [activeDay, setActiveDay] = useState("day1")

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-28">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-border)] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text)]">Workout Plan</h1>
              <p className="text-xs text-[var(--color-text-muted)]">
                3-day/week · spine-safe · gym
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">

        {/* A. Health Context Banner */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
          <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300">
            Spine-Aware Training
          </AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400 space-y-2 mt-1">
            <p>
              Designed around{" "}
              <strong>congenital C4–C5 partial fusion</strong>,{" "}
              <strong>mild cervical scoliosis</strong>, and{" "}
              <strong>mild L5-S1 disc desiccation / bulge</strong>. Favors
              machine-supported, controlled movements over heavy free-weight lifts.
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
                    type === "training"
                      ? "bg-blue-50/60 dark:bg-blue-950/20"
                      : ""
                  }`}
                >
                  <span className="font-medium text-sm text-[var(--color-text)] w-28">
                    {day}
                  </span>
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
                    <Badge
                      variant="outline"
                      className="text-xs border-[var(--color-primary)] text-[var(--color-primary)]"
                    >
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
              <span className="text-sm font-normal text-[var(--color-text-muted)]">
                — before every session (~10 min)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {warmUpRoutine.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* D. Training Days — Tabs + Exercise Cards */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text)]">
              Training Days
            </h2>
          </div>

          <Tabs value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="grid grid-cols-3 w-full mb-6 h-auto p-1 bg-[var(--color-surface-secondary)] rounded-2xl">
              {trainingDays.map((day) => (
                <TabsTrigger
                  key={day.id}
                  value={day.id}
                  className="flex flex-col items-center py-2.5 px-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--color-primary)]"
                >
                  <span className="text-xs font-bold">{day.label}</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] leading-tight mt-0.5 text-center">
                    {day.focus}
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">
                    {day.day}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {trainingDays.map((day) => (
              <TabsContent key={day.id} value={day.id} className="space-y-5 mt-0">
                {/* Day header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">
                      {day.label}: {day.focus}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {day.exercises.length} exercises · {day.day}
                    </p>
                  </div>
                  <span className="text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full font-medium">
                    ★ = Top pick
                  </span>
                </div>

                {/* Exercise cards */}
                {day.exercises.map((exercise) => (
                  <WorkoutExerciseCard key={exercise.id} exercise={exercise} />
                ))}
              </TabsContent>
            ))}
          </Tabs>
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
                <div
                  key={name}
                  className="flex items-start gap-3 px-6 py-3 bg-red-50/50 dark:bg-red-950/10"
                >
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      {name}
                    </p>
                    <p className="text-xs text-red-500 mt-0.5">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* G–J: Core, Progression, Nutrition, Stretching in a collapsible accordion */}
        <Accordion type="multiple" className="space-y-3">
          {/* G. Core Work */}
          <AccordionItem
            value="core"
            className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden px-0"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-[var(--color-surface-secondary)] transition-colors">
              <div className="flex items-center gap-2 text-left">
                <span className="text-lg">🧘</span>
                <div>
                  <span className="font-semibold text-[var(--color-text)]">Core Work</span>
                  <span className="text-xs text-[var(--color-text-muted)] ml-2">
                    2–3×/week
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 pt-0 space-y-3">
              {coreWork.map(({ name, cue }) => (
                <div key={name} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] flex-shrink-0 mt-2" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)]">{name}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{cue}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-[var(--color-text-muted)] italic pt-1">
                Avoid high-rep sit-ups or twisting crunches.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* H. Progression */}
          <AccordionItem
            value="progression"
            className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden px-0"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-[var(--color-surface-secondary)] transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-lg">📈</span>
                <span className="font-semibold text-[var(--color-text)]">Progression Rule</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 pt-0">
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {progressionRule}
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* I. Nutrition */}
          <AccordionItem
            value="nutrition"
            className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden px-0"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-[var(--color-surface-secondary)] transition-colors">
              <div className="flex items-center gap-2">
                <Salad className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-[var(--color-text)]">
                  Nutrition Targets
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 pt-0">
              <p className="text-xs text-[var(--color-text-muted)] italic mb-4">
                {nutritionTargets.context}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Protein", value: nutritionTargets.protein },
                  { label: "Caloric surplus", value: nutritionTargets.caloricSurplus },
                  { label: "Carbs", value: nutritionTargets.carbs },
                  { label: "Healthy fats", value: nutritionTargets.fats },
                  { label: "Sleep", value: nutritionTargets.sleep },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-[var(--color-surface-secondary)] rounded-xl p-3"
                  >
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">{label}</p>
                    <p className="text-sm font-medium text-[var(--color-text)]">{value}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* J. Stretching */}
          <AccordionItem
            value="stretching"
            className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden px-0"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-[var(--color-surface-secondary)] transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌿</span>
                <div>
                  <span className="font-semibold text-[var(--color-text)]">
                    Stretching / Mobility
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] ml-2">
                    rest days & Saturday
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 pt-0">
              <ul className="space-y-2">
                {stretchingMobility.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <BottomNav language="en" />
    </div>
  )
}
