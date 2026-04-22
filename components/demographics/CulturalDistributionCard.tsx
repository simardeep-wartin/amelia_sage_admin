"use client";

import Card from "@/components/common/Card";
import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CulturalDistributionItem {
  group: string;
  users: number;
}

interface HighlightGroup {
  title: string;
  label: string;
  detail: string;
  bgColor: string;
  textColor: string;
}

interface CulturalDistributionCardProps {
  title: string;
  subtitle: string;
  data: CulturalDistributionItem[];
  highlights: HighlightGroup[];
  lastUpdated: string;
}

export default function CulturalDistributionCard({
  title,
  subtitle,
  data,
  highlights,
  lastUpdated,
}: CulturalDistributionCardProps) {
  return (
    <Card
      title={title}
      className="h-full"
      actions={
        <button
          type="button"
          className="text-slate transition-colors hover:text-charcoal"
          aria-label="Filter cultural distribution"
        >
          <FunnelIcon className="h-5 w-5" />
        </button>
      }
    >
      <p className="font-sans text-[14px] font-normal leading-[1.3] text-[#6B6B6B]">{subtitle}</p>

      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 6, right: 8, left: 2, bottom: 18 }}
            barCategoryGap={14}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" horizontal={true} vertical={true} />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: "#6B6B6B" }}
              domain={[0, 3000]}
              ticks={[0, 750, 1500, 2250, 3000]}
            />
            <YAxis
              type="category"
              dataKey="group"
              width={128}
              tick={{ fontSize: 11, fill: "#6B6B6B" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [
                typeof value === "number" ? value.toLocaleString() : String(value ?? ""),
                "Users",
              ]}
              contentStyle={{
                border: "1px solid #F3F4F6",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                fontSize: "13px",
              }}
            />
            <Bar
              dataKey="users"
              fill="#8B7EC8"
              radius={[3, 3, 3, 3]}
              barSize={28}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 s:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-[10px] px-4 py-3 text-center"
            style={{ backgroundColor: item.bgColor }}
          >
            <p className="font-sans text-[12px] font-normal leading-[16px] text-[#6B6B6B]">
              {item.title}
            </p>
            <p className="mt-1 font-sans text-[18px] font-bold leading-[1] " style={{ color: item.textColor }}>
              {item.label}
            </p>
            <p className="mt-1 font-sans text-[12px] font-normal leading-[16px] text-[#6B6B6B]">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 font-arial text-[12px] leading-[16px] text-[#6B6B6B]">
        Last updated: {lastUpdated}
      </p>
    </Card>
  );
}
