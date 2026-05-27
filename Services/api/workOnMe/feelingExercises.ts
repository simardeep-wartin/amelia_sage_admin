import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type FeelingExercise = {
  id: string;
  title: string;
  description: string;
  feeling_id: string;
};

export type FeelingIntroScreen = {
  subtitle: string;
  sage_says: string;
  description: string;
};

export type FeelingExercisesData = {
  category_id: string;
  title: string;
  intro_screen: FeelingIntroScreen;
  intro_is_draft: boolean;
  exercises: FeelingExercise[];
};

export const getFeelingExercises = (id: string) =>
  clientApi.get<{ data: FeelingExercisesData }>(ENDPOINTS.workOnMe.feelingExercises(id));
