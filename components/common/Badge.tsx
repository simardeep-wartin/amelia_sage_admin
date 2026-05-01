"use client";

type BadgeVariant =
  | "active"
  | "completed"
  | "trial"
  | "failed"
  | "cancelled"
  | "expired"
  | "pending"
  | "paused"
  | "high"
  | "medium"
  | "low";

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

const STYLES: Record<BadgeVariant, string> = {
  active:    "bg-[#DCFCE7] text-[#008236]",
  completed: "bg-[#DCFCE7] text-[#008236]",
  trial:     "bg-[#DBEAFE] text-[#1447E6]",
  failed:    "bg-[#FFE2E2] text-[#C10007]",
  cancelled: "bg-[#F3F4F6] text-[#6C6C6C]",
  expired:   "bg-[#F3F4F6] text-[#6C6C6C]",
  pending:   "bg-[#FEF9C3] text-[#854D0E]",
  paused:    "bg-[#FEF9C3] text-[#854D0E]",
  high:      "bg-risk-high-bg text-[#671200]",
  medium:    "bg-risk-medium text-[#5e3f17]",
  low:       "bg-risk-low text-white",
};

export default function Badge({ variant, label, className = "" }: BadgeProps) {
  const text = label ?? variant.toUpperCase();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STYLES[variant]} ${className}`}
    >
      {text}
    </span>
  );
}
