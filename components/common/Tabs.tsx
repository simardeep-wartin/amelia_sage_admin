"use client";

interface TabsProps<T extends string> {
  items: readonly T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
  activeTabClassName?: string;
  inactiveHoverClassName?: string;
}

export default function Tabs<T extends string>({
  items,
  activeTab,
  onTabChange,
  className = "",
  activeTabClassName = "border-sageGreen font-semibold text-sageGreen bg-white",
  inactiveHoverClassName = "hover:text-sageGreen hover:bg-white hover:border-sageGreen",
}: TabsProps<T>) {
  return (
    <div className={`overflow-x-auto border-b border-[#E5E7EB] ${className}`}>
      <div className="flex min-w-max items-center gap-2 px-2">
        {items.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`border-b-2 p-3 font-sans text-[14px] leading-[1.3] transition-colors cursor-pointer min-w-[130px] rounded-t-[16px] ${
                isActive
                  ? activeTabClassName
                  : `border-transparent font-medium text-[#6B6B6B] ${inactiveHoverClassName}`
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
