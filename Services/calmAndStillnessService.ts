import type { ICalmAndStillnessService } from "@/Services/interfaces";
import { type ExerciseCategory, type ExerciseSubCategory } from "@/types/mindful-exercise";

const MOCK_CATEGORIES: ExerciseCategory[] = [
  {
    id: "breathing",
    name: "Breath Work",
    subCategories: [
      {
        id: "deep-breathing",
        name: "Deep Breathing",
        status: "active",
        exerciseCount: 4,
        exercises: [
          {
            id: "db-1",
            title: "Box Breathing",
            subtitle: "A calming technique that reduces stress by balancing the nervous system.",
            duration: "5 mins",
            description: "A calming technique that reduces stress by balancing the nervous system.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "db-2",
            title: "4-7-8 Breathing",
            subtitle: "A relaxing breath pattern that helps calm anxiety and promote sleep.",
            duration: "5 mins",
            description: "A relaxing breath pattern that helps calm anxiety and promote sleep.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "db-3",
            title: "Belly Breath",
            subtitle: "Activates the diaphragm for a full, grounding breath that soothes the mind.",
            duration: "6 mins",
            description:
              "Activates the diaphragm for a full, grounding breath that soothes the mind.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "db-4",
            title: "Ocean Breath (Ujjayi)",
            subtitle: "A soft, rhythmic breath that creates inner warmth and focused stillness.",
            duration: "7 mins",
            description: "A soft, rhythmic breath that creates inner warmth and focused stillness.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "diaphragmatic",
        name: "Diaphragmatic Breathing",
        status: "active",
        exerciseCount: 3,
        exercises: [
          {
            id: "dia-1",
            title: "Diaphragm Activation",
            subtitle: "Teaches correct diaphragmatic engagement for efficient, calming breaths.",
            duration: "5 mins",
            description: "Teaches correct diaphragmatic engagement for efficient, calming breaths.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "dia-2",
            title: "Two-Stage Exhale",
            subtitle: "Extends the exhale to activate the parasympathetic nervous system.",
            duration: "6 mins",
            description: "Extends the exhale to activate the parasympathetic nervous system.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "dia-3",
            title: "Belly and Chest Breathing",
            subtitle: "A two-phase breath that maximises lung capacity and promotes calm.",
            duration: "7 mins",
            description: "A two-phase breath that maximises lung capacity and promotes calm.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "alternate-nostril",
        name: "Alternate Nostril Breathing",
        status: "active",
        exerciseCount: 3,
        exercises: [
          {
            id: "anb-1",
            title: "Nadi Shodhana",
            subtitle: "Balances the left and right hemispheres of the brain for mental clarity.",
            duration: "8 mins",
            description: "Balances the left and right hemispheres of the brain for mental clarity.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "anb-2",
            title: "Anulom Vilom",
            subtitle: "A slow alternate nostril technique that purifies and calms the mind.",
            duration: "10 mins",
            description: "A slow alternate nostril technique that purifies and calms the mind.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "anb-3",
            title: "Surya Bhedana",
            subtitle: "Invigorates and warms the body by breathing in through the right nostril.",
            duration: "6 mins",
            description:
              "Invigorates and warms the body by breathing in through the right nostril.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
        ],
      },
    ],
  },
  {
    id: "meditation",
    name: "Meditation",
    subCategories: [
      {
        id: "guided-meditation",
        name: "Guided Meditation",
        status: "active",
        exerciseCount: 4,
        exercises: [
          {
            id: "gm-1",
            title: "Morning Clarity",
            subtitle: "A short guided session to set a calm, intentional tone for the day.",
            duration: "10 mins",
            description: "A short guided session to set a calm, intentional tone for the day.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "gm-2",
            title: "Loving Kindness",
            subtitle: "Cultivates compassion and warmth toward yourself and others.",
            duration: "12 mins",
            description: "Cultivates compassion and warmth toward yourself and others.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "gm-3",
            title: "Evening Wind Down",
            subtitle: "Releases the tension of the day and eases the transition into rest.",
            duration: "15 mins",
            description: "Releases the tension of the day and eases the transition into rest.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "gm-4",
            title: "Breath Awareness",
            subtitle:
              "Anchors attention to the natural rhythm of the breath for present-moment stillness.",
            duration: "8 mins",
            description:
              "Anchors attention to the natural rhythm of the breath for present-moment stillness.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "body-scan",
        name: "Body Scan",
        status: "active",
        exerciseCount: 3,
        exercises: [
          {
            id: "bs-1",
            title: "Full Body Scan",
            subtitle:
              "Systematically brings awareness to each part of the body to release held tension.",
            duration: "20 mins",
            description:
              "Systematically brings awareness to each part of the body to release held tension.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "bs-2",
            title: "Head-to-Toe Release",
            subtitle: "A gentle scan that softens muscular tension from head to toe.",
            duration: "15 mins",
            description: "A gentle scan that softens muscular tension from head to toe.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "bs-3",
            title: "Grounding Scan",
            subtitle: "Connects awareness to the feeling of the body resting against the ground.",
            duration: "10 mins",
            description:
              "Connects awareness to the feeling of the body resting against the ground.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "visualisation",
        name: "Visualisation",
        status: "active",
        exerciseCount: 3,
        exercises: [
          {
            id: "vis-1",
            title: "Safe Place Visualisation",
            subtitle: "Creates a mental sanctuary to return to whenever calm is needed.",
            duration: "12 mins",
            description: "Creates a mental sanctuary to return to whenever calm is needed.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "vis-2",
            title: "Mountain Meditation",
            subtitle: "Draws on the image of a mountain to cultivate unshakeable inner stability.",
            duration: "15 mins",
            description:
              "Draws on the image of a mountain to cultivate unshakeable inner stability.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "vis-3",
            title: "Ocean of Calm",
            subtitle: "Uses the imagery of a vast, still ocean to dissolve stress and worry.",
            duration: "10 mins",
            description: "Uses the imagery of a vast, still ocean to dissolve stress and worry.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
        ],
      },
    ],
  },
  {
    id: "Guided Imegary",
    name: "Guided Imagery",
    subCategories: [
      {
        id: "progressive-muscle",
        name: "Progressive Muscle Relaxation",
        status: "active",
        exerciseCount: 3,
        exercises: [
          {
            id: "pmr-1",
            title: "Full Body PMR",
            subtitle:
              "Systematically tenses and releases muscle groups to achieve deep physical calm.",
            duration: "20 mins",
            description:
              "Systematically tenses and releases muscle groups to achieve deep physical calm.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "pmr-2",
            title: "Upper Body Release",
            subtitle: "Targets the neck, shoulders, and arms where stress is most commonly stored.",
            duration: "12 mins",
            description:
              "Targets the neck, shoulders, and arms where stress is most commonly stored.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "pmr-3",
            title: "Quick Tension Drop",
            subtitle: "A condensed PMR sequence for fast relief during high-stress moments.",
            duration: "8 mins",
            description: "A condensed PMR sequence for fast relief during high-stress moments.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "sound-bath",
        name: "Sound Bath",
        status: "active",
        exerciseCount: 3,
        exercises: [
          {
            id: "sb-1",
            title: "Tibetan Singing Bowls",
            subtitle: "Resonant bowl tones guide the mind into a state of deep meditative rest.",
            duration: "25 mins",
            description: "Resonant bowl tones guide the mind into a state of deep meditative rest.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "sb-2",
            title: "Crystal Bowl Immersion",
            subtitle: "Crystal bowl frequencies promote cellular relaxation and emotional release.",
            duration: "20 mins",
            description:
              "Crystal bowl frequencies promote cellular relaxation and emotional release.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "sb-3",
            title: "Nature Soundscape",
            subtitle: "Layered nature sounds create a peaceful environment for rest and recovery.",
            duration: "15 mins",
            description:
              "Layered nature sounds create a peaceful environment for rest and recovery.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "restorative-rest",
        name: "Restorative Rest",
        status: "active",
        exerciseCount: 3,
        exercises: [
          {
            id: "rr-1",
            title: "Yoga Nidra",
            subtitle:
              "A systematic relaxation between waking and sleep that deeply restores the body.",
            duration: "30 mins",
            description:
              "A systematic relaxation between waking and sleep that deeply restores the body.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "rr-2",
            title: "Savasana Practice",
            subtitle: "A guided corpse pose session designed to integrate and release all effort.",
            duration: "15 mins",
            description:
              "A guided corpse pose session designed to integrate and release all effort.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
          {
            id: "rr-3",
            title: "Sleep Preparation",
            subtitle:
              "A gentle wind-down sequence that prepares the mind and body for restful sleep.",
            duration: "20 mins",
            description:
              "A gentle wind-down sequence that prepares the mind and body for restful sleep.",
            status: "active",
            videoUrl: "#",
            audioUrl: "#",
            createdAt: new Date().toISOString(),
          },
        ],
      },
    ],
  },
];

export const calmAndStillnessService: ICalmAndStillnessService = {
  getCategories: async (): Promise<ExerciseCategory[]> => {
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

  addCategory: async (data: unknown) => {
    console.log("Adding Category:", data);
    return { id: Math.random().toString(36).substr(2, 9), ...(data as object) };
  },

  addExercise: async (subCategoryId: string, data: unknown) => {
    console.log(`Adding Exercise to ${subCategoryId}:`, data);
    return { id: Math.random().toString(36).substr(2, 9), ...(data as object) };
  },
};
