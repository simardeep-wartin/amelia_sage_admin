"use client";

import React, { type ReactNode } from "react";

interface ChartCardProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export default function ChartCard({ title, actions, children, footer }: ChartCardProps) {
  return (
    <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[20px] font-medium text-[#2B2B2B]">{title}</p>
        {actions}
      </div>

      <div className="w-full">{children}</div>

      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}
