export type ExerciseStatus = "active" | "draft" | "inactive";

export interface Exercise {
  id: string;
  title: string;
  subtitle: string;
  duration: string; // e.g. "5 mins"
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  status: ExerciseStatus;
  createdAt: string;
}

export interface ExerciseSubCategory {
  id: string;
  name: string;
  status: ExerciseStatus;
  exerciseCount: number;
  exercises: Exercise[];
}

export interface ExerciseCategory {
  id: string;
  name: string; // e.g. "Yoga Exercises", "Soft Fitness"
  subCategories: ExerciseSubCategory[];
}
