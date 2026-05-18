import type { ReactNode } from "react";

type StatsRowProps = {
  label: string;
  value: ReactNode;
  valueClassName?: string;
};

export default function StatsRow({
  label,
  value,
  valueClassName = "font-cormorant text-lg font-semibold text-charcoal",
}: StatsRowProps) {
  return (
    <div className="flex justify-between">
      <span className="text-[#6b6b6b]">{label}:</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}
