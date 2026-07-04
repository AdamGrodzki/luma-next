import BrandSidebar from "../../components/collection/BrandSidebar";
import CollectionHeader from "../../components/collection/CollectionHeader";
import FilterSidebar from "../../components/collection/FilterSidebar";
import SensorGroup from "../../components/collection/SensorGroup";
import CollectionMobileDrawers from "../../components/collection/CollectionMobileDrawers";

import { getCollectionData } from "@/src/lib/contentful/collection";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    brand?: string;
    sensor?: string;
    type?: string;
    q?: string;
    yearFrom?: string;
    yearTo?: string;
    sort?: string;
    activeSort?: string;
  }>;
};

export const revalidate = 60;

export default async function CollectionPage({ searchParams }: Props) {
  const params = await searchParams;
  const sort =
    typeof params.sort === "string" ? params.sort : undefined;

  const activeBrandSlug = params.brand;
  const activeSensor = params.sensor;
  const activeType = params.type;
  const activeQuery = params.q?.trim() || undefined;

  const yearFrom =
    params.yearFrom && !Number.isNaN(Number(params.yearFrom))
      ? Number(params.yearFrom)
      : undefined;

  const yearTo =
    params.yearTo && !Number.isNaN(Number(params.yearTo))
      ? Number(params.yearTo)
      : undefined;

  const { brands, activeBrand, sensorGroups, totalCount, isGlobalView, bodyTypeFilters, sensorTypeFilters } =
    await getCollectionData({
      activeBrandSlug,
      sensor: activeSensor,
      type: activeType,
      q: activeQuery,
      yearFrom,
      yearTo,
      sort
    });

  const displayBrandName = isGlobalView ? "All Brands" : activeBrand?.name || "Unknown Brand";
  const displayBrandSlug = isGlobalView ? "all" : activeBrand?.slug || undefined;
  const displayLogoUrl = isGlobalView ? null : activeBrand?.logoUrl;

  function buildQueryString(
    params: Record<string, string | number | undefined>
  ) {
    const search = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        search.set(key, String(value));
      }
    }

    const query = search.toString();
    return query ? `?${query}` : "";
  }

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)]">
      <div className="mx-auto w-full max-w-[1800px] px-3 sm:px-4 lg:px-5 py-4 sm:py-5">
        <CollectionMobileDrawers
          brands={brands}
          activeBrandName={displayBrandName}
          totalCount={totalCount}
          sensorFilters={sensorTypeFilters}
          typeFilters={bodyTypeFilters}
          activeBrandSlug={displayBrandSlug}
          activeSensor={activeSensor}
          activeType={activeType}
          activeQuery={activeQuery}
          activeYearFrom={yearFrom}
          activeYearTo={yearTo}
          activeSort={sort}
        />

        <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-6 xl:grid-cols-[230px_minmax(0,1fr)_300px]">
          <div className="hidden xl:block">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#7e6244_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#7e6244] hover:[&::-webkit-scrollbar-thumb]:bg-[#a88359]">
              <BrandSidebar
                brands={brands}
                activeBrandSlug={displayBrandSlug}
                activeSensor={activeSensor}
                activeType={activeType}
                activeQuery={activeQuery}
                activeYearFrom={yearFrom}
                activeYearTo={yearTo}
                activeSort={sort}
              />
            </div>
          </div>

          <section className="rounded-lg sm:rounded-[22px] border border-[var(--border-light)] bg-[var(--bg-darker)] px-4 sm:px-6 md:px-8 py-5 sm:py-6 xl:px-10 xl:py-7 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
            <CollectionHeader
              brandName={displayBrandName}
              totalCount={totalCount}
              brandSlug={displayBrandSlug}
              logoUrl={displayLogoUrl}
              isGlobalView={isGlobalView}
            />

            <div className="mt-6 flex flex-wrap gap-2">
              {activeQuery && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  Search: {activeQuery}
                </span>
              )}
              {activeSensor && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  Sensor: {activeSensor}
                </span>
              )}
              {activeType && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  Type: {activeType}
                </span>
              )}
              {typeof yearFrom === "number" && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  From: {yearFrom}
                </span>
              )}
              {typeof yearTo === "number" && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  To: {yearTo}
                </span>
              )}
            </div>

            <div className="mb-8 flex flex-col gap-4 rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Sorting
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={buildQueryString({
                      brand: displayBrandSlug,
                      sensor: activeSensor,
                      type: activeType,
                      q: activeQuery,
                      yearFrom,
                      yearTo,
                      sort: "year-desc",
                    })}
                    className={`rounded-full border px-4 py-2 text-sm transition ${sort === "year-desc" || !sort
                      ? "border-[var(--accent-primary)] text-[var(--text-primary)]"
                      : "border-[var(--border-light)] text-[var(--text-muted)]"
                      }`}
                  >
                    Newest
                  </Link>

                  <Link
                    href={buildQueryString({
                      brand: displayBrandSlug,
                      sensor: activeSensor,
                      type: activeType,
                      q: activeQuery,
                      yearFrom,
                      yearTo,
                      sort: "year-asc",
                    })}
                    className={`rounded-full border px-4 py-2 text-sm transition ${sort === "year-asc"
                      ? "border-[var(--accent-primary)] text-[var(--text-primary)]"
                      : "border-[var(--border-light)] text-[var(--text-muted)]"
                      }`}
                  >
                    Oldest
                  </Link>

                  <Link
                    href={buildQueryString({
                      brand: displayBrandSlug,
                      sensor: activeSensor,
                      type: activeType,
                      q: activeQuery,
                      yearFrom,
                      yearTo,
                      sort: "name-asc",
                    })}
                    className={`rounded-full border px-4 py-2 text-sm transition ${sort === "name-asc"
                      ? "border-[var(--accent-primary)] text-[var(--text-primary)]"
                      : "border-[var(--border-light)] text-[var(--text-muted)]"
                      }`}
                  >
                    A–Z
                  </Link>

                  <Link
                    href={buildQueryString({
                      brand: displayBrandSlug,
                      sensor: activeSensor,
                      type: activeType,
                      q: activeQuery,
                      yearFrom,
                      yearTo,
                      sort: "name-desc",
                    })}
                    className={`rounded-full border px-4 py-2 text-sm transition ${sort === "name-desc"
                      ? "border-[var(--accent-primary)] text-[var(--text-primary)]"
                      : "border-[var(--border-light)] text-[var(--text-muted)]"
                      }`}
                  >
                    Z–A
                  </Link>
                </div>
              </div>

              <div className="text-sm text-[var(--text-muted)]">
                Results: <span className="text-[var(--text-primary)]">{totalCount}</span>
              </div>
            </div>


            <div className="mt-8 space-y-8">
              {sensorGroups.length > 0 ? (
                sensorGroups.map((group) => (
                  <SensorGroup key={group.name} group={group} />
                ))
              ) : (
                  <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-darker)] p-6 text-[var(--text-secondary)]">
                    No cameras found for the selected filters.
                </div>
              )}
            </div>
          </section>

          <div className="hidden xl:block">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#7e6244_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#7e6244] hover:[&::-webkit-scrollbar-thumb]:bg-[#a88359]">
              <FilterSidebar
                sensorFilters={sensorTypeFilters}
                typeFilters={bodyTypeFilters}
                activeBrandSlug={displayBrandSlug}
                activeSensor={activeSensor}
                activeType={activeType}
                activeQuery={activeQuery}
                activeYearFrom={yearFrom}
                activeYearTo={yearTo}
                activeSort={sort}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}