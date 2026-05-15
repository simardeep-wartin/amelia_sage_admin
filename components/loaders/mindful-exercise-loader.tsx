"use client";

import { Skeleton } from "./common/skeleton";

interface MindfulExerciseLoaderProps {
  type?: "main" | "grid";
}

export default function MindfulExerciseLoader({ type = "main" }: MindfulExerciseLoaderProps) {
  if (type === "grid") {
    return (
      <div className="space-y-6">
        {/* Header Row Skeleton */}
        <div className="space-y-6 mb-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-[#E5E5E5]" />
            <Skeleton className="h-5 w-72 bg-[#E5E5E5]" />
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-3">
              <Skeleton className="h-12 w-[400px] rounded-md bg-[#E5E5E5]" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20 bg-[#E5E5E5]" />
                <span className="text-[#E5E7EB]">/</span>
                <Skeleton className="h-4 w-20 bg-[#E5E5E5]" />
                <span className="text-[#E5E7EB]">/</span>
                <Skeleton className="h-4 w-40 bg-[#E5E5E5]" />
                <span className="text-[#E5E7EB]">/</span>
                <Skeleton className="h-4 w-32 bg-[#E5E5E5]" />
              </div>
            </div>
            <Skeleton className="h-11 w-52 rounded-[10px] bg-[#E5E5E5]" />
          </div>
        </div>

        {/* Filters Row Skeleton */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center mb-8">
          <Skeleton className="h-[44px] rounded-[10px] bg-[#E5E5E5]" />
          <Skeleton className="h-[44px] w-40 rounded-[10px] bg-[#E5E5E5]" />
          <Skeleton className="h-[44px] w-40 rounded-[10px] bg-[#E5E5E5]" />
        </div>

        {/* Exercise Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-[#F2F2F2] rounded-[20px] overflow-hidden space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <Skeleton className="aspect-[1.1/1] w-full rounded-none bg-[#E5E5E5]" />
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-36 bg-[#E5E5E5]" />
                  <Skeleton className="h-4 w-12 bg-[#E5E5E5]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-[#E5E5E5]" />
                  <Skeleton className="h-4 w-3/4 bg-[#E5E5E5]" />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-[#F2F2F2]">
                  <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full bg-[#E5E5E5]" />
                      <Skeleton className="h-4 w-12 bg-[#E5E5E5]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full bg-[#E5E5E5]" />
                      <Skeleton className="h-4 w-12 bg-[#E5E5E5]" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-1 rounded-full bg-[#E5E5E5]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Title Skeleton */}
      <div className="flex justify-between items-end mb-4 px-1">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20 bg-[#E5E5E5]" />
            <span className="text-[#E5E7EB]">/</span>
            <Skeleton className="h-4 w-20 bg-[#E5E5E5]" />
            <span className="text-[#E5E7EB]">/</span>
            <Skeleton className="h-4 w-32 bg-[#E5E5E5]" />
          </div>
          <Skeleton className="h-12 w-96 rounded-md bg-[#E5E5E5]" />
        </div>
        <Skeleton className="h-6 w-32 mb-2 bg-[#E5E5E5]" />
      </div>

      {/* Main Container Skeleton */}
      <div className="rounded-[24px] shadow-sm border border-[#F2F2F2] overflow-hidden">
        {/* Tabs Row Skeleton */}
        <div className="bg-[#F7F4EE] border-b border-[#E5E7EB] px-6">
          <div className="flex gap-4">
            <Skeleton className="h-14 w-36 rounded-none bg-[#E5E5E5]/50" />
            <Skeleton className="h-14 w-36 rounded-none bg-[#E5E5E5]/50" />
            <Skeleton className="h-14 w-36 rounded-none bg-[#E5E5E5]/50" />
          </div>
        </div>

        <div className="p-8 space-y-10">
          {/* Filters Row Skeleton */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center">
            <Skeleton className="h-[44px] rounded-[10px] bg-[#E5E5E5]" />
            <Skeleton className="h-[44px] w-36 rounded-[10px] bg-[#E5E5E5]" />
            <Skeleton className="h-[44px] w-36 rounded-[10px] bg-[#E5E5E5]" />
          </div>

          {/* Category Header Skeleton */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-56 bg-[#E5E5E5]" />
            <Skeleton className="h-11 w-48 rounded-[10px] bg-[#E5E5E5]" />
          </div>

          {/* List Content Skeleton */}
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between px-6 py-6 border border-[#F2F2F2] rounded-[12px] bg-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-40 bg-[#E5E5E5]" />
                    <Skeleton className="h-5 w-16 rounded-full bg-[#E5E5E5]" />
                  </div>
                  <Skeleton className="h-4 w-32 bg-[#E5E5E5]" />
                </div>
                <Skeleton className="h-8 w-1.5 rounded-full bg-[#E5E5E5]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
