import { cn } from "@/lib/utils";
import type { ReactNode, ComponentType, SVGProps } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  valueClassName?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconClassName,
  valueClassName,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-card px-5 py-4 shadow-sm",
        className,
      )}
    >
      <p className="text-sm font-medium text-foreground/80">{label}</p>
      <div className="mt-3 flex items-center gap-3">
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground",
            iconClassName,
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className={cn("text-2xl font-bold tracking-tight", valueClassName)}>
          {value}
        </span>
      </div>
    </div>
  );
}
