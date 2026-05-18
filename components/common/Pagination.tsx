"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemLabel = "items",
}: PaginationProps) {
  const from = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const btnBase =
    "flex h-[40px] w-[40px] items-center justify-center rounded-[4px] text-[14px] font-normal transition-colors";
  const btnInactive =
    "border border-[rgba(195,200,189,0.4)] text-[#78716C] hover:border-sageGreen hover:text-sageGreen cursor-pointer";
  const btnActive = "bg-sageGreen text-white cursor-default";
  const btnDisabled = "border border-[rgba(195,200,189,0.2)] text-[#C8C4BF] cursor-not-allowed";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[12px] text-[#78716C] font-normal">
        Showing {from} to {to} of {totalItems} {itemLabel}
      </p>

      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnInactive}`}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-[14px] w-[14px] stroke-[2]" />
        </button>

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${btnBase} ${page === currentPage ? btnActive : btnInactive}`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnInactive}`}
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-[14px] w-[14px] stroke-[2]" />
        </button>
      </div>
    </div>
  );
}
