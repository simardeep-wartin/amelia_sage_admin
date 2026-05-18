"use client";

import { useState, useEffect, useCallback } from "react";
import { journalService } from "@/Services/journalService";
import { type JournalEntry } from "@/types/journal";

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await journalService.getEntries();
      setEntries(data);
    } catch {
      setError("Failed to fetch journal entries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return { entries, loading, error, refetch: fetchEntries };
}
