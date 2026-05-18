// TODO: [DEAD CODE] Moved to @/types/financial — update any remaining imports and delete this file.
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
