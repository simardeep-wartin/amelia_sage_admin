"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, PlusIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import FilterDropdown from "@/components/ui/FilterDropdown";
import Button from "@/components/ui/Button";
import ExerciseCard from "./ExerciseCard";
import AddEditModal from "@/components/common/AddEditModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import EmptyState from "@/components/common/EmptyState";
import { ExerciseSubCategory, Exercise } from "@/types/mindful-exercise";

interface ExerciseGridViewProps {
  subCategory: ExerciseSubCategory;
  managementTitle?: string;
}

export default function ExerciseGridView({ subCategory, managementTitle = "Mindful Exercise Management" }: ExerciseGridViewProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<string | null>(null);

  const filteredExercises = subCategory.exercises.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddExercise = () => {
    setEditingExercise(null);
    setIsModalOpen(true);
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setExerciseToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting exercise:", exerciseToDelete);
    setIsDeleteModalOpen(false);
    setExerciseToDelete(null);
  };

  const handleSaveExercise = (data: any) => {
    console.log("Saving exercise:", data);
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="space-y-4 mb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center h-9 w-9 bg-white border border-[#F2F2F2] rounded-[12px] text-[#A1A1A1] hover:text-sageGreen transition-all shadow-sm"
          >
            <ChevronLeftIcon className="h-5 w-5 stroke-[2.5px]" />
          </button>
          <span className="text-[14px] text-[#A1A1A1] font-normalnfont-inter">
            Back to {managementTitle}
          </span>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-[32px] font-cormorant text-[#2D2D2D] font-bold leading-tight">
              {subCategory.name} Exercise Management
            </h1>
            <div className="flex items-center gap-1 text-[14px] text-slate mt-1 font-normal">
              <span>Dashboard</span> / <span>Exercises</span> / <span>{managementTitle}</span> / <span>{subCategory.name}</span>
            </div>
          </div>
          <Button 
            onClick={handleAddExercise} 
            className="flex items-center gap-2 bg-sageGreen hover:bg-sageGreenHover h-[44px] px-8 rounded-[10px] text-white font-semibold"
          >
            <PlusIcon className="h-5 w-5 stroke-[2.5px]" />
            Add New Exercise
          </Button>
        </div>
      </div>

      {/* Filters Area */}
      <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D1D1D1]" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-[11px] bg-white border border-[#E5E5E5] rounded-[10px] text-[14px] outline-none focus:border-sageGreen transition-all shadow-sm"
          />
        </div>
        <FilterDropdown
          options={["Active", "Draft", "All Status"]}
          onChange={() => {}}
        />
        <FilterDropdown
          options={["Name (A-Z)", "Name (Z-A)", "Sort by: Name"]}
          onChange={() => {}}
        />
      </div>

      {/* Exercise Grid */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onEdit={handleEditExercise}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] border border-[#F2F2F2] p-20">
          <EmptyState
            title="No Exercises Yet"
            description="You have not added any exercises yet. Start building your routine by adding exercises tailored to your goals."
            actionLabel="Add New Exercise"
            onAction={handleAddExercise}
          />
        </div>
      )}

      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExercise}
        layout="media"
        title={editingExercise ? "Edit Exercise" : "Add New Exercise"}
        showDraft
        initialData={editingExercise}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Exercise"
        message="Are you sure you want to delete this exercise? This action cannot be undone."
      />
    </div>
  );
}
