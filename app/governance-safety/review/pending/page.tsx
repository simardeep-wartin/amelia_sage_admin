"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricCard from "@/components/common/MetricCard";
import appData from "@/data/app-data.json";
import Tabs from "@/components/common/Tabs";

// ─── types ────────────────────────────────────────────────────────────────────

type RiskLevel = "HIGH" | "MEDIUM";
type ItemStatus = "PENDING" | "RESOLVED";
type SummaryStyle = "bold-red" | "bold-brown";

type QueueItem = {
  id: string;
  title: string;
  source: string;
  status: ItemStatus;
  level: RiskLevel;
};

type SummaryPart = { text: string; style?: SummaryStyle };

type User = {
  initial: string;
  name: string;
  userId: string;
  contact: string;
  summaryParts: SummaryPart[];
  tags: string[];
};

// ─── icon map (NOW USING IMAGE URLS) ──────────────────────────────────────────

const ICON_MAP: Record<string, string> = {
  users: "/auth/multipleUserGrey.svg",
  warning: "/auth/growthRed.svg",
  clock: "/auth/clockBlack.svg",
  checkCircle: "/auth/circleTickGreen.svg",
};

// ─── data ─────────────────────────────────────────────────────────────────────

const { metrics, tabs, queueItems, users } =
  appData.governanceSafety.userRiskMonitoring;

const QUEUE_ITEMS = queueItems as QueueItem[];
const USERS = users as Record<string, User>;

// ─── component ────────────────────────────────────────────────────────────────

export default function UserRiskMonitoringPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedId, setSelectedId] = useState(QUEUE_ITEMS[0]?.id ?? "");

  const filtered = QUEUE_ITEMS.filter((item) => {
    if (activeTab === "high") return item.level === "HIGH";
    if (activeTab === "moderate") return item.level === "MEDIUM";
    return true;
  });

  const user = USERS[selectedId];
  const TAB_ITEMS = tabs.map((t) => t.label);

  return (
    <DashboardLayout title="Governance & Safety">
      <div className="flex flex-col gap-6">
        {/* Back */}
        <Link
          href="/governance-safety"
          className="flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-charcoal transition"
        >
          <ChevronLeftIcon className="h-[18px] w-[18px]" />
          <span>Back to Governance &amp; Safety</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-medium text-[#2d2d2d]">
              User Risk Monitoring
            </h1>
            <p className="text-sm text-[#6b6b6b]">
              Users flagged by AI for emotional distress or overwhelm
            </p>
          </div>

          <button className="flex h-10 sm:h-12 items-center justify-center gap-2.5 rounded-[9px] border border-[#6C6C6C] px-3 sm:px-4 text-sm text-[#2B2B2B]">
            This Month
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(({ label, value, iconType, valueColor }) => (
            <MetricCard
              key={label}
              title={label}
              value={value}
              iconSrc={ICON_MAP[iconType]}
              valueColor={valueColor}
            />
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          items={TAB_ITEMS}
          activeTab={
            tabs.find((t) => t.value === activeTab)?.label || TAB_ITEMS[0]
          }
          onTabChange={(label: string) => {
            const selected = tabs.find((t) => t.label === label);
            if (selected) setActiveTab(selected.value);
          }}
        />

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Queue */}
          <div className="w-full lg:w-[328px] shrink-0 rounded-[14px] border border-[#f3f4f6] bg-white px-4 sm:px-5 py-5 shadow-sm">
            <p className="mb-4 text-base font-medium text-[#2b2b2b]">
              Queue: Priority Items
            </p>

            <div className="flex flex-col gap-2">
              {filtered.map((item) => {
                const isActive = item.id === selectedId;
                const isHigh = item.level === "HIGH";

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className="w-full rounded-[6px] border-l-4 px-4 sm:px-5 py-3 sm:py-4 text-left shadow-sm transition"
                    style={{
                      borderLeftColor: isHigh ? "#aa371c" : "#7a582e",
                      backgroundColor: isActive
                        ? "rgba(170,169,169,0.3)"
                        : "#fff",
                      opacity:
                        item.status === "RESOLVED" && !isActive ? 0.7 : 1,
                    }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-[#48664a]">
                        {item.id}
                      </span>

                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          isHigh
                            ? "bg-[#fa7150] text-[#671200]"
                            : "bg-[#f4c792] text-[#5e3f17]"
                        }`}
                      >
                        {item.level}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#2e3333] mb-1">
                      {item.title}
                    </p>

                    <div className="flex justify-between text-[10px] font-bold uppercase text-[#767c7b]">
                      <span>{item.source}</span>
                      <span
                        className={
                          item.status === "PENDING"
                            ? "text-[#7a582e]"
                            : ""
                        }
                      >
                        {item.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details */}
          {user && (
            <div className="flex-1 flex flex-col gap-4 w-full">
              {/* User Card */}
              <div className="rounded-[14px] border bg-white p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center rounded-full bg-[#c9ecc7]">
                    <span className="text-xl sm:text-2xl font-bold text-[#48664a]">
                      {user.initial}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-2">
                      <span className="text-2xl sm:text-[32px] font-semibold text-[#2e3333]">
                        {user.name}
                      </span>
                      <span className="text-sm font-semibold text-[#48664a]">
                        {user.userId}
                      </span>
                    </div>
                    <p className="text-sm text-[#5b605f]">{user.contact}</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-[14px] border bg-white p-5 shadow-sm">
                <p className="mb-4 font-medium text-charcoal">
                  AI Risk Summary
                </p>

                <p className="text-sm sm:text-base leading-6 text-[#2e3333]">
                  {user.summaryParts.map((part, i) => {
                    if (part.style === "bold-red") {
                      return (
                        <span key={i} className="font-bold text-[#aa371c]">
                          {part.text}
                        </span>
                      );
                    }
                    if (part.style === "bold-brown") {
                      return (
                        <span key={i} className="font-bold text-[#7a582e]">
                          {part.text}
                        </span>
                      );
                    }
                    return <span key={i}>{part.text}</span>;
                  })}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {user.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-bold rounded-full text-[#7a582e] bg-[rgba(122,88,46,0.1)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-[14px] border bg-white p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 h-11 sm:h-12 flex items-center justify-center gap-2 rounded bg-[#8baa87] text-white font-semibold">
                    <CheckCircleIcon className="h-5 w-5" />
                    Mark as Resolved
                  </button>

                  <button className="flex-1 h-11 sm:h-12 flex items-center justify-center rounded bg-[#72528b] text-white font-semibold">
                    Send Support Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}