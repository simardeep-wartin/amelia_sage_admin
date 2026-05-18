"use client";

import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

interface DistributionBarChartProps {
  title: string;
  subtitle?: string;
  data: Record<string, unknown>[];
  series: SeriesConfig[];
  maxY?: number;
  note?: string;
}

export default function DistributionBarChart({
  title,
  subtitle,
  data,
  series,
  maxY,
  note,
}: DistributionBarChartProps) {
  const [selected, setSelected] = useState("All");
  const filterOptions = ["All", ...series.map((s) => s.label)];
  const filteredSeries = selected === "All" ? series : series.filter((s) => s.label === selected);

  const actions = (
    <FilterDropdown options={filterOptions} value={selected} onChange={setSelected} />
  );

  return (
    <ChartCard
      title={title}
      actions={actions}
      footer={
        note ? (
          <div className="mt-4 rounded-[10px] bg-[#F9FAFB] p-3">
            <p className="text-[12px] text-slate">{note}</p>
          </div>
        ) : null
      }
    >
      {subtitle && <p className="mt-1 text-[14px] text-slate">{subtitle}</p>}

      <div className="mt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#6C6C6C" }} />
            <YAxis
              domain={maxY !== undefined ? [0, maxY] : undefined}
              tick={{ fontSize: 11, fill: "#6C6C6C" }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #F3F4F6", fontSize: 13 }}
            />
            {filteredSeries.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                fill={s.color}
                radius={[2, 2, 0, 0]}
                maxBarSize={26}
              />
            ))}
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
