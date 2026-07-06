"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getPageNumbers, getPageUrl } from "@/src/utils/pagination";
import {
  PAGINATION_BUTTON_BASE,
  PAGINATION_BUTTON_ACTIVE,
  PAGINATION_BUTTON_INACTIVE,
  PAGINATION_BUTTON_DISABLED,
  PAGINATION_PAGE_BUTTON_BASE,
} from "@/src/utils/tailwind-classes";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-20" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1, baseUrl)}
          className={`${PAGINATION_BUTTON_BASE} ${PAGINATION_BUTTON_INACTIVE}`}
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden"><ArrowLeft /></span>
        </Link>
      ) : (
        <button
          disabled
          className={`${PAGINATION_BUTTON_BASE} ${PAGINATION_BUTTON_DISABLED}`}
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden"><ArrowLeft /></span>
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {getPageNumbers(currentPage, totalPages).map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-3 text-[var(--text-muted)] text-sm"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <Link
              key={pageNumber}
              href={getPageUrl(pageNumber, baseUrl)}
              className={`${PAGINATION_PAGE_BUTTON_BASE} ${
                isActive ? PAGINATION_BUTTON_ACTIVE : PAGINATION_BUTTON_INACTIVE
              }`}
              aria-label={`Page ${pageNumber}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1, baseUrl)}
          className={`${PAGINATION_BUTTON_BASE} ${PAGINATION_BUTTON_INACTIVE}`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden"><ArrowRight /></span>
        </Link>
      ) : (
        <button
          disabled
          className={`${PAGINATION_BUTTON_BASE} ${PAGINATION_BUTTON_DISABLED}`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden"><ArrowRight /></span>
        </button>
      )}
    </nav>
  );
}
