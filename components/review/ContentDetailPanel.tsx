import {
  CheckIcon,
  PencilIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface ContentDetailData {
  title: string;
  duration: string;
  tags: string[];
  description: string;
  visual: ReactNode;
  completeness: { label: string; ok: boolean }[];
}

interface ContentDetailPanelProps {
  data: ContentDetailData;
  onApprove?: () => void;
  onEdit?: () => void;
}

export function ContentDetailPanel({
  data,
  onApprove,
  onEdit,
}: ContentDetailPanelProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{data.title}</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <ClockIcon className="h-3.5 w-3.5" />
          {data.duration}
        </span>
      </div>

      <div className="mt-4 flex h-52 items-center justify-center rounded-lg border border-border/60 bg-surface/60">
        {data.visual}
      </div>

      <div className="mt-5 rounded-lg border border-border/60 bg-surface/40 p-4">
        <h3 className="text-sm font-semibold">Description</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">
          {data.description}
        </p>
      </div>

      <div className="mt-3 rounded-lg border border-border/60 bg-surface/40 p-4">
        <h3 className="text-sm font-semibold">Completeness Check</h3>
        <ul className="mt-2 space-y-1.5">
          {data.completeness.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-foreground/80">{item.label}</span>
              {item.ok ? (
                <CheckCircleIcon className={cn("h-4 w-4 text-success")} />
              ) : (
                <XCircleIcon className="h-4 w-4 text-destructive" />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button
          onClick={onApprove}
          className="h-10 gap-2 bg-success text-success-foreground hover:bg-success/90"
        >
          <CheckIcon className="h-4 w-4" />
          Approve
        </Button>
        <Button
          onClick={onEdit}
          variant="outline"
          className="h-10 gap-2"
        >
          <PencilIcon className="h-4 w-4" />
          Edit
        </Button>
      </div>
    </div>
  );
}
