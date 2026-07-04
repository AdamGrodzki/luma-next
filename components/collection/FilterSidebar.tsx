"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

type Props = {
  sensorFilters: string[];
  typeFilters: string[];
  activeBrandSlug?: string;
  activeSensor?: string;
  activeType?: string;
  activeQuery?: string;
  activeYearFrom?: number;
  activeYearTo?: number;
  activeSort?: string;
};

function buildCollectionUrl({
  brand,
  sensor,
  type,
  q,
  yearFrom,
  yearTo,
  sort,
}: {
  brand?: string;
  sensor?: string;
  type?: string;
  q?: string;
  yearFrom?: number;
  yearTo?: number;
    sort?: string;
}) {
  const params = new URLSearchParams();

  if (brand) params.set("brand", brand);
  if (sensor) params.set("sensor", sensor);
  if (type) params.set("type", type);
  if (q && q.trim()) params.set("q", q.trim());
  if (typeof yearFrom === "number") params.set("yearFrom", String(yearFrom));
  if (typeof yearTo === "number") params.set("yearTo", String(yearTo));
  if (sort) params.set("sort", sort);

  const query = params.toString();
  return query ? `/collection?${query}` : "/collection";
}

export default function FilterSidebar({
  sensorFilters,
  typeFilters,
  activeBrandSlug,
  activeSensor,
  activeType,
  activeQuery,
  activeYearFrom,
  activeYearTo,
  activeSort,
}: Props) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const qRaw = formData.get("q");
    const yearFromRaw = formData.get("yearFrom");
    const yearToRaw = formData.get("yearTo");

    const q =
      typeof qRaw === "string" && qRaw.trim() ? qRaw.trim() : undefined;

    const yearFrom =
      typeof yearFromRaw === "string" && yearFromRaw.trim()
        ? Number(yearFromRaw)
        : undefined;

    const yearTo =
      typeof yearToRaw === "string" && yearToRaw.trim()
        ? Number(yearToRaw)
        : undefined;

    router.push(
      buildCollectionUrl({
        brand: activeBrandSlug,
        sensor: activeSensor,
        type: activeType,
        q,
        yearFrom: Number.isNaN(yearFrom) ? undefined : yearFrom,
        yearTo: Number.isNaN(yearTo) ? undefined : yearTo,
        sort: activeSort,
      })
    );
  }

  return (
    <aside className="rounded-[22px] border border-[var(--border-light)] bg-[var(--bg-card)] p-5 shadow-[0_0_0_1px_rgba(218,180,134,0.05)]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">
          Filtering
        </h2>

        <Link
          href={buildCollectionUrl({
            brand: activeBrandSlug,
            sort: activeSort,
          })}
          className="text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)] hover:text-[var(--accent-hover)]"
        >
          Reset
        </Link>
      </div>

      <div
        className="
          mt-4
          h-[min(68vh,720px)]
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
          [scrollbar-gutter:stable]
          [scrollbar-width:thin]
          [scrollbar-color:#7e6244_transparent]
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#7e6244]
          hover:[&::-webkit-scrollbar-thumb]:bg-[#a88359]
        "
      >
        <form onSubmit={handleSubmit} className="mt-2 space-y-4 pr-2">
        <div className="rounded-xl border border-[var(--accent-primary)] px-4 py-3">
          <input
            type="text"
            name="q"
            defaultValue={activeQuery ?? ""}
            placeholder="Search for a camera..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="yearFrom"
            defaultValue={activeYearFrom ?? ""}
            placeholder="From"
            className="rounded-xl border border-[var(--accent-primary)] bg-transparent px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
          <input
            type="number"
            name="yearTo"
            defaultValue={activeYearTo ?? ""}
            placeholder="To"
            className="rounded-xl border border-[var(--accent-primary)] bg-transparent px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl border border-[var(--accent-primary)] px-4 py-3 text-sm uppercase tracking-[0.14em] text-[var(--text-primary)] transition hover:bg-[var(--border-default)]"
        >
          Apply
        </button>
      </form>

        <div className="mt-8 border-t border-[var(--border-light)] pt-8 pr-2">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)]">
          • Sensor Size
        </h3>

        <div className="mt-5 space-y-3 uppercase">
          {sensorFilters.map((item) => {
            const isActive = activeSensor === item;

            return (
              <Link
                key={item}
                href={buildCollectionUrl({
                  brand: activeBrandSlug,
                  sensor: isActive ? undefined : item,
                  type: activeType,
                  q: activeQuery,
                  yearFrom: activeYearFrom,
                  yearTo: activeYearTo,
                  sort: activeSort,
                })}
                className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition ${isActive
                  ? "bg-[var(--special-brand-bg)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-darker)]"
                  }`}
              >
                <span
                  className={`h-4 w-4 rounded-[3px] border ${isActive
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]"
                    : "border-[var(--border-default)] bg-transparent"
                    }`}
                />
                {item}
              </Link>
            );
          })}
        </div>
      </div>

        <div className="mt-8 border-t border-[var(--border-default)] pt-8 pr-2">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)]">
          • Body Type
        </h3>

        <div className="mt-5 space-y-3">
          {typeFilters.map((item) => {
            const isActive = activeType === item;

            return (
              <Link
                key={item}
                href={buildCollectionUrl({
                  brand: activeBrandSlug,
                  sensor: activeSensor,
                  type: isActive ? undefined : item,
                  q: activeQuery,
                  yearFrom: activeYearFrom,
                  yearTo: activeYearTo,
                  sort: activeSort,
                })}
                className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition ${isActive
                  ? "bg-[var(--special-brand-bg)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-darker)]"
                  }`}
              >
                <span
                  className={`h-4 w-4 rounded-[3px] border ${isActive
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]"
                    : "border-[var(--border-default)] bg-transparent"
                    }`}
                />
                {item}
              </Link>
            );
          })}
        </div>
      </div>
      </div>
    </aside>
  );
}