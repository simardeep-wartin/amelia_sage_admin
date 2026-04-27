import MetricCard from "@/components/common/MetricCard";

interface DemographicsMetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}

export default function DemographicsMetricCard({
  title,
  value,
  subtitle,
  icon,
}: DemographicsMetricCardProps) {
  return <MetricCard title={title} value={value} subtitle={subtitle} iconSrc={icon} />;
}
