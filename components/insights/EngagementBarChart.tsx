"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface EngagementPoint {
  day: string;
  sessions: number;
}

interface EngagementBarChartProps {
  data: EngagementPoint[];
}

export default function EngagementBarChart({ data }: EngagementBarChartProps) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "#6C6C6C" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6C6C6C" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}k` : String(v))}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #F3F4F6",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              fontSize: "14px",
            }}
            labelStyle={{ color: "#2B2B2B", fontWeight: 500 }}
            formatter={(value: number) => [value.toLocaleString(), "Sessions"]}
          />
          <Bar dataKey="sessions" fill="#8BAA87" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
