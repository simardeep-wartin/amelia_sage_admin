"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@/lib/utils";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue>({
  open: false,
  setOpen: () => {},
  triggerRect: null,
  setTriggerRect: () => {},
});

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRect, setTriggerRect }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  className,
  onClick: onClickProp,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, setTriggerRect } = React.useContext(DropdownMenuContext);
  const ref = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        if (ref.current) setTriggerRect(ref.current.getBoundingClientRect());
        setOpen(!open);
        onClickProp?.(e);
      }}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  align = "start",
  className,
}: {
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  const { open, triggerRect } = React.useContext(DropdownMenuContext);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!open || !triggerRect || !mounted) return null;

  const style: React.CSSProperties = {
    position: "fixed",
    top: triggerRect.bottom + 4,
    zIndex: 9999,
    ...(align === "end"
      ? { right: window.innerWidth - triggerRect.right }
      : { left: triggerRect.left }),
  };

  return ReactDOM.createPortal(
    <div
      style={style}
      className={cn(
        "min-w-[8rem] overflow-hidden rounded-lg border border-border bg-paper py-1 shadow-md",
        className,
      )}
    >
      {children}
    </div>,
    document.body,
  );
}

export function DropdownMenuItem({
  children,
  onSelect,
  className,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}) {
  const { setOpen } = React.useContext(DropdownMenuContext);
  return (
    <button
      type="button"
      onClick={() => {
        onSelect?.();
        setOpen(false);
      }}
      className={cn(
        "flex w-full cursor-pointer items-center px-3 py-1.5 text-sm text-charcoal hover:bg-softstone",
        className,
      )}
    >
      {children}
    </button>
  );
}
