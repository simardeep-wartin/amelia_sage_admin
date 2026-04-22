"use client";

import type { ComponentType, SVGProps } from "react";

interface DemographicsMetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}

export default function DemographicsMetricCard({
  title,
  value,
  subtitle,
  icon,
}: DemographicsMetricCardProps) {
  return (
    <div className="h-[125px] rounded-[14px] border border-cardBorder bg-paper px-[20.667px] py-[20px] shadow-sm">
      <p className="font-sans text-[16px] font-medium leading-[1.5] text-customBlack">{title}</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
          <img
            src={icon}
            alt="icon"
            className="h-6 w-6"
          />
        </div>
        <div>
          <p className="font-sans text-[32px] font-bold leading-[1] text-customBlack">{value}</p>
          <p className="mt-0.5 font-sans text-[12px] font-normal leading-[1.3] text-[#4BB05D]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
