"use client";

import React, { type ReactNode } from "react";

interface ChartCardProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function ChartCard({
  title,
  actions,
  children,
  footer,
  className = "",
}: ChartCardProps) {
  return (
    <div
      className={`rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm flex flex-col ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[15px] sm:text-[20px] font-medium text-[#2B2B2B]">{title}</p>
        {actions}
      </div>

      <div className="w-full flex-1 flex flex-col justify-center">{children}</div>

      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}
