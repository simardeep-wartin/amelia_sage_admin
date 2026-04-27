"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeftIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
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

// ─── constants ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  users: UsersIcon,
  warning: ExclamationTriangleIcon,
  clock: ClockIcon,
  checkCircle: CheckCircleIcon,
};

// ─── data from JSON ───────────────────────────────────────────────────────────

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
        <div className="flex items-center gap-1.5">
          <Link
            href="/governance-safety"
            className="flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-charcoal transition"
          >
            <ChevronLeftIcon className="h-[18px] w-[18px]" />
            <span>Back to Governance &amp; Safety</span>
          </Link>
        </div>

        {/* Title row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium text-[#2d2d2d]">User Risk Monitoring</h1>
            <p className="text-sm text-[#6b6b6b]">
              Users flagged by AI for emotional distress or overwhelm
            </p>
          </div>
          <button className="flex h-12 items-center gap-2.5 rounded-[9px] border border-[#6C6C6C] px-4 text-[14px] text-[#2B2B2B]">
            This Month
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {metrics.map(({ label, value, iconType, valueColor }) => (
            <MetricCard
              key={label}
              title={label}
              value={value}
              Icon={ICON_MAP[iconType]}
              valueColor={valueColor}
            />
          ))}
        </div>

        {/* Tab bar */}

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

        {/* Two-column layout */}
        <div className="flex gap-4 items-start">
          {/* Queue panel */}
          <div className="w-[328px] shrink-0 rounded-[14px] border border-[#f3f4f6] bg-white px-5 pb-5 pt-5 shadow-sm">
            <p className="mb-4 text-xl font-medium text-[#2b2b2b]">Queue: Priority Items</p>
            <div className="flex flex-col gap-2 py-2">
              {filtered.map((item) => {
                const isActive = item.id === selectedId;
                const isHigh = item.level === "HIGH";
                const borderColor = isHigh ? "#aa371c" : "#7a582e";
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className="w-full rounded-[6px] border-l-4 px-5 py-4 text-left shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition"
                    style={{
                      borderLeftColor: borderColor,
                      backgroundColor: isActive ? "rgba(170,169,169,0.3)" : "#ffffff",
                      opacity: item.status === "RESOLVED" && !isActive ? 0.7 : 1,
                    }}
                  >
                    {/* Top row: ID + badge */}
                    <div className="mb-1.5 flex items-start justify-between">
                      <span className="text-sm font-semibold text-[#48664a]">{item.id}</span>
                      {isHigh ? (
                        <span className="rounded-full bg-[#fa7150] px-2 py-0.5 text-[10px] font-bold uppercase text-[#671200]">
                          HIGH
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#f4c792] px-2 py-0.5 text-[10px] font-bold uppercase text-[#5e3f17]">
                          MEDIUM
                        </span>
                      )}
                    </div>
                    {/* Title */}
                    <p className="mb-1.5 text-xs font-semibold leading-4 text-[#2e3333]">
                      {item.title}
                    </p>
                    {/* Source + status */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[-0.5px] text-[#767c7b]">
                        {item.source}
                      </span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-[-0.5px]"
                        style={{
                          color: item.status === "PENDING" ? "#7a582e" : "#767c7b",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          {user && (
            <div className="flex flex-1 flex-col gap-4">
              {/* User info card */}
              <div className="rounded-[14px] border border-[#f3f4f6] bg-white px-5 py-5 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#c9ecc7]">
                    <span className="text-2xl font-bold text-[#48664a]">{user.initial}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-end gap-2">
                      <span className="text-[32px] font-semibold leading-10 tracking-[-0.9px] text-[#2e3333]">
                        {user.name}
                      </span>
                      <span className="mb-1 text-sm font-semibold text-[#48664a]">
                        {user.userId}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#5b605f]">{user.contact}</p>
                  </div>
                </div>
              </div>

              {/* AI Risk Summary card */}
              <div className="flex-1 rounded-[14px] border border-[#f3f4f6] bg-white px-5 py-5 shadow-sm">
                <p className="mb-4 text-xl font-medium text-[#2b2b2b]">AI Risk Summary</p>
                <p className="text-base font-medium leading-[26px] text-[#2e3333]">
                  {user.summaryParts.map((part, i) => {
                    if (part.style === "bold-red") {
                      return (
                        <em key={i} className="font-bold not-italic text-[#aa371c]">
                          {part.text}
                        </em>
                      );
                    }
                    if (part.style === "bold-brown") {
                      return (
                        <strong key={i} className="font-bold text-[#7a582e]">
                          {part.text}
                        </strong>
                      );
                    }
                    return <span key={i}>{part.text}</span>;
                  })}
                </p>
                <div className="mt-6 flex gap-2">
                  {user.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-4 py-1 text-xs font-bold text-[#7a582e]"
                      style={{ backgroundColor: "rgba(122,88,46,0.1)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons card */}
              <div className="rounded-[14px] border border-[#f3f4f6] bg-white px-5 py-5 shadow-sm">
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-[8px] bg-[#8baa87] text-base font-semibold text-white transition hover:opacity-90"
                  >
                    <CheckCircleIcon className="h-5 w-5" />
                    Mark as Resolved
                  </button>
                  <button
                    type="button"
                    className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-[8px] bg-[#72528b] text-base font-semibold text-white transition hover:opacity-90"
                  >
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
