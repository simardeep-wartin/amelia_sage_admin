import Card from "@/components/common/Card";
import AvatarCircle from "@/components/common/AvatarCircle";
import StatsRow from "@/components/common/StatsRow";
import FilterDropdown from "@/components/ui/FilterDropdown";
import appData from "@/data/app-data.json";
import type { DashboardOverviewData, WealthPlanItem } from "@/Services/api/dashboard";

const dashboardData = appData.dashboard;

const PROGRESS_COLORS = [
  "bg-[#9caf88]",
  "bg-[#8b7ec8]",
  "bg-[#d4a574]",
  "bg-[#5B9BD5]",
  "bg-[#E87C6B]",
  "bg-[#6B6B6B]",
];

type DashboardRightPanelProps = {
  overviewData?: DashboardOverviewData;
  wealthPlanItems?: WealthPlanItem[];
  progressFilter: string;
  onProgressFilterChange: (v: string, range?: { from: Date | null; to: Date | null }) => void;
};

export default function DashboardRightPanel({
  overviewData,
  wealthPlanItems,
  progressFilter,
  onProgressFilterChange,
}: DashboardRightPanelProps) {
  return (
    <div className="space-y-4">
      <Card
        title="Wellth Plan Progress"
        actions={
          <FilterDropdown variant="icon" value={progressFilter} onChange={onProgressFilterChange} />
        }
        className="h-[357px]"
      >
        <div className="space-y-[42px]">
          {(wealthPlanItems && wealthPlanItems.length > 0
            ? wealthPlanItems.map((item, i) => ({
                label: item.title,
                value: Math.round(item.percentage * 100),
                color: PROGRESS_COLORS[i % PROGRESS_COLORS.length],
              }))
            : dashboardData.progressItems.map((item) => ({
                label: item.label,
                value: item.value,
                color: item.color,
              }))
          ).map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-cormorant text-customBlack font-medium">{item.label}</span>
                <span className="text-[#6b6b6b]">{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-[linear-gradient(178deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${Math.min(item.value, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Sage AI Interactions">
        <div className="flex flex-col items-center gap-4">
          <AvatarCircle src={dashboardData.sageAiImage} alt="Sage AI" />
          <div className="text-center">
            <p className="font-cormorant text-xl sm:text-xxl font-bold text-customBlack">
              {overviewData != null
                ? overviewData.sage.voice_interactions
                : dashboardData.sageAi.totalInteractions}
            </p>
            <p className="text-xs font-medium text-slate text-inter">Total Interactions</p>
          </div>
        </div>
        <div className="mt-5 space-y-3 text-sm">
          <StatsRow
            label="Voice interactions"
            value={
              overviewData != null
                ? overviewData.sage.voice_interactions
                : dashboardData.sageAi.voiceInteractions
            }
          />
          <StatsRow
            label="Chat sessions"
            value={
              overviewData != null
                ? overviewData.sage.total_threads
                : dashboardData.sageAi.chatSessions
            }
          />
          <div className="border-t border-cardBorder pt-3">
            <StatsRow
              label="Satisfaction"
              labelClassName="font-arial text-grey text-sm"
              value={
                <span className="inline-flex items-center gap-1">
                  <img src="/auth/star.svg" alt="" className="h-4 w-4" />
                  {dashboardData.sageAi.satisfaction}
                </span>
              }
              valueClassName="font-medium text-customBlack font-arial"
            />
          </div>
        </div>
      </Card>

      <Card title="Calm & Stillness Stats">
        <div className="mb-4 flex justify-center">
          <AvatarCircle
            src={dashboardData.calmStillnessImage}
            alt="Calm and stillness"
            innerWidth="w-[76px]"
            innerHeight="h-[77px]"
          />
        </div>
        <div className="space-y-3 text-sm">
          {dashboardData.calmStillness.map((item) => (
            <StatsRow key={item.label} label={item.label} value={item.value} />
          ))}
          <div className="border-t border-cardBorder pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6b6b6b]">Total tutorials active:</span>
              <div className="inline-flex items-center gap-2">
                <span className="h-[11px] w-[11px] rounded-full bg-[#d4a574]" />
                <span className="text-xs text-charcoal">{dashboardData.calmStillnessSummary}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Mindful Exercises Stats">
        <div className="mb-4 flex justify-center">
          <AvatarCircle
            src={dashboardData.mindfulExercisesImage}
            alt="Mindful exercises"
            innerWidth="w-[55px]"
            innerHeight="h-[74px]"
            objectFit="contain"
            rounded={false}
          />
        </div>
        <div className="space-y-3 text-sm">
          {dashboardData.mindfulExercises.map((item) => (
            <StatsRow
              key={item.label}
              label={item.label}
              value={item.value}
              valueClassName="font-cormorant text-base font-semibold text-customBlack"
            />
          ))}
          <div className="border-t border-cardBorder pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6b6b6b]">Total exercises active:</span>
              <div className="inline-flex items-center gap-2">
                <span className="h-[11px] w-[11px] rounded-full bg-[#d4a574]" />
                <span className="text-xs text-charcoal">{dashboardData.mindfulSummary}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
