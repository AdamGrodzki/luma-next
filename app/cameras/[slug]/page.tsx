import { notFound } from "next/navigation";
import { getCameraBySlug } from "../../../src/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export default async function CameraDetailPage({ params }: Props) {
  const { slug } = await params;
  const camera = await getCameraBySlug(slug);

  if (!camera) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm text-neutral-500">{camera.brand.name}</p>
      <h1 className="text-4xl font-bold">{camera.name}</h1>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-neutral-600">
        <span>{camera.releaseYear || "—"}</span>
        <span>{camera.cameraType || "—"}</span>
        <span>{camera.mount || "—"}</span>
        <span>{camera.sensorFormat || "—"}</span>
      </div>

      {camera.description && (
        <div className="mt-8 whitespace-pre-line text-neutral-800">
          {camera.description}
        </div>
      )}

      {camera.specs && (
        <pre className="mt-8 overflow-x-auto rounded-2xl border p-4 text-sm">
          {JSON.stringify(camera.specs, null, 2)}
        </pre>
      )}
    </main>
  );
}