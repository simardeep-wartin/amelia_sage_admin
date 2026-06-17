"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/components/common/Card";
import Button from "@/components/ui/Button";
import ActionCard from "@/components/common/ActionCard";
import MetricCard from "@/components/common/MetricCard";
import DynamicModal from "@/components/common/DynamicModal";
import DynamicSidePanel from "@/components/common/DynamicSidePanel";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import {
  ArrowUpRightIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { WELLTH_MODAL_CONFIG } from "@/lib/wellth-plans.config";
import type { WellthPlansState } from "@/hooks/useWellthPlans";

type Props = Omit<WellthPlansState, "loading">;

export default function WellthPlansMain({
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
  editingPlanId: _editingPlanId,
  setEditingPlanId,
  handleAddPlan,
  handleSaveIntro,
  handleSavePlan,
  handleSaveExercise,
  handleDeletePlan,
  handleDeleteExercise,
  openModal,
}: Props) {
  const router = useRouter();
  const [pendingDeletePlan, setPendingDeletePlan] = useState<{ id: string; title: string } | null>(
    null,
  );

  const onSaveMap: Record<string, (data: Record<string, unknown>) => void> = {
    editPlan: handleSavePlan,
    addIntro: handleSaveIntro,
  };

  const onSaveDraftMap: Record<string, (data: Record<string, unknown>) => void> = {
    addIntro: handleSaveIntro,
    addExercise: handleSaveExercise,
  };

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const currentExercises = selectedPlanId ? exercises : [];

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] sm:text-[28px] font-bold text-charcoal tracking-tight font-arial">
              Wellth Plans
            </h1>
            <p className="text-sm font-bold text-grey font-arial">
              Dashboard / Content / Wellth Plans
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-sageGreen hover:bg-transparent hover:border cursor-pointer hover:text-sageGreen !font-bold px-0 sm:px-4 text-[16px]"
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
          <p className="mb-8 text-s text-grey -mt-3">
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
                      <Image
                        unoptimized
                        src={plan.image_url || "/auth/circle.svg"}
                        alt={plan.title}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    }
                    onDeleteAction={() => setPendingDeletePlan({ id: plan.id, title: plan.title })}
                    deleteActionIcon={<TrashIcon className="h-5 w-5" />}
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
        onSaveDraft={onSaveDraftMap[modalConfigKey]}
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

      <DeleteConfirmationModal
        isOpen={!!pendingDeletePlan}
        onClose={() => setPendingDeletePlan(null)}
        onConfirm={() => {
          if (pendingDeletePlan) handleDeletePlan(pendingDeletePlan.id);
          setPendingDeletePlan(null);
        }}
        itemName={pendingDeletePlan?.title ?? ""}
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
        onDeleteItem={handleDeleteExercise}
      />
    </>
  );
}
