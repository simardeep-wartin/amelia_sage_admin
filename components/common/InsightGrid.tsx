"use client";

import React, { useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import Card from "@/components/common/Card";
import FilterDropdown from "@/components/ui/FilterDropdown";

interface InsightRow {
  label: string;
  value: string;
  progress: number;
}

interface InsightGroup {
  title: string;
  rows: InsightRow[];
}

interface InsightGridProps {
  title: string;
  groups: InsightGroup[];
  groupColors?: Record<string, string>;
}

const DEFAULT_COLORS: Record<string, string> = {
  Women: "#8B7EC8",
  Men: "#6C6C6C",
  "Non-binary": "#9CAF88",
  "Prefer not to say": "#9CAF88",
  Other: "#F59E0B",
};

export default function InsightGrid({
  title,
  groups,
  groupColors = DEFAULT_COLORS,
}: InsightGridProps) {
  const [filter, setFilter] = useState("All");
  const filterOptions = ["All", ...groups.map((g) => g.title)];
  const filteredGroups = filter === "All" ? groups : groups.filter((g) => g.title === filter);

  return (
    <Card 
      title={title}
      actions={<FilterDropdown options={filterOptions} value={filter} onChange={setFilter} />}
    >
      <div className="grid grid-cols-1 gap-4 m:grid-cols-2 l:grid-cols-3">
        {filteredGroups.map((group) => {
          const color = groupColors[group.title] || "#8BAA87";
          return (
            <div key={group.title} className="rounded-[12px] px-4 py-4 border border-[#E6E8EC]">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                <p className="text-m font-semibold text-charcoal">{group.title}</p>
              </div>
              <div className="space-y-3">
                {group.rows.map((row) => (
                  <div key={row.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-xs text-slate">{row.label}</p>
                      <p className="text-xs font-semibold text-charcoal">{row.value}</p>
                    </div>
                    <ProgressBar progress={row.progress} color={color} height="h-[6px]" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
