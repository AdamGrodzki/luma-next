import { getCameras } from "@/src/lib/contentful/cameras";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import InfoCard from "@/components/ui/InfoCard";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

export const revalidate = 60;

export default async function CamerasPage() {
  const cameras = await getCameras();

  return (
    <main className="min-h-screen bg-[#040607] py-8 sm:py-12 md:py-16 text-[#f3eadf]">
      <Container>
        <SectionHeader
          eyebrow="Katalog"
          title="Aparaty"
          description="Przeglądaj modele aparatów pobierane z Contentful."
        />

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {cameras.map((camera) => (
            <InfoCard key={camera.id} href={`/cameras/${camera.slug}`}>

              {/* IMAGE */}
              <div className="overflow-hidden rounded-lg sm:rounded-[18px] border border-[#1f1a14] bg-[#0f1113]">
                {camera.heroImageUrl ? (
                  <Image
                    src={camera.heroImageUrl}
                    alt={camera.name}
                    width={900}
                    height={700}
                    className="h-40 sm:h-48 md:h-56 w-full object-cover transition duration-500 hover:scale-105"
                  />
                ) : (
                    <div className="flex h-40 sm:h-48 md:h-56 items-center justify-center text-xs sm:text-sm text-[#7f776d]">
                    Brak zdjęcia
                  </div>
                )}
              </div>

              {/* BRAND */}
              <p className="mt-3 sm:mt-4 text-xs uppercase tracking-[0.16em] text-[#8e867d]">
                {camera.brand.name}
              </p>

              {/* NAME */}
              <h2 className="mt-1.5 sm:mt-2 text-base sm:text-lg md:text-2xl font-semibold text-[#f3eadf] line-clamp-2">
                {camera.name}
              </h2>

              {/* BADGES */}
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {camera.cameraType && <Badge>{camera.cameraType}</Badge>}
                {camera.sensorFormat && <Badge>{camera.sensorFormat}</Badge>}
                {camera.releaseYear && <Badge>{camera.releaseYear}</Badge>}
              </div>

              {/* EXTRA */}
              {camera.mount && (
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#a8a095]">
                  Mount: {camera.mount}
                </p>
              )}
            </InfoCard>
          ))}
        </div>
      </Container>
    </main>
  );
}