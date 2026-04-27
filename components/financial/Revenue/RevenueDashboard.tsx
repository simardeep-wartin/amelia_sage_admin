"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import appData from "@/data/app-data.json";

const data = appData.revenueDashboard;

const lineData = data.lineData;
const barData = data.barData;
const healthRows = data.healthRows;

function FilterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="#6C6C6C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function RevenueDashboard() {
  return (
    <div className="space-y-4">
      {/* Stat summary cards */}
      <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
        <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
          <p className="text-[16px] font-medium text-[#2D2D2D]">
            {data.stats.monthlyRevenue.title}
          </p>
          <p className="mt-3 text-[30px] font-semibold text-[#2D2D2D]">
            {data.stats.monthlyRevenue.value}
          </p>
          <p className="mt-1 text-[14px] text-[#00A63E]">
            {data.stats.monthlyRevenue.trend}
          </p>
        </div>

        <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
          <p className="text-[16px] font-medium text-[#2D2D2D]">
            {data.stats.trialConversion.title}
          </p>
          <p className="mt-3 text-[30px] font-semibold text-[#2D2D2D]">
            {data.stats.trialConversion.value}
          </p>
          <p className="mt-1 text-[14px] text-[#6B6B6B]">
            {data.stats.trialConversion.subtitle}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
        {/* Revenue Over Time */}
        <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[20px] font-medium text-[#2B2B2B]">
              Revenue Over Time
            </p>
            <FilterIcon />
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={lineData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#6B6B6B" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12, fill: "#6B6B6B" }}
                axisLine={false}
                tickLine={false}
                width={44}
                domain={[0, 60000]}
                ticks={[0, 15000, 30000, 45000, 60000]}
              />
              <Tooltip
                formatter={(v) =>
                  [`$${Number(v).toLocaleString()}`, "Revenue"] as [
                    string,
                    string
                  ]
                }
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #F3F4F6",
                  fontSize: 13,
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#D4A574"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: "#D4A574",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#D4A574",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-3 flex justify-center gap-2 text-[10px] text-[#6B6B6B]">
            <span className="inline-block h-3 w-3 rounded-full bg-[#D4A574]" />
            Total Revenue
          </div>
        </div>

        {/* Revenue by Plan Type */}
        <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[20px] font-medium text-[#2B2B2B]">
              Revenue by Plan Type
            </p>
            <FilterIcon />
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={barData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F3F4F6"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#6B6B6B" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6B6B6B" }}
                axisLine={false}
                tickLine={false}
                width={44}
                domain={[0, 10000]}
                ticks={[0, 2500, 5000, 7500, 10000]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #F3F4F6",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={58}>
                {barData.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-3 space-y-2">
            {barData.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-[14px]"
              >
                <span className="flex items-center gap-2 text-[#6B6B6B]">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: item.color }}
                  />
                  {item.label}
                </span>
                <span className="font-medium text-[#2D2D2D]">
                  {item.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Health Metrics */}
      <div className="rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[20px] font-medium text-[#2B2B2B]">
            Subscription Health Metrics
          </p>
          <FilterIcon />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="px-4 py-3 text-left text-[14px] font-medium text-[#2D2D2D]">
                  Plan
                </th>
                <th className="px-4 py-3 text-right text-[14px] font-medium text-[#2D2D2D]">
                  Active
                </th>
                <th className="px-4 py-3 text-right text-[14px] font-medium text-[#2D2D2D]">
                  Revenue
                </th>
              </tr>
            </thead>

            <tbody>
              {healthRows.map((row) => (
                <tr
                  key={row.plan}
                  className="border-b border-[#F3F4F6] last:border-0"
                >
                  <td className="px-4 py-3 text-[14px] text-[#2D2D2D]">
                    {row.plan}
                  </td>
                  <td className="px-4 py-3 text-right text-[14px] font-medium text-[#2D2D2D]">
                    {row.active}
                  </td>
                  <td className="px-4 py-3 text-right text-[14px] font-medium text-[#2D2D2D]">
                    {row.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}