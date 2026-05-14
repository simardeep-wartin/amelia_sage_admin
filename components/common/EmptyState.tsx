"use client";

import React from "react";
import Button from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-6">
        {icon || (
          <div className="flex items-end justify-center gap-4 h-32 opacity-80">
            <div className="w-10 h-16 bg-[#F9F7F2] rounded-sm animate-pulse"></div>
            <div className="w-10 h-24 bg-[#F2F2F2] rounded-sm animate-pulse delay-75"></div>
            <div className="w-10 h-32 bg-[#F9F7F2] rounded-sm animate-pulse delay-150"></div>
            <div className="w-10 h-20 bg-[#F2F2F2] rounded-sm animate-pulse delay-100"></div>
          </div>
        )}
      </div>
      <h3 className="text-2xl sm:text-[32px] font-cormorant text-charcoal font-medium mb-2">
        {title}
      </h3>
      <p className="text-[14px] text-grey max-w-md mb-10">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="px-8 py-3">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
