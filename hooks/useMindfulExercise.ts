"use client";

import { useState, useEffect } from "react";
import { mindfulExerciseService } from "@/Services/mindfulExerciseService";
import { ExerciseCategory, ExerciseSubCategory } from "@/types/mindful-exercise";

export function useMindfulExercise() {
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await mindfulExerciseService.getCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const getSubCategory = async (id: string) => {
    return await mindfulExerciseService.getSubCategoryById(id);
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    getSubCategory,
  };
}
