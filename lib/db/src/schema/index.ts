import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const id = () => uuid("id").defaultRandom().primaryKey();
const createdAt = () => timestamp("created_at", { withTimezone: true }).defaultNow().notNull();

export const activityKind = pgEnum("activity_kind", ["exercise", "workout", "stretch", "rest"]);
export const users = pgTable("users", {
  id: id(),
  email: text("email"),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: createdAt(),
});

export const accounts = pgTable("accounts", {
  id: id(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  createdAt: createdAt(),
}, (table) => [uniqueIndex("accounts_provider_identity_unique").on(table.provider, table.providerAccountId)]);

export const sessions = pgTable("sessions", {
  id: id(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: createdAt(),
});

export const profiles = pgTable("profiles", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  recoveryFocus: text("recovery_focus"),
  preferredDurationMinutes: integer("preferred_duration_minutes"),
  goals: text("goals").array().notNull().default(sql`ARRAY[]::text[]`),
  preferredLanguage: text("preferred_language").notNull().default("en"),
  timezone: text("timezone"),
  age: integer("age"),
  onboardingComplete: boolean("onboarding_complete").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const exercises = pgTable("exercises", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  targetArea: text("target_area").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  durationSeconds: integer("duration_seconds"),
  repetitions: text("repetitions"),
  sets: integer("sets"),
  instructions: text("instructions").array().notNull().default(sql`ARRAY[]::text[]`),
  safetyNotes: text("safety_notes"),
});

export const workouts = pgTable("workouts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  targetArea: text("target_area").notNull(),
  difficulty: text("difficulty").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
});

export const workoutExercises = pgTable("workout_exercises", {
  workoutId: text("workout_id").notNull().references(() => workouts.id, { onDelete: "cascade" }),
  exerciseId: text("exercise_id").notNull().references(() => exercises.id),
  position: integer("position").notNull(),
  restSeconds: integer("rest_seconds").notNull().default(0),
}, (table) => [primaryKey({ columns: [table.workoutId, table.exerciseId] })]);

export const activitySessions = pgTable("activity_sessions", {
  id: id(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  kind: activityKind("kind").notNull(),
  exerciseId: text("exercise_id").references(() => exercises.id),
  workoutId: text("workout_id").references(() => workouts.id),
  durationMinutes: integer("duration_minutes").notNull().default(0),
  completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
  details: jsonb("details").notNull().default({}),
});

export const calendarEvents = pgTable("calendar_events", {
  id: id(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  activityDate: date("activity_date").notNull(),
  title: text("title").notNull(),
  kind: activityKind("kind").notNull(),
  scheduled: boolean("scheduled").notNull().default(false),
  sessionId: uuid("session_id").references(() => activitySessions.id, { onDelete: "cascade" }),
});

export const discomfortEntries = pgTable("discomfort_entries", {
  id: id(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  entryDate: date("entry_date").notNull(),
  score: integer("score").notNull(),
  note: text("note"),
  createdAt: createdAt(),
}, (table) => [uniqueIndex("discomfort_one_per_user_day").on(table.userId, table.entryDate)]);

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  accounts: many(accounts),
  sessions: many(sessions),
  activitySessions: many(activitySessions),
}));
export const profileRelations = relations(profiles, ({ one }) => ({ user: one(users, { fields: [profiles.userId], references: [users.id] }) }));
