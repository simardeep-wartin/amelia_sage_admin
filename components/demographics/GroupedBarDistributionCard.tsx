"use client";

import Card from "@/components/common/Card";
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
import { useState } from "react";
import FilterDropdown from "@/components/common/FilterDropdown";

interface SeriesConfig {
  key: string;
  label: string;
  color: string;
}

interface GroupedBarDistributionCardProps {
  title: string;
  subtitle: string;
  categories: Array<Record<string, string | number>>;
  series: SeriesConfig[];
  maxY: number;
  note?: string;
}

export default function GroupedBarDistributionCard({
  title,
  subtitle,
  categories,
  series,
  maxY,
  note,
}: GroupedBarDistributionCardProps) {

  // ✅ Internal filter (same as other components)
  const FILTER_OPTIONS = [
    "All",
    ...series.map((s) => s.label),
  ];

  const [selected, setSelected] = useState("All");

  const filteredSeries =
    selected === "All"
      ? series
      : series.filter((s) => s.label === selected);

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[20px] font-medium text-charcoal">
            {title}
          </h3>
          <p className="mt-1 text-[14px] text-slate">
            {subtitle}
          </p>
        </div>

        {/* ✅ Same pattern as other cards */}
        <FilterDropdown
          options={FILTER_OPTIONS}
          value={selected}
          onChange={setSelected}
        />
      </div>

      {/* Chart */}
      <div className="mt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categories} barGap={4}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#6C6C6C" }} />
            <YAxis domain={[0, maxY]} tick={{ fontSize: 11, fill: "#6C6C6C" }} />

            <Tooltip />

            {filteredSeries.map((entry) => (
              <Bar
                key={entry.key}
                dataKey={entry.key}
                fill={entry.color}
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

      {note && (
        <div className="mt-4 rounded-[10px] bg-[#F9FAFB] p-3">
          <p className="text-[12px] text-slate">{note}</p>
        </div>
      )}
    </Card>
  );
}