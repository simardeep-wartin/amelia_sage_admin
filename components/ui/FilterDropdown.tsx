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
};

export default function FilterDropdown({
  options = ["Today", "This Week", "This Month", "This Year", "Custom"],
  value,
  onChange,
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
    onChange?.(opt);
  };

  const handleSave = () => {
    if (isSaveDisabled) return;
    setOpen(false);
    onChange?.(selected, { from, to });
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
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-[148px] items-center justify-between rounded-[8px] border border-[#E5E7EB] bg-white px-3 py-[6px] text-[12px] text-[#111827]"
      >
        {selected}
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 text-[#6B7280] transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[240px] rounded-[10px] border border-[#E5E7EB] bg-white shadow-sm">

          {/* Options */}
          <div className="py-1">
            {options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 px-3 py-[6px] text-[12px] text-[#111827] cursor-pointer hover:bg-[#F9FAFB]"
              >
                <input
                  type="radio"
                  checked={selected === opt}
                  onChange={() => handleSelect(opt)}
                  className="h-3 w-3 accent-[#6FAF8F]"
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="h-px bg-[#F3F4F6]" />

          {/* Custom Range */}
          {isCustom && (
            <div className="px-3 py-2 space-y-2">

              {/* From */}
              <div>
                <p className="text-[10px] text-[#6B7280] mb-1">From:</p>
                <div className="relative">
                  <DatePicker
                    selected={from}
                    onChange={(date: Date | null) => setFrom(date)}
                    maxDate={new Date()}
                    placeholderText="mm / dd / yyyy"
                    dateFormat="MM/dd/yyyy"
                    popperClassName="z-50"
                    className="w-full h-[28px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] pl-2 pr-8 text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6FAF8F] cursor-pointer"
                  />
                  <CalendarDaysIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                </div>
              </div>

              {/* To */}
              <div>
                <p className="text-[10px] text-[#6B7280] mb-1">To:</p>
                <div className="relative">
                  <DatePicker
                    selected={to}
                    onChange={(date: Date | null) => setTo(date)}
                    minDate={from || undefined}
                    maxDate={new Date()}
                    placeholderText="mm / dd / yyyy"
                    dateFormat="MM/dd/yyyy"
                    popperClassName="z-50"
                    className="w-full h-[28px] rounded-[6px] border border-[#E5E7EB] bg-white pl-2 pr-8 text-[12px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6FAF8F] cursor-pointer"
                  />
                  <CalendarDaysIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                </div>
              </div>
            </div>
          )}

          <div className="h-px bg-[#F3F4F6]" />

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-2">

            <button
              className="text-[11px] text-[#6B7280] hover:text-[#111827]"
              onClick={() => {
                setSelected(options[0]);
                setFrom(null);
                setTo(null);
                onChange?.(options[0]);
              }}
            >
              Clear All
            </button>

            <div className="flex gap-2">
              <button
                className="h-[28px] rounded-[6px] border border-[#D1D5DB] px-3 text-[11px] text-[#374151] hover:bg-[#F9FAFB]"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

              <button
                disabled={isSaveDisabled}
                onClick={handleSave}
                className={cn(
                  "h-[28px] rounded-[6px] px-3 text-[11px]",
                  isSaveDisabled
                    ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                    : "bg-[#6FAF8F] text-white hover:bg-[#5C9E7C]"
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