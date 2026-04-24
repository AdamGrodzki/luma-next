"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    return page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the start
        pages.push(2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-3 sm:px-4 py-2 rounded-lg border border-[var(--border-light)] bg-[var(--bg-darker)] text-[var(--text-secondary)] hover:bg-[var(--bg-dark)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)] transition-all text-sm font-medium"
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">Poprzednia</span>
          <span className="sm:hidden">←</span>
        </Link>
      ) : (
        <button
          disabled
          className="px-3 sm:px-4 py-2 rounded-lg border border-[var(--border-light)] bg-[var(--bg-darker)] text-[var(--text-muted)] cursor-not-allowed text-sm font-medium opacity-50"
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">Poprzednia</span>
          <span className="sm:hidden">←</span>
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-2 text-[var(--text-muted)] text-sm"
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
              href={getPageUrl(pageNumber)}
              className={`
                min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-all text-center
                ${
                  isActive
                    ? "bg-[var(--accent-primary)] text-white border-2 border-[var(--accent-primary)]"
                    : "border border-[var(--border-light)] bg-[var(--bg-darker)] text-[var(--text-secondary)] hover:bg-[var(--bg-dark)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)]"
                }
              `}
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
          href={getPageUrl(currentPage + 1)}
          className="px-3 sm:px-4 py-2 rounded-lg border border-[var(--border-light)] bg-[var(--bg-darker)] text-[var(--text-secondary)] hover:bg-[var(--bg-dark)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)] transition-all text-sm font-medium"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Następna</span>
          <span className="sm:hidden">→</span>
        </Link>
      ) : (
        <button
          disabled
          className="px-3 sm:px-4 py-2 rounded-lg border border-[var(--border-light)] bg-[var(--bg-darker)] text-[var(--text-muted)] cursor-not-allowed text-sm font-medium opacity-50"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Następna</span>
          <span className="sm:hidden">→</span>
        </button>
      )}
    </nav>
  );
}
