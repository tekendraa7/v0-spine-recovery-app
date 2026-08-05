// IndexedDB utilities for offline storage

const DB_NAME = "SpineRecoveryDB"
const DB_VERSION = 1

export interface Exercise {
  id: string
  nameEn: string
  nameNe: string
  descriptionEn: string
  descriptionNe: string
  reps: string
  duration: string
  week: number
  category: string
  svgPath: string
  videoUrl?: string
}

export interface ProgressEntry {
  id: string
  date: string
  exerciseId: string
  completed: boolean
  notes?: string
}

export interface UserSettings {
  language: "en" | "ne"
  reminderTime?: string
  reminderEnabled: boolean
  weekStarted: number
}

class SpineRecoveryDB {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    if (typeof window === "undefined" || !window.indexedDB) {
      console.log("[v0] IndexedDB not available in this environment")
      throw new Error("IndexedDB is not available")
    }

    return new Promise((resolve, reject) => {
      console.log("[v0] Opening IndexedDB...")
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        console.error("[v0] IndexedDB error:", request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        console.log("[v0] IndexedDB opened successfully")
        resolve()
      }

      request.onupgradeneeded = (event) => {
        console.log("[v0] Upgrading IndexedDB schema...")
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains("exercises")) {
          console.log("[v0] Creating exercises store")
          db.createObjectStore("exercises", { keyPath: "id" })
        }

        if (!db.objectStoreNames.contains("progress")) {
          console.log("[v0] Creating progress store")
          const progressStore = db.createObjectStore("progress", { keyPath: "id" })
          progressStore.createIndex("date", "date", { unique: false })
          progressStore.createIndex("exerciseId", "exerciseId", { unique: false })
        }

        if (!db.objectStoreNames.contains("settings")) {
          console.log("[v0] Creating settings store")
          db.createObjectStore("settings", { keyPath: "id" })
        }
      }
    })
  }

  async addExercises(exercises: Exercise[]): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["exercises"], "readwrite")
    const store = transaction.objectStore("exercises")

    for (const exercise of exercises) {
      store.put(exercise)
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
    })
  }

  async getExercises(): Promise<Exercise[]> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["exercises"], "readonly")
    const store = transaction.objectStore("exercises")
    const request = store.getAll()

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getExercisesByWeek(week: number): Promise<Exercise[]> {
    const exercises = await this.getExercises()
    return exercises.filter((ex) => ex.week === week)
  }

  async addProgress(entry: ProgressEntry): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["progress"], "readwrite")
    const store = transaction.objectStore("progress")
    store.put(entry)

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
    })
  }

  async getProgressByDate(date: string): Promise<ProgressEntry[]> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["progress"], "readonly")
    const store = transaction.objectStore("progress")
    const index = store.index("date")
    const request = index.getAll(date)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getAllProgress(): Promise<ProgressEntry[]> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["progress"], "readonly")
    const store = transaction.objectStore("progress")
    const request = store.getAll()

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async saveSettings(settings: UserSettings): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["settings"], "readwrite")
    const store = transaction.objectStore("settings")
    store.put({ ...settings, id: "user-settings" })

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
    })
  }

  async getSettings(): Promise<UserSettings | null> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["settings"], "readonly")
    const store = transaction.objectStore("settings")
    const request = store.get("user-settings")

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }
}

export const db = new SpineRecoveryDB()
