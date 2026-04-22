import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, actions, children, className = "" }: CardProps) {
  return (
    <section className={`rounded-xl border border-cardBorder bg-paper p-5 shadow-sm ${className}`}>
      {(title || actions) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          {title ? <h3 className="font-arial text-[20px] font-medium leading-[1.5] text-charcoal">{title}</h3> : <span />}
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
