"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Tabs from "@/components/common/Tabs";
import Table, { type TableColumn } from "@/components/common/Table";
import Badge from "@/components/common/Badge";
import Pagination from "@/components/common/Pagination";
import FilterDropdown from "@/components/ui/FilterDropdown";
import ActionsDropdownMenu from "@/components/ui/ActionsDropdownMenu";
import { useJournal } from "@/hooks/useJournal";
import { type JournalEntry, type JournalTab, JOURNAL_TABS } from "@/types/journal";
import JournalLoader from "@/components/loaders/journal-loader";

const ITEMS_PER_PAGE = 5;

function SourceBadge({ source }: { source: JournalEntry["source"] }) {
  return (
    <span className="inline-flex items-center rounded-[4px] bg-[#EFEEE9] border border-[rgba(195,200,189,0.15)] px-[9px] py-[4px] text-[12px] font-normal text-[#1B1C19] whitespace-nowrap">
      {source}
    </span>
  );
}

const TABLE_COLUMNS: TableColumn<JournalEntry>[] = [
  {
    key: "title",
    label: "Title",
    render: (row) => (
      <span className="text-[14px] font-normal text-[#2D2D2D] font-arial">{row.title}</span>
    ),
  },
  {
    key: "source",
    label: "Source",
    render: (row) => <SourceBadge source={row.source} />,
  },
  {
    key: "day",
    label: "Day #",
    render: (row) => <span className="text-[14px] font-normal text-[#6B6B6B]">{row.day}</span>,
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    render: (row) => (
      <Badge
        variant={row.status === "published" ? "active" : "trial"}
        label={row.status === "published" ? "Published" : "Draft"}
        className="text-[12px] font-normal normal-case tracking-normal px-[10px] py-[4px] rounded-full"
      />
    ),
  },
  {
    key: "lastUpdated",
    label: "Last Updated",
    render: (row) => (
      <span className="text-[14px] font-normal text-[#6B6B6B]">{row.lastUpdated}</span>
    ),
  },
  {
    key: "id",
    label: "Actions",
    render: (row) => (
      <ActionsDropdownMenu
        trigger="horizontal"
        onEdit={() => console.log("edit", row.id)}
        onDelete={() => console.log("delete", row.id)}
      />
    ),
  },
];

export default function JournalMain() {
  const { entries, loading } = useJournal();
  const [activeTab, setActiveTab] = useState<JournalTab>("All Exercise");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = entries;

    // Tab filter
    if (activeTab === "Work on Me (7 Days)") {
      result = result.filter((e) => e.source === "Work on Me");
    } else if (activeTab === "Wellth plan (30 Days)") {
      result = result.filter((e) => e.source === "Wellth Plan");
    } else if (activeTab === "Drafts") {
      result = result.filter((e) => e.status === "draft");
    }

    // Status dropdown filter
    if (statusFilter === "Published") {
      result = result.filter((e) => e.status === "published");
    } else if (statusFilter === "Draft") {
      result = result.filter((e) => e.status === "draft");
    }

    // Search filter
    if (searchQuery.trim()) {
      result = result.filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return result;
  }, [entries, activeTab, statusFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleTabChange = (tab: JournalTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleStatusFilter = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  if (loading) return <JournalLoader />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-[24px] font-medium leading-[32px] text-[#2D2D2D] font-arial">
            Journal Library
          </h1>
          <p className="text-[14px] leading-[20px] text-[#6B6B6B] max-w-[420px]">
            Manage the curated archive of transformative journaling prompts and long-term wellness
            plans.
          </p>
        </div>
        <div className="shrink-0">
          <FilterDropdown
            options={["This Month", "This Week", "Today", "Custom"]}
            value="This Month"
            onChange={() => {}}
            className="h-[48px] w-[148px] border-slate border-[0.6px] text-[14px] font-normal text-[#2B2B2B] rounded-[9px]"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs items={JOURNAL_TABS} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Table Card */}
      <div className="bg-white rounded-[14px] border border-[#F3F4F6] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Search + Status filter */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center p-5 pb-0">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(10,10,10,0.4)]" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-[38px] pl-9 pr-4 bg-white border border-[#E5E7EB] rounded-[10px] text-[14px] text-[#2D2D2D] outline-none focus:border-sageGreen transition-colors placeholder:text-[rgba(10,10,10,0.4)]"
            />
          </div>
          <FilterDropdown
            options={["All Status", "Published", "Draft"]}
            value={statusFilter}
            onChange={handleStatusFilter}
            className="h-[38px] w-[148px]"
          />
        </div>

        {/* Table */}
        <div className="mt-4">
          <Table
            columns={TABLE_COLUMNS}
            rows={paginated}
            headerTextColor="#D6B26A"
            emptyMessage="No journal entries found."
          />
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filtered.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        itemLabel="exercises"
      />
    </div>
  );
}
