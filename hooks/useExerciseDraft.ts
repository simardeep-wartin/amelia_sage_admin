"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getJournalExercises,
  updateJournalExercise,
  deleteJournalExercise,
  type JournalExercisesParams,
} from "@/Services/api/journal/exercises";
import type { ExerciseDraftEntry } from "@/types";

const ITEMS_PER_PAGE = 5;

export type UseExerciseDraftParams = {
  source?: JournalExercisesParams["source"];
  search?: string;
  page: number;
};

export function useExerciseDraft(params: UseExerciseDraftParams) {
  const [entries, setEntries] = useState<ExerciseDraftEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getJournalExercises({
      source: params.source,
      search: params.search,
      page: params.page,
      page_size: ITEMS_PER_PAGE,
    })
      .then((res) => {
        if (cancelled) return;
        setEntries(res.data.items);
        setTotal(res.data.total);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to fetch exercise draft entries");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
        setIsInitialLoad(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params.source, params.search, params.page]);

  const handleSaveEdit = useCallback(
    async (entry: ExerciseDraftEntry, data: Record<string, unknown>) => {
      await updateJournalExercise(entry, {
        title: data.title as string,
        description: (data.description as string) ?? "",
      });
      const res = await getJournalExercises({
        source: params.source,
        search: params.search,
        page: params.page,
        page_size: ITEMS_PER_PAGE,
      });
      setEntries(res.data.items);
      setTotal(res.data.total);
    },
    [params.source, params.search, params.page],
  );

  const handleDelete = useCallback(
    async (entry: ExerciseDraftEntry) => {
      await deleteJournalExercise(entry);
      const res = await getJournalExercises({
        source: params.source,
        search: params.search,
        page: params.page,
        page_size: ITEMS_PER_PAGE,
      });
      setEntries(res.data.items);
      setTotal(res.data.total);
    },
    [params.source, params.search, params.page],
  );

  return {
    entries,
    total,
    loading,
    isInitialLoad,
    error,
    itemsPerPage: ITEMS_PER_PAGE,
    handleSaveEdit,
    handleDelete,
  };
}
