"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Badge from "@/components/common/Badge";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { ExerciseSubCategory } from "@/types/mindful-exercise";

interface CategorySectionListProps {
  sections: ExerciseSubCategory[];
  onEdit: (section: ExerciseSubCategory) => void;
  onDelete: (id: string) => void;
}

export default function CategorySectionList({
  sections,
  onEdit,
  onDelete,
}: CategorySectionListProps) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div
          key={section.id}
          onClick={() => router.push(`/mindful-exercise-management/${section.id}`)}
          className="group flex items-center justify-between px-6 py-5 bg-white border border-[#F2F2F2] rounded-[12px] hover:border-sageGreen transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
        >
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <h4 className="text-[20px] font-bold text-[#2D2D2D] group-hover:text-sageGreen transition-colors font-cormorant ">
                {section.name}
              </h4>
              <Badge
                variant="active"
                label="Active"
                className="px-2 py-0.5 h-auto text-[12px] font-normal bg-[#DCFCE7] text-[#008236] !normal-case"
              />
            </div>
            <p className="text-[12px] text-[#6B6B6B] font-normal font-inter">
              12 min • 15 Exercises
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger 
              className="p-1 text-[#D1D1D1] hover:text-[#2D2D2D] transition-colors outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisVerticalIcon className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[140px] rounded-[16px] py-2 px-1 border-[#F2F2F2] shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
              <DropdownMenuItem 
                onSelect={() => onEdit(section)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#2D2D2D] hover:bg-[#F7F4EE] hover:text-sageGreen"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => onDelete(section.id)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#2D2D2D] hover:bg-[#FDF2F2] hover:text-destructive"
              >
                <TrashIcon className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
