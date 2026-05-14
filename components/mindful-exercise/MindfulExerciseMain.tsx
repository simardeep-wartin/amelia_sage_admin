"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import FilterDropdown from "@/components/ui/FilterDropdown";
import Button from "@/components/ui/Button";
import CategorySectionList from "./CategorySectionList";
import MindfulExerciseActionModal from "./MindfulExerciseActionModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import MindfulExerciseLoader from "@/components/loaders/mindful-exercise-loader";
import { useMindfulExercise } from "@/hooks/useMindfulExercise";
import { ExerciseSubCategory } from "@/types/mindful-exercise";

export default function MindfulExerciseMain() {
  const { categories, loading } = useMindfulExercise();
  const [activeTab, setActiveTab] = useState("Yoga Exercises");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ExerciseSubCategory | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const currentCategory = categories.find((cat) => cat.name === activeTab);
  const sections = currentCategory?.subCategories || [];

  const filteredSections = sections.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (section: ExerciseSubCategory) => {
    setEditingCategory(section);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting category:", itemToDelete);
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSaveCategory = (data: any) => {
    console.log("Saving category:", data);
  };

  if (loading) {
    return <MindfulExerciseLoader />;
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Title Area - On Cream Background */}
      <div className="flex justify-between items-end mb-2 px-1">
        <div>
          <div className="flex items-center gap-1 text-[13px] text-[#A1A1A1] mb-2 font-medium">
            <span>Dashboard</span> / <span>Exercises</span> / <span className="text-[#6B6B6B]">Mindful Exercise Management</span>
          </div>
          <h1 className="text-[32px] font-cormorant text-[#2D2D2D] font-bold leading-tight">
            Mindful Exercise Management
          </h1>
        </div>
        <Button variant="ghost" className="text-sageGreen hover:bg-transparent hover:border cursor-pointer hover:text-sageGreen font-semibold px-0 sm:px-4">
          <ArrowUpRightIcon className="h-4 w-4" /> Go to Drafts
        </Button>
      </div>

      {/* Main Container - White with rounded corners */}
      <div>

        {/* Tabs Row - Background matches page cream */}
        <div className="bg-[#F7F4EE] border-b border-[#E5E7EB] rounded-t-[24px]">
          <div className="flex gap-2">
            {categories.map((cat) => {
              const isActive = activeTab === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.name)}
                  className={`px-10 py-[14px] text-[14px] font-medium transition-all relative rounded-t-[24px] cursor-pointer gap-2 ${isActive
                    ? "text-sageGreen bg-white rounded-t-[16px]"
                    : "text-[#6B6B6B] hover:text-sageGreen hover:bg-white hover:border-b-2"
                    }`}
                >
                  {cat.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sageGreen" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-2 flex flex-col gap-4">
          {/* Filters Row */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center my-4 h-[48px]">
            <div className="relative h-full">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D1D1D1]" />
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full pl-12 pr-4 py-[11px] bg-[#FDFDFD] border border-[#E5E5E5] rounded-[10px] text-[14px] outline-none focus:border-sageGreen transition-all placeholder:text-[#D1D1D1]"
              />
            </div>
            <FilterDropdown
              options={["Active", "Draft", "All Status"]}
              onChange={() => { }}
              className="h-[48px] text-charcoal font-normal text-s"
            />
            <FilterDropdown
              options={["Name (A-Z)", "Name (Z-A)", "Sort by: Name"]}
              onChange={() => { }}
              className="h-[48px] text-charcoal font-normal text-s"
            />
          </div>

          {/* Category Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[24px] font-cormorant text-[#2D2D2D] font-bold">
              {activeTab}
            </h2>
            <Button
              onClick={handleAddCategory}
              className="flex items-center gap-2 bg-sageGreen hover:bg-sageGreenHover h-[44px] px-6 rounded-[10px] text-white font-semibold shadow-sm"
            >
              <PlusIcon className="h-5 w-5 stroke-[2.5px]" />
              Add New Category
            </Button>
          </div>

          {/* List Content */}
          <div className="bg-white border border-[#F2F2F2] rounded-[16px] p-4">
            <CategorySectionList
              sections={filteredSections}
              onEdit={handleEditCategory}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </div>

      <MindfulExerciseActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        mode="category"
        initialData={editingCategory}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone and all associated exercises will be removed."
      />
    </div>
  );
}
