import { cn } from "@/lib/utils";

export interface RiskTab {
  value: string;
  label: string;
}

interface RiskTabsProps {
  tabs: RiskTab[];
  active: string;
  onChange: (value: string) => void;
}

export function RiskTabs({ tabs, active, onChange }: RiskTabsProps) {
  return (
    <div className="flex items-center gap-8 border-b border-border/60">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative pb-3 text-sm font-medium transition",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
            {isActive && (
              <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-foreground" />
            )}
          </button>
        );
      })}
    </div>
  );
}
