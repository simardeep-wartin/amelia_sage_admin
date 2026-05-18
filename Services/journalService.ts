import type { IJournalService } from "@/Services/interfaces";
import { JournalEntry } from "@/types/journal";

const MOCK_ENTRIES: JournalEntry[] = [
  { id: "1",  title: "Awareness Week",         source: "Wellth Plan", day: "Day 1",  status: "published", lastUpdated: "2025-02-15" },
  { id: "2",  title: "Gratitude Anchor",        source: "Work on Me",  day: "Day 1",  status: "published", lastUpdated: "2025-06-01" },
  { id: "3",  title: "Inner Warmth",            source: "Wellth Plan", day: "Day 20", status: "draft",     lastUpdated: "2025-01-27" },
  { id: "4",  title: "Blessings in Motion",     source: "Wellth Plan", day: "Day 3",  status: "draft",     lastUpdated: "2025-01-27" },
  { id: "5",  title: "Meaning Mapping",         source: "Work on Me",  day: "Day 2",  status: "draft",     lastUpdated: "2025-01-27" },
  { id: "6",  title: "Morning Intentions",      source: "Work on Me",  day: "Day 4",  status: "published", lastUpdated: "2025-03-10" },
  { id: "7",  title: "Evening Reflection",      source: "Wellth Plan", day: "Day 7",  status: "published", lastUpdated: "2025-03-12" },
  { id: "8",  title: "Strength & Surrender",    source: "Work on Me",  day: "Day 5",  status: "draft",     lastUpdated: "2025-02-20" },
  { id: "9",  title: "Roots of Gratitude",      source: "Wellth Plan", day: "Day 10", status: "published", lastUpdated: "2025-04-01" },
  { id: "10", title: "The Quiet Within",        source: "Work on Me",  day: "Day 6",  status: "draft",     lastUpdated: "2025-04-05" },
  { id: "11", title: "Clarity in Chaos",        source: "Wellth Plan", day: "Day 14", status: "published", lastUpdated: "2025-04-10" },
  { id: "12", title: "Body & Breath",           source: "Work on Me",  day: "Day 3",  status: "published", lastUpdated: "2025-04-15" },
  { id: "13", title: "Letting Go",              source: "Wellth Plan", day: "Day 21", status: "draft",     lastUpdated: "2025-04-20" },
  { id: "14", title: "Seeds of Joy",            source: "Work on Me",  day: "Day 7",  status: "published", lastUpdated: "2025-05-01" },
  { id: "15", title: "Purposeful Living",       source: "Wellth Plan", day: "Day 28", status: "draft",     lastUpdated: "2025-05-05" },
  { id: "16", title: "Compassion First",        source: "Work on Me",  day: "Day 2",  status: "published", lastUpdated: "2025-05-10" },
  { id: "17", title: "The Healing Path",        source: "Wellth Plan", day: "Day 15", status: "published", lastUpdated: "2025-05-12" },
  { id: "18", title: "Open Heart Practice",     source: "Work on Me",  day: "Day 1",  status: "draft",     lastUpdated: "2025-05-15" },
  { id: "19", title: "Vision of Peace",         source: "Wellth Plan", day: "Day 30", status: "published", lastUpdated: "2025-05-20" },
  { id: "20", title: "Trust the Process",       source: "Work on Me",  day: "Day 7",  status: "draft",     lastUpdated: "2025-05-22" },
];

export const journalService: IJournalService = {
  getEntries: async (): Promise<JournalEntry[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return MOCK_ENTRIES;
  },
};
