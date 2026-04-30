"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export interface ExerciseData {
  id: string;
  title: string;
  description: string;
}

interface ExerciseAccordionItemProps {
  exercise: ExerciseData;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ExerciseAccordionItem({
  exercise,
  onEdit,
  onDelete,
}: ExerciseAccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-[20px] bg-[#FAF9F6] border border-[#F0EFEA] overflow-hidden transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#F2F1ED]"
      >
        <span className="font-medium text-[15px] text-charcoal">{exercise.title}</span>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-charcoal" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-charcoal" />
        )}
      </button>

      {isExpanded && (
        <div className="p-5 pt-0">
          <div className="h-[1px] w-full bg-[#E5E5E5] mb-4"></div>
          
          <div className="space-y-4">
            <div>
              <p className="text-[13px] text-sageGreen mb-1">Title</p>
              <p className="text-[14px] text-charcoal">{exercise.title}</p>
            </div>
            
            <div>
              <p className="text-[13px] text-sageGreen mb-1">Description</p>
              <p className="text-[14px] text-charcoal leading-relaxed">{exercise.description}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onEdit}
              className="flex h-8 w-8 items-center justify-center rounded bg-white border border-[#E5E5E5] text-sageGreen hover:text-charcoal hover:bg-gray-50 transition-colors"
            >
              <PencilSquareIcon className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="flex h-8 w-8 items-center justify-center rounded bg-white border border-[#E5E5E5] text-sageGreen hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
