"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
};

export default function Button({
  isLoading,
  loadingText = "Loading...",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const base =
    "h-12 w-full rounded-[20px] bg-sageGreen text-white text-m font-semibold transition" +
    " hover:bg-primaryHover active:brightness-95" +
    " focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2" +
    " disabled:cursor-not-allowed disabled:opacity-70";

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={className ? `${base} ${className}` : base}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
