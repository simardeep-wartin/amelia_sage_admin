"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/components/common/Card";
import Button from "@/components/ui/Button";
import ActionCard from "@/components/common/ActionCard";
import MetricCard from "@/components/common/MetricCard";
import ActionModal from "@/components/common/ActionModal";
import CategoryManagementPanel from "@/components/common/CategoryManagementPanel";
import { ArrowUpRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { WorkOnMeState } from "@/hooks/useWorkOnMe";

type Props = Omit<WorkOnMeState, "loading">;

export default function WorkOnMeMain({
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
  handleAddEmotion,
  handleAddFocus,
  handleEditEmotion,
}: Props) {
  const router = useRouter();

  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] sm:text-[28px] font-bold text-charcoal tracking-tight">
              Work on Me Exercises
            </h1>
            <p className="text-sm font-medium text-grey">
              Dashboard / Content / Work on me exercises
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-sageGreen hover:bg-transparent hover:border cursor-pointer hover:text-sageGreen font-semibold px-0 sm:px-4"
            onClick={() => router.push("/journal-management")}
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
              className="text-sageGreen hover:bg-transparent hover:text-sageGreen px-0 font-medium sm:px-4 shrink-0 h-[28px]"
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
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                      />
                    }
                    onAction={() =>
                      setManagedCategory({ id: feeling.id, title: feeling.title, type: "feeling" })
                    }
                    hideActionButton
                    onSecondaryAction={() => setEditingFeeling(feeling)}
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
              className="text-sageGreen hover:bg-transparent hover:text-sageGreen px-0 font-medium sm:px-4 shrink-0 h-[28px]"
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
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                      />
                    }
                    onAction={() =>
                      setManagedCategory({ id: focus.id, title: focus.title, type: "focus-area" })
                    }
                    hideActionButton
                  />
                ))}
          </div>
        </Card>
      </div>

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
            ? { title: editingFeeling.title, description: editingFeeling.description }
            : undefined
        }
        onSave={handleEditEmotion}
      />

      <CategoryManagementPanel
        isOpen={!!managedCategory}
        onClose={() => setManagedCategory(null)}
        categoryName={managedCategory?.title ?? ""}
        categoryId={managedCategory?.id ?? ""}
        categoryType={managedCategory?.type ?? "feeling"}
        itemType="exercise"
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
