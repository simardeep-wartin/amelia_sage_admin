"use client";

import React from "react";

interface EmptyStateProps {
  message?: string;
  hint?: string;
  className?: string;
  /** Alternative prop names used by older components */
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  message,
  hint,
  className = "",
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const heading = title ?? message ?? "No data available";
  const subtext = description ?? hint ?? "Try selecting a different filter";

  return (
    <div
      className={`flex h-full min-h-[200px] flex-col items-center justify-center gap-3 text-center ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F3F4F6]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#9CA3AF]">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-[#374151]">{heading}</p>
        <p className="mt-0.5 text-xs text-[#9CA3AF]">{subtext}</p>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 rounded-lg bg-sageGreen text-white text-sm font-semibold hover:bg-[#7fa18c] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
