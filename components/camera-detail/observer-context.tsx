"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

type ObserverCallback = (isIntersecting: boolean) => void;

interface ObserverContextValue {
  observe: (element: Element, callback: ObserverCallback, once?: boolean) => void;
  unobserve: (element: Element) => void;
}

const ObserverContext = createContext<ObserverContextValue | null>(null);

/**
 * Shared IntersectionObserver provider - uses single observer for all elements
 */
export function ObserverProvider({ children }: { children: React.ReactNode }) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbacksRef = useRef<Map<Element, { callback: ObserverCallback; once: boolean }>>(
    new Map()
  );

  useEffect(() => {
    // Create single observer instance
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const data = callbacksRef.current.get(entry.target);
          if (!data) return;

          const { callback, once } = data;

          if (entry.isIntersecting) {
            callback(true);
            if (once) {
              observerRef.current?.unobserve(entry.target);
              callbacksRef.current.delete(entry.target);
            }
          } else if (!once) {
            callback(false);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    return () => {
      observerRef.current?.disconnect();
      callbacksRef.current.clear();
    };
  }, []);

  const observe = (element: Element, callback: ObserverCallback, once = true) => {
    if (!observerRef.current) return;

    callbacksRef.current.set(element, { callback, once });
    observerRef.current.observe(element);
  };

  const unobserve = (element: Element) => {
    if (!observerRef.current) return;

    observerRef.current.unobserve(element);
    callbacksRef.current.delete(element);
  };

  return (
    <ObserverContext.Provider value={{ observe, unobserve }}>
      {children}
    </ObserverContext.Provider>
  );
}

/**
 * Hook to use shared IntersectionObserver
 */
export function useSharedObserver() {
  const context = useContext(ObserverContext);
  if (!context) {
    throw new Error("useSharedObserver must be used within ObserverProvider");
  }
  return context;
}
