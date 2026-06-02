"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

type IntroScreen = {
  greet: string;
  sub_content: string;
  description: string;
  intro_title: string;
  intro_description: string;
  focused_intentions: string[];
};

const s = (v: unknown) => String(v ?? "");

export default function WellthPlansPage() {
  const router = useRouter();
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

  const handleSaveExercise = (data: Record<string, unknown>) => {
    if (!selectedPlanId) return;
    if (editingItem) {
      const payload = exercisePayloads.edit(s(data.title), s(data.description));
      setExercises(
        exercises.map((item) => (item.id === editingItem.id ? { ...item, ...payload } : item)),
      );
      updateWealthPlanExercise(selectedPlanId, s(editingItem.id), payload).then((res) =>
        setExercises(
          exercises.map((item) => (item.id === editingItem.id ? { ...item, ...res.data } : item)),
        ),
      );
    } else {
      const payload = exercisePayloads.create(s(data.title), s(data.description));
      createWealthPlanExercise(selectedPlanId, payload).then((res) => {
        setExercises([...exercises, res.data as unknown as PanelItem]);
        setPlans(
          plans.map((p) =>
            p.id === selectedPlanId ? { ...p, exercise_count: exercises.length + 1 } : p,
          ),
        );
      });
    }
    setEditingItem(null);
  };

  const openModal = (key: string, item: Record<string, unknown> | null = null) => {
    setEditingItem(item);
    setModalConfigKey(key);
    setIsDynamicModalOpen(true);
  };

  const onSaveMap: Record<string, (data: Record<string, unknown>) => void> = {
    editPlan: handleSavePlan,
    addIntro: handleSaveIntro,
  };

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const currentExercises = selectedPlanId ? exercises : [];

  if (loading) return <WellthPlanLoader />;

  return (
    <PageLayout title="Wellth Plans">
      <div className="space-y-6">
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
              onClick={() => router.push("/journal-management")}
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
                    showSubtitle
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
                      openModal("editPlan", { title: plan.title, sub_title: plan.sub_title });
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
        onSave={onSaveMap[modalConfigKey] ?? handleSaveExercise}
        onSaveDraft={modalConfigKey === "addIntro" ? handleSaveIntro : undefined}
        overrideTitle={
          modalConfigKey === "addIntro"
            ? `Create Intro Screen for ${selectedPlan?.title ?? ""}`
            : undefined
        }
        tabTitles={
          modalConfigKey === "addIntro"
            ? {
                "Intro Screen": `Create Intro Screen for ${selectedPlan?.title ?? ""}`,
                "Sub-intro Screen": `Create Sub Intro for ${selectedPlan?.title ?? ""}`,
              }
            : undefined
        }
      />

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
            openModal("addIntro", {
              subtitle: planIntroScreen.greet,
              sageSays: planIntroScreen.sub_content,
              description: planIntroScreen.description,
              subIntroTitle: planIntroScreen.intro_title,
              subIntroDescription: planIntroScreen.intro_description,
              subIntroFocusedIntension: planIntroScreen.focused_intentions.join("\n"),
            });
          } else {
            openModal(action);
          }
        }}
        onEditItem={(item) => openModal(item.sageSays ? "addIntro" : "addExercise", item)}
        onDeleteItem={(id) => {
          if (!selectedPlanId) return;
          setExercises(exercises.filter((e) => e.id !== id));
          deleteWealthPlanExercise(selectedPlanId, id).catch(() =>
            getWealthPlanExercises(selectedPlanId).then((res) =>
              setExercises(res.data.exercises as unknown as PanelItem[]),
            ),
          );
        }}
      />
    </PageLayout>
  );
}
