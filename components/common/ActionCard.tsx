"use client";

import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export interface ActionCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  mainValue?: string | number;
  mainLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  actionClassName?: string;
  /** When true the primary action button is hidden — useful when the whole card div is clickable */
  hideActionButton?: boolean;
  onSecondaryAction?: () => void;
  secondaryActionIcon?: React.ReactNode;
  secondaryActionClassName?: string;
}

export default function ActionCard({
  title,
  subtitle,
  icon,
  mainValue,
  mainLabel,
  onAction,
  actionIcon = <PencilSquareIcon className="h-6 w-6" />,
  actionClassName = "border border-border bg-white text-grey hover:bg-softstone hover:text-charcoal",
  hideActionButton = false,
  onSecondaryAction,
  secondaryActionIcon = <PencilSquareIcon className="h-5 w-5" />,
  secondaryActionClassName = "border border-border bg-white text-grey hover:bg-softstone hover:text-charcoal",
}: ActionCardProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-cardBorder bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md ${onAction ? "cursor-pointer" : ""}`}
      onClick={onAction}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cardBorder bg-transparent">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="font-cormorant text-[16px] sm:text-[20px] font-bold text-charcoal">
            {title}
          </span>
          {subtitle && <span className="text-s font-normal text-[#6D7280] mt-0.5">{subtitle}</span>}
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Main Value/Label */}
        {(mainValue !== undefined || mainLabel) && (
          <div className="flex flex-col items-center justify-center mr-2">
            <span className="font-cormorant text-[18px] sm:text-[24px] font-medium italic text-charcoal leading-none">
              {mainValue}
            </span>
            {mainLabel && <span className="text-xs font-normal text-grey mt-1">{mainLabel}</span>}
          </div>
        )}

        {/* Secondary Action Button (e.g. Edit) */}
        {onSecondaryAction && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSecondaryAction();
            }}
            className={`flex px-2 py-1 items-center justify-center rounded-lg transition-colors cursor-pointer ${secondaryActionClassName}`}
          >
            {secondaryActionIcon}
          </button>
        )}

        {/* Primary Action Button — hidden when hideActionButton=true (div click handles it) */}
        {onAction && !hideActionButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction();
            }}
            className={`flex px-2 py-1 items-center justify-center rounded-lg transition-colors cursor-pointer ${actionClassName}`}
          >
            {actionIcon}
          </button>
        )}
      </div>
    </div>
  );
}
