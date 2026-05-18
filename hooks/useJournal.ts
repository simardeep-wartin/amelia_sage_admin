"use client";

import { useState, useEffect } from "react";
import { journalService } from "@/Services/journalService";
import { JournalEntry } from "@/types/journal";

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const data = await journalService.getEntries();
      setEntries(data);
    } catch {
      setError("Failed to fetch journal entries");
    } finally {
      setLoading(false);
    }
  };

  return { entries, loading, error, refetch: fetchEntries };
}
