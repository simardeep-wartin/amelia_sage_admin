"use client";

import React, { useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import Card from "@/components/common/Card";
import FilterDropdown from "@/components/ui/FilterDropdown";

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
  onFilter?: (filter: string) => void;
  lastUpdated?: string;
}

export default function ProgressCard({
  title,
  subtitle,
  items,
  filterOptions = ["All", "Top 3", "Bottom 3"],
  lastUpdated = "Real-time",
}: ProgressCardProps) {
  const [filter, setFilter] = useState("All");

  const filteredItems = (() => {
    if (filter === "Top 3") return [...items].sort((a, b) => b.value - a.value).slice(0, 3);
    if (filter === "Bottom 3") return [...items].sort((a, b) => a.value - b.value).slice(0, 3);
    return items;
  })();

  return (
    <Card 
      title={title} 
      className="h-full"
      actions={<FilterDropdown options={filterOptions} value={filter} onChange={setFilter} />}
    >
      {subtitle && <p className="mt-1 text-s text-slate">{subtitle}</p>}
      <div className="mt-4 space-y-4">
        {filteredItems.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-m font-medium text-charcoal">{item.label}</p>
              <p className="text-m font-semibold text-sageGreen">{item.value.toFixed(1)}%</p>
            </div>
            {item.detail && <p className="mb-1 text-xs text-slate">{item.detail}</p>}
            <ProgressBar progress={item.value} gradient="linear-gradient(90deg, #8BAA87 0%, #D6B26A 100%)" height="h-[10px]" />
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate">Last updated: {lastUpdated}</p>
    </Card>
  );
}
