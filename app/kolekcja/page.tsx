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

const sensorFilters = [
  "Średni Format",
  "Pełna Klatka",
  "APS-H",
  "APS-C",
  '1"',
  "Inne",
];

const typeFilters = [
  "Bezlusterkowiec",
  "Bridge",
  "Dalmierz",
  "Kamera Filmowa",
  "Kompakt",
  "Lustrzanka",
  "Średni Format",
];

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

  const { brands, activeBrand, sensorGroups, totalCount } =
    await getCollectionData({
      activeBrandSlug,
      sensor: activeSensor,
      type: activeType,
      q: activeQuery,
      yearFrom,
      yearTo,
      sort
    });

  if (!activeBrand) {
    return (
      <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)]">
        <div className="mx-auto max-w-[1500px] px-6 py-10">
          <div className="rounded-[22px] border border-[var(--border-light)] bg-[var(--bg-darker)] p-8">
            <h1 className="text-3xl font-semibold">Brak danych</h1>
            <p className="mt-4 text-[var(--text-secondary)]">
              Nie znaleziono aktywnej marki w Contentful.
            </p>
          </div>
        </div>
      </main>
    );
  }

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

  console.log("RAW searchParams", params);

  console.log("PAGE parsed", {
    brand: params.brand,
    sensor: params.sensor,
    type: params.type,
    q: params.q,
    yearFrom: params.yearFrom,
    yearTo: params.yearTo,
    sort: params.sort,
  });

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-4 sm:py-5">
        <CollectionMobileDrawers
          brands={brands}
          activeBrandName={activeBrand.name}
          totalCount={totalCount}
          sensorFilters={sensorFilters}
          typeFilters={typeFilters}
          activeBrandSlug={activeBrand.slug}
          activeSensor={activeSensor}
          activeType={activeType}
          activeQuery={activeQuery}
          activeYearFrom={yearFrom}
          activeYearTo={yearTo}
          activeSort={sort}
        />

        <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-6 xl:grid-cols-[230px_minmax(0,1fr)_300px]">
          <div className="hidden xl:block">
            <BrandSidebar
              brands={brands}
              activeBrandSlug={activeBrand.slug}
              activeSensor={activeSensor}
              activeType={activeType}
              activeQuery={activeQuery}
              activeYearFrom={yearFrom}
              activeYearTo={yearTo}
              activeSort={sort}
            />
          </div>

          <section className="rounded-lg sm:rounded-[22px] border border-[var(--border-light)] bg-[var(--bg-darker)] px-4 sm:px-6 md:px-8 py-5 sm:py-6 xl:px-10 xl:py-7 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
            <CollectionHeader
              brandName={activeBrand.name}
              totalCount={totalCount}
              brandSlug={activeBrand.slug}
              logoUrl={activeBrand.logoUrl}
            />

            <div className="mt-6 flex flex-wrap gap-2">
              {activeQuery && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  Szukaj: {activeQuery}
                </span>
              )}
              {activeSensor && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  Sensor: {activeSensor}
                </span>
              )}
              {activeType && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  Typ: {activeType}
                </span>
              )}
              {typeof yearFrom === "number" && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  Od: {yearFrom}
                </span>
              )}
              {typeof yearTo === "number" && (
                <span className="rounded-full border border-[var(--accent-primary)]/50 px-3 py-1 text-xs text-[var(--text-muted)]">
                  Do: {yearTo}
                </span>
              )}
            </div>

            <div className="mb-8 flex flex-col gap-4 rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Sortowanie
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={buildQueryString({
                      brand: activeBrand.slug,
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
                    Najnowsze
                  </Link>

                  <Link
                    href={buildQueryString({
                      brand: activeBrand.slug,
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
                    Najstarsze
                  </Link>

                  <Link
                    href={buildQueryString({
                      brand: activeBrand.slug,
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
                      brand: activeBrand.slug,
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
                Wyników: <span className="text-[var(--text-primary)]">{totalCount}</span>
              </div>
            </div>


            <div className="mt-8 space-y-8">
              {sensorGroups.length > 0 ? (
                sensorGroups.map((group) => (
                  <SensorGroup key={group.name} group={group} />
                ))
              ) : (
                  <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-darker)] p-6 text-[var(--text-secondary)]">
                    Brak aparatów dla wybranych filtrów.
                </div>
              )}
            </div>
          </section>

          <div className="hidden xl:block">
            <FilterSidebar
              sensorFilters={sensorFilters}
              typeFilters={typeFilters}
              activeBrandSlug={activeBrand.slug}
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
    </main>
  );
}