"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function AccordionItem({
  title,
  children,
  onEdit,
  onDelete,
}: AccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-[24px] bg-[#FAF9F6] border border-[#F0EFEA] overflow-hidden transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#F2F1ED] cursor-pointer"
      >
        <span className="font-medium text-m text-charcoal font-inter">{title}</span>
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
            {children}
          </div>

          {(onEdit || onDelete) && (
            <div className="flex justify-end gap-2 mt-4">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="flex h-8 w-8 items-center justify-center rounded bg-white border border-[#E5E5E5] text-sageGreen hover:text-charcoal hover:bg-gray-50 transition-colors"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="flex h-8 w-8 items-center justify-center rounded bg-white border border-[#E5E5E5] text-sageGreen hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
