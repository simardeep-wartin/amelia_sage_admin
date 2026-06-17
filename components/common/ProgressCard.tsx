"use client";

import React, { useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import Card from "@/components/common/Card";
import FilterDropdown from "@/components/ui/FilterDropdown";
import EmptyState from "@/components/common/EmptyState";

interface ProgressItem {
  label: string;
  value: number;
  detail?: string;
}

interface ProgressCardProps {
  title: string;
  subtitle?: string;
  items: ProgressItem[];
  filterOptions?: string[];
  filterVariant?: "default" | "icon";
  onFilter?: (filter: string) => void;
  lastUpdated?: string;
  note?: string;
}

export default function ProgressCard({
  title,
  subtitle,
  items,
  filterOptions = ["All", "Today", "Week", "Month", "Year", "Custom"],
  filterVariant = "default",
  onFilter,
  lastUpdated = "Real-time",
  note,
}: ProgressCardProps) {
  const [filter, setFilter] = useState(filterOptions[0]);

  const filteredItems = (() => {
    if (filter === "Top 3") return [...items].sort((a, b) => b.value - a.value).slice(0, 3);
    if (filter === "Bottom 3") return [...items].sort((a, b) => a.value - b.value).slice(0, 3);
    return items;
  })();

  const handleFilter = (val: string) => {
    setFilter(val);
    onFilter?.(val);
  };

  return (
    <Card
      title={title}
      className="h-full"
      actions={
        <FilterDropdown
          variant={filterVariant}
          options={filterOptions}
          value={filter}
          onChange={handleFilter}
        />
      }
    >
      {subtitle && <p className="mt-1 text-s text-slate">{subtitle}</p>}
      {filteredItems.length === 0 ? (
        <EmptyState className="min-h-[160px]" />
      ) : (
        <div className="mt-4 space-y-4">
          {filteredItems.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-inter text-[14px] font-medium text-[#2d2d2d]">{item.label}</p>
                <p className="font-inter text-[14px] font-bold text-sageGreen">
                  {item.value.toFixed(1)}%
                </p>
              </div>
              <ProgressBar
                progress={item.value}
                gradient="linear-gradient(90deg, #8BAA87 0%, #D6B26A 100%)"
                height="h-[10px]"
              />
              {item.detail && (
                <p className="mt-1 font-inter text-[12px] text-[#6b6b6b]">{item.detail}</p>
              )}
            </div>
          ))}
        </div>
      )}
      {note ? (
        <div className="mt-4 rounded-[8px] bg-[#f9f9f9] p-4">
          <p className="font-inter text-[14px] leading-[1.3] text-[#6b6b6b]">{note}</p>
        </div>
      ) : (
        <p className="mt-4 text-xs text-slate">Last updated: {lastUpdated}</p>
      )}
    </Card>
  );
}
