"use client";

import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import Badge from "@/components/common/Badge";
import ActionsDropdownMenu from "@/components/ui/ActionsDropdownMenu";
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
          <img src="/auth/asana.png" alt={exercise.title} className="w-full h-full object-contain" />
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
          
          <ActionsDropdownMenu
            onEdit={() => onEdit(exercise)}
            onDelete={() => onDelete(exercise.id)}
          />
        </div>
      </div>
    </div>
  );
}
