"use client";

import React, { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "@/components/common/ChartCard";
import FilterDropdown from "@/components/ui/FilterDropdown";
import EmptyState from "@/components/common/EmptyState";

interface PieItem {
  label: string;
  value: number;
  percentage?: string;
  color: string;
  chartValue?: number;
}

interface DistributionPieChartProps {
  title: string;
  data: PieItem[];
  lastUpdated: string;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  showList?: boolean;
  filterOptions?: string[];
  onFilterChange?: (value: string, range?: { from: Date | null; to: Date | null }) => void;
  cardClassName?: string;
  /** When true the chart fills available card height and uses percentage-based radii */
  fillHeight?: boolean;
}

export default function DistributionPieChart({
  title,
  data,
  lastUpdated,
  innerRadius = 60,
  outerRadius = 85,
  startAngle = 0,
  endAngle = 360,
  showList = true,
  filterOptions,
  onFilterChange,
  cardClassName,
  fillHeight = false,
}: DistributionPieChartProps) {
  const chartData = data.map((item) => ({ ...item, chartValue: item.chartValue ?? item.value }));

  const [filter, setFilter] = useState(filterOptions ? filterOptions[0] : "All");

  const handleFilter = (val: string, range?: { from: Date | null; to: Date | null }) => {
    setFilter(val);
    onFilterChange?.(val, range);
  };

  return (
    <ChartCard
      title={title}
      className={cardClassName}
      actions={
        filterOptions ? (
          <FilterDropdown options={filterOptions} value={filter} onChange={handleFilter} />
        ) : (
          <FilterDropdown variant="icon" value={filter} onChange={handleFilter} />
        )
      }
      footer={
        <div className="space-y-2">
          {showList &&
            data.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-arial text-[14px] text-[#6B6B6B]">{item.label}</span>
                </div>
                <p className="font-arial text-[14px] text-customBlack">
                  <span className="font-medium">{item.value.toLocaleString()}</span>{" "}
                  {item.percentage && (
                    <span className="font-normal text-[#6B6B6B]">({item.percentage})</span>
                  )}
                </p>
              </div>
            ))}
          <p className="mt-3 font-arial text-[12px] text-[#6B6B6B]">Last updated: {lastUpdated}</p>
        </div>
      }
    >
      <div
        className={
          fillHeight ? "w-full flex-1 min-h-[260px]" : "mx-auto h-[260px] w-full max-w-[300px]"
        }
      >
        {chartData.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="chartValue"
                nameKey="label"
                innerRadius={fillHeight ? "65%" : innerRadius}
                outerRadius={fillHeight ? "80%" : outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                stroke="none"
                paddingAngle={0}
                isAnimationActive={false}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #F3F4F6", fontSize: 13 }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}
