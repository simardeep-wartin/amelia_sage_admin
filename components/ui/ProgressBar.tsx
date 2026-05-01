"use client";

import React from "react";

interface ProgressBarProps {
  progress: number;
  color?: string; // Hex or CSS color
  gradient?: string; // CSS gradient string
  height?: string; // e.g., "h-[6px]", "h-[10px]"
  className?: string;
}

export default function ProgressBar({
  progress,
  color,
  gradient,
  height = "h-[6px]",
  className = "",
}: ProgressBarProps) {
  return (
    <div className={`${height} w-full rounded-full bg-[#E6E8EC] overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          background: gradient,
        }}
      />
    </div>
  );
}
