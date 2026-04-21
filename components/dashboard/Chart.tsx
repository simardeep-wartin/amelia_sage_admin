"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface ChartPoint {
  label: string;
  value: number;
}

interface ChartProps {
  data: ChartPoint[];
  color?: string;
}

export default function Chart({ data, color = "#8BAA87" }: ChartProps) {
  return (
    <div className="h-[190px] w-full cursor-pointer">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="activeUsersFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b7ec8" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#8b7ec8" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              border: "1px solid #f3f4f6",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
            labelStyle={{ color: "#2B2B2B", fontWeight: 500 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#activeUsersFill)"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8b7ec8"
            strokeWidth={2}
            fill="transparent"
            dot={false}
            activeDot={{ r: 5, fill: "#8b7ec8", stroke: "#ffffff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
