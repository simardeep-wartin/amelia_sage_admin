"use client";

import { forwardRef, ReactNode, useId } from "react";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  error?: string;
  rightSlot?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, rightSlot, className, id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  const inputClass = [
    "h-12 w-full rounded-[20px]",
    "border border-[#ededed] bg-white",
    "px-5 py-3 font-medium text-m text-charcoal placeholder:text-[#e1e1e1]",
    "outline-none transition",
    "focus:border-gold/55 focus:ring-2 focus:ring-gold/20",
    error ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/20" : "",
    rightSlot ? "pr-12" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="block text-s font-normal text-charcoal">
        {label}
      </label>

      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClass}
          {...props}
        />

        {rightSlot ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightSlot}</div>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
