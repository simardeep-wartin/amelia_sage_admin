"use client";

import { useRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

type FileUploadZoneProps = {
  label: string;
  accept: string;
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  existingUrl?: string;
  placeholder?: string;
  hint?: string;
  className?: string;
};

export default function FileUploadZone({
  label,
  accept,
  selectedFile,
  onFileSelect,
  existingUrl,
  placeholder = "Upload File",
  hint,
  className = "",
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = selectedFile ? URL.createObjectURL(selectedFile) : existingUrl;

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-[18px] font-medium text-charcoal">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#E5E5E5] bg-[#FDFDFD] py-8 transition-colors hover:bg-gray-50 cursor-pointer"
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept={accept}
          onChange={(e) => {
            if (e.target.files?.[0]) onFileSelect(e.target.files[0]);
          }}
        />
        {preview ? (
          <div className="h-14 w-14 rounded-xl bg-gray-200 flex items-center justify-center mb-2">
            <img src={preview} alt="icon preview" className="h-8 w-8 object-contain" />
          </div>
        ) : (
          <CloudArrowUpIcon className="h-8 w-8 text-[#9898A3] mb-2" strokeWidth={1} />
        )}
        <span className="text-sm font-medium text-[#5B4FDB] mb-1 px-4 text-center break-all">
          {selectedFile ? selectedFile.name : preview ? "Click to change icon" : placeholder}
        </span>
        {hint && <span className="text-xs text-[#A1A1AA] text-center px-4">{hint}</span>}
      </div>
    </div>
  );
}
