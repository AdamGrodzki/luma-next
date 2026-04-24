"use client";

import { useEffect, useMemo, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

type Props = {
  items: NavItem[];
};

export function CameraStickyNav({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const visibleItems = useMemo(() => items.filter((item) => item.id), [items]);

  useEffect(() => {
    if (!visibleItems.length) return;

    const observers: IntersectionObserver[] = [];

    visibleItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntry = entries.find((entry) => entry.isIntersecting);
          if (visibleEntry) {
            setActiveId(item.id);
          }
        },
        {
          root: null,
          rootMargin: "-30% 0px -55% 0px",
          threshold: 0.01,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [visibleItems]);

  function handleScrollTo(id: string) {
    const element = document.getElementById(id);
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.scrollY - 88;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }

  if (!visibleItems.length) return null;

  return (
    <div className="sticky top-16 z-30 md:top-3">
      <div className="backdrop-blur-md bg-[var(--bg-dark)]/80 no-scrollbar overflow-x-auto rounded-xl sm:rounded-2xl border border-[var(--border-light)] px-2 py-2 sm:px-3 sm:py-2.5 shadow-lg">
        <div className="flex min-w-max items-center gap-1.5 sm:gap-2">
          {visibleItems.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollTo(item.id)}
                className={`whitespace-nowrap rounded-lg sm:rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] transition-all duration-300 ${
                  isActive
                  ? "border-2 border-[var(--accent-primary)] bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] shadow-md"
                  : "border border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50 hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}