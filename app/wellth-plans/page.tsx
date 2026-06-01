"use client";

import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import MetricCard from "@/components/common/MetricCard";
import Card from "@/components/common/Card";
import Button from "@/components/ui/Button";
import ActionCard from "@/components/common/ActionCard";
import { ArrowUpRightIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import DynamicModal from "@/components/common/DynamicModal";
import DynamicSidePanel from "@/components/common/DynamicSidePanel";
import type { PanelItem } from "@/types";
import { WELLTH_MODAL_CONFIG } from "@/lib/wellth-plans.config";
import {
  wealthPlans as wealthPlanPayloads,
  exercises as exercisePayloads,
  introScreen as introScreenPayloads,
} from "@/lib/payloads";
import WellthPlanLoader from "@/components/loaders/wellth-plan-loader";
import {
  getWealthPlansOverview,
  type WealthPlansOverviewData,
  getWealthPlans,
  type WealthPlan,
  getWealthPlanExercises,
  createWealthPlan,
  updateWealthPlan,
  createWealthPlanExercise,
  updateWealthPlanExercise,
  deleteWealthPlanExercise,
  updateIntroScreen,
} from "@/Services/api/wealthPlans";

export default function WellthPlansPage() {
  const [loading, setLoading] = useState(true);
  const [wealthOverview, setWealthOverview] = useState<WealthPlansOverviewData | null>(null);
  const [plans, setPlans] = useState<WealthPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [isDynamicModalOpen, setIsDynamicModalOpen] = useState(false);
  const [modalConfigKey, setModalConfigKey] = useState<string>("addExercise");
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

  const [exercises, setExercises] = useState<Record<string, PanelItem[]>>({});
  const [exercisesLoading, setExercisesLoading] = useState(false);
  const [planIntroScreen, setPlanIntroScreen] = useState<{
    intro_title: string;
    intro_description: string;
  } | null>(null);

  useEffect(() => {
    if (!selectedPlanId) return;
    setExercisesLoading(true);
    getWealthPlanExercises(selectedPlanId)
      .then((res) => {
        setExercises((prev) => ({
          ...prev,
          [selectedPlanId]: res.data.exercises as unknown as PanelItem[],
        }));
        setPlanIntroScreen(
          res.data.intro_title || res.data.intro_description
            ? { intro_title: res.data.intro_title, intro_description: res.data.intro_description }
            : null,
        );
      })
      .finally(() => setExercisesLoading(false));
  }, [selectedPlanId]);

  const handleAddPlan = async (data: Record<string, unknown>) => {
    const payload = wealthPlanPayloads.create(
      String(data.name ?? ""),
      String(data.sub_title ?? ""),
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
    const payload = introScreenPayloads.update(
      String(data.subtitle ?? ""),
      String(data.sageSays ?? ""),
      String(data.description ?? ""),
    );
    updateIntroScreen(selectedPlanId, payload);
  };

  const handleSavePlan = (data: Record<string, unknown>) => {
    if (!editingPlanId) return;
    const payload = wealthPlanPayloads.update(
      String(data.title ?? ""),
      String(data.sub_title ?? ""),
    );
    updateWealthPlan(editingPlanId, payload).then((res) => {
      setPlans((prev) =>
        prev.map((plan) => (plan.id === editingPlanId ? { ...plan, ...res.data } : plan)),
      );
    });
    setEditingPlanId(null);
  };

  const handleAddExercise = (data: Record<string, unknown>) => {
    if (!selectedPlanId) return;
    const payload = exercisePayloads.create(
      String(data.title ?? ""),
      String(data.description ?? ""),
    );
    createWealthPlanExercise(selectedPlanId, payload).then((res) => {
      setExercises((prev) => ({
        ...prev,
        [selectedPlanId]: [...(prev[selectedPlanId] || []), res.data as unknown as PanelItem],
      }));
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === selectedPlanId
            ? { ...plan, exercise_count: (exercises[selectedPlanId]?.length || 0) + 1 }
            : plan,
        ),
      );
    });
  };

  const handleSaveExercise = (data: Record<string, unknown>) => {
    if (!selectedPlanId) return;

    if (editingItem) {
      const payload = exercisePayloads.edit(
        String(data.title ?? ""),
        String(data.description ?? ""),
      );

      // Optimistic update
      setExercises((prev) => ({
        ...prev,
        [selectedPlanId]: prev[selectedPlanId].map((item) =>
          item.id === editingItem.id ? { ...item, ...payload } : item,
        ),
      }));

      // Persist to API
      updateWealthPlanExercise(selectedPlanId, String(editingItem.id), payload).then((res) => {
        // Reconcile with server response
        setExercises((prev) => ({
          ...prev,
          [selectedPlanId]: prev[selectedPlanId].map((item) =>
            item.id === editingItem.id ? { ...item, ...res.data } : item,
          ),
        }));
      });
    } else {
      handleAddExercise(data);
    }
    setEditingItem(null);
  };

  const openModal = (configKey: string) => {
    setEditingItem(null);
    setModalConfigKey(configKey);
    setIsDynamicModalOpen(true);
  };

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
  const currentExercises: PanelItem[] = selectedPlanId ? (exercises[selectedPlanId] ?? []) : [];

  if (loading) return <WellthPlanLoader />;

  return (
    <PageLayout title="Wellth Plans">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] sm:text-[28px] font-bold text-charcoal tracking-tight">
              Wellth Plans
            </h1>
            <p className="text-sm font-bold text-grey">Dashboard / Content / Wellth Plans</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-sageGreen hover:bg-transparent hover:border cursor-pointer hover:text-sageGreen font-semibold px-0 sm:px-4"
            >
              <ArrowUpRightIcon className="h-4 w-4" /> Go to Drafts
            </Button>
            <Button
              onClick={() => setIsAddPlanModalOpen(true)}
              variant="solid"
              className="bg-[#8EB19D] hover:bg-[#7fa18c] px-6"
              leftIcon={<PlusIcon className="h-5 w-5" />}
            >
              Create New Wellth Plan
            </Button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Plans"
            value={wealthOverview != null ? String(wealthOverview.active_plans) : "—"}
            subtitle="Published plans"
            subtitleColor="#71717A"
            iconSrc="/auth/leaves.png"
          />
          <MetricCard
            title="Total Participants"
            value={wealthOverview != null ? String(wealthOverview.total_participants) : "—"}
            subtitle="+23% this month"
            subtitleColor="#4BB05D"
            iconSrc="/auth/multipleUser.svg"
          />
          <MetricCard
            title="Average Completion"
            value={wealthOverview != null ? `${wealthOverview.average_completion}%` : "—"}
            subtitle="+5% this week"
            subtitleColor="#4BB05D"
            iconSrc="/auth/growth.svg"
          />
          <MetricCard
            title="New This Month"
            value={wealthOverview != null ? String(wealthOverview.new_this_month) : "—"}
            subtitle="Enrollments"
            subtitleColor="#71717A"
            iconSrc="/auth/calander.svg"
          />
        </div>

        {/* Plans List */}
        <Card title="Your Wellth Plan" className="p-6 md:p-8">
          <p className="mb-8 text-[15px] text-grey -mt-3">
            Define and manage focus areas that help users work on specific aspects of their
            wellbeing.
          </p>

          <div className="flex flex-col gap-4">
            {plansLoading
              ? Array.from({ length: plans.length || 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[72px] animate-pulse rounded-xl border border-cardBorder bg-[#F3F4F6]"
                    style={{ animationDelay: `${i * 60}ms` }}
                  />
                ))
              : plans.map((plan) => (
                  <ActionCard
                    key={plan.id}
                    title={plan.title}
                    subtitle={plan.sub_title}
                    mainValue={plan.exercise_count}
                    mainLabel="Exercises"
                    icon={
                      <img
                        src={plan.image_url || "/auth/circle.svg"}
                        alt={plan.title}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    }
                    onSecondaryAction={() => {
                      setEditingPlanId(plan.id);
                      setEditingItem({ title: plan.title, sub_title: plan.sub_title });
                      setModalConfigKey("editPlan");
                      setIsDynamicModalOpen(true);
                    }}
                    secondaryActionIcon={<PencilSquareIcon className="h-5 w-5 text-slate-500" />}
                    secondaryActionClassName="border border-cardBorder bg-white hover:bg-softstone"
                    onAction={() => setSelectedPlanId(plan.id)}
                    actionIcon={<ArrowUpRightIcon className="h-6 w-6 text-sageGreen" />}
                    actionClassName="border-none bg-transparent hover:bg-softstone"
                  />
                ))}
          </div>
        </Card>
      </div>

      {/* Modals */}
      <DynamicModal
        isOpen={isAddPlanModalOpen}
        onClose={() => setIsAddPlanModalOpen(false)}
        config={WELLTH_MODAL_CONFIG.addWellthPlan}
        onSave={handleAddPlan}
      />

      <DynamicModal
        isOpen={isDynamicModalOpen}
        onClose={() => {
          setIsDynamicModalOpen(false);
          setEditingItem(null);
        }}
        config={WELLTH_MODAL_CONFIG[modalConfigKey]}
        initialData={editingItem ?? undefined}
        onSave={
          modalConfigKey === "editPlan"
            ? handleSavePlan
            : modalConfigKey === "addIntro"
              ? handleSaveIntro
              : handleSaveExercise
        }
        onSaveDraft={(data) => console.warn("Draft Saved:", data)}
      />

      {/* Side Panel */}
      <DynamicSidePanel
        isOpen={!!selectedPlanId}
        onClose={() => setSelectedPlanId(null)}
        title={
          exercisesLoading ? "Loading exercises…" : `Manage ${selectedPlan?.title ?? ""} exercises`
        }
        items={currentExercises}
        introScreen={planIntroScreen}
        loading={exercisesLoading}
        onAction={(action) => {
          if (action === "addIntro" && planIntroScreen) {
            setEditingItem({
              subtitle: planIntroScreen.intro_title,
              sageSays: "",
              description: planIntroScreen.intro_description,
            });
            setModalConfigKey("addIntro");
            setIsDynamicModalOpen(true);
          } else {
            openModal(action);
          }
        }}
        onEditItem={(item) => {
          setEditingItem(item);
          setModalConfigKey(item.sageSays ? "addIntro" : "addExercise");
          setIsDynamicModalOpen(true);
        }}
        onDeleteItem={(id) => {
          if (!selectedPlanId) return;
          // Optimistic remove
          setExercises((prev) => ({
            ...prev,
            [selectedPlanId]: prev[selectedPlanId].filter((exercise) => exercise.id !== id),
          }));
          // Persist to API
          deleteWealthPlanExercise(selectedPlanId, id).catch(() => {
            // Rollback on failure — re-fetch exercises for this plan
            getWealthPlanExercises(selectedPlanId).then((res) => {
              setExercises((prev) => ({
                ...prev,
                [selectedPlanId]: res.data.exercises as unknown as PanelItem[],
              }));
            });
          });
        }}
      />
    </PageLayout>
  );
}
