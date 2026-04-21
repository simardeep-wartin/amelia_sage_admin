import Card from "@/components/common/Card";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
}

export default function StatsCard({ title, value, subtitle, trend }: StatsCardProps) {
  return (
    <Card title={title}>
      <div className="space-y-3">
        <p className="font-cormorant text-4xl font-bold leading-none text-charcoal">{value}</p>
        <p className="text-s text-slate">{subtitle}</p>
        {trend ? (
          <span className="inline-flex rounded-full bg-[#dcfce7] px-2 py-1 text-s text-[#008236]">{trend}</span>
        ) : null}
      </div>
    </Card>
  );
}
