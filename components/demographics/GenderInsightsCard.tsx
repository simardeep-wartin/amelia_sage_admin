"use client";

import { useState } from "react";
import Card from "@/components/common/Card";
import FilterDropdown from "@/components/common/FilterDropdown";

interface InsightRow {
  label: string;
  value: string;
  progress: number;
}

interface InsightGroup {
  title: string;
  rows: InsightRow[];
}

interface GenderInsightsCardProps {
  title: string;
  groups: InsightGroup[];
}

// 🎨 Solid colors only (no gradients)
const GROUP_COLORS: Record<string, string> = {
  Women: "#8B7EC8",
  Men: "#6C6C6C",
  "Non-binary": "#9CAF88",
  "Prefer not to say": "#9CAF88",
  Other: "#F59E0B",
};

export default function GenderInsightsCard({
  title,
  groups,
}: GenderInsightsCardProps) {
  const FILTER_OPTIONS = ["All", ...groups.map((g) => g.title)];
  const [selected, setSelected] = useState("All");

  const filteredGroups =
    selected === "All"
      ? groups
      : groups.filter((g) => g.title === selected);

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-l font-medium text-charcoal">{title}</h3>

        <FilterDropdown
          options={FILTER_OPTIONS}
          value={selected}
          onChange={setSelected}
        />
      </div>

      {/* Grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 m:grid-cols-2 l:grid-cols-3">
        {filteredGroups.map((group) => {
          const color = GROUP_COLORS[group.title] || "#8BAA87";

          return (
            <div key={group.title} className="rounded-[12px] px-4 py-4 border border-[#E6E8EC]">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <p
                  className="text-m font-semibold text-charcoal"
                >
                  {group.title}
                </p>
              </div>

              {/* Rows */}
              <div className="space-y-3">
                {group.rows.map((row) => (
                  <div key={row.label}>
                    
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-xs text-slate">
                        {row.label}
                      </p>

                      <p className="text-xs font-semibold text-charcoal">
                        {row.value}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="h-[6px] w-full rounded-full bg-[#E6E8EC] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${row.progress}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>

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