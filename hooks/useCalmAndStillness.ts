"use client";

import { useState, useEffect } from "react";
import { calmAndStillnessService } from "@/Services/calmAndStillnessService";
import { ExerciseCategory } from "@/types/mindful-exercise";

export function useCalmAndStillness() {
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await calmAndStillnessService.getCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

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
