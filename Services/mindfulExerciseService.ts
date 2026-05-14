import { ExerciseCategory, ExerciseSubCategory, Exercise } from "@/types/mindful-exercise";

// Mock Data
const MOCK_CATEGORIES: ExerciseCategory[] = [
  {
    id: "yoga",
    name: "Yoga Exercises",
    subCategories: [
      {
        id: "floor-yoga",
        name: "Floor Yoga",
        status: "active",
        exerciseCount: 4,
        exercises: [
          {
            id: "1",
            title: "Child's Pose Asana",
            subtitle: "A yoga exercise that releases lower-back tension and gently calms the nervous system.",
            duration: "5 mins",
            description: "A yoga exercise that releases lower-back tension and gently calms the nervous system.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Child's Pose Asana",
            subtitle: "A yoga exercise that releases lower-back tension and gently calms the nervous system.",
            duration: "5 mins",
            description: "A yoga exercise that releases lower-back tension and gently calms the nervous system.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            title: "Child's Pose Asana",
            subtitle: "A yoga exercise that releases lower-back tension and gently calms the nervous system.",
            duration: "5 mins",
            description: "A yoga exercise that releases lower-back tension and gently calms the nervous system.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "4",
            title: "Child's Pose Asana",
            subtitle: "A yoga exercise that releases lower-back tension and gently calms the nervous system.",
            duration: "5 mins",
            description: "A yoga exercise that releases lower-back tension and gently calms the nervous system.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          }
        ],
      },
      {
        id: "seated-yoga",
        name: "Seated Yoga",
        status: "active",
        exerciseCount: 0,
        exercises: [],
      },
      {
        id: "power-yoga",
        name: "Power Yoga",
        status: "active",
        exerciseCount: 0,
        exercises: [],
      },
      {
        id: "standing-yoga",
        name: "Standing Yoga",
        status: "active",
        exerciseCount: 0,
        exercises: [],
      },
    ],
  },
  {
    id: "soft-fitness",
    name: "Soft Fitness",
    subCategories: [],
  },
  {
    id: "pilates",
    name: "Pilates",
    subCategories: [],
  },
];

export const mindfulExerciseService = {
  getCategories: async (): Promise<ExerciseCategory[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_CATEGORIES;
  },

  getSubCategoryById: async (id: string): Promise<ExerciseSubCategory | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    for (const cat of MOCK_CATEGORIES) {
      const sub = cat.subCategories.find((s) => s.id === id);
      if (sub) return sub;
    }
    return null;
  },

  addCategory: async (data: any) => {
    console.log("Adding Category:", data);
    return { id: Math.random().toString(36).substr(2, 9), ...data };
  },

  addExercise: async (subCategoryId: string, data: any) => {
    console.log(`Adding Exercise to ${subCategoryId}:`, data);
    return { id: Math.random().toString(36).substr(2, 9), ...data };
  },
};
