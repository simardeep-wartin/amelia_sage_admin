"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import FilterDropdown from "@/components/ui/FilterDropdown";
import Card from "@/components/common/Card";
import QueueItem from "@/components/common/QueueItem";
import type { QueueItemData } from "@/types";
import appData from "@/data/app-data.json";

type DetailData = {
  title: string;
  duration: string;
  tags: string[];
  description: string;
  visual: React.ReactNode;
  completeness: { label: string; ok: boolean }[];
};

const { filterOptions, sortOptions, items: rawItems } = appData.governanceSafety.contentReview;

const PENDING_ITEMS: QueueItemData[] = rawItems.map((item) => ({
  id: item.id,
  title: item.title,
  tags: item.tags,
  status: item.status as "PENDING" | "APPROVED",
  source: "Content Review",
}));

const DETAIL_DATA: Record<string, DetailData> = Object.fromEntries(
  rawItems.map((item) => [
    item.id,
    {
      title: item.title,
      duration: item.duration,
      tags: item.tags,
      description: item.description,
      visual: (
        <div className="flex h-full min-h-[183px] items-center justify-center">
          <img
            src="/auth/yoga-girl.png"
            alt="Yoga"
            className="h-[187px] w-[137px] object-contain"
          />
        </div>
      ),
      completeness: item.completeness,
    },
  ]),
);

export default function ContentReviewMain() {
  const [selectedId, setSelectedId] = useState(PENDING_ITEMS[0]?.id ?? "");
  const [filter, setFilter] = useState(filterOptions[0]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [items, setItems] = useState(PENDING_ITEMS);

  function handleApprove() {
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, status: "APPROVED" as const } : item,
      ),
    );
  }

  const pendingCount = items.filter((item) => item.status === "PENDING").length;
  const approvedCount = items.filter((item) => item.status === "APPROVED").length;
  const detail = DETAIL_DATA[selectedId];

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <div className="flex items-center gap-1.5">
        <Link
          href="/governance-safety"
          className="flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-charcoal transition"
        >
          <ChevronLeftIcon className="h-[18px] w-[18px]" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Title + filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium text-[#2d2d2d]">Pending Content Review</h1>
          <p className="text-sm text-[#6b6b6b]">Review and approve exercises before publishing</p>
        </div>

        <div className="flex gap-2 sm:flex-row sm:gap-3 md:flex-row">
          <FilterDropdown value={filter} options={filterOptions} onChange={setFilter} />
          <FilterDropdown value={sort} options={sortOptions} onChange={setSort} />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="flex h-[125px] flex-col justify-center px-5 shadow-sm">
          <p className="text-base font-medium text-[#2d2d2d]">Pending Items</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-bold text-[#2d2d2d]">
              {String(pendingCount).padStart(2, "0")}
            </span>
            <span className="mb-0.5 text-sm text-[#6c6c6c]">Requires Attention</span>
          </div>
        </Card>

        <Card className="flex h-[125px] flex-col justify-center px-5 shadow-sm">
          <p className="text-base font-medium text-[#2d2d2d]">Approved Today</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-bold text-[#4bb05d]">
              {String(approvedCount + 12).padStart(2, "0")}
            </span>
            <span className="mb-0.5 text-sm text-[#6c6c6c]">+4 from yesterday</span>
          </div>
        </Card>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Sidebar */}
        <Card title="Pending for approval" className="w-full lg:w-[328px] shrink-0">
          <div className="flex flex-col gap-2 py-2">
            {items.map((item) => (
              <QueueItem
                key={item.id}
                item={item}
                active={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
                indicatorColor="#8baa87"
              />
            ))}
          </div>
        </Card>

        {/* Detail */}
        {detail && (
          <div className="flex-1 flex flex-col gap-4 w-full">
            <Card className="p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-[24px] sm:text-[32px] font-semibold leading-tight sm:leading-10 tracking-[-0.9px] text-[#2e3333]">
                  {detail.title}
                </h2>

                <div className="flex items-center gap-1">
                  <ClockIcon className="h-3 w-3 text-[#6c6c6c]" />
                  <span className="text-xs text-[#6c6c6c]">{detail.duration}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {detail.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2 py-0.5 text-[10px] uppercase text-[#2b2b2b] bg-[#8BAA87]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-5">{detail.visual}</Card>

            <Card title="Description" className="p-5">
              <p className="text-base font-medium leading-[26px] text-[#2e3333]">
                {detail.description}
              </p>
            </Card>

            <Card title="Completeness Check" className="p-5">
              <div className="flex flex-col gap-2">
                {detail.completeness.map(({ label, ok }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-base font-medium leading-[26px] text-[#2e3333]">
                      {label}
                    </span>
                    {ok ? (
                      <CheckCircleIcon className="h-5 w-5 text-[#4bb05d]" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-[#ff1212]" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleApprove}
                  className="flex h-12 w-full items-center justify-center gap-2.5 rounded-[8px] bg-[#8baa87] text-base font-semibold text-white transition hover:bg-[#7a9a76]"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  Approve
                </button>

                <button className="flex h-12 w-full items-center justify-center gap-2.5 rounded-[8px] border border-[#6c6c6c] text-base font-bold text-[#6c6c6c] transition hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
