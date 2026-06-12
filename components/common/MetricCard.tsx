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
      className={`flex min-h-[90px] flex-col justify-center rounded-[14px] border border-cardBorder bg-white px-3 sm:px-4 py-3 sm:py-4 shadow-sm ${className}`}
    >
      <p className="font-inter text-md font-medium text-charcoal leading-tight truncate">{title}</p>
      <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3">
        <div
          className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundImage: ICON_GRADIENT }}
        >
          {Icon ? (
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-charcoal" />
          ) : iconSrc ? (
            <img src={iconSrc} alt="" className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : null}
        </div>
        <div className="min-w-0">
          <p
            className="text-[24px] font-semibold text-charcoal font-inter"
            style={valueColor ? { color: valueColor } : undefined}
          >
            {value}
          </p>
          {subtitle && (
            <p
              className="mt-0.5 text-[10px] sm:text-xs font-arial leading-tight"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
