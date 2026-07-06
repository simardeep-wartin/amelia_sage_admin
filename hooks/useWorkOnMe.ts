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
import { uploadImage } from "@/lib/uploadImage";
import { useStatusModal, errorMessage } from "@/hooks/useStatusModal";

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
  const { statusModalProps, showSuccess, showFailure } = useStatusModal();

  useEffect(() => {
    Promise.all([getWorkOnMeOverview(), getFeelings(), getFocusAreas()])
      .then(([overviewRes, feelingsRes, focusRes]) => {
        setOverview(overviewRes.data);
        setFeelings(feelingsRes.data ?? []);
        setFocusAreas(focusRes.data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddEmotion = async (data: Record<string, unknown>) => {
    const imageUrl = data.icon instanceof File ? await uploadImage(data.icon) : undefined;
    const payload = feelingPayloads.create(
      data.name as string,
      data.description as string,
      imageUrl,
    );
    return createFeeling(payload)
      .then(() => {
        setFeelingsLoading(true);
        return getFeelings();
      })
      .then((res) => {
        setFeelings(res.data ?? []);
        showSuccess("add", "Emotion", payload.title);
      })
      .catch((e) => showFailure("add", "Emotion", payload.title, errorMessage(e)))
      .finally(() => setFeelingsLoading(false));
  };

  const handleAddFocus = async (data: Record<string, unknown>) => {
    const imageUrl = data.icon instanceof File ? await uploadImage(data.icon) : undefined;
    const payload = focusAreaPayloads.create(
      data.name as string,
      data.description as string,
      focusAreas.length + 1,
      imageUrl,
    );
    return createFocusArea(payload)
      .then(() => {
        setFocusAreasLoading(true);
        return getFocusAreas();
      })
      .then((res) => {
        setFocusAreas(res.data ?? []);
        showSuccess("add", "Focus Area", payload.title);
      })
      .catch((e) => showFailure("add", "Focus Area", payload.title, errorMessage(e)))
      .finally(() => setFocusAreasLoading(false));
  };

  const handleDeleteFeeling = (id: string) => {
    const previous = feelings;
    const title = previous.find((f) => f.id === id)?.title;
    setFeelings((prev) => prev.filter((f) => f.id !== id));
    return deleteFeeling(id)
      .then(() => {
        showSuccess("delete", "Emotion", title);
        return getWorkOnMeOverview().then((res) => setOverview(res.data));
      })
      .catch((e) => {
        setFeelings(previous);
        showFailure("delete", "Emotion", title, errorMessage(e));
      });
  };

  const handleDeleteFocusArea = (id: string) => {
    const previous = focusAreas;
    const title = previous.find((f) => f.id === id)?.title;
    setFocusAreas((prev) => prev.filter((f) => f.id !== id));
    return deleteFocusArea(id)
      .then(() => {
        showSuccess("delete", "Focus Area", title);
        return getWorkOnMeOverview().then((res) => setOverview(res.data));
      })
      .catch((e) => {
        setFocusAreas(previous);
        showFailure("delete", "Focus Area", title, errorMessage(e));
      });
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
    return updateFeeling(editingFeeling.id, payload)
      .then(() => {
        setFeelings((prev) =>
          prev.map((feeling) =>
            feeling.id === editingFeeling.id
              ? { ...feeling, title: payload.title, description: payload.description }
              : feeling,
          ),
        );
        showSuccess("edit", "Emotion", payload.title);
      })
      .catch((e) => showFailure("edit", "Emotion", payload.title, errorMessage(e)));
  };

  const handleEditFocusArea = (data: Record<string, unknown>) => {
    if (!editingFocusArea) return;
    const imageUrl = (data.existing_image_url as string) || editingFocusArea.image_url;
    const payload = focusAreaPayloads.update(
      data.name as string,
      data.description as string,
      imageUrl,
    );
    return updateFocusArea(editingFocusArea.id, payload)
      .then(() => {
        setFocusAreas((prev) =>
          prev.map((area) =>
            area.id === editingFocusArea.id
              ? { ...area, title: payload.title, description: payload.description }
              : area,
          ),
        );
        showSuccess("edit", "Focus Area", payload.title);
      })
      .catch((e) => showFailure("edit", "Focus Area", payload.title, errorMessage(e)));
  };

  return {
    loading,
    feelingsLoading,
    focusAreasLoading,
    overview,
    feelings,
    focusAreas,
    statusModalProps,
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
