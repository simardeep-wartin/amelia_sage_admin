import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export interface ExerciseCategoryCardProps {
  title: string;
  usersCount: string;
  exercisesCount: number;
  icon: React.ReactNode;
  onEdit?: () => void;
}

export default function ExerciseCategoryCard({
  title,
  usersCount,
  exercisesCount,
  icon,
  onEdit,
}: ExerciseCategoryCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-cardBorder bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Icon container */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cardBorder bg-transparent">
          {icon}
        </div>
        {/* Title and subtitle */}
        <div className="flex flex-col">
          <span className="font-cormorant text-xl font-medium text-charcoal">{title}</span>
          <span className="text-xs text-grey mt-0.5">{usersCount}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Exercises count */}
        <div className="flex flex-col items-center justify-center mr-2">
          <span className="font-cormorant text-[28px] font-medium italic text-charcoal leading-none">
            {exercisesCount}
          </span>
          <span className="text-[11px] text-grey mt-1">Exercises</span>
        </div>
        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="flex h-8 w-8 items-center justify-center rounded border border-border bg-white text-grey hover:bg-softstone hover:text-charcoal transition-colors"
          aria-label={`Edit ${title}`}
        >
          <PencilSquareIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
