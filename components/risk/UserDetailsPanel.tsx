import { CheckIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

interface UserDetailPanelProps {
  initial: string;
  name: string;
  userId: string;
  email: string;
  phone: string;
  summary: React.ReactNode;
}

export function UserDetailPanel({
  initial,
  name,
  userId,
  email,
  phone,
  summary,
}: UserDetailPanelProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-avatar text-xl font-semibold text-white/95">
          {initial}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-xl font-bold tracking-tight">{name}</h2>
            <span className="text-xs font-medium text-muted-foreground">
              {userId}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {email} | {phone}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-border/60 bg-surface/50 p-4">
        <h3 className="text-sm font-semibold">AI Risk Summary</h3>
        <p className="mt-2 text-xs leading-relaxed text-foreground/80">
          {summary}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button className="h-10 gap-2 bg-success text-success-foreground hover:bg-success/90">
          <CheckIcon className="h-4 w-4" />
          Mark as Resolved
        </Button>
        <Button className="h-10 gap-2 bg-support text-support-foreground hover:bg-support/90">
          <PaperAirplaneIcon className="h-4 w-4" />
          Send Support Message
        </Button>
      </div>
    </div>
  );
}
