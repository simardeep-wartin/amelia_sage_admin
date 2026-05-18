"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FilterDropdown from "@/components/ui/FilterDropdown";

type ListFiltersProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  statusOptions?: string[];
  onStatusChange?: (value: string) => void;
  sortOptions?: string[];
  onSortChange?: (value: string) => void;
};

export default function ListFilters({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  statusOptions,
  onStatusChange,
  sortOptions,
  onSortChange,
}: ListFiltersProps) {
  const hasFilters = (statusOptions && statusOptions.length > 0) || (sortOptions && sortOptions.length > 0);

  return (
    <div
      className={`grid gap-4 items-center my-4 h-[48px] ${
        hasFilters ? "grid-cols-[1fr_auto_auto]" : "grid-cols-[1fr]"
      }`}
    >
      <div className="relative h-full">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D1D1D1]" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-full pl-12 pr-4 py-[11px] bg-[#FDFDFD] border border-[#E5E5E5] rounded-[10px] text-[14px] outline-none focus:border-sageGreen transition-all placeholder:text-[#D1D1D1]"
        />
      </div>

      {statusOptions && statusOptions.length > 0 && (
        <FilterDropdown
          options={statusOptions}
          onChange={onStatusChange ?? (() => {})}
          className="h-[48px] text-charcoal font-normal text-s"
        />
      )}

      {sortOptions && sortOptions.length > 0 && (
        <FilterDropdown
          options={sortOptions}
          onChange={onSortChange ?? (() => {})}
          className="h-[48px] text-charcoal font-normal text-s"
        />
      )}
    </div>
  );
}
