"use client";

import { useEffect, useRef, useState } from "react";
import { useSharedObserver } from "./observer-context";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
};

export function RevealOnScroll({
  children,
  delay = 0,
  y = 24,
  once = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { observe, unobserve } = useSharedObserver();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    observe(
      element,
      (isIntersecting) => {
        setIsVisible(isIntersecting);
      },
      once
    );

    return () => {
      unobserve(element);
    };
  }, [observe, unobserve, once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}