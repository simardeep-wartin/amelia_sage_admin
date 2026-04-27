"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface FilterDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterDropdown({ options, value, onChange, className }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex w-[148px] items-center justify-center gap-[10px] rounded-[9px] border-[0.6px] border-slate p-[10px] text-s text-charcoal cursor-pointer",
          className,
        )}
      >
        {value}
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 shrink-0 text-slate transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1.5 min-w-[148px] overflow-hidden rounded-[9px] border border-[#E5E7EB] bg-paper shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-[10px] py-2.5 text-left text-s cursor-pointer transition-colors",
                value === option
                  ? "bg-sageGreen/10 font-medium text-sageGreen"
                  : "text-charcoal hover:bg-sageGreen/10",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
