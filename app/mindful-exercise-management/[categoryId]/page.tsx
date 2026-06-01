"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import ExerciseGridView from "@/components/mindful-exercise/ExerciseGridView";
import MindfulExerciseLoader from "@/components/loaders/mindful-exercise-loader";
import { mindfulExerciseService } from "@/Services/mindfulExerciseService";
import type { ExerciseSubCategory } from "@/types";

export default function CategoryExercisePage() {
  const { categoryId } = useParams();
  const [subCategory, setSubCategory] = useState<ExerciseSubCategory | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubCategory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mindfulExerciseService.getSubCategoryById(categoryId as string);
      setSubCategory(data);
    } catch (err) {
      console.error("Failed to fetch sub-category", err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategory();
    }
  }, [categoryId, fetchSubCategory]);

  if (loading)
    return (
      <PageLayout title="Mindful Exercise Management">
        <MindfulExerciseLoader type="grid" />
      </PageLayout>
    );

  if (!subCategory)
    return (
      <PageLayout title="Mindful Exercise Management">
        <div className="p-8 text-charcoal">Category not found</div>
      </PageLayout>
    );

  return (
    <PageLayout title="Mindful Exercise Management">
      <ExerciseGridView subCategory={subCategory} />
    </PageLayout>
  );
}
