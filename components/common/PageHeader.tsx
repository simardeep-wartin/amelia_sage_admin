import type { ReactNode } from "react";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  breadcrumbs?: Breadcrumb[];
  action?: ReactNode;
  description?: string;
};

export default function PageHeader({ title, breadcrumbs, action, description }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-2 px-1">
      <div>
        <h1 className="text-[32px] font-cormorant text-[#2D2D2D] font-bold leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-[14px] leading-[20px] text-[#6B6B6B] max-w-[420px]">{description}</p>
        )}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1 text-[13px] text-[#A1A1A1] mb-2 font-medium">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1">
                {i > 0 && <span>/</span>}
                <span className={i === breadcrumbs.length - 1 ? "text-[#6B6B6B]" : ""}>
                  {crumb.label}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
