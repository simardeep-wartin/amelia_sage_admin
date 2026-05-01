"use client";

import React from "react";
import Badge from "@/components/common/Badge";

export interface QueueItemData {
  id: string;
  title: string;
  source: string;
  status: "PENDING" | "RESOLVED" | "APPROVED";
  level?: "HIGH" | "MEDIUM" | "LOW";
  tags?: string[];
}

interface QueueItemProps {
  item: QueueItemData;
  active?: boolean;
  onClick?: () => void;
  indicatorColor?: string;
}

export default function QueueItem({
  item,
  active,
  onClick,
  indicatorColor,
}: QueueItemProps) {
  // Determine indicator color if not provided
  const resolvedIndicatorColor = indicatorColor || (
    item.level === "HIGH" ? "#aa371c" : 
    item.level === "MEDIUM" ? "#7a582e" : 
    "#8baa87"
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full rounded-[6px] border-l-4 px-4 sm:px-5 py-3 sm:py-4 text-left shadow-sm transition ${
        active ? "bg-[#AAADA9]/30" : "bg-white"
      } ${item.status === "RESOLVED" && !active ? "opacity-70" : "opacity-100"}`}
      style={{ borderLeftColor: resolvedIndicatorColor }}
    >
      <div className="flex justify-between items-start mb-1.5">
        <span className="text-sm font-semibold text-[#48664a] truncate mr-2">
          {item.id || item.title}
        </span>
        {item.level && (
          <Badge 
            variant={item.level.toLowerCase() as "high" | "medium" | "low"} 
            label={item.level}
          />
        )}
        {item.status === "APPROVED" && !item.level && (
          <Badge variant="active" label="APPROVED" />
        )}
      </div>

      <p className="text-xs font-semibold text-[#2e3333] mb-1.5 leading-tight">
        {item.title}
      </p>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#8BAA87]/30 px-2 py-0.5 text-[10px] uppercase text-[#2b2b2b]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between text-[10px] font-bold uppercase text-[#767c7b]">
        <span>{item.source || (item.tags ? "" : "Source Unknown")}</span>
        <span className={item.status === "PENDING" ? "text-[#7a582e]" : ""}>
          {item.status}
        </span>
      </div>
    </button>
  );
}
