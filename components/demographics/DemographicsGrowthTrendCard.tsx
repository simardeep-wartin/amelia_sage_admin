"use client";

import { useState } from "react";
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
import FilterDropdown from "@/components/common/FilterDropdown";

interface GrowthTrendPoint {
  month: string;
  spiritualGrowthFaith: number;
  wholeSelfRevival: number;
  relationshipHealing: number;
  careerLeadership: number;
}

interface GrowthTrendFilter {
  label: string;
  options: string[];
}

interface DemographicsGrowthTrendCardProps {
  title: string;
  subtitle: string;
  filters: GrowthTrendFilter[];
  data: GrowthTrendPoint[];
}

const LINE_CONFIG = [
  { key: "spiritualGrowthFaith", label: "Spiritual Growth and Faith", color: "#9CAF88" },
  { key: "wholeSelfRevival", label: "Whole Self Revival", color: "#D4A574" },
  { key: "relationshipHealing", label: "Relationship Healing", color: "#7B4CE2" },
  { key: "careerLeadership", label: "Career and Leadership", color: "#6B6B6B" },
] as const;

export default function DemographicsGrowthTrendCard({
  title,
  subtitle,
  filters,
  data,
}: DemographicsGrowthTrendCardProps) {
  const [filterValues, setFilterValues] = useState<string[]>(
    filters.map((f) => f.label)
  );

  return (
    <section className="rounded-[14px] border border-cardBorder bg-paper px-[20.667px] pb-[20px] pt-[20.667px] shadow-sm">
      <div className="flex flex-col gap-4 s:flex-row s:items-start s:justify-between">
        <div>
          <h3 className="font-arial text-[20px] font-medium leading-[20px] text-[#2B2B2B]">{title}</h3>
          <p className="mt-[10px] font-sans text-[14px] font-normal leading-[1.3] text-[#6B6B6B]">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter, i) => (
            <FilterDropdown
              key={filter.label}
              options={filter.options}
              value={filterValues[i]}
              onChange={(val) =>
                setFilterValues((prev) => prev.map((v, idx) => (idx === i ? val : v)))
              }
            />
          ))}
        </div>
      </div>

      <div className="mt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B6B6B" }}
              ticks={[0, 750, 1500, 2250, 3000]}
              domain={[0, 3000]}
            />
            <Tooltip
              contentStyle={{
                border: "1px solid #F3F4F6",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                fontSize: "13px",
              }}
            />
            {LINE_CONFIG.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={1.75}
                dot={{ r: 2.8, strokeWidth: 1.2, fill: "#fff" }}
                activeDot={{ r: 4 }}
              />
            ))}
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: "10px", color: "#6B6B6B", paddingTop: "8px" }}
              formatter={(value) =>
                LINE_CONFIG.find((line) => line.key === value)?.label ?? value
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
