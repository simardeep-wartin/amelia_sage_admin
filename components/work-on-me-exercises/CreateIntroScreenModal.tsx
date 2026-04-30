"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "@/components/ui/Input";

interface CreateIntroScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  onSave: (data: { subtitle: string; sageSays: string; description: string }) => void;
}

export default function CreateIntroScreenModal({
  isOpen,
  onClose,
  categoryName,
  onSave,
}: CreateIntroScreenModalProps) {
  const [subtitle, setSubtitle] = useState("");
  const [sageSays, setSageSays] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ subtitle, sageSays, description });
    setSubtitle("");
    setSageSays("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[20px] bg-[#FBFBFB] shadow-lg flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-xl font-bold text-charcoal">Create Intro Screen for {categoryName}</h2>
          <button
            onClick={onClose}
            className="text-grey hover:text-charcoal transition-colors p-1 rounded-full hover:bg-black/5"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 pt-2">
          <Input
            label="Add Subtitle"
            placeholder="Enter Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <Input
            label="Sage Says"
            placeholder="Enter Sage Says"
            value={sageSays}
            onChange={(e) => setSageSays(e.target.value)}
          />

          <div className="space-y-1">
            <label className="block text-s font-normal text-charcoal">
              Add Description
            </label>
            <textarea
              className="w-full rounded-[20px] border border-[#ededed] bg-white px-5 py-4 font-medium text-m text-charcoal placeholder:text-[#e1e1e1] outline-none transition focus:border-gold/55 focus:ring-2 focus:ring-gold/20 min-h-[140px] resize-none"
              placeholder="Add Description Here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 flex flex-col sm:flex-row items-center gap-4 bg-[#FBFBFB] rounded-b-[20px]">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 h-12 rounded-[20px] border border-[#EDEDED] bg-[#F9F9F9] text-base font-semibold text-charcoal transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:flex-1 h-12 rounded-[20px] border border-sageGreen bg-white text-base font-semibold text-sageGreen transition-colors hover:bg-green-50"
          >
            Save as Draft
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:flex-1 h-12 rounded-[20px] bg-sageGreen text-base font-semibold text-white transition-colors hover:bg-[#7fa18c]"
          >
            + Add Intro Screen
          </button>
        </div>
      </div>
    </div>
  );
}
