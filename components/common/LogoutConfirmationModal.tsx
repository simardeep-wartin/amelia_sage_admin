"use client";

import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: LogoutConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl pb-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-16 w-16 bg-red-50 text-red-500 flex items-center justify-center rounded-full">
          <ArrowRightStartOnRectangleIcon className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <p className="text-[20px] font-sm text-slate leading-relaxed">
            Are you sure you want to <span className="text-charcoal font-semibold">log out</span>?
            Your current session will be ended.
          </p>
        </div>
      </div>

      <div className="flex gap-4 w-full mt-8">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1 py-3 h-auto rounded-[12px] border-[#E5E5E5] text-charcoal font-semibold"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          isLoading={isLoading}
          loadingText="Logging out..."
          disabled={isLoading}
          className="flex-1 py-3 h-auto rounded-[12px] bg-destructive hover:bg-red-700 text-white font-semibold shadow-sm"
        >
          Yes, Logout
        </Button>
      </div>
    </Modal>
  );
}
