// ── Auth ─────────────────────────────────────────────────────────────────────

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  message: string;
  user: AuthUser;
};

export type AuthErrorShape = {
  message: string;
  code?: string;
};

// ── Navigation ────────────────────────────────────────────────────────────────

export type NavigationItem = { label: string; href: string };
export type NavigationSection = { title: string; items: NavigationItem[] };

// ── Charts ────────────────────────────────────────────────────────────────────

export interface SeriesConfig {
  key: string;
  label: string;
  color: string;
}

export interface FilterConfig {
  label: string;
  options: string[];
}

export interface FeaturePoint {
  feature: string;
  sessions: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

// ── Journal ───────────────────────────────────────────────────────────────────

export type JournalStatus = "published" | "draft";
export type JournalSource = "Wellth Plan" | "Work on Me";

export interface JournalEntry {
  id: string;
  title: string;
  source: JournalSource;
  day: string;
  status: JournalStatus;
  lastUpdated: string;
}

export const JOURNAL_TABS = [
  "All Exercise",
  "Work on Me (7 Days)",
  "Wellth plan (30 Days)",
  "Drafts",
] as const;

export type JournalTab = (typeof JOURNAL_TABS)[number];

// ── Mindful Exercise ──────────────────────────────────────────────────────────

export type ExerciseStatus = "active" | "draft" | "inactive";

export interface Exercise {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
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
  name: string;
  subCategories: ExerciseSubCategory[];
}

// ── Financial ─────────────────────────────────────────────────────────────────

export const FINANCIAL_TABS = [
  "Revenue Dashboard",
  "Subscriptions",
  "Payments",
  "Promotions",
] as const;

export type FinancialTab = (typeof FINANCIAL_TABS)[number];

export interface SubscriptionHealthRow {
  plan: string;
  active: string;
  revenue: string;
}

export interface SubscriptionRow {
  id: string;
  user: string;
  plan: string;
  status: "active" | "trial" | "cancelled";
  started: string;
  nextBilling: string;
  amount: string;
}

export interface PaymentRow {
  id: string;
  date: string;
  user: string;
  type: string;
  amount: string;
  status: "completed" | "failed" | "pending";
}

export interface PromotionRow {
  id: string;
  code: string;
  discount: string;
  type: "Fixed" | "Percentage";
  validUntil: string;
  uses: string;
  status: "Active" | "Expired" | "Paused";
}

// ── Governance ────────────────────────────────────────────────────────────────

export interface QueueItemData {
  id: string;
  title: string;
  source: string;
  status: "PENDING" | "RESOLVED" | "APPROVED";
  level?: "HIGH" | "MEDIUM" | "LOW";
  tags?: string[];
}

// ── UI ────────────────────────────────────────────────────────────────────────

export interface PanelItem {
  id: string;
  title: string;
  subtitle?: string;
  items?: string;
  description?: string;
  [key: string]: unknown;
}
