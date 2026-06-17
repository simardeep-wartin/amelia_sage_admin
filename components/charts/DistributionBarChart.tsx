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
import EmptyState from "@/components/common/EmptyState";
import type { SeriesConfig } from "@/types";

interface DistributionBarChartProps {
  title: string;
  subtitle?: string;
  data: Record<string, unknown>[];
  series: SeriesConfig[];
  maxY?: number;
  note?: string;
  filterOptions?: string[];
  onFilterChange?: (value: string, range?: { from: Date | null; to: Date | null }) => void;
  loading?: boolean;
}

export default function DistributionBarChart({
  title,
  subtitle,
  data,
  series,
  maxY,
  note,
  filterOptions,
  onFilterChange,
  loading = false,
}: DistributionBarChartProps) {
  const [selected, setSelected] = useState("All");
  const [timeFilter, setTimeFilter] = useState(filterOptions ? filterOptions[0] : "All");
  const seriesOptions = ["All", ...series.map((seriesItem) => seriesItem.label)];
  const filteredSeries =
    selected === "All" ? series : series.filter((seriesItem) => seriesItem.label === selected);

  const actions = (
    <div className="flex items-center gap-2">
      {filterOptions && onFilterChange ? (
        // Single text dropdown with explicit options (e.g. all / today / week / month / year / custom)
        <FilterDropdown
          options={filterOptions}
          value={timeFilter}
          onChange={(val, range) => {
            setTimeFilter(val);
            onFilterChange(val, range);
          }}
        />
      ) : (
        <>
          {onFilterChange && (
            <FilterDropdown
              variant="icon"
              value={timeFilter}
              onChange={(val, range) => {
                setTimeFilter(val);
                onFilterChange(val, range);
              }}
            />
          )}
          <FilterDropdown options={seriesOptions} value={selected} onChange={setSelected} />
        </>
      )}
    </div>
  );

  return (
    <ChartCard
      title={title}
      actions={actions}
      footer={
        loading || !note ? null : (
          <div className="mt-4 rounded-[8px] bg-[#f9f9f9] p-4">
            <p className="font-inter text-[14px] leading-[1.3] text-[#6b6b6b]">
              {note.includes(": ") ? (
                <>
                  <span className="font-semibold text-slate">{note.split(": ")[0]}</span>
                  <span>: {note.split(": ").slice(1).join(": ")}</span>
                </>
              ) : (
                note
              )}
            </p>
          </div>
        )
      }
    >
      {subtitle && <p className="mt-1 text-[14px] text-slate">{subtitle}</p>}

      <div className="mt-4 h-[300px] w-full">
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
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#6C6C6C" }} />
              <YAxis
                domain={maxY !== undefined ? [0, maxY] : undefined}
                tick={{ fontSize: 11, fill: "#6C6C6C" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #F3F4F6",
                  fontSize: 13,
                  color: "#1F2937",
                }}
              />
              {filteredSeries.map((seriesItem) => (
                <Bar
                  key={seriesItem.key}
                  dataKey={seriesItem.key}
                  fill={seriesItem.color}
                  radius={[2, 2, 0, 0]}
                  maxBarSize={26}
                />
              ))}
              <Legend
                verticalAlign="bottom"
                content={({ payload }) => (
                  <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 pt-3">
                    {payload?.map((entry) => (
                      <div key={entry.value} className="flex items-center gap-1.5">
                        <span
                          className="inline-block h-[10px] w-[10px] flex-shrink-0 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="font-arial text-[11px] text-[#6B6B6B]">
                          {series.find((s) => s.key === entry.value)?.label ?? entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}
