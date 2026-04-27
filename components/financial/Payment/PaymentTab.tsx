"use client";

import appData from "@/data/app-data.json";

type PayStatus = "completed" | "failed" | "pending";

interface TxRow {
  date: string;
  user: string;
  type: string;
  amount: string;
  status: PayStatus;
}

// ✅ cast JSON → strict types
const ROWS: TxRow[] = appData.payments.rows.map((item) => ({
  ...item,
  status: item.status as PayStatus,
}));

const STATUS_BADGE: Record<PayStatus, { bg: string; text: string }> = {
  completed: { bg: "#DCFCE7", text: "#008236" },
  failed: { bg: "#FFE2E2", text: "#C10007" },
  pending: { bg: "#FEF9C3", text: "#854D0E" },
};

export default function PaymentTab() {
  const successCount = ROWS.filter((r) => r.status === "completed").length;
  const failedCount = ROWS.filter((r) => r.status === "failed").length;
  const successRate = ((successCount / ROWS.length) * 100).toFixed(1);

  return (
    <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
      <p className="mb-4 text-[20px] font-medium text-[#2B2B2B]">
        Manage Payments
      </p>

      {/* Cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 s:grid-cols-2">
        <div className="rounded-[10px] border border-[#B9F8CF] bg-[#F0FDF4] px-4 py-4">
          <p className="text-[14px] text-[#6B6B6B]">Success Rate</p>
          <p className="mt-1 text-[24px] font-bold text-[#008236]">
            {successRate}%
          </p>
        </div>

        <div className="rounded-[10px] border border-[#FFC9C9] bg-[#FEF2F2] px-4 py-4">
          <p className="text-[14px] text-[#6B6B6B]">Failed Payments</p>
          <p className="mt-1 text-[24px] font-bold text-[#C10007]">
            {failedCount}
          </p>
        </div>
      </div>

      <p className="mb-3 text-[16px] font-medium text-[#2D2D2D]">
        Recent Transactions
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {["Date", "User", "Type", "Amount", "Status", "Actions"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-[11px] text-[14px] font-medium text-[#2D2D2D] ${
                      i >= 3 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {ROWS.map((row, i) => {
              const badge = STATUS_BADGE[row.status];

              return (
                <tr
                  key={i}
                  className="border-b border-[#F3F4F6] last:border-0"
                >
                  <td className="px-4 py-3 text-[14px] text-[#6B6B6B]">
                    {row.date}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#2D2D2D]">
                    {row.user}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#6B6B6B]">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 text-right text-[14px] font-medium text-[#2D2D2D]">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[12px]"
                      style={{
                        background: badge.bg,
                        color: badge.text,
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[14px] font-medium text-sageGreen">
                      View
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