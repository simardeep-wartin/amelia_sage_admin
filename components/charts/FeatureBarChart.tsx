"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { FeaturePoint } from "@/types";

interface FeatureBarChartProps {
  data: FeaturePoint[];
}

export default function FeatureBarChart({ data }: FeatureBarChartProps) {
  const normalizedData = data.map((point) => ({
    ...point,
    sessions: Number(point.sessions) || 0,
  }));

  const maxVal = Math.max(...normalizedData.map((point) => point.sessions), 1);
  const domainMax = Math.ceil(maxVal * 1.2);
  const step = Math.ceil(domainMax / 4);
  const yTicks = [0, step, step * 2, step * 3, domainMax];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={normalizedData}
          margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
          barCategoryGap={32}
        >
          <defs>
            <linearGradient id="featureUsageBarGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8BAA87" />
              <stop offset="100%" stopColor="#D6B26A" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" vertical={true} horizontal={true} />

          <XAxis
            dataKey="feature"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B6B6B" }}
            interval={0}
          />

          <YAxis
            axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            tickLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            tick={{ fontSize: 12, fill: "#6B6B6B" }}
            ticks={yTicks}
            domain={[0, domainMax]}
            width={45}
          />

          <Tooltip
            cursor={{ fill: "rgba(139,170,135,0.08)" }}
            contentStyle={{
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              fontSize: "13px",
              padding: "8px 12px",
            }}
            labelStyle={{ color: "#1F2937", fontWeight: 600, marginBottom: 4 }}
            itemStyle={{ color: "#4B5563" }}
            formatter={(value) => [
              typeof value === "number" ? value.toLocaleString() : value,
              "Sessions",
            ]}
          />

          <Bar
            dataKey="sessions"
            fill="url(#featureUsageBarGradient)"
            radius={[8, 8, 0, 0]}
            minPointSize={4}
            barSize={58}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
