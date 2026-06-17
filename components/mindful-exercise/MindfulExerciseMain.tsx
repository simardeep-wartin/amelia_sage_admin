"use client";

import { useState } from "react";
import { ArrowUpRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import CategorySectionList from "./CategorySectionList";
import AddEditModal from "@/components/common/AddEditModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import MindfulExerciseLoader from "@/components/loaders/mindful-exercise-loader";
import PageHeader from "@/components/common/PageHeader";
import CategoryTabs from "@/components/common/CategoryTabs";
import ListFilters from "@/components/common/ListFilters";
import { useMindfulExercise } from "@/hooks/useMindfulExercise";
import { useModalState } from "@/hooks/useModalState";
import type { ExerciseSubCategory } from "@/types";

const BREADCRUMBS = [
  { label: "Dashboard" },
  { label: "Exercises" },
  { label: "Mindful Exercise Management" },
];

const STATUS_OPTIONS = ["Active", "Draft", "All Status"];
const SORT_OPTIONS = ["Name (A-Z)", "Name (Z-A)", "Sort by: Name"];

export default function MindfulExerciseMain() {
  const { categories, loading } = useMindfulExercise();
  const [activeTabOverride, setActiveTab] = useState<string | null>(null);
  const activeTab = activeTabOverride ?? categories[0]?.name ?? "";
  const [searchQuery, setSearchQuery] = useState("");
  const modal = useModalState<ExerciseSubCategory>();

  const currentCategory = categories.find((cat) => cat.name === activeTab);
  const sections = currentCategory?.subCategories ?? [];
  const filteredSections = sections.filter((section) =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
        title="Mindful Exercise Management"
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
            searchPlaceholder="Search exercises..."
            statusOptions={STATUS_OPTIONS}
            sortOptions={SORT_OPTIONS}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-[20px] sm:text-[24px] font-arial text-[#2D2D2D] font-normal">
              {activeTab}
            </h2>
            <Button
              onClick={modal.openAdd}
              className="flex items-center justify-center gap-2 bg-sageGreen hover:bg-sageGreenHover h-[44px] px-6 rounded-[10px] text-white font-semibold shadow-sm w-full sm:w-auto"
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
        initialData={modal.editingItem ? { name: modal.editingItem.name } : undefined}
      />

      <DeleteConfirmationModal
        isOpen={modal.isDeleteModalOpen}
        onClose={modal.closeDelete}
        onConfirm={handleConfirmDelete}
        itemName={modal.itemToDelete ?? "this category"}
      />
    </div>
  );
}
