"use client";

import React from "react";

interface ChartSkeletonProps {
  height?: string;
  className?: string;
}

export default function ChartSkeleton({
  height = "h-[300px]",
  className = "",
}: ChartSkeletonProps) {
  return (
    <div className={`rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm ${className}`}>
      {/* Title bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-5 w-40 animate-pulse rounded-md bg-[#E5E7EB]" />
        <div className="h-8 w-20 animate-pulse rounded-md bg-[#E5E7EB]" />
      </div>

      {/* Chart area */}
      <div className={`${height} w-full flex items-end justify-around gap-2 px-4`}>
        {[60, 85, 45, 95, 55, 70, 40, 80].map((h, i) => (
          <div
            key={i}
            className="flex-1 animate-pulse rounded-t-md bg-[#E5E7EB]"
            style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
