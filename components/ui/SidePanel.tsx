"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
  zIndex?: string;
}

export default function SidePanel({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "max-w-xl",
  zIndex = "z-50",
}: SidePanelProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger entry animation
      const timer = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
      // Delay unmounting until exit animation finishes
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 ${zIndex} overflow-hidden`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${mounted ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`absolute inset-y-0 right-0 flex w-full ${width} shadow-2xl transition-transform duration-300 ease-in-out ${mounted ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex h-full w-full flex-col bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#E5E5E5] shadow-[0_2px_2px_0_rgba(0,0,0,0.16)] p-8 mb-4">
            <h2 className="text-[24px] font-semibold font-inter text-charcoal">{title}</h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-grey hover:text-charcoal transition-colors p-2 rounded-md hover:bg-black/5"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-[#E5E5E5] bg-white px-8 py-6">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
