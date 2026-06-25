"use client";

import { useState } from "react";
import {
  EllipsisVerticalIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ActionsDropdownMenuProps = {
  onEdit: () => void;
  onDelete: () => void | Promise<void>;
  onPublish?: (title?: string) => void | Promise<void>;
  publishLabel?: string;
  trigger?: "vertical" | "horizontal";
  stopPropagation?: boolean;
};

export default function ActionsDropdownMenu({
  onEdit,
  onDelete,
  onPublish,
  publishLabel,
  trigger = "vertical",
  stopPropagation = false,
}: ActionsDropdownMenuProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const TriggerIcon = trigger === "horizontal" ? EllipsisHorizontalIcon : EllipsisVerticalIcon;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="p-1 text-slate hover:text-[#2D2D2D] transition-colors outline-none cursor-pointer"
          onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
        >
          <TriggerIcon className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[140px] rounded-[16px] py-2 px-1 border-[#F2F2F2] shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
        >
          <DropdownMenuItem
            onSelect={onEdit}
            className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#2D2D2D] hover:bg-[#F7F4EE] hover:text-sageGreen cursor-pointer"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          {onPublish && (
            <DropdownMenuItem
              onSelect={() => setShowPublishConfirm(true)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#2D2D2D] hover:bg-[#F0F4F1] hover:text-sageGreen cursor-pointer"
            >
              <ArrowUpCircleIcon className="h-4 w-4" />
              Publish
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onSelect={() => setShowConfirm(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#2D2D2D] hover:bg-[#FDF2F2] hover:text-destructive cursor-pointer"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showPublishConfirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          onClick={() => setShowPublishConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[360px] mx-4 flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
              <ArrowUpCircleIcon className="h-6 w-6 text-sageGreen" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-[16px] font-semibold text-[#2D2D2D]">Publish this exercise?</p>
              <p className="text-[13px] text-[#6B6B6B]">
                {publishLabel
                  ? `"${publishLabel}" will be published and visible to users.`
                  : "This exercise will be published and visible to users."}
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowPublishConfirm(false)}
                disabled={publishing}
                className="flex-1 h-10 rounded-lg border border-[#E5E5E5] text-[14px] font-semibold text-[#475569] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                disabled={publishing}
                onClick={async () => {
                  setPublishing(true);
                  try {
                    await onPublish?.();
                    setShowPublishConfirm(false);
                  } catch {
                    // error handled by caller
                  } finally {
                    setPublishing(false);
                  }
                }}
                className="flex-1 h-10 rounded-lg bg-sageGreen text-[14px] font-semibold text-white hover:bg-[#7fa18c] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {publishing && (
                  <svg className="h-4 w-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                )}
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[340px] mx-4 flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-[16px] font-semibold text-[#2D2D2D]">Delete this item?</p>
              <p className="text-[13px] text-[#6B6B6B]">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="flex-1 h-10 rounded-lg border border-[#E5E5E5] text-[14px] font-semibold text-[#475569] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={async () => {
                  setDeleting(true);
                  try {
                    await onDelete();
                    setShowConfirm(false);
                  } catch {
                    // error handled by caller
                  } finally {
                    setDeleting(false);
                  }
                }}
                className="flex-1 h-10 rounded-lg bg-red-500 text-[14px] font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting && (
                  <svg className="h-4 w-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
