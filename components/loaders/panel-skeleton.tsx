"use client";

import React from "react";

interface PanelSkeletonProps {
  rows?: number;
}

export default function PanelSkeleton({ rows = 4 }: PanelSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex justify-end gap-4">
        <div className="h-8 w-36 animate-pulse rounded-md bg-[#E5E7EB]" />
        <div
          className="h-8 w-36 animate-pulse rounded-md bg-[#E5E7EB]"
          style={{ animationDelay: "80ms" }}
        />
      </div>

      {/* Intro screen card */}
      <div className="rounded-xl border border-[#E6E8EC] p-4 space-y-3">
        <div className="h-4 w-28 animate-pulse rounded bg-[#E5E7EB]" />
        <div
          className="h-3 w-48 animate-pulse rounded bg-[#F3F4F6]"
          style={{ animationDelay: "60ms" }}
        />
        <div
          className="h-3 w-64 animate-pulse rounded bg-[#F3F4F6]"
          style={{ animationDelay: "120ms" }}
        />
      </div>

      {/* Exercise rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#E6E8EC] p-4 flex items-center justify-between"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="h-4 w-40 animate-pulse rounded bg-[#E5E7EB]" />
          <div className="flex gap-2">
            <div className="h-7 w-7 animate-pulse rounded-lg bg-[#E5E7EB]" />
            <div className="h-7 w-7 animate-pulse rounded-lg bg-[#E5E7EB]" />
          </div>
        </div>
      ))}
    </div>
  );
}
