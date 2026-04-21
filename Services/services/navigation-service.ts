import type { NavigationItem, NavigationSection } from "@/Services/models/navigation-model";

const navigationSections: NavigationSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "User Insights", href: "/user-insights" },
      { label: "Governance & Safety", href: "/governance-safety" },
    ],
  },
  {
    title: "User Data",
    items: [{ label: "Demographics", href: "/demographics" }],
  },
  {
    title: "Financials",
    items: [
      { label: "Financial Management", href: "/financial-management" },
      { label: "Access & Tiers", href: "/access-tiers" },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Wellth Plans", href: "/wellth-plans" },
      { label: "Work on Me Exercises", href: "/work-on-me-exercises" },
    ],
  },
  {
    title: "Exercises",
    items: [
      { label: "Mindful Exercise Management", href: "/mindful-exercise-management" },
      { label: "Calm & Stillness Management", href: "/calm-stillness-management" },
      { label: "Journal Management", href: "/journal-management" },
    ],
  },
  {
    title: "AI & Engagement",
    items: [
      { label: "Sage AI Settings", href: "/sage-ai-settings" },
      { label: "Notifications", href: "/notifications" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/settings" },
      { label: "Phase 2 Roadmap", href: "/phase-2-roadmap" },
    ],
  },
];

export function getNavigationSections(): NavigationSection[] {
  return navigationSections;
}

export function getNavigationItems(): NavigationItem[] {
  return navigationSections.flatMap((section) => section.items);
}