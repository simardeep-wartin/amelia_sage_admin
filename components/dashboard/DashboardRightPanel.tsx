import Card from "@/components/common/Card";
import AvatarCircle from "@/components/common/AvatarCircle";
import StatsRow from "@/components/common/StatsRow";
import appData from "@/data/app-data.json";

const dashboardData = appData.dashboard;

export default function DashboardRightPanel() {
  return (
    <div className="space-y-4">
      <Card title="Sage AI Interactions">
        <div className="flex flex-col items-center gap-4">
          <AvatarCircle src={dashboardData.sageAiImage} alt="Sage AI" />
          <div className="text-center">
            <p className="font-cormorant text-3xl sm:text-5xl font-bold text-customBlack">
              {dashboardData.sageAi.totalInteractions}
            </p>
            <p className="text-xs font-medium text-slate">Total Interactions</p>
          </div>
        </div>
        <div className="mt-5 space-y-3 text-sm">
          <StatsRow label="Voice interactions" value={dashboardData.sageAi.voiceInteractions} />
          <StatsRow label="Chat sessions" value={dashboardData.sageAi.chatSessions} />
          <div className="border-t border-cardBorder pt-3">
            <StatsRow
              label="Satisfaction"
              value={dashboardData.sageAi.satisfaction}
              valueClassName="font-medium text-customBlack"
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
              valueClassName="font-medium text-customBlack"
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
