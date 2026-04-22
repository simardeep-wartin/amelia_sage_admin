"use client";

import Card from "@/components/common/Card";
import { FunnelIcon } from "@heroicons/react/24/outline";

interface ProgressItem {
  label: string;
  value: number;
  detail?: string;
}

interface ProgressBreakdownCardProps {
  title: string;
  subtitle?: string;
  items: ProgressItem[];
  color?: string;
}

export default function ProgressBreakdownCard({
  title,
  subtitle,
  items,
  color = "#7B5A98",
}: ProgressBreakdownCardProps) {
  return (
    <Card
      title={title}
      className="h-full"
      actions={
        <button type="button" className="text-slate transition-colors hover:text-charcoal" aria-label="Filter">
          <FunnelIcon className="h-5 w-5" />
        </button>
      }
    >
      {subtitle ? <p className="font-sans text-[14px] font-normal leading-[1.3] text-[#6B6B6B]">{subtitle}</p> : null}
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between gap-3">
              <p className="font-sans text-[16px] font-medium text-[#2B2B2B]">{item.label}</p>
              <p className="font-sans text-[14px] font-semibold text-[#6B6B6B]">{item.value.toFixed(1)}%</p>
            </div>
            {item.detail ? <p className="mb-1 font-sans text-[11px] text-[#6B6B6B]">{item.detail}</p> : null}
            <div className="h-2 w-full rounded-full bg-[#E5E7EB]">
              <div className="h-2 rounded-full" style={{ width: `${item.value}%`, backgroundColor: color }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-arial text-[12px] leading-[16px] text-[#6B6B6B]">Last updated: Real-time</p>
    </Card>
  );
}
