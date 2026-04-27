import { cn } from "@/lib/utils";

export interface PendingItemData {
  id: string;
  title: string;
  tags: string[];
  status: "PENDING" | "APPROVED";
}

interface PendingItemProps {
  item: PendingItemData;
  active?: boolean;
  onClick?: () => void;
}

export function PendingItem({ item, active, onClick }: PendingItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-border/60 bg-card p-3 text-left transition hover:border-border",
        active && "border-border shadow-sm bg-muted/40",
      )}
    >
      {active && (
        <span className="absolute inset-y-0 left-0 w-1 bg-success" />
      )}
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-foreground">
          {item.title}
        </span>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          {item.status}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
