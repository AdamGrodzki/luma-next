import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import InfoCard from "@/components/ui/InfoCard";
import CameraCard from "@/components/collection/CameraCard";
import { getBrandBySlug, getBrands } from "@/src/lib/contentful/brands";
import { getCameras } from "@/src/lib/contentful/cameras";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const brands = await getBrands();

  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return {
      title: "Brand not found | Luma",
    };
  }

  return {
    title: `${brand.name} | Luma`,
    description:
      brand.description ??
      `Explore cameras and history of ${brand.name} in the Luma catalog.`,
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;

  const [brand, cameras] = await Promise.all([
    getBrandBySlug(slug),
    getCameras(),
  ]);

  if (!brand) notFound();

  const brandCameras = cameras.filter(
    (camera) => camera.brand.slug === brand.slug
  );

  return (
    <main className="min-h-screen bg-[#040607] py-8 sm:py-12 md:py-16 text-[#f3eadf]">
      <Container>
        {/* HEADER */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#a88a69]">
            Marka
          </p>

          <h1 className="mt-3 sm:mt-4 font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
            {brand.name}
          </h1>

          {brand.description && (
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-[#b7aea4]">
              {brand.description}
            </p>
          )}
        </div>

        {/* INFO */}
        <div className="mt-6 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {brand.country && (
            <InfoCard>
              <p className="text-xs sm:text-sm text-[#8e867d]">Kraj</p>
              <p className="mt-2 text-lg sm:text-xl">{brand.country}</p>
            </InfoCard>
          )}

          {brand.foundedYear && (
            <InfoCard>
              <p className="text-xs sm:text-sm text-[#8e867d]">Założono</p>
              <p className="mt-2 text-lg sm:text-xl">{brand.foundedYear}</p>
            </InfoCard>
          )}

          <InfoCard>
            <p className="text-xs sm:text-sm text-[#8e867d]">Modele w katalogu</p>
            <p className="mt-2 text-lg sm:text-xl">{brandCameras.length}</p>
          </InfoCard>
        </div>

        {/* CAMERAS */}
        <div className="mt-10 sm:mt-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-[0.12em] text-[#e7ded3]">
            Modele {brand.name}
          </h2>

          {brandCameras.length > 0 ? (
            <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {brandCameras.map((camera) => (
                <CameraCard
                  key={camera.slug}
                  camera={{
                    name: camera.name,
                    slug: camera.slug,
                    year: camera.releaseYear,
                    type: camera.cameraType,
                    imageUrl:
                      camera.heroImageUrl ||
                      camera.galleryUrls[0] ||
                      null,
                  }}
                />
              ))}
            </div>
          ) : (
              <div className="mt-4 sm:mt-6 rounded-lg sm:rounded-2xl border border-[#1d1711] bg-[#090b0c] p-4 sm:p-6 text-sm sm:text-base text-[#b9b0a5]">
              Brak aparatów dla tej marki.
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}