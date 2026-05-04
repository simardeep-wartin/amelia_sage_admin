"use client";

import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string; // e.g., "max-w-2xl", "max-w-3xl"
  zIndex?: string; // e.g., "z-50", "z-[60]"
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-2xl",
  zIndex = "z-50",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 ${zIndex} flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm`}>
      {/* Modal Container */}
      <div className={`w-full ${maxWidth} rounded-[20px] bg-[#FBFBFB] shadow-lg flex flex-col max-h-[90vh]`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-[24px] font-medium text-charcoal">{title}</h2>
          <button
            onClick={onClose}
            className="text-grey hover:text-charcoal transition-colors p-1 rounded-full hover:bg-black/5"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 pt-2">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 pt-4 flex flex-col sm:flex-row items-center gap-4 bg-[#FBFBFB] rounded-b-[20px]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
