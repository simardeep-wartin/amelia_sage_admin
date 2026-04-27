"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import appData from "@/data/app-data.json";

type PromoStatus = "Active" | "Expired" | "Paused";
type PromoType = "Fixed" | "Percentage";

interface PromoRow {
  code: string;
  discount: string;
  type: PromoType;
  validUntil: string;
  uses: string;
  status: PromoStatus;
}

// ✅ Type-safe mapping from JSON
const rowsFromJson: PromoRow[] = appData.promotions.rows.map((item) => ({
  ...item,
  type: item.type as PromoType,
  status: item.status as PromoStatus,
}));

const STATUS_STYLE: Record<PromoStatus, { dot: string; text: string }> = {
  Active: { dot: "#008236", text: "#008236" },
  Expired: { dot: "#6C6C6C", text: "#6C6C6C" },
  Paused: { dot: "#D97706", text: "#D97706" },
};

function DotsMenu() {
  return (
    <button className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-[#F3F4F6]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="3.5" r="1.5" fill="#6C6C6C" />
        <circle cx="8" cy="8" r="1.5" fill="#6C6C6C" />
        <circle cx="8" cy="12.5" r="1.5" fill="#6C6C6C" />
      </svg>
    </button>
  );
}

export default function PromotionTab() {
  const [rows] = useState<PromoRow[]>(rowsFromJson);

  return (
    <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[20px] font-medium text-[#2B2B2B]">
          Manage Promotions
        </p>
        <button className="flex items-center gap-2 rounded-[8px] bg-sageGreen px-4 py-2 text-[14px] font-semibold text-white hover:bg-primaryHover">
          <PlusIcon className="h-4 w-4" />
          Create Promotion
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {["Code", "Discount", "Type", "Valid Until", "Uses", "Status", ""].map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-[10px] text-left text-[14px] font-semibold text-[#618078]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const s = STATUS_STYLE[row.status];

              return (
                <tr
                  key={row.code}
                  className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB]"
                >
                  <td className="px-4 py-3 text-[14px] font-medium text-[#2D2D2D]">
                    {row.code}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#2D2D2D]">
                    {row.discount}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#6B6B6B]">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#6B6B6B]">
                    {row.validUntil}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#6B6B6B]">
                    {row.uses}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="flex items-center gap-1.5 text-[14px] font-medium"
                      style={{ color: s.text }}
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: s.dot }}
                      />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <DotsMenu />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}