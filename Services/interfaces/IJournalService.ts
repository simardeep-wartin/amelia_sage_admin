import type { JournalEntry } from "@/types";

export interface IJournalService {
  getEntries(): Promise<JournalEntry[]>;
}
