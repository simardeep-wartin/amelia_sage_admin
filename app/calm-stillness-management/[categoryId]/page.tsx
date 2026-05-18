"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import ExerciseGridView from "@/components/mindful-exercise/ExerciseGridView";
import MindfulExerciseLoader from "@/components/loaders/mindful-exercise-loader";
import { calmAndStillnessService } from "@/Services/calmAndStillnessService";
import { ExerciseSubCategory } from "@/types/mindful-exercise";

export default function CalmCategoryExercisePage() {
  const { categoryId } = useParams();
  const [subCategory, setSubCategory] = useState<ExerciseSubCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategory();
    }
  }, [categoryId]);

  const fetchSubCategory = async () => {
    setLoading(true);
    try {
      const data = await calmAndStillnessService.getSubCategoryById(categoryId as string);
      setSubCategory(data);
    } catch (err) {
      console.error("Failed to fetch sub-category", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <PageLayout title="Calm & Stillness Management">
      <MindfulExerciseLoader type="grid" />
    </PageLayout>
  );

  if (!subCategory) return (
    <PageLayout title="Calm & Stillness Management">
      <div className="p-8 text-charcoal">Category not found</div>
    </PageLayout>
  );

  return (
    <PageLayout title="Calm & Stillness Management">
      <ExerciseGridView
        subCategory={subCategory}
        managementTitle="Calm & Stillness Management"
      />
    </PageLayout>
  );
}
