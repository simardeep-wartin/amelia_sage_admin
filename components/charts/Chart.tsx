"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TooltipContentProps } from "recharts";
import type { ChartPoint } from "@/types";

interface ChartProps {
  data: ChartPoint[];
  color?: string;
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #f3f4f6",
        borderRadius: 10,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        padding: "8px 12px",
      }}
    >
      <p style={{ color: "#2B2B2B", fontWeight: 500, margin: 0 }}>{label}</p>
      <p style={{ color: "#000000", margin: 0 }}>value : {payload[0].value}</p>
    </div>
  );
}

export default function Chart({ data }: ChartProps) {
  return (
    <div className="h-[202px] w-full cursor-pointer">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="activeUsersFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b7ec8" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#8b7ec8" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <Tooltip content={CustomTooltip} />
          <Area type="monotone" dataKey="value" stroke="none" fill="url(#activeUsersFill)" />
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
