"use client";

import { useState, useCallback } from "react";
import Tabs from "@/components/common/Tabs";
import Table, { type TableColumn } from "@/components/common/Table";
import Pagination from "@/components/common/Pagination";
import Badge from "@/components/common/Badge";
import ActionsDropdownMenu from "@/components/ui/ActionsDropdownMenu";
import DynamicModal from "@/components/common/DynamicModal";
import StatusModal from "@/components/common/StatusModal";
import ListFilters from "@/components/common/ListFilters";
import FilterDropdown from "@/components/ui/FilterDropdown";
import { useExerciseDraft } from "@/hooks/useExerciseDraft";
import { type ExerciseDraftEntry, type ExerciseDraftTab, EXERCISE_DRAFT_TABS } from "@/types";
import ExerciseDraftLoader from "@/components/loaders/exercise-draft-loader";
import ExerciseDraftTableLoader from "@/components/loaders/exercise-draft-table-loader";
import { EXERCISE_DRAFT_MODAL_CONFIG } from "@/lib/exercise-draft.config";
import type { JournalExercisesParams } from "@/Services/api/journal/exercises";

const STATUS_OPTIONS = ["All Status", "Draft", "Published"];
const MONTH_OPTIONS = ["This Month", "Last Month", "Last 3 Months", "All Time"];

const SUB_TYPE_LABEL: Record<string, string> = {
  feelings: "Work on Me",
  focus: "Work on Me",
  wealth_plan: "Wealth Plan",
};

function SourceBadge({ entry }: { entry: ExerciseDraftEntry }) {
  const label = (entry.sub_type && SUB_TYPE_LABEL[entry.sub_type]) ?? entry.source;
  return (
    <span className="inline-flex items-center rounded-[4px] bg-[#EFEEE9] border border-[rgba(195,200,189,0.15)] px-[9px] py-[4px] text-[12px] font-normal text-[#1B1C19] whitespace-nowrap">
      {label}
    </span>
  );
}

function tabToSource(tab: ExerciseDraftTab): JournalExercisesParams["source"] | undefined {
  if (tab === "Work on Me (7 Days)") return "work_on_me";
  if (tab === "Wellth plan (30 Days)") return "wealth_plan";
  return undefined;
}

function buildColumns(
  onEdit: (entry: ExerciseDraftEntry) => void,
  onDelete: (entry: ExerciseDraftEntry) => Promise<void>,
  onPublish: (entry: ExerciseDraftEntry) => Promise<void>,
): TableColumn<ExerciseDraftEntry>[] {
  return [
    {
      key: "title",
      label: "Title",
      render: (row) => (
        <span className="text-[14px] font-normal text-[#2D2D2D] font-arial">{row.title}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (row) => (
        <span className="text-[14px] font-normal text-[#6B6B6B]">{row.category ?? "—"}</span>
      ),
    },
    {
      key: "source",
      label: "Source",
      render: (row) => <SourceBadge entry={row} />,
    },
    {
      key: "sort_order",
      label: "Exercise Number",
      render: (row) => (
        <span className="text-[14px] font-normal text-[#6B6B6B]">{row.sort_order ?? "—"}</span>
      ),
    },
    {
      key: "is_draft",
      label: "Status",
      align: "center",
      render: () => (
        <Badge
          variant="trial"
          label="Draft"
          className="text-[12px] font-normal normal-case tracking-normal px-[10px] py-[4px] rounded-full"
        />
      ),
    },
    {
      key: "last_updated",
      label: "Last Update",
      render: (row) => (
        <span className="text-[14px] font-normal text-[#6B6B6B]">{row.last_updated}</span>
      ),
    },
    {
      key: "id",
      label: "Actions",
      render: (row) => (
        <ActionsDropdownMenu
          trigger="horizontal"
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
          onPublish={() => onPublish(row)}
          publishLabel={row.title}
        />
      ),
    },
  ];
}

export default function ExerciseDraftMain() {
  const [activeTab, setActiveTab] = useState<ExerciseDraftTab>("All Exercise");
  const [searchQuery, setSearchQuery] = useState("");
  const [_statusFilter, setStatusFilter] = useState("All Status");
  const [monthFilter, setMonthFilter] = useState("This Month");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEntry, setEditingEntry] = useState<ExerciseDraftEntry | null>(null);

  const {
    entries,
    total,
    loading,
    isInitialLoad,
    itemsPerPage,
    statusModalProps,
    handleSaveEdit,
    handleDelete,
    handlePublish,
  } = useExerciseDraft({
    source: tabToSource(activeTab),
    search: searchQuery,
    page: currentPage,
  });

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  const handleTabChange = (tab: ExerciseDraftTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  const columns = buildColumns((entry) => setEditingEntry(entry), handleDelete, handlePublish);

  if (isInitialLoad) return <ExerciseDraftLoader />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[18px] sm:text-[24px] font-medium leading-[32px] text-[#2D2D2D] font-arial">
            Exercises Draft Management
          </h1>
          <p className="text-[14px] leading-[20px] text-[#6B6B6B] max-w-[420px]">
            Manage the curated archive of transformative journaling prompts and long-term wellness
            plans.
          </p>
        </div>
        <FilterDropdown
          options={MONTH_OPTIONS}
          value={monthFilter}
          onChange={(val) => setMonthFilter(val)}
        />
      </div>

      {/* Tabs */}
      <Tabs items={EXERCISE_DRAFT_TABS} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Table Card */}
      <div className="bg-white rounded-[14px] border border-[#F3F4F6] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Search + Status filter */}
        <div className="px-5 pt-4">
          <ListFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            searchPlaceholder="Search by title..."
            statusOptions={STATUS_OPTIONS}
            onStatusChange={(val) => setStatusFilter(val)}
          />
        </div>

        {/* Table */}
        <div>
          {loading ? (
            <ExerciseDraftTableLoader rows={itemsPerPage} />
          ) : (
            <Table
              columns={columns}
              rows={entries}
              headerTextColor="#D6B26A"
              emptyMessage="No draft exercises found."
            />
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={total}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemLabel="exercises"
      />

      {editingEntry && (
        <DynamicModal
          isOpen={!!editingEntry}
          onClose={() => setEditingEntry(null)}
          config={EXERCISE_DRAFT_MODAL_CONFIG.editEntry}
          initialData={editingEntry as unknown as Record<string, unknown>}
          onSave={async (data) => {
            await handleSaveEdit(editingEntry!, data);
            setEditingEntry(null);
          }}
        />
      )}

      <StatusModal {...statusModalProps} />
    </div>
  );
}
