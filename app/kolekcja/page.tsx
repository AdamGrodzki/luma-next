import BrandSidebar from "../../components/collection/BrandSidebar";
import CollectionHeader from "../../components/collection/CollectionHeader";
import FilterSidebar from "../../components/collection/FilterSidebar";
import SensorGroup from "../../components/collection/SensorGroup";
import { getCollectionData } from "@/lib/queries";

type Props = {
  searchParams: Promise<{
    brand?: string;
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
  const brandSlug = params.brand;

  const { brands, activeBrand, sensorGroups, totalCount } =
    await getCollectionData(brandSlug);

  if (!activeBrand) {
    return (
      <main className="min-h-screen bg-[#040607] text-[#f3eadf]">
        <div className="mx-auto max-w-[1500px] px-6 py-10">
          <div className="rounded-[22px] border border-[#1f1a14] bg-[#050607] p-8">
            <h1 className="text-3xl font-semibold">Brak danych</h1>
            <p className="mt-4 text-[#b9b0a5]">
              Nie znaleziono aktywnej marki w Contentful.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#040607] text-[#f3eadf]">
      <div className="mx-auto max-w-[1500px] px-6 py-5">
        <div className="hidden items-center justify-between rounded-2xl border border-[#182027] bg-[#071015] px-4 py-3 lg:flex xl:hidden">
          <button className="rounded-full border border-[#3b3024] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#d7c7b3]">
            Marki
          </button>
          <div className="text-sm uppercase tracking-[0.18em] text-[#bfae97]">
            {activeBrand.name} • {totalCount} modeli
          </div>
          <button className="rounded-full border border-[#3b3024] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#d7c7b3]">
            Filtry
          </button>
        </div>

        <div className="mt-5 grid gap-6 xl:grid-cols-[230px_minmax(0,1fr)_300px]">
          <div className="hidden xl:block">
            <BrandSidebar brands={brands} />
          </div>

          <section className="rounded-[22px] border border-[#1f1a14] bg-[#050607] px-6 py-6 shadow-[0_0_60px_rgba(0,0,0,0.35)] md:px-8 xl:px-10 xl:py-7">
            <CollectionHeader
              brandName={activeBrand.name}
              totalCount={totalCount}
              brandSlug={activeBrand.slug}
            />

            <div className="mt-8 space-y-8">
              {sensorGroups.length > 0 ? (
                sensorGroups.map((group) => (
                  <SensorGroup key={group.name} group={group} />
                ))
              ) : (
                <div className="rounded-2xl border border-[#1d1711] bg-[#090b0c] p-6 text-[#b9b0a5]">
                  Brak aparatów dla tej marki.
                </div>
              )}
            </div>
          </section>

          <div className="hidden xl:block">
            <FilterSidebar
              sensorFilters={sensorFilters}
              typeFilters={typeFilters}
            />
          </div>
        </div>
      </div>
    </main>
  );
}