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

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

function CustomXTick({ x = 0, y = 0, payload }: CustomTickProps) {
  const words = (payload?.value ?? "").split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
    } else if ((current + " " + word).length <= 14) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, i) => (
        <text
          key={i}
          x={0}
          y={0}
          dy={12 + i * 14}
          textAnchor="middle"
          fill="#6C6C6C"
          fontSize={12}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default function FeatureBarChart({ data }: FeatureBarChartProps) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: -16, bottom: 40 }}
          barCategoryGap="30%"
        >
          <defs>
            <linearGradient id="featureBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9caf88" />
              <stop offset="100%" stopColor="#8BAA87" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis
            dataKey="feature"
            tick={(props: CustomTickProps) => <CustomXTick {...props} />}
            axisLine={false}
            tickLine={false}
            height={60}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6C6C6C" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 2500, 5000, 7500, 10000]}
            domain={[0, 10000]}
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
          <Bar
            dataKey="sessions"
            fill="url(#featureBarGrad)"
            radius={[4, 4, 0, 0]}
            maxBarSize={100}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
