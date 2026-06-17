"use client";

import React, { useState } from "react";
import Card from "@/components/common/Card";
import FilterDropdown from "@/components/ui/FilterDropdown";

interface SummaryItem {
  label: string;
  value: number | string;
  detail: string;
  color?: string;
  suffix?: string;
}

interface SummaryGridProps {
  title: string;
  subtitle?: string;
  items: SummaryItem[];
  columns?: string;
  onFilter?: (value: string, range?: { from: Date | null; to: Date | null }) => void;
  loading?: boolean;
}

export default function SummaryGrid({
  title,
  subtitle,
  items,
  columns = "grid-cols-1",
  onFilter,
  loading = false,
}: SummaryGridProps) {
  const [filter, setFilter] = useState("All");

  const handleFilter = (val: string, range?: { from: Date | null; to: Date | null }) => {
    setFilter(val);
    onFilter?.(val, range);
  };

  return (
    <Card
      title={title}
      actions={<FilterDropdown variant="icon" value={filter} onChange={handleFilter} />}
    >
      {subtitle && <p className="mt-1 text-s text-slate">{subtitle}</p>}
      {loading ? (
        <div className="mt-4 flex h-[200px] w-full items-end justify-around gap-2 px-4">
          {[60, 85, 45, 95, 55, 70, 40, 80].map((h, i) => (
            <div
              key={i}
              className="flex-1 animate-pulse rounded-t-md bg-[#E5E7EB]"
              style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      ) : (
        <div className={`mt-4 grid gap-4 ${columns}`}>
          {items.map((item) => (
            <div key={item.label} className="rounded-[10px] bg-[#F9F9F9] p-3">
              <p
                className="font-sans text-[22px] sm:text-[30px] font-semibold leading-[1.2]"
                style={{ color: item.color ?? "#2B2B2B" }}
              >
                {item.value}
                {item.suffix || ""}
              </p>
              <p className="font-sans text-[16px] font-semibold text-[#2B2B2B]">{item.label}</p>
              <p className="mt-1 font-sans text-[14px] text-[#6B6B6B]">{item.detail}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
