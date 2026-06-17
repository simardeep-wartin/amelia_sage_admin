"use client";

import { useState, useEffect } from "react";
import type { PanelItem } from "@/types";
import {
  wealthPlans as wealthPlanPayloads,
  exercises as exercisePayloads,
  introScreen as introScreenPayloads,
} from "@/lib/payloads";
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
      plan?.intro_title || plan?.intro_description
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
    const payload = wealthPlanPayloads.create(
      s(data.name),
      s(data.sub_title),
      data.icon instanceof File ? URL.createObjectURL(data.icon) : undefined,
    );
    try {
      await createWealthPlan(payload);
      setPlansLoading(true);
      const res = await getWealthPlans();
      setPlans(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setPlansLoading(false);
    }
  };

  const handleSaveIntro = (data: Record<string, unknown>) => {
    if (!selectedPlanId) return;
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
    updateIntroScreen(selectedPlanId, payload).then(() =>
      setPlanIntroScreen({
        greet: payload.subtitle,
        sub_content: payload.sage_says,
        description: payload.description,
        intro_title: payload.intro_title ?? "",
        intro_description: payload.intro_description ?? "",
        focused_intentions: payload.focused_intentions ?? [],
      }),
    );
  };

  const handleSavePlan = (data: Record<string, unknown>) => {
    if (!editingPlanId) return;
    const payload = wealthPlanPayloads.update(s(data.title), s(data.sub_title));
    updateWealthPlan(editingPlanId, payload).then((res) =>
      setPlans(plans.map((p) => (p.id === editingPlanId ? { ...p, ...res.data } : p))),
    );
    setEditingPlanId(null);
  };

  const handleSaveExercise = async (data: Record<string, unknown>): Promise<void> => {
    if (!selectedPlanId) return;
    if (editingItem) {
      const payload = exercisePayloads.edit(
        s(data.title),
        s(data.description),
        data.is_draft === true,
      );
      setExercises(
        exercises.map((item) => (item.id === editingItem.id ? { ...item, ...payload } : item)),
      );
      const res = await updateWealthPlanExercise(selectedPlanId, s(editingItem.id), payload);
      setExercises(
        exercises.map((item) => (item.id === editingItem.id ? { ...item, ...res.data } : item)),
      );
    } else {
      const payload = exercisePayloads.create(
        s(data.title),
        s(data.description),
        data.is_draft === true,
      );
      const res = await createWealthPlanExercise(selectedPlanId, payload);
      setExercises([...exercises, res.data as unknown as PanelItem]);
      setPlans(
        plans.map((p) =>
          p.id === selectedPlanId ? { ...p, exercise_count: exercises.length + 1 } : p,
        ),
      );
    }
    setEditingItem(null);
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id));
    deleteWealthPlan(id).catch(() => getWealthPlans().then((res) => setPlans(res.data)));
  };

  const handleDeleteExercise = (id: string) => {
    if (!selectedPlanId) return;
    setExercises(exercises.filter((e) => e.id !== id));
    deleteWealthPlanExercise(selectedPlanId, id).catch(() =>
      getWealthPlanExercises(selectedPlanId).then((res) =>
        setExercises(res.data.exercises as unknown as PanelItem[]),
      ),
    );
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
