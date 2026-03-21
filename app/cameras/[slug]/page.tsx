import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCameraBySlug, buildContentfulImageUrl } from "@/lib/queries";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const camera = await getCameraBySlug(slug);

  if (!camera) {
    return {
      title: "Camera not found",
    };
  }

  return {
    title: camera.name,
    description:
      camera.description?.slice(0, 150) ||
      `${camera.name} – aparat marki ${camera.brand.name}.`,
  };
}

function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div className="flex items-start justify-between gap-4 border-b py-3">
      <dt className="text-sm font-medium text-neutral-600">{label}</dt>
      <dd className="text-right text-sm text-neutral-900">{String(value)}</dd>
    </div>
  );
}

export default async function CameraDetailPage({ params }: Props) {
  const { slug } = await params;
  const camera = await getCameraBySlug(slug);

  if (!camera) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm text-neutral-500">{camera.brand.name}</p>
      <h1 className="text-4xl font-bold">{camera.name}</h1>

      {camera.heroImageUrl && (
        <div className="mt-8 overflow-hidden rounded-2xl border">
          <Image
            src={camera.heroImageUrl}
            alt={camera.name}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {camera.galleryUrls.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Galeria</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {camera.galleryUrls.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="overflow-hidden rounded-2xl border bg-[#0b0d0f]"
              >
                <Image
                  src={buildContentfulImageUrl(url, { w: 1200, h: 900, fit: "fill" })}
                  alt={`${camera.name} gallery image ${index + 1}`}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl border p-6">
        <dl>
          <SpecRow label="Rok premiery" value={camera.releaseYear} />
          <SpecRow label="Typ" value={camera.cameraType} />
          <SpecRow label="Mocowanie" value={camera.mount} />
          <SpecRow label="Format sensora" value={camera.sensorFormat} />
        </dl>
      </div>

      {camera.description && (
        <div className="mt-8 whitespace-pre-line leading-7 text-neutral-800">
          {camera.description}
        </div>
      )}

      {camera.specs && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Specyfikacja</h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl border bg-neutral-50 p-4 text-sm">
            {JSON.stringify(camera.specs, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}