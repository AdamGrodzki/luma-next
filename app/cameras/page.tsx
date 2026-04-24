import { getCamerasPaginated } from "@/src/lib/contentful/cameras";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import InfoCard from "@/components/ui/InfoCard";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import Image from "next/image";

export const revalidate = 60;

const CAMERAS_PER_PAGE = 6;

interface CamerasPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CamerasPage({ searchParams }: CamerasPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const { cameras, total, totalPages, currentPage } = await getCamerasPaginated(page, CAMERAS_PER_PAGE);

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] py-8 sm:py-12 md:py-16 text-[var(--text-primary)]">
      <Container>
        <SectionHeader
          eyebrow="Katalog"
          title="Aparaty"
          description={`Przeglądaj modele aparatów. ${total} modeli w naszej bazie danych.`}
        />

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {cameras.map((camera) => (
            <InfoCard key={camera.id} href={`/cameras/${camera.slug}`}>

              {/* IMAGE */}
              <div className="overflow-hidden rounded-lg sm:rounded-[18px] border border-[var(--border-light)] bg-[var(--bg-darker)]">
                {camera.heroImageUrl ? (
                  <Image
                    src={camera.heroImageUrl}
                    alt={camera.name}
                    width={900}
                    height={700}
                    className="h-40 sm:h-48 md:h-56 w-full object-cover transition duration-500 hover:scale-105"
                  />
                ) : (
                    <div className="flex h-40 sm:h-48 md:h-56 items-center justify-center text-xs sm:text-sm text-[var(--text-muted)]">
                    Brak zdjęcia
                  </div>
                )}
              </div>

              {/* BRAND */}
              <p className="mt-3 sm:mt-4 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {camera.brand.name}
              </p>

              {/* NAME */}
              <h2 className="mt-1.5 sm:mt-2 text-base sm:text-lg md:text-2xl font-semibold text-[var(--text-primary)] line-clamp-2">
                {camera.name}
              </h2>

              {/* BADGES - Optimized for mobile */}
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                {camera.cameraType && <Badge>{camera.cameraType}</Badge>}
                {camera.sensorFormat && <Badge variant="secondary">{camera.sensorFormat}</Badge>}
                {camera.releaseYear && (
                  <span className="hidden sm:inline-block">
                    <Badge variant="secondary">{camera.releaseYear}</Badge>
                  </span>
                )}
              </div>

              {/* EXTRA - Show year on mobile here instead */}
              <div className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                {camera.mount && (
                  <span>Mount: {camera.mount}</span>
                )}
                {camera.releaseYear && (
                  <span className="sm:hidden">
                    {camera.mount && ' • '}
                    {camera.releaseYear}
                  </span>
                )}
              </div>
            </InfoCard>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/cameras"
        />
      </Container>
    </main>
  );
}