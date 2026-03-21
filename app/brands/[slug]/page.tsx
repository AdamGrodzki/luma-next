import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import InfoCard from "@/components/ui/InfoCard";
import { getBrandBySlug, getBrands } from "@/src/lib/contentful/brands";
import { getCameras } from "@/src/lib/contentful/cameras";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) notFound();

  const cameras = await getCameras();
  const brandCameras = cameras.filter(
    (camera) => camera.brand.slug === brand.slug
  );

  return (
    <main className="min-h-screen bg-[#040607] py-16 text-[#f3eadf]">
      <Container>
        <SectionHeader
          eyebrow="Marka"
          title={brand.name}
          description={brand.description ?? "Brak opisu marki."}
        />

        {/* STATS */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoCard>
            <p className="text-sm text-[#8e867d]">Kraj</p>
            <p className="mt-2 text-xl">{brand.country ?? "Brak danych"}</p>
          </InfoCard>

          <InfoCard>
            <p className="text-sm text-[#8e867d]">Rok założenia</p>
            <p className="mt-2 text-xl">{brand.foundedYear ?? "Brak danych"}</p>
          </InfoCard>

          <InfoCard>
            <p className="text-sm text-[#8e867d]">Modele</p>
            <p className="mt-2 text-xl">{brandCameras.length}</p>
          </InfoCard>
        </div>

        {/* CAMERAS */}
        <div className="mt-14">
          <h2 className="text-3xl font-serif text-[#f3eadf]">
            Modele marki
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {brandCameras.map((camera) => (
              <InfoCard key={camera.id} href={`/cameras/${camera.slug}`}>
                <p className="text-sm uppercase tracking-[0.14em] text-[#8e867d]">
                  {camera.cameraType ?? "Camera"}
                </p>

                <h3 className="mt-2 text-2xl font-semibold">
                  {camera.name}
                </h3>

                <p className="mt-3 text-sm text-[#a69d93]">
                  {camera.releaseYear ?? "—"} • {camera.sensorFormat ?? "—"}
                </p>
              </InfoCard>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}