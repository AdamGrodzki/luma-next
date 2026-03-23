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
          rootMargin: "-35% 0px -50% 0px",
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

    const y = element.getBoundingClientRect().top + window.scrollY - 110;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }

  if (!visibleItems.length) return null;

  return (
    <div className="sticky top-3 z-40">
      <div className="overflow-x-auto rounded-full border border-[#2a2119] bg-[rgba(10,10,10,0.82)] px-2 py-2 backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(10,10,10,0.72)]">
        <div className="flex min-w-max items-center gap-2">
          {visibleItems.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollTo(item.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition duration-300 ${
                  isActive
                    ? "border border-[#c79b63] bg-[#c79b63] text-black shadow-[0_0_24px_rgba(199,155,99,0.2)]"
                    : "border border-transparent text-[#b8aa9b] hover:border-[#3a2d21] hover:bg-[#121212] hover:text-[#f6efe7]"
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