"use client";

import Card from "@/components/common/Card";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface GenderDistributionItem {
  label: string;
  value: number;
  percentage: string;
  color: string;
  chartValue?: number;
}

interface GenderDistributionCardProps {
  title: string;
  data: GenderDistributionItem[];
  lastUpdated: string;
}

export default function GenderDistributionCard({
  title,
  data,
  lastUpdated,
}: GenderDistributionCardProps) {
  const chartData = data.map((item) => ({ ...item, chartValue: item.chartValue ?? item.value }));

  return (
    <Card
      title={title}
      className="h-full"
      actions={
        <button
          type="button"
          className="text-slate transition-colors hover:text-charcoal"
          aria-label="Filter gender distribution"
        >
          <img src="/auth/filter.svg" alt="icon" className="h-6 w-6" />
        </button>
      }
    >
      <div className="mx-auto h-[300px] w-full max-w-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="chartValue"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={100}
              startAngle={92}
              endAngle={-268}
              paddingAngle={0}
              stroke="none"
              isAnimationActive={false}
            >
              {chartData.map((entry) => (
                <Cell key={entry.label} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [value.toLocaleString(), "Users"]}
              contentStyle={{
                border: "1px solid #F3F4F6",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                fontSize: "13px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 space-y-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-arial text-[14px] font-normal leading-[20px] text-[#6B6B6B]">
                {item.label}
              </span>
            </div>
            <p className="font-arial text-[14px] leading-[20px] text-customBlack">
              <span className="font-medium">{item.value.toLocaleString()}</span>{" "}
              <span className="font-normal text-[#6B6B6B]">({item.percentage})</span>
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 font-arial text-[12px] leading-[16px] text-[#6B6B6B]">
        Last updated: {lastUpdated}
      </p>
    </Card>
  );
}
