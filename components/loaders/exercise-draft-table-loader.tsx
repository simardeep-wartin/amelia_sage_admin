"use client";

import { Skeleton } from "./common/skeleton";

export default function ExerciseDraftTableLoader({ rows = 5 }: { rows?: number }) {
  return (
    <div className="px-4 divide-y divide-[#F3F4F6]">
      {Array.from({ length: rows }).map((_, i) => (
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
  );
}
