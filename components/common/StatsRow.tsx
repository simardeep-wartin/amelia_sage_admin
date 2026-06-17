import type { ReactNode } from "react";

type StatsRowProps = {
  label: string;
  value: ReactNode;
  valueClassName?: string;
  labelClassName?: string;
};

export default function StatsRow({
  label,
  value,
  valueClassName = "font-cormorant text-base font-semibold text-charcoal",
  labelClassName = "text-grey text-xs font-inter font-normal",
}: StatsRowProps) {
  return (
    <div className="flex justify-between">
      <span className={labelClassName}>{label}:</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}
