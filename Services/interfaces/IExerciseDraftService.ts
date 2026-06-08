// DEAD CODE: no longer consumed — see Services/api/journal/exercises.ts
import type { ExerciseDraftEntry } from "@/types";

export interface IExerciseDraftService {
  getEntries(): Promise<ExerciseDraftEntry[]>;
}
