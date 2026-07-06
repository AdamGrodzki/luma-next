/**
 * Tailwind class constants for UI components
 */

export const CAMERA_CARD_CLASSES = {
  CONTAINER: 'overflow-hidden rounded-lg sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] transition hover:border-[var(--accent-primary)]',
  IMAGE_CONTAINER: 'aspect-[4/3] bg-[var(--bg-darker)]',
  IMAGE: 'h-full w-full object-cover',
  PLACEHOLDER_TEXT: 'flex h-full items-center justify-center text-xs uppercase tracking-[0.16em] text-[#7d756b]',
  CONTENT: 'p-3 sm:p-4 bg-[var(--special-brand-bg)]',
  BRAND_NAME: 'text-xs uppercase tracking-[0.16em] text-[var(--text-muted)] mb-1',
  TYPE_BADGE: 'rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] transition-colors text-[var(--accent-primary)]',
  TITLE: 'mt-1.5 sm:mt-2 text-base sm:text-lg font-semibold text-[var(--text-primary)] line-clamp-2',
  FOOTER: 'mt-2 sm:mt-3 flex items-center justify-between text-xs sm:text-sm text-[var(--text-secondary)]',
} as const;

export const PAGINATION_BUTTON_BASE = 'min-h-[44px] flex items-center justify-center px-4 sm:px-5 py-3 rounded-lg border border-[var(--border-light)] text-sm font-medium transition-all';

export const PAGINATION_BUTTON_ACTIVE = 'bg-[var(--accent-primary)] text-white border-2 border-[var(--accent-primary)]';

export const PAGINATION_BUTTON_INACTIVE = 'bg-[var(--bg-darker)] text-[var(--text-secondary)] hover:bg-[var(--bg-dark)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)]';

export const PAGINATION_BUTTON_DISABLED = 'bg-[var(--bg-darker)] text-[var(--text-muted)] cursor-not-allowed opacity-50';

export const PAGINATION_PAGE_BUTTON_BASE = 'min-w-[44px] min-h-[44px] flex items-center justify-center px-3 py-3 rounded-lg text-sm font-medium transition-all';
