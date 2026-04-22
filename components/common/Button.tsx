import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "ghost" | "custom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  href?: string;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  solid: "border border-sageGreen bg-sageGreen text-white shadow-sm hover:bg-primaryHover hover:shadow-md",
  outline: "border border-sageGreen bg-paper text-sageGreen hover:bg-gold/10 hover:shadow-sm",
  ghost: "border border-transparent bg-transparent text-charcoal",
  custom: "",
};

export default function Button({
  variant = "solid",
  leftIcon,
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-s font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sageGreen disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_STYLES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {leftIcon}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={props.type ?? "button"} {...props}>
      {leftIcon}
      {children}
    </button>
  );
}
