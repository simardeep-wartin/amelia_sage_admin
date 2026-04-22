"use client";

import Card from "@/components/common/Card";

interface InsightRow {
  label: string;
  value: string;
  progress: number;
}

interface InsightGroup {
  title: string;
  rows: InsightRow[];
}

interface GenderInsightsCardProps {
  title: string;
  groups: InsightGroup[];
}

export default function GenderInsightsCard({ title, groups }: GenderInsightsCardProps) {
  return (
    <Card title={title}>
      <div className="grid grid-cols-1 gap-4 m:grid-cols-2 l:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="rounded-[10px] bg-[#F9FAFB] p-4">
            <p className="mb-3 font-sans text-[16px] font-semibold text-[#2B2B2B]">{group.title}</p>
            <div className="space-y-3">
              {group.rows.map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="font-sans text-[12px] text-[#6B6B6B]">{row.label}</p>
                    <p className="font-sans text-[12px] font-semibold text-[#2B2B2B]">{row.value}</p>
                  </div>
                  <div className="h-[6px] w-full rounded-full bg-[#E5E7EB]">
                    <div className="h-[6px] rounded-full bg-[#8BAA87]" style={{ width: `${row.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
