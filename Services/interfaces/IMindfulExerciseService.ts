import type { ExerciseCategory, ExerciseSubCategory } from "@/types";

export interface IMindfulExerciseService {
  getCategories(): Promise<ExerciseCategory[]>;
  getSubCategoryById(id: string): Promise<ExerciseSubCategory | null>;
  addCategory(data: unknown): Promise<{ id: string } & Record<string, unknown>>;
  addExercise(
    subCategoryId: string,
    data: unknown,
  ): Promise<{ id: string } & Record<string, unknown>>;
}
