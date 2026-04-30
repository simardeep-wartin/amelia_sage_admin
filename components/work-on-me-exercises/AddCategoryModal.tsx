"use client";

import React, { useState, useRef } from "react";
import { XMarkIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  nameLabel: string;
  actionText: string;
}

export default function AddCategoryModal({
  isOpen,
  onClose,
  title,
  nameLabel,
  actionText,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="w-full max-w-2xl rounded-[20px] bg-[#FBFBFB] shadow-lg flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-lg sm:text-xl font-bold text-charcoal">{title}</h2>
          <button
            onClick={onClose}
            className="text-grey hover:text-charcoal transition-colors p-1 rounded-full hover:bg-black/5"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 pt-2">
          {/* Name Input */}
          <Input
            label={nameLabel}
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Description Textarea */}
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

          {/* Icon Upload */}
          <div className="space-y-1">
            <label className="block text-s font-normal text-charcoal">
              Add Icon
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#E5E5E5] bg-[#FDFDFD] py-10 transition-colors hover:bg-gray-50 cursor-pointer"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/png, image/jpeg" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }} 
              />
              <CloudArrowUpIcon className="h-8 w-8 text-[#9898A3] mb-3" strokeWidth={1} />
              <span className="text-sm sm:text-[15px] font-medium text-[#5B4FDB] mb-1 px-4 text-center break-all sm:truncate max-w-full">
                {selectedFile ? selectedFile.name : "Upload Icon"}
              </span>
              <span className="text-xs sm:text-[13px] text-[#A1A1AA] text-center px-4">
                PNG, JPG up to 5MB (recommended: 40x40px)
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 flex items-center gap-4 bg-[#FBFBFB] rounded-b-[20px]">
          <button
            onClick={onClose}
            className="flex-1 h-10 sm:h-12 rounded-[20px] border border-[#EDEDED] bg-[#F9F9F9] text-sm sm:text-base font-semibold text-charcoal transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            className="flex-1 h-10 sm:h-12 rounded-[20px] bg-[#8EB19D] text-sm sm:text-base font-semibold text-white transition-colors hover:bg-[#7fa18c]"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
}
