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

export interface FeaturePoint {
  feature: string;
  sessions: number;
}

interface FeatureBarChartProps {
  data: FeaturePoint[];
}

// Recharts v3 doesn't hoist <defs> children into the SVG, so gradients defined
// inside the chart are never found. Instead, each bar renders its own <defs>
// block with a unique gradient ID scoped to that bar's x position.
function GradientBar(props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
}) {
  const { x = 0, y = 0, width = 0, height = 0, index = 0 } = props;
  if (height <= 0) return null;
  const id = `bg-${index}`;
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8BAA87" />
          <stop offset="100%" stopColor="#D6B26A" />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#${id})`}
        rx={2}
        ry={2}
      />
    </g>
  );
}

export default function FeatureBarChart({ data }: FeatureBarChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
          barCategoryGap="50%"
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E5E7EB"
            vertical={false}
            horizontal={true}
          />

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
            ticks={[0, 2500, 5000, 7500, 10000]}
            domain={[0, 10000]}
            width={45}
          />

          <Tooltip
            cursor={{ fill: "rgba(139,170,135,0.08)" }}
            contentStyle={{
              border: "1px solid #F3F4F6",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              fontSize: "13px",
            }}
            labelStyle={{ color: "#2B2B2B", fontWeight: 500 }}
            formatter={(value) => [
              typeof value === "number" ? value.toLocaleString() : value,
              "Sessions",
            ]}
          />

          <Bar
            dataKey="sessions"
            shape={<GradientBar />}
            maxBarSize={90}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
