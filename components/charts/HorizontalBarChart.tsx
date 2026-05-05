"use client";

import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "@/components/common/ChartCard";
import FilterDropdown from "@/components/ui/FilterDropdown";

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
  data: any[];
  dataKey: string;
  labelKey: string;
  highlights?: HighlightItem[];
  lastUpdated: string;
  xTicks?: number[];
  xDomain?: [number, number];
  barColor?: string;
}

export default function HorizontalBarChart({
  title,
  subtitle,
  data,
  dataKey,
  labelKey,
  highlights = [],
  lastUpdated,
  xTicks = [0, 750, 1500, 2250, 3000],
  xDomain = [0, 3000],
  barColor = "#8B7EC8",
}: HorizontalBarChartProps) {
  const [filter, setFilter] = useState("This Week");

  return (
    <ChartCard 
      title={title}
      actions={
        <FilterDropdown variant="icon" value={filter} onChange={setFilter} />
      }
      footer={
        <div className="space-y-4">
          {highlights.length > 0 && (
            <div className="grid grid-cols-1 gap-3 s:grid-cols-2">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-[10px] px-4 py-3 text-center" style={{ backgroundColor: item.bgColor }}>
                  <p className="text-[12px] text-[#6B6B6B]">{item.title}</p>
                  <p className="mt-1 text-[18px] font-bold" style={{ color: item.textColor }}>{item.label}</p>
                  <p className="text-[12px] text-[#6B6B6B]">{item.detail}</p>
                </div>
              ))}
            </div>
          )}
          <p className="text-[12px] text-[#6B6B6B]">Last updated: {lastUpdated}</p>
        </div>
      }
    >
      {subtitle && <p className="text-[14px] text-slate">{subtitle}</p>}
      
      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} margin={{ top: 6, right: 8, left: 2, bottom: 18 }} barCategoryGap={14}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" horizontal vertical />
            <XAxis type="number" tick={{ fontSize: 12, fill: "#6B6B6B" }} domain={xDomain} ticks={xTicks} />
            <YAxis type="category" dataKey={labelKey} width={128} tick={{ fontSize: 11, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #F3F4F6", fontSize: 13 }} />
            <Bar dataKey={dataKey} fill={barColor} radius={[3, 3, 3, 3]} barSize={28} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
