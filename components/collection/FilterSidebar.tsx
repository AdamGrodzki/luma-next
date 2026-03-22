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
  return query ? `/kolekcja?${query}` : "/kolekcja";
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
    <aside className="rounded-[22px] border border-[#0e242c] bg-[linear-gradient(180deg,#041018_0%,#06111a_100%)] p-5 shadow-[0_0_0_1px_rgba(218,180,134,0.05)]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-[#f6eee6]">
          Filtrowanie
        </h2>

        <Link
          href={buildCollectionUrl({
            brand: activeBrandSlug,
            sort: activeSort,
          })}
          className="text-xs uppercase tracking-[0.14em] text-[#c99f6a] hover:text-white"
        >
          Reset
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="rounded-xl border border-[#6b573f] px-4 py-3">
          <input
            type="text"
            name="q"
            defaultValue={activeQuery ?? ""}
            placeholder="Szukaj aparatu..."
            className="w-full bg-transparent text-sm text-[#f3eadf] outline-none placeholder:text-[#6f6a63]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="yearFrom"
            defaultValue={activeYearFrom ?? ""}
            placeholder="Od roku"
            className="rounded-xl border border-[#6b573f] bg-transparent px-4 py-3 text-sm text-[#f3eadf] outline-none placeholder:text-[#6f6a63]"
          />
          <input
            type="number"
            name="yearTo"
            defaultValue={activeYearTo ?? ""}
            placeholder="Do roku"
            className="rounded-xl border border-[#6b573f] bg-transparent px-4 py-3 text-sm text-[#f3eadf] outline-none placeholder:text-[#6f6a63]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl border border-[#8e6a47] px-4 py-3 text-sm uppercase tracking-[0.14em] text-[#f3eadf] transition hover:bg-[#141210]"
        >
          Zastosuj
        </button>
      </form>

      <div className="mt-8 border-t border-[#102730] pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f3e9df]">
          • Wielkość matrycy
        </h3>

        <div className="mt-5 space-y-3">
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
                    ? "bg-[#141210] text-[#f3eadf]"
                    : "text-[#d8d0c7] hover:bg-[#0d1419]"
                  }`}
              >
                <span
                  className={`h-4 w-4 rounded-[3px] border ${isActive
                      ? "border-[#c99f6a] bg-[#c99f6a]"
                      : "border-[#7c8d98] bg-transparent"
                    }`}
                />
                {item}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-8 border-t border-[#102730] pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f3e9df]">
          • Rodzaj sprzętu
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
                    ? "bg-[#141210] text-[#f3eadf]"
                    : "text-[#d8d0c7] hover:bg-[#0d1419]"
                  }`}
              >
                <span
                  className={`h-4 w-4 rounded-[3px] border ${isActive
                      ? "border-[#c99f6a] bg-[#c99f6a]"
                      : "border-[#7c8d98] bg-transparent"
                    }`}
                />
                {item}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}