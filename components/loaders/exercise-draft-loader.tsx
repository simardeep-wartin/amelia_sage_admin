"use client";

import { Skeleton } from "./common/skeleton";

export default function ExerciseDraftLoader() {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44 bg-[#E5E5E5]" />
          <Skeleton className="h-4 w-96 bg-[#E5E5E5]" />
        </div>
        <Skeleton className="h-[48px] w-[148px] rounded-[9px] bg-[#E5E5E5] shrink-0" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2 border-b border-[#E5E7EB]">
        {[128, 160, 144, 80].map((w, i) => (
          <Skeleton key={i} className={`h-10 rounded-none bg-[#E5E5E5]/60`} style={{ width: w }} />
        ))}
      </div>

      {/* Table Card Skeleton */}
      <div className="bg-white rounded-[14px] border border-[#F3F4F6] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Search + Filter Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center p-5 pb-0">
          <Skeleton className="flex-1 h-[38px] rounded-[10px] bg-[#E5E5E5]" />
          <Skeleton className="h-[38px] w-[148px] rounded-[8px] bg-[#E5E5E5] shrink-0" />
        </div>

        {/* Table Header */}
        <div className="mt-4 px-4">
          <div className="flex items-center gap-4 border-b border-[#F3F4F6] pb-3">
            <Skeleton className="h-3 w-24 bg-[#E5E5E5]" />
            <Skeleton className="h-3 w-16 bg-[#E5E5E5]" />
            <Skeleton className="h-3 w-12 bg-[#E5E5E5] ml-auto" />
            <Skeleton className="h-3 w-14 bg-[#E5E5E5]" />
            <Skeleton className="h-3 w-24 bg-[#E5E5E5]" />
            <Skeleton className="h-3 w-16 bg-[#E5E5E5]" />
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#F3F4F6]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-4">
                <Skeleton className="h-4 w-48 bg-[#E5E5E5]" />
                <Skeleton className="h-6 w-24 rounded-[4px] bg-[#E5E5E5]" />
                <Skeleton className="h-4 w-10 bg-[#E5E5E5] ml-auto" />
                <Skeleton className="h-6 w-20 rounded-full bg-[#E5E5E5]" />
                <Skeleton className="h-4 w-28 bg-[#E5E5E5]" />
                <Skeleton className="h-5 w-5 rounded-full bg-[#E5E5E5]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36 bg-[#E5E5E5]" />
        <div className="flex items-center gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-[6px] bg-[#E5E5E5]" />
          ))}
        </div>
      </div>
    </div>
  );
}
