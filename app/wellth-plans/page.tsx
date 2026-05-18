"use client";

import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import MetricCard from "@/components/common/MetricCard";
import Card from "@/components/common/Card";
import Button from "@/components/ui/Button";
import ActionCard from "@/components/common/ActionCard";
import { ArrowUpRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import DynamicModal from "@/components/common/DynamicModal";
import DynamicSidePanel from "@/components/common/DynamicSidePanel";
import { WELLTH_MODAL_CONFIG } from "@/lib/wellth-plans.config";
import WellthPlanLoader from "@/components/loaders/wellth-plan-loader";

// Mock data for Wellth Plans
const INITIAL_WELLTH_PLANS = [
  {
    id: "1",
    title: "Manage Spiritual Growth and Faith exercises",
    description:
      "Reconnect with your inner source through grounding, clarity and gentle spiritual alignment",
    exercisesCount: 0,
    icon: "/auth/sunriseCircle.png",
  },
  {
    id: "2",
    title: "Whole Self Revival",
    description: "Restore your emotional balance, energy, identify, and sense of self",
    exercisesCount: 0,
    icon: "/auth/flower.png",
  },
  {
    id: "3",
    title: "Relationship Healing",
    description:
      "Heal relational patterns, strengthen boundaries, and nurture healthy, aligned love",
    exercisesCount: 0,
    icon: "/auth/circles.png",
  },
  {
    id: "4",
    title: "Career and Leadership",
    description: "Grow in clarity, presence, confidence, and purpose",
    exercisesCount: 0,
    icon: "/auth/sunrise.png",
  },
];

export default function WellthPlansPage() {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState(INITIAL_WELLTH_PLANS);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [isDynamicModalOpen, setIsDynamicModalOpen] = useState(false);
  const [modalConfigKey, setModalConfigKey] = useState<string>("addExercise");
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // State for exercises within the selected plan
  const [exercises, setExercises] = useState<Record<string, Record<string, unknown>[]>>({});

  const handleAddPlan = (data: Record<string, unknown>) => {
    const newPlan = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.name,
      description: data.description,
      exercisesCount: 0,
      icon: data.icon ? URL.createObjectURL(data.icon) : "/auth/circle.svg",
    };
    setPlans((prev) => [...prev, newPlan]);
  };

  const handleAddExercise = (data: Record<string, unknown>) => {
    if (!selectedPlanId) return;
    const newExercise = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
      subtitle: data.subtitle || "",
    };
    setExercises((prev) => ({
      ...prev,
      [selectedPlanId]: [...(prev[selectedPlanId] || []), newExercise],
    }));

    // Update plan exercise count
    setPlans((prev) =>
      prev.map((p) =>
        p.id === selectedPlanId
          ? { ...p, exercisesCount: (exercises[selectedPlanId]?.length || 0) + 1 }
          : p,
      ),
    );
  };

  const handleSaveExercise = (data: Record<string, unknown>) => {
    if (!selectedPlanId) return;

    if (editingItem) {
      setExercises((prev) => ({
        ...prev,
        [selectedPlanId]: prev[selectedPlanId].map((item) =>
          item.id === editingItem.id ? { ...item, ...data } : item,
        ),
      }));
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

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const currentExercises = selectedPlanId ? exercises[selectedPlanId] || [] : [];

  if (loading) return <WellthPlanLoader />;

  return (
    <PageLayout title="Wellth Plans">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-bold text-charcoal tracking-tight">Wellth Plans</h1>
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
            value="6"
            subtitle="Published plans"
            subtitleColor="#71717A"
            iconSrc="/auth/leaves.png"
          />
          <MetricCard
            title="Total Participants"
            value="14,580"
            subtitle="+23% this month"
            subtitleColor="#4BB05D"
            iconSrc="/auth/multipleUser.svg"
          />
          <MetricCard
            title="Average Completion"
            value="55.6%"
            subtitle="+5% this week"
            subtitleColor="#4BB05D"
            iconSrc="/auth/growth.svg"
          />
          <MetricCard
            title="New This Month"
            value="892"
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
            {plans.map((plan) => (
              <ActionCard
                key={plan.id}
                title={plan.title}
                subtitle={plan.description}
                mainValue={plan.exercisesCount}
                mainLabel="Exercises"
                icon={<img src={plan.icon} alt="" className="h-8 w-8" />}
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
        initialData={editingItem}
        onSave={handleSaveExercise}
        onSaveDraft={(data) => console.log("Draft Saved:", data)}
      />

      {/* Side Panel */}
      <DynamicSidePanel
        isOpen={!!selectedPlanId}
        onClose={() => setSelectedPlanId(null)}
        title={`Manage ${selectedPlan?.title} exercises`}
        items={currentExercises}
        onAction={(action) => openModal(action)}
        onEditItem={(item) => {
          console.log("Editing Wellth Plan Item:", item);
          setEditingItem(item);
          setModalConfigKey(item.sageSays ? "addIntro" : "addExercise");
          setIsDynamicModalOpen(true);
        }}
        onDeleteItem={(id) => {
          setExercises((prev) => ({
            ...prev,
            [selectedPlanId!]: prev[selectedPlanId!].filter((i) => i.id !== id),
          }));
        }}
      />
    </PageLayout>
  );
}
