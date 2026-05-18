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
