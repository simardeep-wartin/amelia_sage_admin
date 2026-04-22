"use client";

interface TabsProps<T extends string> {
  items: readonly T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

export default function Tabs<T extends string>({ items, activeTab, onTabChange }: TabsProps<T>) {
  return (
    <div className="overflow-x-auto border-b border-[#E5E7EB]">
      <div className="flex min-w-max items-center gap-8 px-2">
        {items.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`border-b-2 pb-[14px] pt-[12px] font-sans text-[14px] leading-[1.3] transition-colors ${
                isActive
                  ? "border-[#8BAA87] font-semibold text-[#8BAA87]"
                  : "border-transparent font-medium text-[#6B6B6B] hover:text-[#2B2B2B]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
