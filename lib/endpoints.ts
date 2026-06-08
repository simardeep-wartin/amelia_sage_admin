export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
  workOnMe: {
    overview: "/work-on-me/overview",
    feelings: "/work-on-me/feelings",
    feeling: (id: string) => `/work-on-me/feelings/${id}`,
    feelingIntroScreen: (id: string) => `/work-on-me/feelings/${id}/intro-screen`,
    feelingExercises: (id: string) => `/work-on-me/feelings/${id}/exercises`,
    feelingExercise: (categoryId: string, exerciseId: string) =>
      `/work-on-me/feelings/${categoryId}/exercises/${exerciseId}`,
    focusAreas: "/work-on-me/focus-areas",
    focusAreaExercises: (id: string) => `/work-on-me/focus-areas/${id}/exercises`,
    focusAreaExercise: (focusId: string, exerciseId: string) =>
      `/work-on-me/focus-areas/${focusId}/exercises/${exerciseId}`,
    focusAreaIntroScreen: (id: string) => `/work-on-me/focus-areas/${id}/intro-screen`,
  },
  userInsights: {
    overview: "/user-insights/overview",
    featureUsage: "/user-insights/feature-usage",
  },
  wealthPlans: {
    overview: "/wealth-plans/overview",
    list: "/wealth-plans",
    exercises: (id: string) => `/wealth-plans/${id}/exercises`,
    exerciseUpdate: (planId: string, exerciseId: string) =>
      `/wealth-plans/${planId}/exercises/${exerciseId}`,
    introScreen: (planId: string) => `/wealth-plans/${planId}/intro-screen`,
    update: (id: string) => `/wealth-plans/${id}`,
  },
  dashboard: {
    overview: "/dashboard/stats/overview",
    wealthPlan: "/dashboard/stats/wealth-plan",
    planTypes: "/dashboard/stats/plan-types",
  },
  journal: {
    exercises: "/exercise-draft-management/exercises",
  },
  demographics: {
    overview: "/demographics/overview",
    genderIdentity: "/demographics/gender-identity",
    ageDistribution: "/demographics/gender-identity/age-distribution",
    coreConversion: "/demographics/gender-identity/core-conversion",
    ethnicity: "/demographics/ethnicity",
    culturalIdentity: "/demographics/cultural-identity",
    culturalCoreConversion: "/demographics/cultural-identity/core-conversation",
    culturalAgeDistribution: "/demographics/cultural-identity/age-distribution",
    wellnessNeeds: "/demographics/wellness-needs",
    growthTrend: "/demographics/growth-trend",
  },
} as const;
