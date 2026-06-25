"use client";

import { useState, useEffect } from "react";
import {
  getWorkOnMeOverview,
  getFeelings,
  getFocusAreas,
  createFeeling,
  updateFeeling,
  deleteFeeling,
  createFocusArea,
  updateFocusArea,
  deleteFocusArea,
  type WorkOnMeOverviewData,
  type FeelingItem,
  type FocusAreaItem,
} from "@/Services/api/workOnMe";
import { feelings as feelingPayloads, focusAreas as focusAreaPayloads } from "@/lib/payloads";

export type ManagedCategory = {
  id: string;
  title: string;
  type: "feeling" | "focus-area";
} | null;

export function useWorkOnMe() {
  const [loading, setLoading] = useState(true);
  const [feelingsLoading, setFeelingsLoading] = useState(false);
  const [focusAreasLoading, setFocusAreasLoading] = useState(false);
  const [overview, setOverview] = useState<WorkOnMeOverviewData | null>(null);
  const [feelings, setFeelings] = useState<FeelingItem[]>([]);
  const [focusAreas, setFocusAreas] = useState<FocusAreaItem[]>([]);
  const [isEmotionModalOpen, setIsEmotionModalOpen] = useState(false);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [managedCategory, setManagedCategory] = useState<ManagedCategory>(null);
  const [editingFeeling, setEditingFeeling] = useState<FeelingItem | null>(null);
  const [editingFocusArea, setEditingFocusArea] = useState<FocusAreaItem | null>(null);

  useEffect(() => {
    Promise.all([getWorkOnMeOverview(), getFeelings(), getFocusAreas()])
      .then(([overviewRes, feelingsRes, focusRes]) => {
        setOverview(overviewRes.data);
        setFeelings(feelingsRes.data ?? []);
        setFocusAreas(focusRes.data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddEmotion = (data: Record<string, unknown>) => {
    const payload = feelingPayloads.create(data.name as string, data.description as string);
    createFeeling(payload)
      .then(() => {
        setIsEmotionModalOpen(false);
        setFeelingsLoading(true);
        return getFeelings();
      })
      .then((res) => setFeelings(res.data ?? []))
      .catch(console.error)
      .finally(() => setFeelingsLoading(false));
  };

  const handleAddFocus = (data: Record<string, unknown>) => {
    const payload = focusAreaPayloads.create(
      data.name as string,
      data.description as string,
      focusAreas.length + 1,
    );
    createFocusArea(payload)
      .then(() => {
        setIsFocusModalOpen(false);
        setFocusAreasLoading(true);
        return getFocusAreas();
      })
      .then((res) => setFocusAreas(res.data ?? []))
      .catch(console.error)
      .finally(() => setFocusAreasLoading(false));
  };

  const handleDeleteFeeling = (id: string) => {
    setFeelings((prev) => prev.filter((f) => f.id !== id));
    deleteFeeling(id)
      .then(() => getWorkOnMeOverview().then((res) => setOverview(res.data)))
      .catch(console.error);
  };

  const handleDeleteFocusArea = (id: string) => {
    setFocusAreas((prev) => prev.filter((f) => f.id !== id));
    deleteFocusArea(id)
      .then(() => getWorkOnMeOverview().then((res) => setOverview(res.data)))
      .catch(console.error);
  };

  const handleCategoryExerciseCountChange = (
    categoryId: string,
    type: "feeling" | "focus-area",
    count: number,
  ) => {
    if (type === "feeling") {
      setFeelings((prev) =>
        prev.map((f) => (f.id === categoryId ? { ...f, exercise_count: count } : f)),
      );
    } else {
      setFocusAreas((prev) =>
        prev.map((f) => (f.id === categoryId ? { ...f, exercise_count: count } : f)),
      );
    }
    getWorkOnMeOverview()
      .then((res) => setOverview(res.data))
      .catch(console.error);
  };

  const handleEditEmotion = (data: Record<string, unknown>) => {
    if (!editingFeeling) return;
    const imageUrl = (data.existing_image_url as string) || editingFeeling.image_url;
    const payload = feelingPayloads.update(
      data.name as string,
      data.description as string,
      imageUrl,
    );
    updateFeeling(editingFeeling.id, payload)
      .then(() => {
        setFeelings((prev) =>
          prev.map((feeling) =>
            feeling.id === editingFeeling.id
              ? { ...feeling, title: payload.title, description: payload.description }
              : feeling,
          ),
        );
      })
      .catch(console.error)
      .finally(() => setEditingFeeling(null));
  };

  const handleEditFocusArea = (data: Record<string, unknown>) => {
    if (!editingFocusArea) return;
    const imageUrl = (data.existing_image_url as string) || editingFocusArea.image_url;
    const payload = focusAreaPayloads.update(
      data.name as string,
      data.description as string,
      imageUrl,
    );
    updateFocusArea(editingFocusArea.id, payload)
      .then(() => {
        setFocusAreas((prev) =>
          prev.map((area) =>
            area.id === editingFocusArea.id
              ? { ...area, title: payload.title, description: payload.description }
              : area,
          ),
        );
      })
      .catch(console.error)
      .finally(() => setEditingFocusArea(null));
  };

  return {
    loading,
    feelingsLoading,
    focusAreasLoading,
    overview,
    feelings,
    focusAreas,
    isEmotionModalOpen,
    setIsEmotionModalOpen,
    isFocusModalOpen,
    setIsFocusModalOpen,
    managedCategory,
    setManagedCategory,
    editingFeeling,
    setEditingFeeling,
    editingFocusArea,
    setEditingFocusArea,
    handleAddEmotion,
    handleAddFocus,
    handleEditEmotion,
    handleEditFocusArea,
    handleDeleteFeeling,
    handleDeleteFocusArea,
    handleCategoryExerciseCountChange,
  };
}

export type WorkOnMeState = ReturnType<typeof useWorkOnMe>;
