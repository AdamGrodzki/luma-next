'use client';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] transition-all"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <span
        className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
          isOpen
            ? 'translate-y-[7px] rotate-45 bg-[var(--text-primary)]'
            : 'bg-[var(--text-muted)]'
        }`}
      />
      <span
        className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
          isOpen ? 'opacity-0' : 'bg-[var(--text-muted)]'
        }`}
      />
      <span
        className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
          isOpen
            ? '-translate-y-[7px] -rotate-45 bg-[var(--text-primary)]'
            : 'bg-[var(--text-muted)]'
        }`}
      />
    </button>
  );
}
