"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import appData from "@/data/app-data.json";

type Status = "active" | "trial" | "cancelled";

interface SubRow {
  email: string;
  plan: string;
  status: Status;
  started: string;
  nextBilling: string;
  amount: string;
}

// ✅ map + cast JSON → strict types
const ALL_ROWS: SubRow[] = appData.subscriptions.rows.map((item) => ({
  ...item,
  status: item.status as Status,
}));

const PLANS = ["All Plans", "Core Monthly", "Core Annual", "Freemium"];
const STATUSES = ["All Status", "active", "trial", "cancelled"];

const STATUS_BADGE: Record<Status, { bg: string; text: string; label: string }> = {
  active: { bg: "#DCFCE7", text: "#008236", label: "active" },
  trial: { bg: "#DBEAFE", text: "#1447E6", label: "trial" },
  cancelled: { bg: "#F3F4F6", text: "#6C6C6C", label: "cancelled" },
};

const MANAGE_COLOR: Record<Status, string> = {
  active: "#8BAA87",
  trial: "#8B7EC8",
  cancelled: "#6C6C6C",
};

export default function SubscriptionTab() {
  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState("All Plans");
  const [status, setStatus] = useState("All Status");

  const filtered = ALL_ROWS.filter((r) => {
    const q = search.toLowerCase();
    return (
      (r.email.toLowerCase().includes(q) ||
        r.plan.toLowerCase().includes(q)) &&
      (plan === "All Plans" || r.plan === plan) &&
      (status === "All Status" || r.status === status)
    );
  });

  return (
    <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
      <p className="mb-4 text-[20px] font-medium text-[#2B2B2B]">
        Manage Subscriptions
      </p>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by user or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-[37px] flex-1 min-w-[200px] rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#2B2B2B] placeholder-[rgba(10,10,10,0.5)] focus:outline-none"
        />

        <div className="relative">
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="h-[37px] appearance-none rounded-[9px] border border-[#CDCDCD] bg-white pl-3 pr-8 text-[14px] text-[#2B2B2B] focus:outline-none"
          >
            {PLANS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C6C6C]" />
        </div>

        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-[37px] appearance-none rounded-[9px] border border-[#CDCDCD] bg-white pl-3 pr-8 text-[14px] text-[#2B2B2B] focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {[
                "User",
                "Plan",
                "Status",
                "Started",
                "Next Billing",
                "Amount",
                "Actions",
              ].map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-[10px] text-[16px] font-semibold text-[#D6B26A] ${
                    i >= 5 ? "text-right" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, i) => {
              const badge = STATUS_BADGE[row.status];

              return (
                <tr key={i} className="border-b border-[#F3F4F6] last:border-0">
                  <td className="px-4 py-3 text-[14px] text-[#2D2D2D]">
                    {row.email}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#6B6B6B]">
                    {row.plan}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[12px]"
                      style={{
                        background: badge.bg,
                        color: badge.text,
                      }}
                    >
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#6B6B6B]">
                    {row.started}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#6B6B6B]">
                    {row.nextBilling}
                  </td>
                  <td className="px-4 py-3 text-right text-[14px] font-medium text-[#2D2D2D]">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="text-[14px] font-medium"
                      style={{ color: MANAGE_COLOR[row.status] }}
                    >
                      Manage
                    </button>
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