"use client";

import { useRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

type FileUploadZoneProps = {
  label: string;
  accept: string;
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  placeholder?: string;
  hint?: string;
  className?: string;
};

export default function FileUploadZone({
  label,
  accept,
  selectedFile,
  onFileSelect,
  placeholder = "Upload File",
  hint,
  className = "",
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-s font-medium text-charcoal">{label}</label>
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
        <CloudArrowUpIcon className="h-8 w-8 text-[#9898A3] mb-2" strokeWidth={1} />
        <span className="text-sm font-medium text-[#5B4FDB] mb-1 px-4 text-center break-all">
          {selectedFile ? selectedFile.name : placeholder}
        </span>
        {hint && <span className="text-xs text-[#A1A1AA] text-center px-4">{hint}</span>}
      </div>
    </div>
  );
}
