"use client";

import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "@/components/common/ChartCard";

interface DistributionItem {
  label: string;
  value: number;
  color: string;
}

interface DistributionDonutChartProps {
  title: string;
  subtitle?: string;
  items: DistributionItem[];
}

export default function DistributionDonutChart({
  title,
  subtitle,
  items,
}: DistributionDonutChartProps) {
  return (
    <ChartCard
      title={title}
      footer={
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[14px]">
              <span className="flex items-center gap-2 text-slate">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
              <span className="font-semibold text-charcoal">{item.value}%</span>
            </div>
          ))}
        </div>
      }
    >
      {subtitle && <p className="mt-1 text-[14px] text-slate">{subtitle}</p>}

      <div className="mt-4 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              outerRadius={85}
              stroke="none"
              paddingAngle={5}
            >
              {items.map((entry) => (
                <Cell key={entry.label} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #F3F4F6", fontSize: 13 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
