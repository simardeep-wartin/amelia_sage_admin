"use client";

import { useState, useEffect } from "react";
import {
  ChevronDownIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

type FilterDropdownProps = {
  options?: string[];
  value?: string;
  onChange?: (value: string, range?: { from: Date | null; to: Date | null }) => void;
  variant?: "default" | "icon";
};

export default function FilterDropdown({
  options = ["Today", "This Week", "This month", "This Year", "Custom"],
  value,
  onChange,
  variant = "default",
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || options[0]);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  const isCustom = selected === "Custom";

  const isSaveDisabled =
    isCustom && (!from || !to || (from && to && from > to));

  const handleSelect = (opt: string) => {
    setSelected(opt);
    if (opt !== "Custom") {
      // If not custom, we might want to close and change immediately, 
      // but the design shows a Save button even for simple selections?
      // Actually, looking at Frame 1707480722, it's selected and Save is active.
    }
  };

  const handleSave = () => {
    if (isSaveDisabled) return;
    setOpen(false);
    onChange?.(selected, { from, to });
  };

  const handleClear = () => {
    setSelected(options[0]);
    setFrom(null);
    setTo(null);
    // Not closing the dropdown on clear as per common UI patterns, 
    // but the user can then hit Save or Cancel.
  };

  return (
    <div
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
      className="relative outline-none font-[Inter]"
    >
      {/* Trigger */}
      {variant === "default" ? (
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex w-[148px] cursor-pointer items-center justify-between rounded-[8px] border border-[#E5E7EB] bg-white px-3 py-[7px] text-[12px] font-medium text-[#111827]"
        >
          <span className="truncate">{selected}</span>
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 text-[#6B7280] transition-transform ml-2",
              open && "rotate-180"
            )}
          />
        </button>
      ) : (
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img src="/auth/filter.svg" alt="Filter" className="h-5 w-5" />
        </button>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[249px] rounded-[10px] border border-[#E5E7EB] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">

          {/* Options */}
          <div className="flex flex-col">
            {options.map((opt, idx) => (
              <div key={opt}>
                <label
                  className="flex items-center gap-2.5 px-4 py-[10px] text-[13px] text-[#111827] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                  onClick={() => handleSelect(opt)}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="filter-option"
                      checked={selected === opt}
                      onChange={() => handleSelect(opt)}
                      className="peer sr-only"
                    />
                    <div className={cn(
                      "h-[15px] w-[15px] rounded-full border transition-all flex items-center justify-center",
                      selected === opt
                        ? "border-[#94B694] bg-white"
                        : "border-[#D1D5DB] bg-white"
                    )}>
                      {selected === opt && (
                        <div className="h-[7px] w-[7px] rounded-full bg-[#94B694]" />
                      )}
                    </div>
                  </div>
                  <span className={cn(
                    "font-medium",
                    selected === opt ? "text-[#111827]" : "text-[#111827]"
                  )}>
                    {opt}
                  </span>
                </label>
                {idx < options.length - 1 && (
                  <div className="h-[1px] bg-[#F3F4F6] mx-0" />
                )}
              </div>
            ))}
          </div>

          {/* Custom Range */}
          {isCustom && (
            <div className="px-4 py-3 space-y-3 bg-white border-t border-[#F3F4F6]">
              {/* From */}
              <div className="space-y-1.5">
                <p className="text-[12px] font-bold text-[#111827]">From:</p>
                <div className="relative group">
                  <DatePicker
                    selected={from}
                    onChange={(date: Date | null) => setFrom(date)}
                    maxDate={new Date()}
                    placeholderText="mm/ dd/ yyyy"
                    dateFormat="MM/dd/yyyy"
                    popperClassName="z-[60]"
                    className="w-full h-[36px] rounded-[8px] border border-[#E5E7EB] bg-white text-[13px] pl-3 pr-10 text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#94B694] transition-colors cursor-pointer"
                  />
                  <CalendarDaysIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94B694]" />
                </div>
              </div>

              {/* To */}
              <div className="space-y-1.5">
                <p className="text-[12px] font-bold text-[#111827]">To:</p>
                <div className="relative group">
                  <DatePicker
                    selected={to}
                    onChange={(date: Date | null) => setTo(date)}
                    minDate={from || undefined}
                    maxDate={new Date()}
                    placeholderText="mm/ dd/ yyyy"
                    dateFormat="MM/dd/yyyy"
                    popperClassName="z-[60]"
                    className="w-full h-[36px] rounded-[8px] border border-[#E5E7EB] bg-white text-[13px] pl-3 pr-10 text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#94B694] transition-colors cursor-pointer"
                  />
                  <CalendarDaysIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94B694]" />
                </div>
              </div>
            </div>
          )}

          <div className="h-[1px] bg-[#F3F4F6]" />

          {/* Footer */}
          <div className="flex items-center justify-between bg-white px-4 py-3">
            <button
              className="cursor-pointer text-[13px] font-medium text-[#111827] transition-opacity hover:opacity-70"
              onClick={handleClear}
            >
              Clear All
            </button>

            <div className="flex gap-2">
              <button
                className="h-[34px] cursor-pointer rounded-[8px] border border-[#D1D5DB] px-4 text-[13px] font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB]"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

              <button
                disabled={isSaveDisabled}
                onClick={handleSave}
                className={cn(
                  "h-[34px] rounded-[8px] px-4 text-[13px] font-medium transition-all",
                  isSaveDisabled
                    ? "cursor-not-allowed bg-[#E5E7EB] text-[#9CA3AF]"
                    : "cursor-pointer bg-[#94B694] text-white hover:bg-[#83a383]"
                )}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
