import type { ComponentType, SVGProps } from "react";

const ICON_GRADIENT =
  "linear-gradient(135deg, rgba(168,181,160,0.2) 0%, rgba(213,202,227,0.2) 50%, rgba(232,196,184,0.2) 100%)";

export interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  subtitleColor?: string;
  iconSrc?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  valueColor?: string;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  subtitleColor = "#4BB05D",
  iconSrc,
  Icon,
  valueColor,
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`flex min-h-[100px] sm:h-[125px] flex-col justify-center rounded-[14px] border border-cardBorder bg-white px-4 sm:px-5 shadow-sm ${className}`}
    >
      <p className="font-sans text-m font-medium text-charcoal">{title}</p>
      <div className="mt-4 flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundImage: ICON_GRADIENT }}
        >
          {Icon ? (
            <Icon className="h-6 w-6 text-charcoal" />
          ) : iconSrc ? (
            <img src={iconSrc} alt="" className="h-6 w-6" />
          ) : null}
        </div>
        <div>
          <p
            className="text-[20px] sm:text-[24px] font-bold leading-tight text-charcoal"
            style={valueColor ? { color: valueColor } : undefined}
          >
            {value}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-xs" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
