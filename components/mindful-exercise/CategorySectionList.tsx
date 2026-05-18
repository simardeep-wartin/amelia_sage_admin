"use client";

import { useRouter } from "next/navigation";
import Badge from "@/components/common/Badge";
import ActionsDropdownMenu from "@/components/ui/ActionsDropdownMenu";
import { ExerciseSubCategory } from "@/types/mindful-exercise";

interface CategorySectionListProps {
  sections: ExerciseSubCategory[];
  onEdit: (section: ExerciseSubCategory) => void;
  onDelete: (id: string) => void;
  basePath?: string;
}

export default function CategorySectionList({
  sections,
  onEdit,
  onDelete,
  basePath = "/mindful-exercise-management",
}: CategorySectionListProps) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div
          key={section.id}
          onClick={() => router.push(`${basePath}/${section.id}`)}
          className="group flex items-center justify-between px-6 py-5 bg-white border border-[#F2F2F2] rounded-[12px] hover:border-sageGreen transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
        >
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <h4 className="text-[20px] font-bold text-[#2D2D2D] group-hover:text-sageGreen transition-colors font-cormorant">
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

          <ActionsDropdownMenu
            onEdit={() => onEdit(section)}
            onDelete={() => onDelete(section.id)}
            stopPropagation
          />
        </div>
      ))}
    </div>
  );
}
