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

  xTicks?: number[];
  xDomain?: [number, number];
  barColor?: string;
  onFilterChange?: (value: string, range?: { from: Date | null; to: Date | null }) => void;
  loading?: boolean;
}

// Defined outside component — Recharts remounts the tick on every render if defined inside
function YAxisTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const label = payload?.value ?? "";
  const display = label.length > 22 ? label.slice(0, 21) + "…" : label;
  return (
    <g transform={`translate(${x},${y})`}>
      <title>{label}</title>
      <text
        x={-6}
        y={0}
        dy={4}
        textAnchor="end"
        fill="#6B6B6B"
        fontSize={11}
        fontFamily="Inter, sans-serif"
      >
        {display}
      </text>
    </g>
  );
}

export default function HorizontalBarChart({
  title,
  subtitle,
  data,
  dataKey,
  labelKey,
  highlights = [],

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

  const chartHeight = Math.max(280, data.length * 36);
  const barSize = data.length > 8 ? 26 : 32;

  return (
    <ChartCard
      title={title}
      actions={<FilterDropdown value={filter} onChange={handleFilter} />}
      footer={
        loading ? null : (
          <div className="space-y-4">
            {highlights.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[10px] px-4 py-3 text-center"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <p className="text-[12px] text-[#6B6B6B]">{item.title}</p>
                    <p
                      className="mt-1 text-[18px] font-bold leading-[28px]"
                      style={{ color: item.textColor }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[12px] text-[#6B6B6B]">{item.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      }
    >
      {subtitle && <p className="text-[13px] leading-[1.4] text-[#6B6B6B]">{subtitle}</p>}

      <div className="mt-4 w-full" style={{ height: chartHeight }}>
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
              margin={{ top: 4, right: 12, left: 4, bottom: 16 }}
              barCategoryGap="15%"
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" horizontal={false} vertical />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#6B6B6B" }}
                axisLine={false}
                tickLine={false}
                {...(xDomain ? { domain: xDomain } : {})}
                {...(xTicks ? { ticks: xTicks } : {})}
              />
              <YAxis
                type="category"
                dataKey={labelKey}
                width={152}
                tick={<YAxisTick />}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(139,126,200,0.08)" }}
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
                radius={[0, 4, 4, 0]}
                barSize={barSize}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}
