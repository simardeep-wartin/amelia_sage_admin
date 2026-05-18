import type { JournalEntry } from "@/types/journal";

export interface IJournalService {
  getEntries(): Promise<JournalEntry[]>;
}
