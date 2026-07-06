/**
 * Pagination calculation utilities
 */

const PAGE_DISPLAY_THRESHOLD = 7;
const VISIBLE_PAGES_NEAR_START = 3;
const VISIBLE_PAGES_NEAR_END = 2;

export function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = [];
  const showEllipsis = totalPages > PAGE_DISPLAY_THRESHOLD;

  if (!showEllipsis) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage <= VISIBLE_PAGES_NEAR_START) {
      pages.push(2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - VISIBLE_PAGES_NEAR_END) {
      pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return pages;
}

export function getPageUrl(page: number, baseUrl: string): string {
  return page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
}
