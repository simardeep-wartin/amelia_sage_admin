"use client";

import Card from "@/components/common/Card";

interface WellnessJourneyItem {
  label: string;
  value: number;
  detail: string;
  color?: string;
}

interface WellnessJourneyCardProps {
  title: string;
  subtitle: string;
  items: WellnessJourneyItem[];
}

export default function WellnessJourneyCard({ title, subtitle, items }: WellnessJourneyCardProps) {
  return (
    <Card
      title={title}
      className="h-full"
      actions={
        <button type="button" className="text-slate transition-colors hover:text-charcoal" aria-label="Filter">
          <img src="/auth/filter.svg" alt="icon" className="h-6 w-6" />
        </button>
      }
    >
      <p className="font-sans text-[14px] font-normal leading-[1.3] text-[#6B6B6B]">{subtitle}</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-[10px] bg-[#F9F9F9] p-3">
            <p className="font-sans text-[30px] font-semibold leading-[1.2]" style={{ color: item.color ?? "#2B2B2B" }}>
              {item.value}
              {item.label === "Avg Goals Completed" ? "" : "%"}
            </p>
            <p className="font-sans text-[16px] font-semibold text-[#2B2B2B]">{item.label}</p>
            <p className="mt-1 font-sans text-[14px] text-[#6B6B6B]">{item.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
