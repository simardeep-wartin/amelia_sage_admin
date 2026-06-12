import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
}

export default function Card({
  title,
  actions,
  children,
  className = "",
  headerClassName = "",
  titleClassName = "",
}: CardProps) {
  return (
    <section className={`rounded-xl border border-cardBorder bg-paper p-5 shadow-sm ${className}`}>
      {(title || actions) && (
        <header className={`flex items-center justify-between gap-3 mb-4 ${headerClassName}`}>
          {title ? (
            <p
              className={`font-arial text-[15px] sm:text-[20px] font-medium text-charcoal ${titleClassName}`}
            >
              {title}
            </p>
          ) : (
            <span />
          )}
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
