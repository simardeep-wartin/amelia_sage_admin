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
  return (
    <Card title={title}>
      <p className="font-sans text-[14px] font-normal leading-[1.3] text-[#6B6B6B]">{subtitle}</p>
      <div className="mt-4 h-[300px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categories} margin={{ top: 6, right: 10, left: 0, bottom: 10 }} barGap={4}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#6C6C6C" }} />
            <YAxis tick={{ fontSize: 11, fill: "#6C6C6C" }} domain={[0, maxY]} />
            <Tooltip
              formatter={(value) => [
                typeof value === "number" ? value.toLocaleString() : String(value ?? ""),
                "Users",
              ]}
            />
            {series.map((entry) => (
              <Bar
                key={entry.key}
                dataKey={entry.key}
                fill={entry.color}
                radius={[2, 2, 0, 0]}
                maxBarSize={26}
                isAnimationActive={false}
              />
            ))}
            <Legend
              verticalAlign="bottom"
              formatter={(value) => series.find((entry) => entry.key === value)?.label ?? String(value)}
              wrapperStyle={{ fontSize: "11px", color: "#6B6B6B", paddingTop: "10px" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {note ? (
        <div className="mt-4 rounded-[10px] bg-[#F9FAFB] p-3">
          <p className="font-sans text-[12px] text-[#6B6B6B]">{note}</p>
        </div>
      ) : null}
    </Card>
  );
}
