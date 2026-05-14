"use client";

import React from "react";
import { 
  EllipsisVerticalIcon, 
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import {
  PencilSquareIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import Badge from "@/components/common/Badge";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { Exercise } from "@/types/mindful-exercise";

interface ExerciseCardProps {
  exercise: Exercise;
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

export default function ExerciseCard({ exercise, onEdit, onDelete }: ExerciseCardProps) {
  return (
    <div className="bg-white border border-[#F2F2F2] rounded-[20px] group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all relative">
      {/* Thumbnail */}
      <div className="relative aspect-[1.1/1] bg-[#F9F7F2] flex items-center justify-center p-8 rounded-t-[20px] overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 100 100" className="text-[#8BAA87]">
             <path 
                d="M50 20C40 20 35 30 35 40C35 50 45 60 50 80C55 60 65 50 65 40C65 30 60 20 50 20Z" 
                fill="currentColor" 
                opacity="0.6" 
              />
             <circle cx="50" cy="15" r="5" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
        <div className="absolute top-4 right-4">
          <Badge 
            variant="active" 
            label="Active" 
            className="px-2 py-0.5 h-auto text-[10px] font-bold bg-[#DCFCE7] text-[#008236]" 
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="text-[16px] font-bold text-[#2D2D2D]">
            {exercise.title}
          </h4>
          <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1A1] font-medium">
             <ClockIcon className="h-3 w-3" />
             {exercise.duration}
          </div>
        </div>

        <p className="text-[12px] text-[#A1A1A1] line-clamp-2 leading-[1.6] h-10 font-medium">
          {exercise.subtitle}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[#F2F2F2]/60">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-sageGreen">
              <CheckCircleIcon className="h-3.5 w-3.5" />
              Audio
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-sageGreen">
              <CheckCircleIcon className="h-3.5 w-3.5" />
              Video
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 text-[#D1D1D1] hover:text-[#2D2D2D] transition-colors outline-none">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[140px] rounded-[16px] py-2 px-1 border-[#F2F2F2] shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
              <DropdownMenuItem 
                onSelect={() => onEdit(exercise)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#2D2D2D] hover:bg-[#F7F4EE] hover:text-sageGreen"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => onDelete(exercise.id)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#2D2D2D] hover:bg-[#FDF2F2] hover:text-destructive"
              >
                <TrashIcon className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
