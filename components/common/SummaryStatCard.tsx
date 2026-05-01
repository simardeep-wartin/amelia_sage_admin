"use client";

import React, { ReactNode } from "react";

interface SummaryStatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendColor?: string;
  subtitle?: string;
}

export default function SummaryStatCard({
  title,
  value,
  trend,
  trendColor = "#00A63E",
  subtitle,
}: SummaryStatCardProps) {
  return (
    <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
      <p className="text-[16px] font-medium text-[#2D2D2D]">{title}</p>
      <p className="mt-3 text-[30px] font-semibold text-[#2D2D2D]">{value}</p>
      {trend && (
        <p className="mt-1 text-[14px]" style={{ color: trendColor }}>
          {trend}
        </p>
      )}
      {subtitle && <p className="mt-1 text-[14px] text-[#6B6B6B]">{subtitle}</p>}
    </div>
  );
}
