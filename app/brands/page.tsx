import { getBrands } from "@/src/lib/contentful/brands";
import { getCameras } from "@/src/lib/contentful/cameras";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import InfoCard from "@/components/ui/InfoCard";
import Image from "next/image";

export const revalidate = 60;

export default async function BrandsPage() {
  const [brands, cameras] = await Promise.all([
    getBrands(),
    getCameras(),
  ]);

  return (
    <main className="min-h-screen bg-[#040607] py-16 text-[#f3eadf]">
      <Container>
        <SectionHeader
          eyebrow="Producenci"
          title="Marki"
          description="Poznaj producentów aparatów i przejdź do ich modeli."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => {
            const count = cameras.filter(
              (c) => c.brand.slug === brand.slug
            ).length;

            return (
              <InfoCard key={brand.id} href={`/brands/${brand.slug}`}>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#f3eadf]">
                      {brand.name}
                    </h2>

                    <p className="mt-2 text-sm text-[#9e968c]">
                      {brand.country ?? "Brak kraju"} •{" "}
                      {brand.foundedYear ?? "Brak roku"}
                    </p>
                  </div>

                  {brand.logoUrl && (
                    <Image
                      src={brand.logoUrl}
                      alt={brand.name}
                      width={64}
                      height={64}
                      className="h-14 w-14 rounded-xl object-contain"
                    />
                  )}
                </div>

                <p className="mt-4 line-clamp-3 text-sm text-[#b9b0a5]">
                  {brand.description ?? "Brak opisu marki."}
                </p>

                <div className="mt-5 border-t border-[#1d1a16] pt-4 text-sm text-[#d2b08b]">
                  Modele: {count}
                </div>
              </InfoCard>
            );
          })}
        </div>
      </Container>
    </main>
  );
}