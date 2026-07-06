"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/components/common/Card";
import Button from "@/components/ui/Button";
import ActionCard from "@/components/common/ActionCard";
import MetricCard from "@/components/common/MetricCard";
import ActionModal from "@/components/common/ActionModal";
import CategoryManagementPanel from "@/components/common/CategoryManagementPanel";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import StatusModal from "@/components/common/StatusModal";
import { ArrowUpRightIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { WorkOnMeState } from "@/hooks/useWorkOnMe";

type Props = Omit<WorkOnMeState, "loading">;

export default function WorkOnMeMain({
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
}: Props) {
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    title: string;
    type: "feeling" | "focus-area";
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-charcoal tracking-tight !font-arial">
              Work on Me Exercises
            </h1>
            <p className="text-sm font-medium text-grey !font-arial">
              Dashboard / Content / Work on me exercises
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-sageGreen hover:bg-transparent hover:border cursor-pointer hover:text-sageGreen !font-bold px-0 sm:px-4 text-[16px]"
            onClick={() => router.push("/exercises-draft-management")}
          >
            <ArrowUpRightIcon className="h-4 w-4" /> Go to Drafts
          </Button>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Total Emotional Flows"
            value={overview != null ? String(overview.total_emotional_flows) : "—"}
            subtitle="Active Flows"
            subtitleColor="#71717A"
            iconSrc="/auth/heartPurple.svg"
          />
          <MetricCard
            title="Focus Areas"
            value={overview != null ? String(overview.focus_areas) : "—"}
            subtitle="Active areas"
            subtitleColor="#71717A"
            iconSrc="/auth/circleTick.svg"
          />
          <MetricCard
            title="Total Exercises"
            value={overview != null ? String(overview.total_exercises) : "—"}
            subtitle="Across all flows"
            subtitleColor="#71717A"
            iconSrc="/auth/lock.svg"
          />
        </div>

        {/* Emotions / Feelings Section */}
        <Card
          title="Help me work through how I am feeling"
          actions={
            <Button
              onClick={() => setIsEmotionModalOpen(true)}
              variant="ghost"
              className="text-sageGreen hover:bg-transparent hover:text-sageGreen px-0 !font-bold sm:px-4 shrink-0 h-[28px]"
              leftIcon={<PlusIcon className="h-5 w-5" />}
            >
              Add New Emotion
            </Button>
          }
          className="p-6 md:p-8 font-bold"
        >
          <div className="mb-6 text-[15px] text-grey -mt-3 font-normal">
            Manage how users are guided through different emotional states with tailored exercise
            recommendations.
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {feelingsLoading
              ? Array.from({ length: feelings.length || 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[72px] animate-pulse rounded-xl border border-cardBorder bg-[#F3F4F6]"
                    style={{ animationDelay: `${i * 60}ms` }}
                  />
                ))
              : feelings.map((feeling) => (
                  <ActionCard
                    key={feeling.id}
                    title={feeling.title}
                    subtitle={feeling.description}
                    mainValue={feeling.exercise_count}
                    mainLabel="Exercises"
                    icon={
                      <Image
                        unoptimized
                        src={feeling.image_url || "/auth/circle.svg"}
                        alt={feeling.title}
                        width={32}
                        height={32}
                        className="h-10 w-10 object-contain"
                      />
                    }
                    onAction={() =>
                      setManagedCategory({ id: feeling.id, title: feeling.title, type: "feeling" })
                    }
                    hideActionButton
                    onSecondaryAction={() => setEditingFeeling(feeling)}
                    onDeleteAction={() =>
                      setPendingDelete({ id: feeling.id, title: feeling.title, type: "feeling" })
                    }
                    deleteActionIcon={<TrashIcon className="h-5 w-5" />}
                    titleClassName="text-slate !font-sans !text-[16px] !font-semibold"
                    mainValueClassName="text-slate font-semibold"
                  />
                ))}
          </div>
        </Card>

        {/* Focus Areas Section */}
        <Card
          title="Help me focus on a specific area"
          actions={
            <Button
              onClick={() => setIsFocusModalOpen(true)}
              variant="ghost"
              className="text-sageGreen hover:bg-transparent hover:text-sageGreen px-0 !font-bold sm:px-4 shrink-0 h-[28px]"
              leftIcon={<PlusIcon className="h-5 w-5" />}
            >
              Add New Focus
            </Button>
          }
          className="p-6 md:p-8 mb-10"
        >
          <p className="mb-6 text-[15px] text-grey -mt-3">
            Define and manage focus areas that help users work on specific aspects of their
            wellbeing.
          </p>

          <div className="flex flex-col gap-4">
            {focusAreasLoading
              ? Array.from({ length: focusAreas.length || 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[72px] animate-pulse rounded-xl border border-cardBorder bg-[#F3F4F6]"
                    style={{ animationDelay: `${i * 60}ms` }}
                  />
                ))
              : focusAreas.map((focus) => (
                  <ActionCard
                    key={focus.id}
                    title={focus.title}
                    subtitle={focus.description}
                    mainValue={focus.exercise_count}
                    mainLabel="Exercises"
                    icon={
                      <Image
                        unoptimized
                        src={focus.image_url || "/auth/circle.svg"}
                        alt={focus.title}
                        width={32}
                        height={32}
                        className="h-10 w-10 object-contain"
                      />
                    }
                    onAction={() =>
                      setManagedCategory({ id: focus.id, title: focus.title, type: "focus-area" })
                    }
                    hideActionButton
                    onSecondaryAction={() => setEditingFocusArea(focus)}
                    onDeleteAction={() =>
                      setPendingDelete({ id: focus.id, title: focus.title, type: "focus-area" })
                    }
                    deleteActionIcon={<TrashIcon className="h-5 w-5" />}
                    mainValueClassName="text-slate font-semibold"
                  />
                ))}
          </div>
        </Card>
      </div>

      <DeleteConfirmationModal
        isOpen={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        isDeleting={isDeleting}
        onConfirm={async () => {
          if (!pendingDelete) return;
          setIsDeleting(true);
          if (pendingDelete.type === "feeling") await handleDeleteFeeling(pendingDelete.id);
          else await handleDeleteFocusArea(pendingDelete.id);
          setIsDeleting(false);
          setPendingDelete(null);
        }}
        itemName={pendingDelete?.title ?? ""}
      />

      <StatusModal {...statusModalProps} />

      <ActionModal
        isOpen={isEmotionModalOpen}
        onClose={() => setIsEmotionModalOpen(false)}
        type="category"
        title="Add New Emotion"
        nameLabel="Add Emotion Name"
        actionText="+ Add New Emotion"
        onSave={handleAddEmotion}
      />
      <ActionModal
        isOpen={isFocusModalOpen}
        onClose={() => setIsFocusModalOpen(false)}
        type="category"
        title="Add New Focus"
        nameLabel="Add Focus Name"
        actionText="+ Add New Focus"
        onSave={handleAddFocus}
      />

      <ActionModal
        isOpen={!!editingFeeling}
        onClose={() => setEditingFeeling(null)}
        type="category"
        title="Edit Emotion"
        nameLabel="Emotion Name"
        initialData={
          editingFeeling
            ? {
                title: editingFeeling.title,
                description: editingFeeling.description,
                image_url: editingFeeling.image_url,
              }
            : undefined
        }
        onSave={handleEditEmotion}
      />
      <ActionModal
        isOpen={!!editingFocusArea}
        onClose={() => setEditingFocusArea(null)}
        type="category"
        title="Edit Focus Area"
        nameLabel="Focus Area Name"
        initialData={
          editingFocusArea
            ? {
                title: editingFocusArea.title,
                description: editingFocusArea.description,
                image_url: editingFocusArea.image_url,
              }
            : undefined
        }
        onSave={handleEditFocusArea}
      />

      <CategoryManagementPanel
        isOpen={!!managedCategory}
        onClose={() => setManagedCategory(null)}
        categoryName={managedCategory?.title ?? ""}
        categoryId={managedCategory?.id ?? ""}
        categoryType={managedCategory?.type ?? "feeling"}
        itemType="exercise"
        onExerciseCountChange={(count) => {
          if (!managedCategory) return;
          handleCategoryExerciseCountChange(managedCategory.id, managedCategory.type, count);
        }}
        initialIntroScreen={(() => {
          if (!managedCategory) return null;
          const item =
            managedCategory.type === "focus-area"
              ? focusAreas.find((f) => f.id === managedCategory.id)
              : feelings.find((f) => f.id === managedCategory.id);
          return item
            ? { greet: item.greet, sub_content: item.sub_content, description: item.description }
            : null;
        })()}
      />
    </>
  );
}
