"use client";

import React, { ReactNode } from "react";
import Table, { TableColumn } from "@/components/common/Table";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  subtitle?: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
}

function StatCard({ label, value, trend, subtitle, borderColor, bgColor, textColor }: StatCardProps) {
  return (
    <div 
      className="rounded-[10px] border px-4 py-4" 
      style={{ borderColor, backgroundColor: bgColor }}
    >
      <p className="text-[14px] text-[#6B6B6B]">{label}</p>
      <p className="mt-1 text-[24px] font-bold" style={{ color: textColor }}>
        {value}
      </p>
      {trend && <p className="mt-1 text-[14px] text-[#00A63E]">{trend}</p>}
      {subtitle && <p className="mt-1 text-[14px] text-[#6B6B6B]">{subtitle}</p>}
    </div>
  );
}

interface FinancialTableCardProps<T extends object> {
  title: string;
  headerAction?: ReactNode;
  stats?: StatCardProps[];
  subtitle?: string;
  columns: TableColumn<T>[];
  rows: T[];
  headerTextColor?: string;
  filters?: ReactNode;
}

export default function FinancialTableCard<T extends object>({
  title,
  headerAction,
  stats,
  subtitle,
  columns,
  rows,
  headerTextColor,
  filters,
}: FinancialTableCardProps<T>) {

  return (
    <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[20px] font-medium text-[#2B2B2B]">
          {title}
        </p>
        {headerAction}
      </div>

      {stats && (
        <div className="mb-5 grid grid-cols-1 gap-4 s:grid-cols-2">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      )}

      {filters && <div className="mb-4">{filters}</div>}

      {subtitle && (
        <p className="mb-3 text-[16px] font-medium text-[#2D2D2D]">
          {subtitle}
        </p>
      )}

      <Table columns={columns} rows={rows} headerTextColor={headerTextColor} />
    </div>
  );
}
