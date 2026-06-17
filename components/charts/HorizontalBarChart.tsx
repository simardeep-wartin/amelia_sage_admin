"use client";

import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "@/components/common/ChartCard";
import FilterDropdown from "@/components/ui/FilterDropdown";
import EmptyState from "@/components/common/EmptyState";

interface HighlightItem {
  title: string;
  label: string;
  detail: string;
  bgColor: string;
  textColor: string;
}

interface HorizontalBarChartProps {
  title: string;
  subtitle?: string;
  data: Record<string, unknown>[];
  dataKey: string;
  labelKey: string;
  highlights?: HighlightItem[];
  lastUpdated: string;
  xTicks?: number[];
  xDomain?: [number, number];
  barColor?: string;
  onFilterChange?: (value: string, range?: { from: Date | null; to: Date | null }) => void;
  loading?: boolean;
}

export default function HorizontalBarChart({
  title,
  subtitle,
  data,
  dataKey,
  labelKey,
  highlights = [],
  lastUpdated,
  xTicks,
  xDomain,
  barColor = "#8B7EC8",
  onFilterChange,
  loading = false,
}: HorizontalBarChartProps) {
  const [filter, setFilter] = useState("All");

  const handleFilter = (val: string, range?: { from: Date | null; to: Date | null }) => {
    setFilter(val);
    onFilterChange?.(val, range);
  };

  return (
    <ChartCard
      title={title}
      actions={<FilterDropdown value={filter} onChange={handleFilter} />}
      footer={
        loading ? null : (
          <div className="space-y-4">
            {highlights.length > 0 && (
              <div className="grid grid-cols-1 gap-3 s:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[10px] px-4 py-3 text-center"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <p className="text-[12px] text-[#6B6B6B]">{item.title}</p>
                    <p className="mt-1 text-[18px] font-bold" style={{ color: item.textColor }}>
                      {item.label}
                    </p>
                    <p className="text-[12px] text-[#6B6B6B]">{item.detail}</p>
                  </div>
                ))}
              </div>
            )}
            <p className="text-[12px] text-[#6B6B6B]">Last updated: {lastUpdated}</p>
          </div>
        )
      }
    >
      {subtitle && <p className="text-[14px] text-slate">{subtitle}</p>}

      <div className="mt-4 h-[280px] w-full">
        {loading ? (
          <div className="flex h-full w-full items-end justify-around gap-2 px-4">
            {[60, 85, 45, 95, 55, 70, 40, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 animate-pulse rounded-t-md bg-[#E5E7EB]"
                style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        ) : data.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 6, right: 8, left: 2, bottom: 18 }}
              barCategoryGap={14}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" horizontal vertical />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#6B6B6B" }}
                {...(xDomain && { domain: xDomain })}
                {...(xTicks && { ticks: xTicks })}
              />
              <YAxis
                type="category"
                dataKey={labelKey}
                width={128}
                tick={{ fontSize: 11, fill: "#6B6B6B" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #F3F4F6",
                  fontSize: 13,
                  color: "#1F2937",
                }}
                formatter={(value, name, props) => {
                  const pct = (props.payload as Record<string, unknown>)?.percentage;
                  return pct !== undefined ? [`${value} (${pct}%)`, name] : [value, name];
                }}
              />
              <Bar
                dataKey={dataKey}
                fill={barColor}
                radius={[3, 3, 3, 3]}
                barSize={28}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}
