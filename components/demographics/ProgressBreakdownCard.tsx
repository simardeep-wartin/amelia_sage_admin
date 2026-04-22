"use client";

import { useState } from "react";
import Card from "@/components/common/Card";
import FilterDropdown from "@/components/common/FilterDropdown";

interface ProgressItem {
  label: string;
  value: number;
  detail?: string;
}

interface ProgressBreakdownCardProps {
  title: string;
  subtitle?: string;
  items: ProgressItem[];
}

export default function ProgressBreakdownCard({
  title,
  subtitle,
  items,
}: ProgressBreakdownCardProps) {

  // ─── Filter State ─────────────────────────────
  const [filter, setFilter] = useState("All");

  const FILTER_OPTIONS = ["All", "Top 3", "Bottom 3"];

  // ─── Filter Logic ────────────────────────────
  const filteredItems = (() => {
    if (filter === "Top 3") {
      return [...items].sort((a, b) => b.value - a.value).slice(0, 3);
    }
    if (filter === "Bottom 3") {
      return [...items].sort((a, b) => a.value - b.value).slice(0, 3);
    }
    return items;
  })();

  return (
    <Card
      title={title}
      className="h-full"
      actions={
        <FilterDropdown
          options={FILTER_OPTIONS}
          value={filter}
          onChange={setFilter}
        />
      }
    >
      {/* ─── Subtitle ───────────────────────── */}
      {subtitle && (
        <p className="mt-1 text-s text-slate">
          {subtitle}
        </p>
      )}

      {/* ─── Items ─────────────────────────── */}
      <div className="mt-4 space-y-4">
        {filteredItems.map((item) => (
          <div key={item.label}>
            
            {/* Label + Value */}
            <div className="mb-1 flex items-center justify-between">
              <p className="text-m font-medium text-charcoal">
                {item.label}
              </p>

              <p className="text-m font-semibold text-sageGreen">
                {item.value.toFixed(1)}%
              </p>
            </div>

            {/* Detail */}
            {item.detail && (
              <p className="mb-1 text-xs text-slate">
                {item.detail}
              </p>
            )}

            {/* Progress Bar */}
           <div className="h-[10px] w-full rounded-full bg-[#E6E8EC] overflow-hidden">
  <div
    className="h-full rounded-full"
    style={{
      width: `${item.value}%`,
      background:
        "linear-gradient(90deg, #8BAA87 0%, #D6B26A 100%)",
    }}
  />
</div>
          </div>
        ))}
      </div>

      {/* ─── Footer ───────────────────────── */}
      <p className="mt-4 text-xs text-slate">
        Last updated: Real-time
      </p>
    </Card>
  );
}