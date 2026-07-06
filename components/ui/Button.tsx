"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "full";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  solid: "bg-sageGreen text-white shadow-sm hover:bg-sageGreenHover hover:shadow-md",
  outline:
    "border border-sageGreen bg-paper text-sageGreen hover:bg-sageGreenHover hover:text-white hover:shadow-sm disabled:hover:bg-paper disabled:hover:text-sageGreen disabled:hover:shadow-none",
  ghost: "bg-transparent text-charcoal hover:bg-softstone",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-lg",
  md: "h-11 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-lg",
  full: "h-12 w-full text-base rounded-[20px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      isLoading,
      loadingText = "Loading...",
      leftIcon,
      href,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;
    const classes = cn(
      "inline-flex items-center justify-center gap-2 font-semibold transition",
      "focus:outline-none focus:ring-2 focus:ring-sageGreen/30 focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer",
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    if (href && !isDisabled) {
      return (
        <Link href={href} className={classes}>
          {leftIcon}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={classes}
        type={props.type ?? "button"}
        {...props}
      >
        {isLoading ? <ArrowPathIcon className="h-[1em] w-[1em] animate-spin shrink-0" /> : leftIcon}
        {isLoading ? loadingText : children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
