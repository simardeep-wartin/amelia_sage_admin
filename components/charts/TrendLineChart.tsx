"use client";

import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import FilterDropdown from "@/components/ui/FilterDropdown";
import ChartCard from "@/components/common/ChartCard";

interface SeriesConfig {
  key: string;
  label: string;
  color: string;
}

interface FilterConfig {
  label: string;
  options: string[];
}

interface TrendLineChartProps {
  title: string;
  subtitle?: string;
  filters?: FilterConfig[];
  data: Record<string, unknown>[];
  series: SeriesConfig[];
  yTicks?: number[];
  yDomain?: [number | string, number | string];
  onFilterChange?: (values: string[]) => void;
}

export default function TrendLineChart({
  title,
  subtitle,
  filters = [],
  data,
  series,
  yTicks,
  yDomain,
  onFilterChange,
}: TrendLineChartProps) {
  const [filterValues, setFilterValues] = useState<string[]>(filters.map((f) => f.options[0]));

  const actions = (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter, i) => (
        <FilterDropdown
          key={filter.label}
          options={filter.options}
          value={filterValues[i]}
          onChange={(val) => {
            const next = filterValues.map((v, idx) => (idx === i ? val : v));
            setFilterValues(next);
            onFilterChange?.(next);
          }}
        />
      ))}
    </div>
  );

  return (
    <ChartCard title={title} actions={actions}>
      {subtitle && (
        <p className="mt-[10px] font-sans text-[14px] font-normal leading-[1.3] text-[#6B6B6B]">
          {subtitle}
        </p>
      )}

      <div className="mt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B6B6B" }}
              {...(yTicks && { ticks: yTicks })}
              {...(yDomain && { domain: yDomain })}
            />
            <Tooltip
              contentStyle={{
                border: "1px solid #F3F4F6",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                fontSize: "13px",
              }}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.75}
                dot={{ r: 2.8, strokeWidth: 1.2, fill: "#fff" }}
                activeDot={{ r: 4 }}
              />
            ))}
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: "10px", color: "#6B6B6B", paddingTop: "8px" }}
              formatter={(value) => series.find((s) => s.key === value)?.label ?? value}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
