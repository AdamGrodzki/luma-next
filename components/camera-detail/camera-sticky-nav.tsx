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
    <div className="sticky top-2 z-40 sm:top-3">
      <div className="no-scrollbar overflow-x-auto rounded-2xl border border-[var(--border-light)] px-2 py-2">
        <div className="flex min-w-max items-center gap-2">
          {visibleItems.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollTo(item.id)}
                className={`rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition duration-300 sm:px-4 sm:text-xs ${
                  isActive
                  ? "border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-dark)] shadow-[0_0_24px_rgba(199,155,99,0.2)]"
                  : "border border-transparent text-[var(--text-secondary)] hover:border-[var(--border-default)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
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