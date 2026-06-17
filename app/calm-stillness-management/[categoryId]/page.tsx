"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import ExerciseGridView from "@/components/mindful-exercise/ExerciseGridView";
import MindfulExerciseLoader from "@/components/loaders/mindful-exercise-loader";
import { calmAndStillnessService } from "@/Services/calmAndStillnessService";
import type { ExerciseSubCategory } from "@/types";

export default function CalmCategoryExercisePage() {
  const { categoryId } = useParams();
  const [subCategory, setSubCategory] = useState<ExerciseSubCategory | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubCategory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await calmAndStillnessService.getSubCategoryById(categoryId as string);
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
      <PageLayout title="Calm & Stillness Management">
        <MindfulExerciseLoader type="grid" />
      </PageLayout>
    );

  if (!subCategory)
    return (
      <PageLayout title="Calm & Stillness Management">
        <div className="p-8 text-charcoal">Category not found</div>
      </PageLayout>
    );

  return (
    <PageLayout title="Calm & Stillness Management">
      <ExerciseGridView subCategory={subCategory} managementTitle="Calm & Stillness Management" />
    </PageLayout>
  );
}
