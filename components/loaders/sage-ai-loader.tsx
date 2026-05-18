"use client";

import { Skeleton } from "./common/skeleton";

export default function SageAiLoader() {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-52 bg-[#E5E5E5]" />
        <Skeleton className="h-4 w-72 bg-[#E5E5E5]" />
      </div>

      {/* Configuration Card Skeleton */}
      <div
        className="w-full rounded-[14px] border border-[#f3f4f6] shadow-[0px_1px_3px_rgba(0,0,0,0.1)] flex flex-col gap-4 pl-[26px] pr-5 pt-5 pb-5"
        style={{
          backgroundImage:
            "linear-gradient(172deg, rgba(168,181,160,0.1) 0%, rgba(213,202,227,0.1) 50%, rgba(232,196,184,0.1) 100%)",
        }}
      >
        <Skeleton className="h-5 w-44 bg-[#E5E5E5]" />

        <div className="flex items-center gap-3 h-[44px]">
          {/* Circle Icon */}
          <Skeleton className="h-10 w-10 rounded-full bg-[#E5E5E5] shrink-0" />

          {/* Text Stack */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-7 w-56 bg-[#E5E5E5]" />
            <Skeleton className="h-3 w-36 bg-[#E5E5E5]" />
          </div>
        </div>
      </div>
    </div>
  );
}
