"use client";

import Card from "@/components/common/Card";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DistributionItem {
  label: string;
  value: number;
  percentage: string;
  color: string;
  chartValue?: number;
}

interface DonutDistributionCardProps {
  title: string;
  subtitle?: string;
  items: DistributionItem[];
  lastUpdated: string;
}

export default function DonutDistributionCard({
  title,
  subtitle,
  items,
  lastUpdated,
}: DonutDistributionCardProps) {
  const chartData = items.map((item) => ({ ...item, chartValue: item.chartValue ?? item.value }));

  return (
    <Card
      title={title}
      className="h-full"
      actions={
        <button type="button" className="text-slate transition-colors hover:text-charcoal" aria-label="Filter">
          <FunnelIcon className="h-5 w-5" />
        </button>
      }
    >
      {subtitle ? <p className="font-sans text-[14px] font-normal leading-[1.3] text-[#6B6B6B]">{subtitle}</p> : null}
      <div className="mx-auto mt-2 h-[300px] w-full max-w-[300px]">
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
              stroke="none"
              isAnimationActive={false}
            >
              {chartData.map((entry) => (
                <Cell key={entry.label} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [
                typeof value === "number" ? value.toLocaleString() : String(value ?? ""),
                "Users",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-arial text-[14px] font-normal leading-[20px] text-[#6B6B6B]">{item.label}</span>
            </div>
            <p className="font-arial text-[14px] leading-[20px] text-customBlack">
              <span className="font-medium">{item.value.toLocaleString()}</span>{" "}
              <span className="font-normal text-[#6B6B6B]">({item.percentage})</span>
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 font-arial text-[12px] leading-[16px] text-[#6B6B6B]">Last updated: {lastUpdated}</p>
    </Card>
  );
}
