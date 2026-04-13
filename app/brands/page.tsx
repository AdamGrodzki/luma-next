import { getBrands } from "@/src/lib/contentful/brands";
import { getCameras } from "@/src/lib/contentful/cameras";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import InfoCard from "@/components/ui/InfoCard";

export const revalidate = 60;

export default async function BrandsPage() {
  const [brands, cameras] = await Promise.all([
    getBrands(),
    getCameras(),
  ]);

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] py-8 sm:py-12 md:py-16 text-[var(--text-primary)]">
      <Container>
        <SectionHeader
          eyebrow="Katalog"
          title="Marki"
          description="Przeglądaj dostępne marki aparatów fotograficznych."
        />

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => {
            const brandCameras = cameras.filter(
              (camera) => camera.brand.slug === brand.slug
            );

            return (
              <InfoCard key={brand.id} href={`/brands/${brand.slug}`}>
                {/* BRAND NAME */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                  {brand.name}
                </h2>

                {/* DESCRIPTION */}
                {brand.description && (
                  <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2">
                    {brand.description}
                  </p>
                )}

                {/* INFO */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {brand.country && (
                    <span className="inline-block rounded-full bg-[var(--special-badge-bg)] px-3 py-1 text-xs text-[var(--text-muted)]">
                      {brand.country}
                    </span>
                  )}
                  {brand.foundedYear && (
                    <span className="inline-block rounded-full bg-[#1a1511] px-3 py-1 text-xs text-[#8e867d]">
                      {brand.foundedYear}
                    </span>
                  )}
                  <span className="inline-block rounded-full bg-[#1a1511] px-3 py-1 text-xs text-[#8e867d]">
                    {brandCameras.length} modeli
                  </span>
                </div>
              </InfoCard>
            );
          })}
        </div>
      </Container>
    </main>
  );
}