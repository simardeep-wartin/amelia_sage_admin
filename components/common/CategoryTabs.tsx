type TabItem = {
  id: string;
  name: string;
};

type CategoryTabsProps = {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (name: string) => void;
};

export default function CategoryTabs({ tabs, activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <div className="bg-[#F7F4EE] rounded-t-[24px]">
      <div className="flex gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.name)}
              className={`px-10 py-[14px] text-[14px] font-medium transition-all relative rounded-t-[24px] cursor-pointer gap-2 ${
                isActive
                  ? "text-sageGreen bg-white rounded-t-[16px]"
                  : "text-[#6B6B6B] hover:text-sageGreen hover:bg-white hover:border-b-2"
              }`}
            >
              {tab.name}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sageGreen" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
