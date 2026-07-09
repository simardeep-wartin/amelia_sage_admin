"use client";

import { useState, useEffect } from "react";
import type { PanelItem } from "@/types";
import {
  wealthPlans as wealthPlanPayloads,
  exercises as exercisePayloads,
  introScreen as introScreenPayloads,
} from "@/lib/payloads";
import { uploadImage } from "@/lib/uploadImage";
import { useStatusModal, errorMessage } from "@/hooks/useStatusModal";
import {
  getWealthPlansOverview,
  type WealthPlansOverviewData,
  getWealthPlans,
  type WealthPlan,
  getWealthPlanExercises,
  createWealthPlan,
  updateWealthPlan,
  deleteWealthPlan,
  createWealthPlanExercise,
  updateWealthPlanExercise,
  deleteWealthPlanExercise,
  updateIntroScreen,
} from "@/Services/api/wealthPlans";

export type IntroScreen = {
  greet: string;
  sub_content: string;
  description: string;
  intro_title: string;
  intro_description: string;
  focused_intentions: string[];
};

const s = (v: unknown) => String(v ?? "");

export function useWellthPlans() {
  const [loading, setLoading] = useState(true);
  const [wealthOverview, setWealthOverview] = useState<WealthPlansOverviewData | null>(null);
  const [plans, setPlans] = useState<WealthPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [exercises, setExercises] = useState<PanelItem[]>([]);
  const [exercisesLoading, setExercisesLoading] = useState(false);
  const [planIntroScreen, setPlanIntroScreen] = useState<IntroScreen | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [isDynamicModalOpen, setIsDynamicModalOpen] = useState(false);
  const [modalConfigKey, setModalConfigKey] = useState("addExercise");
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const { statusModalProps, showSuccess, showFailure } = useStatusModal();

  useEffect(() => {
    Promise.all([getWealthPlansOverview(), getWealthPlans()])
      .then(([ov, pl]) => {
        setWealthOverview(ov.data);
        setPlans(pl.data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedPlanId) return;
    setExercises([]);
    setExercisesLoading(true);
    getWealthPlanExercises(selectedPlanId)
      .then((res) => setExercises(res.data.exercises as unknown as PanelItem[]))
      .finally(() => setExercisesLoading(false));
  }, [selectedPlanId]);

  useEffect(() => {
    if (!selectedPlanId) return;
    const plan = plans.find((p) => p.id === selectedPlanId);
    setPlanIntroScreen(
      plan?.greet ||
        plan?.sub_content ||
        plan?.description ||
        plan?.intro_title ||
        plan?.intro_description
        ? {
            greet: plan.greet ?? "",
            sub_content: plan.sub_content ?? "",
            description: plan.description ?? "",
            intro_title: plan.intro_title ?? "",
            intro_description: plan.intro_description ?? "",
            focused_intentions: plan.focused_intentions ?? [],
          }
        : null,
    );
  }, [selectedPlanId, plans]);

  const handleAddPlan = async (data: Record<string, unknown>) => {
    const imageUrl = data.icon instanceof File ? await uploadImage(data.icon) : undefined;
    const payload = wealthPlanPayloads.create(s(data.name), s(data.sub_title), imageUrl);
    try {
      await createWealthPlan(payload);
      setPlansLoading(true);
      const [res, overviewRes] = await Promise.all([getWealthPlans(), getWealthPlansOverview()]);
      setPlans(res.data);
      setWealthOverview(overviewRes.data);
      showSuccess("add", "Wellth Plan", payload.title);
    } catch (e) {
      showFailure("add", "Wellth Plan", payload.title, errorMessage(e));
    } finally {
      setPlansLoading(false);
    }
  };

  const handleSaveIntro = async (data: Record<string, unknown>) => {
    if (!selectedPlanId) return;
    const wasEditing = !!planIntroScreen;
    const d = data as Record<string, string>;
    const focusedIntentions = (d.subIntroFocusedIntension ?? "")
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
    const payload = introScreenPayloads.update(
      d.subtitle ?? "",
      d.sageSays ?? "",
      d.description ?? "",
      data.is_draft === true,
      d.subIntroTitle ?? "",
      d.subIntroDescription ?? "",
      focusedIntentions,
    );
    try {
      await updateIntroScreen(selectedPlanId, payload);
      setPlanIntroScreen({
        greet: payload.subtitle,
        sub_content: payload.sage_says,
        description: payload.description,
        intro_title: payload.intro_title ?? "",
        intro_description: payload.intro_description ?? "",
        focused_intentions: payload.focused_intentions ?? [],
      });
      // Refresh the plans list so the saved intro is read back on reopen.
      const res = await getWealthPlans();
      setPlans(res.data);
      showSuccess(wasEditing ? "edit" : "add", "Intro Screen", payload.subtitle);
    } catch (e) {
      showFailure(wasEditing ? "edit" : "add", "Intro Screen", payload.subtitle, errorMessage(e));
    }
  };

  const handleSavePlan = (data: Record<string, unknown>) => {
    if (!editingPlanId) return;
    const imageUrl = (data.existing_image_url as string) || "";
    const payload = wealthPlanPayloads.update(s(data.title), s(data.sub_title), imageUrl);
    updateWealthPlan(editingPlanId, payload)
      .then((res) => {
        setPlans(plans.map((p) => (p.id === editingPlanId ? { ...p, ...res.data } : p)));
        showSuccess("edit", "Wellth Plan", payload.title);
      })
      .catch((e) => showFailure("edit", "Wellth Plan", payload.title, errorMessage(e)));
    setEditingPlanId(null);
  };

  const handleSaveExercise = async (data: Record<string, unknown>): Promise<void> => {
    if (!selectedPlanId) return;
    const isEditing = !!editingItem;
    const isDraft = data.is_draft === true;
    const title = s(data.title);
    try {
      if (editingItem) {
        const payload = exercisePayloads.edit(s(data.title), s(data.description), isDraft);
        setExercises(
          exercises.map((item) => (item.id === editingItem.id ? { ...item, ...payload } : item)),
        );
        const res = await updateWealthPlanExercise(selectedPlanId, s(editingItem.id), payload);
        setExercises(
          exercises.map((item) => (item.id === editingItem.id ? { ...item, ...res.data } : item)),
        );
      } else {
        const payload = exercisePayloads.create(s(data.title), s(data.description), isDraft);
        await createWealthPlanExercise(selectedPlanId, payload);
        setExercisesLoading(true);
        const refreshed = await getWealthPlanExercises(selectedPlanId);
        const refreshedExercises = refreshed.data.exercises as unknown as PanelItem[];
        setExercises(refreshedExercises);
        setPlans(
          plans.map((p) =>
            p.id === selectedPlanId ? { ...p, exercise_count: refreshedExercises.length } : p,
          ),
        );
      }
      showSuccess(isEditing ? "edit" : isDraft ? "draft" : "add", "Exercise", title);
    } catch (e) {
      showFailure(
        isEditing ? "edit" : isDraft ? "draft" : "add",
        "Exercise",
        title,
        errorMessage(e),
      );
    } finally {
      setExercisesLoading(false);
      setEditingItem(null);
    }
  };

  const handleDeletePlan = (id: string) => {
    const previous = plans;
    const title = previous.find((p) => p.id === id)?.title;
    setPlans(plans.filter((p) => p.id !== id));
    return deleteWealthPlan(id)
      .then(() => {
        showSuccess("delete", "Wellth Plan", title);
        return getWealthPlansOverview().then((res) => setWealthOverview(res.data));
      })
      .catch((e) => {
        setPlans(previous);
        showFailure("delete", "Wellth Plan", title, errorMessage(e));
      });
  };

  const handleDeleteExercise = (id: string) => {
    if (!selectedPlanId) return Promise.resolve();
    const previousExercises = exercises;
    const previousPlans = plans;
    const title = previousExercises.find((e) => e.id === id)?.title;
    const updatedExercises = exercises.filter((e) => e.id !== id);
    setExercises(updatedExercises);
    setPlans(
      plans.map((p) =>
        p.id === selectedPlanId ? { ...p, exercise_count: updatedExercises.length } : p,
      ),
    );
    return deleteWealthPlanExercise(selectedPlanId, id)
      .then(() => showSuccess("delete", "Exercise", title))
      .catch((e) => {
        setExercises(previousExercises);
        setPlans(previousPlans);
        showFailure("delete", "Exercise", title, errorMessage(e));
      });
  };

  const openModal = (key: string, item: Record<string, unknown> | null = null) => {
    setEditingItem(item);
    setModalConfigKey(key);
    setIsDynamicModalOpen(true);
  };

  return {
    loading,
    wealthOverview,
    plans,
    plansLoading,
    exercises,
    exercisesLoading,
    planIntroScreen,
    statusModalProps,
    selectedPlanId,
    setSelectedPlanId,
    isAddPlanModalOpen,
    setIsAddPlanModalOpen,
    isDynamicModalOpen,
    setIsDynamicModalOpen,
    modalConfigKey,
    editingItem,
    setEditingItem,
    editingPlanId,
    setEditingPlanId,
    handleAddPlan,
    handleSaveIntro,
    handleSavePlan,
    handleSaveExercise,
    handleDeletePlan,
    handleDeleteExercise,
    openModal,
  };
}

export type WellthPlansState = ReturnType<typeof useWellthPlans>;
