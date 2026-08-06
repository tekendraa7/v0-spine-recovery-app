// Workout Plan data — edit posterUrl and videoId here without touching component code

export interface Exercise {
  id: string
  name: string
  sets: string
  reps: string
  cue: string
  topPick?: boolean
  posterUrl?: string
  videoId?: string // YouTube video ID — empty string = show "Search demo video" button
}

export interface DayPlan {
  id: string
  label: string
  focus: string
  day: string
  exercises: Exercise[]
}

export interface AvoidExercise {
  name: string
  reason: string
}

export const weeklySchedule = [
  { day: "Monday", plan: "Chest + Triceps", type: "training" },
  { day: "Tuesday", plan: "Rest / Walking", type: "rest" },
  { day: "Wednesday", plan: "Back + Biceps", type: "training" },
  { day: "Thursday", plan: "Rest", type: "rest" },
  { day: "Friday", plan: "Legs + Shoulders", type: "training" },
  { day: "Saturday", plan: "Rest / Light Cardio / Stretching", type: "rest" },
  { day: "Sunday", plan: "Rest", type: "rest" },
] as const

export const warmUpRoutine = [
  "Treadmill walk — 5 minutes",
  "Shoulder rolls (forward + backward, 10 each)",
  "Band pull-aparts — 2×15",
  "Cat-cow stretch — 10 reps",
  "Bird dog — 10 reps each side",
  "Bodyweight squats — 15 reps",
  "Hip hinge practice — 10 reps",
]

export const trainingDays: DayPlan[] = [
  {
    id: "day1",
    label: "Day 1",
    focus: "Chest + Triceps",
    day: "Monday",
    exercises: [
      {
        id: "machine-chest-press",
        name: "Machine Chest Press",
        sets: "3",
        reps: "10–12",
        cue: "Spine fully supported by the pad — keep lower back in contact throughout. Full range, controlled tempo.",
        topPick: true,
        posterUrl: "",
        videoId: "xUm0BiZCWlQ", // Machine chest press proper form
      },
      {
        id: "incline-machine-press",
        name: "Incline Machine Press",
        sets: "3",
        reps: "10",
        cue: "Set incline to ~30°. Keep shoulder blades retracted and chest up.",
        posterUrl: "",
        videoId: "kDaFW-qSJMo", // Incline machine press tutorial
      },
      {
        id: "pec-deck-fly",
        name: "Pec Deck Fly Machine",
        sets: "3",
        reps: "12",
        cue: "Don't overstretch — stop when arms are in line with your chest. Slow on the way back.",
        posterUrl: "",
        videoId: "Z57CtFmRMxA", // Pec deck fly form
      },
      {
        id: "push-ups",
        name: "Push-ups",
        sets: "3",
        reps: "Max (pain-free)",
        cue: "Only if completely pain-free. Keep core tight and spine neutral — no sagging hips.",
        posterUrl: "",
        videoId: "IODxDxX7oi4", // Jeff Nippard - The Perfect Push Up
      },
      {
        id: "rope-triceps-pushdown",
        name: "Rope Triceps Pushdown",
        sets: "3",
        reps: "12",
        cue: "Elbows fixed at sides. Split the rope at the bottom for full contraction.",
        topPick: true,
        posterUrl: "",
        videoId: "vB5OHsJ3EME", // Rope pushdown form
      },
      {
        id: "cable-overhead-triceps",
        name: "Cable Overhead Triceps Extension",
        sets: "3",
        reps: "12",
        cue: "Keep neck neutral — don't crane forward. Light weight, focus on stretch.",
        posterUrl: "",
        videoId: "YbX7Wd8jQ-Q", // Overhead cable triceps extension
      },
      {
        id: "triceps-dip-machine",
        name: "Triceps Dip Machine",
        sets: "3",
        reps: "10",
        cue: "Safer than parallel bar dips — back stays supported. Don't lock out aggressively.",
        posterUrl: "",
        videoId: "l4yKl65G19Y", // Triceps dip machine
      },
    ],
  },
  {
    id: "day2",
    label: "Day 2",
    focus: "Back + Biceps",
    day: "Wednesday",
    exercises: [
      {
        id: "chest-supported-row",
        name: "Chest Supported Row Machine",
        sets: "3",
        reps: "10",
        cue: "Chest pressed firmly against pad — takes lumbar loading out of the equation. Squeeze shoulder blades at the top.",
        topPick: true,
        posterUrl: "",
        videoId: "xQNrFHEMhI4", // Chest supported row
      },
      {
        id: "lat-pulldown",
        name: "Lat Pulldown",
        sets: "3",
        reps: "10",
        cue: "Pull to upper chest, not behind neck. Don't lean back excessively — slight lean only.",
        topPick: true,
        posterUrl: "",
        videoId: "CAwf7n6Luuc", // Lat pulldown proper form
      },
      {
        id: "seated-cable-row",
        name: "Seated Cable Row",
        sets: "3",
        reps: "10",
        cue: "Keep spine neutral throughout — don't round or hyperextend at the lower back. Drive elbows back.",
        posterUrl: "",
        videoId: "GZbfZ033f74", // Seated cable row form
      },
      {
        id: "straight-arm-pulldown",
        name: "Straight Arm Pulldown",
        sets: "3",
        reps: "12",
        cue: "Arms almost straight. Hinge at the hips slightly, feel the lats working from shoulder to hip.",
        posterUrl: "",
        videoId: "Hdc7Mw6BIIU", // Straight arm pulldown
      },
      {
        id: "dumbbell-hammer-curl",
        name: "Dumbbell Hammer Curl",
        sets: "3",
        reps: "12",
        cue: "Neutral grip (thumbs up). Elbows stay at sides — no swinging.",
        posterUrl: "",
        videoId: "zC3nLlEvin4", // Hammer curl form
      },
      {
        id: "ez-bar-curl",
        name: "EZ Bar Curl",
        sets: "3",
        reps: "10",
        cue: "The angled grip reduces wrist strain. Full range, slow eccentric (lower in 2–3 sec).",
        posterUrl: "",
        videoId: "av7-8igSXTs", // EZ bar curl
      },
      {
        id: "preacher-curl-machine",
        name: "Preacher Curl Machine",
        sets: "3",
        reps: "12",
        cue: "Pad supports the arm — isolates the bicep. Don't hyperextend at the bottom.",
        posterUrl: "",
        videoId: "fIWP-FRFNU0", // Preacher curl machine
      },
    ],
  },
  {
    id: "day3",
    label: "Day 3",
    focus: "Legs + Shoulders",
    day: "Friday",
    exercises: [
      {
        id: "leg-press",
        name: "Leg Press",
        sets: "3",
        reps: "10",
        cue: "Keep lower back flat against the pad — don't let it round off at the bottom. Feet shoulder-width apart.",
        topPick: true,
        posterUrl: "",
        videoId: "IZxyjW7MPJQ", // Leg press proper form
      },
      {
        id: "leg-extension",
        name: "Leg Extension",
        sets: "3",
        reps: "12",
        cue: "Full extension but don't hyperextend the knee. Pause at the top, slow on the way down.",
        posterUrl: "",
        videoId: "YyvSfVjQeL0", // Leg extension form
      },
      {
        id: "hamstring-curl",
        name: "Hamstring Curl",
        sets: "3",
        reps: "12",
        cue: "Lying or seated — either works. Don't jerk the weight; controlled curl and slow return.",
        posterUrl: "",
        videoId: "ELOCsoDSmrg", // Hamstring curl form
      },
      {
        id: "bulgarian-split-squat",
        name: "Bulgarian Split Squat",
        sets: "3",
        reps: "10",
        cue: "Bodyweight first, then light dumbbells. Keep front shin vertical and torso upright.",
        posterUrl: "",
        videoId: "2C-uNgKwPLE", // Bulgarian split squat tutorial
      },
      {
        id: "standing-calf-raise",
        name: "Standing Calf Raise",
        sets: "3",
        reps: "15",
        cue: "Full range of motion — let heel drop below platform level on the way down. Pause at top.",
        posterUrl: "",
        videoId: "gwLzBJYoWlA", // Standing calf raise
      },
      {
        id: "machine-shoulder-press",
        name: "Machine Shoulder Press",
        sets: "3",
        reps: "10",
        cue: "Skip if there is any neck discomfort. No forceful lockout at the top — stop just short.",
        topPick: true,
        posterUrl: "",
        videoId: "Wqq43dKW1TU", // Machine shoulder press
      },
      {
        id: "lateral-raise",
        name: "Lateral Raise",
        sets: "3",
        reps: "12",
        cue: "Light and controlled. Lead with your elbow, not your hand. Stop at shoulder height.",
        posterUrl: "",
        videoId: "3VcKaXpzqRo", // Lateral raise proper form
      },
      {
        id: "rear-delt-fly-machine",
        name: "Rear Delt Fly Machine",
        sets: "3",
        reps: "12",
        cue: "Great for posture — counters forward head position. Squeeze at the back of the movement.",
        posterUrl: "",
        videoId: "Hbn7hGFDpHM", // Rear delt fly machine
      },
    ],
  },
]

export const bestMachines = [
  "Chest Press Machine",
  "Pec Deck",
  "Lat Pulldown",
  "Chest Supported Row",
  "Seated Cable Row",
  "Leg Press",
  "Leg Extension",
  "Hamstring Curl",
  "Calf Raise Machine",
  "Rear Delt Machine",
  "Cable Machine",
  "Assisted Pull-up Machine",
  "Smith Machine (careful use)",
]

export const avoidExercises: AvoidExercise[] = [
  { name: "Heavy Barbell Back Squat", reason: "Compresses cervical and lumbar spine axially" },
  { name: "Heavy Conventional Deadlift", reason: "High shear stress on L5-S1 disc under load" },
  { name: "Heavy Barbell Overhead Press", reason: "Loads and extends the cervical spine under load" },
  { name: "Behind-the-Neck Press", reason: "Places neck in a vulnerable flexed-forward position" },
  { name: "Behind-the-Neck Lat Pulldown", reason: "Unnecessary shoulder and cervical strain" },
  { name: "Heavy Shrugs", reason: "Direct compressive load on the cervical spine" },
  { name: "Good Mornings", reason: "High lever arm stress on the lower back / L5-S1" },
  { name: "Heavy Bent-Over Rows", reason: "Lumbar disc risk when form degrades under load" },
  { name: "Heavy Barbell Lunges", reason: "Balance and spinal stability risk with axial load" },
  { name: "Heavy Barbell Hip Thrusts", reason: "Start with bodyweight or light only — build gradually" },
]

export const coreWork = [
  { name: "Bird Dog", cue: "Opposite arm + leg, 3–5 sec hold. Keep hips level." },
  { name: "Dead Bug", cue: "Lower back pressed to floor throughout. Opposite arm + leg." },
  { name: "Side Plank", cue: "15–20 sec each side. Stack feet or stagger for easier version." },
  { name: "Front Plank", cue: "Forearms, 20–30 sec. Don't let hips sag or pike." },
  { name: "Pallof Press", cue: "Anti-rotation. Press out and hold 2 sec. Light cable/band." },
  { name: "McGill Curl-Up", cue: "One knee bent, hands under lower back. Small range — protect the disc." },
]

export const nutritionTargets = {
  protein: "70–90 g / day",
  caloricSurplus: "+300–500 kcal above maintenance",
  carbs: "Rice, potatoes, oats, fruit",
  fats: "Nuts, peanut butter, eggs, olive oil",
  sleep: "7.5–9 hrs / night",
  context: "Bulking at 45 kg / 5′8″ — priority is controlled weight gain with sufficient protein for muscle synthesis.",
}

export const progressionRule =
  "For the first 8–12 weeks: 8–12 reps, 3 sets, controlled tempo (2 sec up / 2 sec down). Stop 1–2 reps before failure every set. Only increase the load once you can complete all reps in all sets with clean form — never chase the weight."

export const stretchingMobility = [
  "Light cardio (10–15 min walk or stationary bike)",
  "Cat-cow stretch — 10 reps",
  "Child's pose — 20–30 sec hold",
  "Gentle hip flexor stretch — 20 sec each side",
  "Doorway chest stretch — 15 sec hold",
  "Neck side-tilt stretch — 10 sec each side (gentle only)",
  "Thoracic extension over foam roller — 60 sec",
]
