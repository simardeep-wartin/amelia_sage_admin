"use client";

import { useState, useEffect, useCallback } from "react";
import { calmAndStillnessService } from "@/Services/calmAndStillnessService";
import { type ExerciseCategory } from "@/types/mindful-exercise";

export function useCalmAndStillness() {
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await calmAndStillnessService.getCategories();
      setCategories(data);
    } catch {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const getSubCategory = async (id: string) => {
    return await calmAndStillnessService.getSubCategoryById(id);
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    getSubCategory,
  };
}
