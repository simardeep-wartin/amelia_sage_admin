type BadgeVariant =
  | "active"
  | "completed"
  | "trial"
  | "failed"
  | "cancelled"
  | "expired"
  | "pending"
  | "paused";

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
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
};

export default function Badge({ variant, label }: BadgeProps) {
  const text = label ?? variant.charAt(0).toUpperCase() + variant.slice(1);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STYLES[variant]}`}
    >
      {text}
    </span>
  );
}
