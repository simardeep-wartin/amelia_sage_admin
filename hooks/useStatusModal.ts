"use client";

import { useCallback, useState } from "react";
import type {
  StatusModalAction,
  StatusModalProps,
  StatusModalStatus,
} from "@/components/common/StatusModal";

type StatusModalState = Omit<StatusModalProps, "onClose">;

export const errorMessage = (e: unknown) => (e instanceof Error ? e.message : undefined);

const INITIAL_STATE: StatusModalState = {
  isOpen: false,
  status: "success",
  action: "add",
  entityLabel: "Item",
};

export function useStatusModal() {
  const [state, setState] = useState<StatusModalState>(INITIAL_STATE);

  const close = useCallback(() => setState((prev) => ({ ...prev, isOpen: false })), []);

  const show = useCallback(
    (
      status: StatusModalStatus,
      action: StatusModalAction,
      entityLabel: string,
      itemName?: string,
      message?: string,
    ) => {
      setState({ isOpen: true, status, action, entityLabel, itemName, message });
    },
    [],
  );

  const showSuccess = useCallback(
    (action: StatusModalAction, entityLabel: string, itemName?: string, message?: string) =>
      show("success", action, entityLabel, itemName, message),
    [show],
  );

  const showFailure = useCallback(
    (action: StatusModalAction, entityLabel: string, itemName?: string, message?: string) =>
      show("failure", action, entityLabel, itemName, message),
    [show],
  );

  return {
    statusModalProps: { ...state, onClose: close } satisfies StatusModalProps,
    showSuccess,
    showFailure,
  };
}
