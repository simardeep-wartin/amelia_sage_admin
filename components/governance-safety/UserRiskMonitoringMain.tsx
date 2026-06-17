"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronDownIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import MetricCard from "@/components/common/MetricCard";
import Card from "@/components/common/Card";
import Tabs from "@/components/common/Tabs";
import QueueItem from "@/components/common/QueueItem";
import type { QueueItemData } from "@/types";
import appData from "@/data/app-data.json";

type SummaryStyle = "bold-red" | "bold-brown";
type SummaryPart = { text: string; style?: SummaryStyle };

type User = {
  initial: string;
  name: string;
  userId: string;
  contact: string;
  summaryParts: SummaryPart[];
  tags: string[];
};

const ICON_MAP: Record<string, string> = {
  users: "/auth/multipleUserGrey.svg",
  warning: "/auth/growthRed.svg",
  clock: "/auth/clockBlack.svg",
  checkCircle: "/auth/circleTickGreen.svg",
};

const { metrics, tabs, queueItems, users } = appData.governanceSafety.userRiskMonitoring;

const QUEUE_ITEMS = queueItems as QueueItemData[];
const USERS = users as Record<string, User>;

export default function UserRiskMonitoringMain() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedId, setSelectedId] = useState(QUEUE_ITEMS[0]?.id ?? "");

  const filtered = QUEUE_ITEMS.filter((item) => {
    if (activeTab === "high") return item.level === "HIGH";
    if (activeTab === "moderate") return item.level === "MEDIUM";
    return true;
  });

  const user = USERS[selectedId];
  const TAB_ITEMS = tabs.map((tab) => tab.label);

  return (
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
          <h1 className="text-xl sm:text-2xl font-medium text-[#2d2d2d]">User Risk Monitoring</h1>
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
        activeTab={tabs.find((tab) => tab.value === activeTab)?.label || TAB_ITEMS[0]}
        onTabChange={(label: string) => {
          const selected = tabs.find((tab) => tab.label === label);
          if (selected) setActiveTab(selected.value);
        }}
      />

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Queue */}
        <Card title="Queue: Priority Items" className="w-full lg:w-[328px] shrink-0">
          <div className="flex flex-col gap-2">
            {filtered.map((item) => (
              <QueueItem
                key={item.id}
                item={item}
                active={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
              />
            ))}
          </div>
        </Card>

        {/* Details */}
        {user && (
          <div className="flex-1 flex flex-col gap-4 w-full">
            <Card className="p-5">
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
                    <span className="text-sm font-semibold text-[#48664a]">{user.userId}</span>
                  </div>
                  <p className="text-sm text-[#5b605f]">{user.contact}</p>
                </div>
              </div>
            </Card>

            <Card title="AI Risk Summary" className="p-5">
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
            </Card>

            <Card className="p-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 h-11 sm:h-12 flex items-center justify-center gap-2 rounded bg-[#8baa87] text-white font-semibold transition hover:bg-[#7a9a76]">
                  <CheckCircleIcon className="h-5 w-5" />
                  Mark as Resolved
                </button>

                <button className="flex-1 h-11 sm:h-12 flex items-center justify-center rounded bg-[#72528b] text-white font-semibold transition hover:bg-[#62427b]">
                  Send Support Message
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
