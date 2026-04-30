"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricCard from "@/components/common/MetricCard";
import Card from "@/components/common/Card";
import Button from "@/components/ui/Button";
import ExerciseCategoryCard from "@/components/work-on-me/ExerciseCategoryCard";
import { ArrowUpRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import AddCategoryModal from "@/components/work-on-me-exercises/AddCategoryModal";
import ManageCategoryModal from "@/components/work-on-me-exercises/ManageCategoryModal";

// --- Icons ---
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A5A0D3]">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#C1A883]">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A3B899]">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#C1D2A4]">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line>
  </svg>
);

const PlantIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A3C4A8]">
    <path d="M12 22v-8"></path>
    <path d="M12 14c-3.31 0-6-2.69-6-6s2.69-6 6-6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path>
    <path d="M12 22s-4-3-4-8"></path>
  </svg>
);

const WaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A5C9C9]">
    <path d="M2 12c4 0 4-4 8-4s4 4 8 4 4-4 8-4"></path>
    <path d="M2 16c4 0 4-4 8-4s4 4 8 4 4-4 8-4"></path>
  </svg>
);

const EmptyCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#C1C1C1]">
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const DropIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#B5B5C3]">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
  </svg>
);

const BrokenHeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D3A5B4]">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    <path d="M12 5.67l-1 4 2 2-3 4 2 2"></path>
  </svg>
);

const SpiralIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#B9B3A1]">
    <path d="M12 2a10 10 0 1 0 10 10"></path>
    <path d="M12 6a6 6 0 1 0 6 6"></path>
    <path d="M12 10a2 2 0 1 0 2 2"></path>
  </svg>
);

const LeafIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A7D1AF]">
    <path d="M11 20A7 7 0 0 1 4 13C4 8 8 4 14 4a7 7 0 0 1 7 7c0 5-4 9-10 9z"></path>
    <path d="M11 20v-8"></path>
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D3C8A5]">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ResetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A5A5A5]">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
    <path d="M3 3v5h5"></path>
  </svg>
);

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
  SunIcon: <SunIcon />,
  PlantIcon: <PlantIcon />,
  WaveIcon: <WaveIcon />,
  EmptyCircleIcon: <EmptyCircleIcon />,
  DropIcon: <DropIcon />,
  BrokenHeartIcon: <BrokenHeartIcon />,
  SpiralIcon: <SpiralIcon />,
  HeartIcon: <HeartIcon />,
  LeafIcon: <LeafIcon />,
  StarIcon: <StarIcon />,
  ResetIcon: <ResetIcon />,
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
    <DashboardLayout title="Work on Me Exercises">
      <div className="space-y-6">

        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-bold text-charcoal tracking-tight">Work on Me Exercises</h1>
            <p className="text-sm font-medium text-grey">Dashboard / Content / Work on me exercises</p>
          </div>
          <Button variant="ghost" className="text-sageGreen hover:bg-transparent hover:text-sageGreen font-semibold px-0 sm:px-4">
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
            Icon={HeartIcon}
          />
          <MetricCard
            title="Focus Areas"
            value="5"
            subtitle="Active areas"
            subtitleColor="#71717A"
            Icon={CheckCircleIcon}
          />
          <MetricCard
            title="Total Exercises"
            value="63"
            subtitle="Across all flows"
            subtitleColor="#71717A"
            Icon={LockIcon}
          />
        </div>

        {/* Emotions Section */}
        <div className="rounded-[20px] border border-cardBorder bg-white p-6 md:p-8 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[22px] font-semibold text-charcoal">Help me work through how I am feeling</h2>
              <p className="mt-1 text-[15px] text-grey">
                Manage how users are guided through different emotional states with tailored exercise recommendations.
              </p>
            </div>
            <Button onClick={() => setIsEmotionModalOpen(true)} variant="ghost" className="text-sageGreen hover:bg-transparent hover:text-sageGreen px-0 font-medium sm:px-4 shrink-0" leftIcon={<PlusIcon className="h-5 w-5" />}>
              Add New Emotion
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {emotionsData.map((emotion) => (
              <ExerciseCategoryCard
                key={emotion.title}
                title={emotion.title}
                usersCount={emotion.usersCount}
                exercisesCount={emotion.exercisesCount}
                icon={emotion.icon}
                onEdit={() => setManagedCategory(emotion.title)}
              />
            ))}
          </div>
        </div>

        {/* Focus Areas Section */}
        <div className="rounded-[20px] border border-cardBorder bg-white p-6 md:p-8 shadow-sm mb-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[22px] font-semibold text-charcoal">Help me focus on a specific area</h2>
              <p className="mt-1 text-[15px] text-grey">
                Define and manage focus areas that help users work on specific aspects of their wellbeing.
              </p>
            </div>
            <Button onClick={() => setIsFocusModalOpen(true)} variant="ghost" className="text-sageGreen hover:bg-transparent hover:text-sageGreen px-0 font-medium sm:px-4 shrink-0" leftIcon={<PlusIcon className="h-5 w-5" />}>
              Add New Focus
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {focusAreasData.map((focus) => (
              <ExerciseCategoryCard
                key={focus.title}
                title={focus.title}
                usersCount={focus.usersCount}
                exercisesCount={focus.exercisesCount}
                icon={focus.icon}
                onEdit={() => setManagedCategory(focus.title)}
              />
            ))}
          </div>
        </div>

      </div>

      <AddCategoryModal
        isOpen={isEmotionModalOpen}
        onClose={() => setIsEmotionModalOpen(false)}
        title="Add New Emotion"
        nameLabel="Add Emotion Name"
        actionText="+ Add New Emotion"
      />
      <AddCategoryModal
        isOpen={isFocusModalOpen}
        onClose={() => setIsFocusModalOpen(false)}
        title="Add New Focus"
        nameLabel="Add Focus Name"
        actionText="+ Add New Focus"
      />
      
      <ManageCategoryModal
        isOpen={!!managedCategory}
        onClose={() => setManagedCategory(null)}
        categoryName={managedCategory || ""}
      />
    </DashboardLayout>
  );
}
