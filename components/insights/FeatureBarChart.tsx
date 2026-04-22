"use client";

import { useEffect, useRef } from "react";
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

const GRADIENT_ID = "feature-bar-grad";

// Recharts v3 ignores <defs> children — inject the gradient into the SVG
// imperatively so fill="url(#...)" resolves correctly.
function injectSvgGradient(container: HTMLDivElement) {
  const svg = container.querySelector("svg");
  if (!svg) return;

  let defs = svg.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svg.prepend(defs);
  }

  if (defs.querySelector(`#${GRADIENT_ID}`)) return;

  const ns = "http://www.w3.org/2000/svg";
  const grad = document.createElementNS(ns, "linearGradient");
  grad.setAttribute("id", GRADIENT_ID);
  grad.setAttribute("x1", "0");
  grad.setAttribute("y1", "0");
  grad.setAttribute("x2", "0");
  grad.setAttribute("y2", "1");

  const stop1 = document.createElementNS(ns, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#8BAA87");

  const stop2 = document.createElementNS(ns, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#D6B26A");

  grad.appendChild(stop1);
  grad.appendChild(stop2);
  defs.appendChild(grad);
}

export default function FeatureBarChart({ data }: FeatureBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Run after every render so the gradient survives Recharts SVG recreations.
  useEffect(() => {
    if (containerRef.current) injectSvgGradient(containerRef.current);
  });

  return (
    <div ref={containerRef} className="h-[300px] w-full">
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
            fill={`url(#${GRADIENT_ID})`}
            radius={[2, 2, 0, 0]}
            maxBarSize={90}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
