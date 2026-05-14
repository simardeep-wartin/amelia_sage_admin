"use client";

import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Confirmation"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-16 w-16 bg-red-50 text-destructive flex items-center justify-center rounded-full">
          <TrashIcon className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-charcoal">{title}</h3>
          <p className="text-sm text-[#A1A1A1] leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div className="flex gap-4 w-full mt-8">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1 py-3 h-auto rounded-[12px] border-[#E5E5E5] text-charcoal font-semibold"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          className="flex-1 py-3 h-auto rounded-[12px] bg-destructive hover:bg-red-700 text-white font-semibold shadow-sm"
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
