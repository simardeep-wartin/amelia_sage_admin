"use client";

import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import MetricCard from "@/components/common/MetricCard";
import Card from "@/components/common/Card";
import Button from "@/components/ui/Button";
import ActionCard from "@/components/common/ActionCard";

import { ArrowUpRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import ActionModal from "@/components/common/ActionModal";

import CategoryManagementModal from "@/components/common/CategoryManagementModal";


// --- Icons ---

import appData from "@/data/app-data.json";

interface ExerciseData {
  title: string;
  usersCount: string;
  exercisesCount: number;
  icon: string;
}

interface AppData {
  workOnMeExercises: {
    emotionsData: ExerciseData[];
    focusAreasData: ExerciseData[];
  };
}

const typedAppData = appData as unknown as AppData;

const iconMap: Record<string, React.ReactNode> = {
  SunIcon: <img src="/auth/sun.png" alt="" className="h-6 w-6" />,
  PlantIcon: <img src="/auth/leaves.png" alt="" className="h-6 w-6" />,
  WaveIcon: <img src="/auth/wave.png" alt="" className="h-6 w-6" />,
  EmptyCircleIcon: <img src="/auth/circle.svg" alt="" className="h-6 w-6" />,
  DropIcon: <img src="/auth/drop.png" alt="" className="h-6 w-6" />,
  BrokenHeartIcon: <img src="/auth/brokenHeart.png" alt="" className="h-6 w-6" />,
  SpiralIcon: <img src="/auth/spiral.png" alt="" className="h-6 w-6" />,
  HeartIcon: <img src="/auth/heartPurple.svg" alt="" className="h-6 w-6" />,
  LeafIcon: <img src="/auth/leaf.png" alt="" className="h-6 w-6" />,
  StarIcon: <img src="/auth/star.png" alt="" className="h-6 w-6" />,
  ResetIcon: <img src="/auth/retry.png" alt="" className="h-6 w-6" />,
};

const emotionsData = typedAppData.workOnMeExercises.emotionsData.map((item) => ({
  ...item,
  icon: iconMap[item.icon],
}));

const focusAreasData = typedAppData.workOnMeExercises.focusAreasData.map((item) => ({
  ...item,
  icon: iconMap[item.icon],
}));

export default function WorkOnMeExercisesPage() {
  const [isEmotionModalOpen, setIsEmotionModalOpen] = useState(false);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [managedCategory, setManagedCategory] = useState<string | null>(null);

  return (
    <PageLayout title="Work on Me Exercises">
      <div className="space-y-6">

        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-bold text-charcoal tracking-tight">Work on Me Exercises</h1>
            <p className="text-sm font-medium text-grey">Dashboard / Content / Work on me exercises</p>
          </div>
          <Button variant="ghost" className="text-sageGreen hover:bg-transparent hover:border cursor-pointer hover:text-sageGreen font-semibold px-0 sm:px-4">
            <ArrowUpRightIcon className="h-4 w-4" /> Go to Drafts
          </Button>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Total Emotional Flows"
            value="6"
            subtitle="Active Flows"
            subtitleColor="#71717A"
            iconSrc="/auth/heartPurple.svg"
          />
          <MetricCard
            title="Focus Areas"
            value="5"
            subtitle="Active areas"
            subtitleColor="#71717A"
            iconSrc="/auth/circleTick.svg"
          />
          <MetricCard
            title="Total Exercises"
            value="63"
            subtitle="Across all flows"
            subtitleColor="#71717A"
            iconSrc="/auth/lock.svg"
          />
        </div>

        {/* Emotions Section */}
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
            Manage how users are guided through different emotional states with tailored exercise recommendations.
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {emotionsData.map((emotion) => (
              <ActionCard
                key={emotion.title}
                title={emotion.title}
                subtitle={emotion.usersCount}
                mainValue={emotion.exercisesCount}
                mainLabel="Exercises"
                icon={emotion.icon}
                onAction={() => setManagedCategory(emotion.title)}
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
            Define and manage focus areas that help users work on specific aspects of their wellbeing.
          </p>

          <div className="flex flex-col gap-4">
            {focusAreasData.map((focus) => (
              <ActionCard
                key={focus.title}
                title={focus.title}
                subtitle={focus.usersCount}
                mainValue={focus.exercisesCount}
                mainLabel="Exercises"
                icon={focus.icon}
                onAction={() => setManagedCategory(focus.title)}
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
        onSave={(data) => console.log("New Emotion:", data)}
      />
      <ActionModal
        isOpen={isFocusModalOpen}
        onClose={() => setIsFocusModalOpen(false)}
        type="category"
        title="Add New Focus"
        nameLabel="Add Focus Name"
        actionText="+ Add New Focus"
        onSave={(data) => console.log("New Focus Area:", data)}
      />

      <CategoryManagementModal
        isOpen={!!managedCategory}
        onClose={() => setManagedCategory(null)}
        categoryName={managedCategory || ""}
        itemType="exercise"
      />
    </PageLayout>
  );
}
