import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import InfoCard from "@/components/ui/InfoCard";
import { getCameraBySlug, getCameras } from "@/src/lib/contentful/cameras";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const cameras = await getCameras();
  return cameras.map((camera) => ({ slug: camera.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const camera = await getCameraBySlug(slug);

  if (!camera) {
    return {
      title: "Camera not found | Luma",
    };
  }

  return {
    title: `${camera.name} | ${camera.brand.name} | Luma`,
    description:
      camera.description ??
      `${camera.name} by ${camera.brand.name}. Explore specs, sensor format and gallery.`,
  };
}

export default async function CameraDetailPage({ params }: Props) {
  const { slug } = await params;
  const camera = await getCameraBySlug(slug);

  if (!camera) notFound();

  return (
    <main className="min-h-screen bg-[#040607] py-16 text-[#f3eadf]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT — IMAGES */}
          <div>
            <div className="overflow-hidden rounded-[28px] border border-[#1f1a14] bg-[#0b0d0f]">
              {camera.heroImageUrl ? (
                <Image
                  src={camera.heroImageUrl}
                  alt={camera.name}
                  width={1400}
                  height={1000}
                  className="w-full object-cover"
                />
              ) : (
                <div className="flex min-h-[420px] items-center justify-center text-[#7f776d]">
                  Brak zdjęcia
                </div>
              )}
            </div>

            {camera.galleryUrls.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
                {camera.galleryUrls.map((url) => (
                  <div
                    key={url}
                    className="overflow-hidden rounded-[18px] border border-[#1f1a14]"
                  >
                    <Image
                      src={url}
                      alt={camera.name}
                      width={600}
                      height={400}
                      className="h-40 w-full object-cover transition hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — INFO */}
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[#a88a69]">
              {camera.brand.name}
            </p>

            <h1 className="mt-4 font-serif text-5xl leading-tight text-[#f3eadf]">
              {camera.name}
            </h1>

            <div className="mt-6 flex flex-wrap gap-2">
              {camera.cameraType && <Badge>{camera.cameraType}</Badge>}
              {camera.sensorFormat && <Badge>{camera.sensorFormat}</Badge>}
              {camera.mount && <Badge>{camera.mount}</Badge>}
              {camera.releaseYear && <Badge>{camera.releaseYear}</Badge>}
            </div>

            <p className="mt-8 leading-7 text-[#b7aea4]">
              {camera.description ?? "Brak opisu aparatu."}
            </p>

            <div className="mt-10 grid gap-4">
              <InfoCard>
                <p className="text-sm text-[#8e867d]">Marka</p>
                <p className="mt-2 text-xl">{camera.brand.name}</p>
              </InfoCard>

              <InfoCard>
                <p className="text-sm text-[#8e867d]">Typ</p>
                <p className="mt-2 text-xl">
                  {camera.cameraType ?? "Brak danych"}
                </p>
              </InfoCard>

              <InfoCard>
                <p className="text-sm text-[#8e867d]">Sensor</p>
                <p className="mt-2 text-xl">
                  {camera.sensorFormat ?? "Brak danych"}
                </p>
              </InfoCard>

              <InfoCard>
                <p className="text-sm text-[#8e867d]">Mount</p>
                <p className="mt-2 text-xl">{camera.mount ?? "Brak danych"}</p>
              </InfoCard>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}