"use client";

import { CheckIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";

export type StatusModalStatus = "success" | "failure";
export type StatusModalAction = "add" | "edit" | "delete" | "publish" | "draft";

export interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: StatusModalStatus;
  action?: StatusModalAction;
  entityLabel?: string;
  itemName?: string;
  title?: string;
  message?: string;
}

const ACTION_COPY: Record<StatusModalAction, { past: string; verb: string }> = {
  add: { past: "added", verb: "add" },
  edit: { past: "updated", verb: "update" },
  delete: { past: "deleted", verb: "delete" },
  publish: { past: "published", verb: "publish" },
  draft: { past: "saved as a draft", verb: "save" },
};

function buildDefaults(
  status: StatusModalStatus,
  action: StatusModalAction,
  entityLabel: string,
  itemName?: string,
) {
  const { past, verb } = ACTION_COPY[action];
  const subject = itemName ? `"${itemName}"` : `Your ${entityLabel.toLowerCase()}`;
  if (status === "success") {
    return {
      title: `${entityLabel} ${past.charAt(0).toUpperCase()}${past.slice(1)}`,
      message: `${subject} has been ${past} successfully.`,
    };
  }
  return {
    title: "Something Went Wrong",
    message: itemName
      ? `We couldn't ${verb} "${itemName}". Please try again.`
      : `We couldn't ${verb} this ${entityLabel.toLowerCase()}. Please try again.`,
  };
}

export default function StatusModal({
  isOpen,
  onClose,
  status,
  action = "add",
  entityLabel = "Item",
  itemName,
  title,
  message,
}: StatusModalProps) {
  if (!isOpen) return null;

  const isSuccess = status === "success";
  const defaults = buildDefaults(status, action, entityLabel, itemName);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[440px] bg-white rounded-[24px] px-10 py-10 flex flex-col items-center gap-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer text-grey"
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <div
          className={`flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full ${
            isSuccess ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {isSuccess ? (
            <CheckIcon className="h-11 w-11 text-sageGreen stroke-[1.5]" />
          ) : (
            <ExclamationTriangleIcon className="h-11 w-11 text-destructive stroke-[1.5]" />
          )}
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-[22px] font-bold text-charcoal">{title || defaults.title}</h2>
          <p className="text-[15px] leading-[22px] text-grey max-w-[320px]">
            {message || defaults.message}
          </p>
        </div>

        <Button
          onClick={onClose}
          className={`w-full py-3 h-auto rounded-[12px] font-semibold text-white ${
            isSuccess ? "bg-sageGreen hover:bg-sageGreenHover" : "bg-destructive hover:bg-red-700"
          }`}
        >
          {isSuccess ? "Done" : "Close"}
        </Button>
      </div>
    </div>
  );
}
