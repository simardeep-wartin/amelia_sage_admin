import { cn } from "@/lib/utils";
import { RiskBadge, type RiskLevel } from "./RiskBadge";

export interface QueueItemData {
  id: string;
  title: string;
  source: string;
  status: "PENDING" | "RESOLVED";
  level: RiskLevel;
}

interface QueueItemProps {
  item: QueueItemData;
  active?: boolean;
  onClick?: () => void;
}

export function QueueItem({ item, active, onClick }: QueueItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-border/60 bg-card p-3 text-left transition hover:border-border",
        active && "border-border shadow-sm",
      )}
    >
      {active && (
        <span className="absolute inset-y-0 left-0 w-1 bg-risk-high" />
      )}
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-foreground">{item.id}</span>
        <RiskBadge level={item.level} />
      </div>
      <p className="mt-1 text-xs leading-snug text-foreground/90">
        {item.title}
      </p>
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>💬 {item.source}</span>
        <span
          className={cn(
            "font-semibold tracking-wide",
            item.status === "PENDING"
              ? "text-foreground/60"
              : "text-success",
          )}
        >
          {item.status}
        </span>
      </div>
    </button>
  );
}
