"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface AuthSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function AuthSuccessModal({
  isOpen,
  onClose,
  title,
  message,
}: AuthSuccessModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[520px] bg-[#fafafa] rounded-[24px] px-10 py-10 flex flex-col items-center gap-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-[44px] w-[44px] items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer text-[#2b2b2b]"
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Gradient checkmark icon */}
        <div className="relative flex items-center justify-center shrink-0 h-[100px] w-[100px]">
          <div
            className="absolute inset-[-10px] rounded-full opacity-50 blur-[24px]"
            style={{ background: "linear-gradient(to bottom, #8baa87, #d6b26a)" }}
          />
          <div
            className="absolute inset-0 rounded-full p-[6px]"
            style={{ background: "linear-gradient(to bottom, #8baa87, #d6b26a)" }}
          >
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
              <CheckIcon className="h-[48px] w-[48px] text-sageGreen stroke-[1.5]" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            className="text-[36px] font-bold leading-[45px] text-sageGreen"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {title}
          </h2>
          <p className="text-[16px] font-normal leading-[26px] text-[#6c6c6c] max-w-[314px]">
            {message}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
