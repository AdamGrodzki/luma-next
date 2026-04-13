import Link from "next/link";
import type { CollectionBrand } from "./types";

type Props = {
  brands: CollectionBrand[];
  activeBrandSlug?: string;
  activeSensor?: string;
  activeType?: string;
  activeQuery?: string;
  activeYearFrom?: number;
  activeYearTo?: number;
  activeSort?: string;
};

function buildBrandUrl({
  brand,
  sensor,
  type,
  q,
  yearFrom,
  yearTo,
  sort,
}: {
  brand: string;
  sensor?: string;
  type?: string;
  q?: string;
  yearFrom?: number;
  yearTo?: number;
    sort?: string;
}) {
  const params = new URLSearchParams();

  params.set("brand", brand);
  if (sensor) params.set("sensor", sensor);
  if (type) params.set("type", type);
  if (q) params.set("q", q);
  if (typeof yearFrom === "number") params.set("yearFrom", String(yearFrom));
  if (typeof yearTo === "number") params.set("yearTo", String(yearTo));
  if (sort) params.set("sort", sort);

  return `/kolekcja?${params.toString()}`;
}

export default function BrandSidebar({
  brands,
  activeBrandSlug,
  activeSensor,
  activeType,
  activeQuery,
  activeYearFrom,
  activeYearTo,
  activeSort,
}: Props) {
  return (
    <aside className="rounded-[22px] border border-[var(--border-light)] bg-[var(--bg-card)] p-4 shadow-[0_0_0_1px_rgba(218,180,134,0.05)]">
      <div className="mb-3">
        <h2 className="text-lg font-semibold uppercase tracking-[0.12em] text-[var(--accent-secondary)]">
          Marki sprzętowe
        </h2>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          Wybierz producenta
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 right-4 top-0 z-10 h-6 rounded-t-[18px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-4 z-10 h-6 rounded-b-[18px]" />

        <div
          className="
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
          <div className="space-y-3 py-1 pr-3">
            {brands.map((brand) => {
              const isActive = brand.slug === activeBrandSlug;

              return (
                <Link
                  key={brand.slug}
                  href={buildBrandUrl({
                    brand: brand.slug,
                    sensor: activeSensor,
                    type: activeType,
                    q: activeQuery,
                    yearFrom: activeYearFrom,
                    yearTo: activeYearTo,
                    sort: activeSort,
                  })}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition-all duration-200 ${isActive
                    ? "border-[var(--accent-primary)] bg-[var(--special-brand-bg)] shadow-[inset_0_0_0_1px_rgba(220,194,162,0.18),0_0_18px_rgba(181,140,99,0.08)]"
                    : "border-[var(--border-default)] bg-[var(--bg-darker)] hover:border-[var(--border-light)] hover:bg-[var(--bg-card)]"
                    }`}
                >
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${isActive
                      ? "text-[var(--accent-primary)]"
                      : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                      }`}
                  >
                    {brand.name}
                  </span>

                  <span
                    className={`min-w-[28px] rounded-md px-2 py-1 text-center text-xs font-medium transition-colors ${isActive
                      ? "bg-[var(--accent-primary)] text-[var(--special-brand-bg)]"
                      : "bg-[var(--bg-darker)] text-[var(--text-muted)] group-hover:bg-[var(--bg-card)] group-hover:text-[var(--text-primary)]"
                      }`}
                  >
                    {brand.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}