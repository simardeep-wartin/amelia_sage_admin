import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import type { FeelingIntroScreen } from "./feelingExercises";

export type FocusAreaExercise = {
  id: string;
  title: string;
  sub_content: string;
  description: string;
  focus_on_category_id: string;
};

export type FocusAreaExercisesData = {
  category_id: string;
  title: string;
  intro_screen: FeelingIntroScreen;
  intro_is_draft: boolean;
  exercises: FocusAreaExercise[];
};

export const getFocusAreaExercises = (id: string) =>
  clientApi.get<{ data: FocusAreaExercisesData }>(ENDPOINTS.workOnMe.focusAreaExercises(id));
