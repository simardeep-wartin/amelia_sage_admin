"use client";

import { useState, useEffect } from "react";
import { ArrowUpRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import CategorySectionList from "@/components/mindful-exercise/CategorySectionList";
import AddEditModal from "@/components/common/AddEditModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import MindfulExerciseLoader from "@/components/loaders/mindful-exercise-loader";
import PageHeader from "@/components/common/PageHeader";
import CategoryTabs from "@/components/common/CategoryTabs";
import ListFilters from "@/components/common/ListFilters";
import { useCalmAndStillness } from "@/hooks/useCalmAndStillness";
import { useModalState } from "@/hooks/useModalState";
import { ExerciseSubCategory } from "@/types/mindful-exercise";

const BREADCRUMBS = [
  { label: "Dashboard" },
  { label: "Exercises" },
  { label: "Calm & Stillness Management" },
];

const STATUS_OPTIONS = ["Active", "Draft", "All Status"];
const SORT_OPTIONS = ["Name (A-Z)", "Name (Z-A)", "Sort by: Name"];

export default function CalmAndStillnessMain() {
  const { categories, loading } = useCalmAndStillness();
  const [activeTab, setActiveTab] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const modal = useModalState<ExerciseSubCategory>();

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].name);
    }
  }, [categories, activeTab]);

  const currentCategory = categories.find((cat) => cat.name === activeTab);
  const sections = currentCategory?.subCategories ?? [];
  const filteredSections = sections.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirmDelete = () => {
    console.log("Deleting category:", modal.itemToDelete);
    modal.closeDelete();
  };

  const handleSave = (data: unknown) => {
    console.log("Saving category:", data);
  };

  if (loading) return <MindfulExerciseLoader />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calm & Stillness Exercise Management"
        breadcrumbs={BREADCRUMBS}
        action={
          <Button
            variant="ghost"
            className="text-sageGreen hover:bg-transparent hover:border cursor-pointer hover:text-sageGreen font-semibold px-0 sm:px-4"
          >
            <ArrowUpRightIcon className="h-4 w-4" /> Go to Drafts
          </Button>
        }
      />

      <div>
        <CategoryTabs tabs={categories} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="px-2 flex flex-col gap-4">
          <ListFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search categories..."
            statusOptions={STATUS_OPTIONS}
            sortOptions={SORT_OPTIONS}
          />

          <div className="flex justify-between items-center">
            <h2 className="text-[24px] font-arial text-[#2D2D2D] font-normal">{activeTab}</h2>
            <Button
              onClick={modal.openAdd}
              className="flex items-center gap-2 bg-sageGreen hover:bg-sageGreenHover h-[44px] px-6 rounded-[10px] text-white font-semibold shadow-sm"
            >
              <PlusIcon className="h-5 w-5 stroke-[2.5px]" />
              Add New Category
            </Button>
          </div>

          <div className="bg-white border border-[#F2F2F2] rounded-[16px] p-4">
            <CategorySectionList
              sections={filteredSections}
              onEdit={modal.openEdit}
              onDelete={modal.openDelete}
              basePath="/calm-stillness-management"
            />
          </div>
        </div>
      </div>

      <AddEditModal
        isOpen={modal.isModalOpen}
        onClose={modal.closeModal}
        onSave={handleSave}
        layout="thumbnail"
        title={modal.editingItem ? "Edit Category" : "Add New Category"}
        initialData={modal.editingItem}
      />

      <DeleteConfirmationModal
        isOpen={modal.isDeleteModalOpen}
        onClose={modal.closeDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone and all associated exercises will be removed."
      />
    </div>
  );
}
